const allLangs = window.navigator.languages;
const clientLang = window.navigator.userLanguage || window.navigator.language;
const clientKnowsRu = allLangs.some(x => x.toLowerCase().includes('ru')) || clientLang.toLowerCase().includes('ru');
if (localStorage.getItem('paulll.hl') == 'ru' || !localStorage.getItem('paulll.hl') && clientLang == 'ru-RU')
	document.location.href = '/ru/';
else 
	document.location.href = '/en/';