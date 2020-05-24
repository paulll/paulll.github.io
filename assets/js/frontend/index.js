import {getFonts, getWebglVendorAndRenderer, getWebglFp} from './fp'
import {hash} from './util'

const sendUsage = () => {
	const title = document.getElementsByTagName('title')[0].textContent;
	const fonts = getFonts();
	const fontsDetected = Object.keys(fonts).filter(font => fonts[font]);
	const allLangs = window.navigator.languages;
	const clientLang = window.navigator.userLanguage || window.navigator.language;
	
	/* hits / uniq hits calculation */
	fetch('https://api.paulll.cc/landing/hit', {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		body: JSON.stringify({
			url: document.location.href,
			title: document.querySelector(':target h2') ? document.querySelector(':target h2').textContent : 'paulll',
			referrer: document.referrer,
			client: {
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
				pixelRatio: window.devicePixelRatio,
				fontsDetected,
				webgl: hash(JSON.stringify(getWebglFp())),
				webglRenderer: getWebglVendorAndRenderer()
			}
		})
	})
	.then((response) => response.json())
	.then((data) => {
		if (data.you) {
			document.getElementById('footer').textContent = `hello, ${data.you}`;
		}
	})
	.catch(() => {/* i really don't care */})
}

if (document.readyState !== "loading") {
	setTimeout(sendUsage, 0)
} else {
	document.addEventListener('DOMContentLoaded', sendUsage);
}
