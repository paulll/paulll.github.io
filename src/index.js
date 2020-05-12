const clientLang = window.navigator.userLanguage || window.navigator.language;
if (localStorage.getItem('paulll.hl') == 'ru' || !localStorage.getItem('paulll.hl') && clientLang == 'ru-RU') {
	for (const e of document.querySelectorAll('[data-ru]')) {
		e.innerHTML = e.dataset.ru;
	}
}