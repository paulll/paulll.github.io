import {getFonts, getWebglVendorAndRenderer, getWebglFp} from './fp'
import {hash} from './util'

const getFpData = async () => {
	const calculateFpData = () => {
		let fontsDetected = null,
			webgl = null,
			webglRenderer = null;

		try { 
			const fonts = getFonts();
			fontsDetected = Object.keys(fonts).filter(font => fonts[font]);
		} catch (e) {};

		try {webgl = hash(JSON.stringify(getWebglFp()))} catch (e) {};

		try {webglRenderer = getWebglVendorAndRenderer()} catch (e) {};
		
		return {
			fontsDetected,
			webgl,
			webglRenderer
		}
	}

	if (document.readyState == 'complete')
		return calculateFpData();
	return new Promise(cb => {
		document.addEventListener('load', () => cb(calculateFpData()));
	});
}

const sendUsage = async () => {
	const title = document.getElementsByTagName('title')[0].textContent;
	
	const allLangs = window.navigator.languages || [];
	const clientLang = window.navigator.userLanguage || window.navigator.language || '-';

	let referrer = document.referrer || '';
	if (referrer.endsWith('paulll.cc/'))
		referrer = localStorage.getItem('paulll.ref')
	if (!referrer)
		referrer = '(noreferrer)';
	if (referrer == document.location.href)
		referrer = '(reload)';

	const fpData = JSON.parse(localStorage.getItem('paulll.fpcache')||'false') || await getFpData();
	localStorage.setItem('paulll.fpcache', JSON.stringify(fpData));

	/* hits / uniq hits calculation */
	fetch('https://api.paulll.cc/landing/hit', {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		body: JSON.stringify({
			url: document.location.href,
			title,
			referrer: referrer,
			client: Object.assign({
				languageInfo: [ allLangs, clientLang ],
				userAgent: [ navigator.userAgent, navigator.appVersion ],
				maxTouchPoints: navigator.maxTouchPoints,
				cores: navigator.hardwareConcurrency, 
				memory: navigator.deviceMemory,
				dnt: navigator.doNotTrack,
				connection: navigator.connection ? {
					type: navigator.connection.effectiveType,  
					rtt: navigator.connection.rtt, 
					saveData: navigator.saveData, 
					downlink: navigator.downlink,
					maxDownlink: navigator.downlinkMax
				} : {},
				platform: navigator.platform,
				pixelRatio: window.devicePixelRatio
			}, fpData)
		})
	})
	.then((response) => response.json())
	.then((data) => {
		if (data.you) {
			document.getElementById('footer').textContent = `привет, ${data.you}`;
		}
	})
	.catch(() => {/* i really don't care */})
}

if (document.readyState !== "loading") {
	setTimeout(sendUsage, 0)
} else {
	document.addEventListener('DOMContentLoaded', sendUsage);
}
