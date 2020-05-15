/* i18n */

const allLangs = window.navigator.languages;
const clientLang = window.navigator.userLanguage || window.navigator.language;
const clientKnowsRu = allLangs.some(x => x.toLowerCase().includes('ru')) || clientLang.toLowerCase().includes('ru');
if (localStorage.getItem('paulll.hl') == 'ru' || !localStorage.getItem('paulll.hl') && clientLang == 'ru-RU') {
	for (const e of document.querySelectorAll('[data-ru]')) {
		e.innerHTML = e.dataset.ru;
	}
}

/* hits / uniq hits calculation */
fetch('https://api.paulll.cc/landing/hit', {
	method: 'POST',
	mode: 'cors',
	cache: 'no-cache',
	body: JSON.stringify({
		url: document.location.href,
		title: document.querySelector(':target h2') ? document.querySelector(':target h2').textContent : 'paulll',
		client: {
			languageInfo: [ allLangs, clientLang ],
			userAgent: [ navigator.userAgent, navigator.appVersion ],
			maxTouchPoints: navigator.maxTouchPoints,
			cores: navigator.hardwareConcurrency, 
			memory: navigator.deviceMemory,
			dnt: navigator.doNotTrack,
			connection: {
				type: navigator.connection.effectiveType,  
				rtt: navigator.connection.rtt, 
				saveData: navigator.saveData, 
				downlink: navigator.downlink,
				maxDownlink: navigator.downlinkMax
			},
			platform: navigator.platform,
			pixelRatio: window.devicePixelRatio
		}
	})
}).catch(() => {/* i really don't care */});