/* i18n */

const allLangs = window.navigator.languages;
const clientLang = window.navigator.userLanguage || window.navigator.language;
const clientKnowsRu = allLangs.some(x => x.toLowerCase().includes('ru')) || clientLang.toLowerCase().includes('ru');
if (localStorage.getItem('paulll.hl') == 'ru' || !localStorage.getItem('paulll.hl') && clientLang == 'ru-RU') {
	for (const e of document.querySelectorAll('[data-ru]')) {
		e.innerHTML = e.dataset.ru;
	}
}

window.addEventListener('load', () => {
	const title = document.querySelector(':target h2') && document.querySelector(':target h2').textContent;
	if (title) {
		document.getElementsByTagName('title')[0].textContent = `${title} — paulll`;
	}

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
				pixelRatio: window.devicePixelRatio
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
});


