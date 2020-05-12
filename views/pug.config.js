//const categories = require('../projects/categories.yaml');
//const projectFiles = require('../projects/**/*.yaml');

const yaml = require('yaml');
const fs = require('fs');
const path = require('path');
const {categories} = yaml.parse(fs.readFileSync(__dirname + '/../projects/categories.yaml', {encoding: 'utf-8'}));

const hl = 'en';
const projectsByCategory = {}
for (const category of categories) {
	category.projects = fs.readdirSync(path.join(__dirname, `../projects`, category.path))
		.map(x => yaml.parse(fs.readFileSync(path.join(__dirname, '../projects', category.path, x), {encoding: 'utf-8'})))
		.sort((a,b) => (b.awesomeness||0) - (a.awesomeness||0));

	projectsByCategory[category.i11n[hl]] = [];
	for (const project of category.projects) {
		projectsByCategory[category.i11n[hl]].push(project.i11n[hl].name) 
	}
}

console.log(projectsByCategory, categories)


module.exports = {
	locals: {
		projectsByCategory,
		projectsByCategory_: {
			'vk.com related': [
				'graphite',
				'node-vkapi',
				'vk-groups-graph-dump',
				'vk-friends-graph-dump',
				'vk-profile-photo-dump',
				'vk-detect-alt-profiles',
				'vk-search-by-interests',
				'vk-friends-cli',
				'vk-hidden-groups',
				'vk-hidden-friends',
				'vk-messages-dump',
				'vk-conf-statistics',
				'vk-conf-invite-graph',
				'vk-upload-folders-albums',
				'infosource',
				'vk-random-audio-player'
			],
			'telegram': [
				'chandj',
				'thunderstruck',
				'teletrain',
				'tg-journal',
				'findface-check-bot',
				'challengebot',
				'miawabot',
				'praporbot',
				'notifybot',
				'darkbus',
				'imgtaggerbot', 
				'undelete',
				'no-photo-ttl-service',
				'no-photo-ttl-patch',
				'tdbot',
				'cw-bot'
			],
			'Frontend experiments': [
				'evil-signup-form',
				'simple-study-projects',
				'bfrun',
				'plot-builder',
				'path-finding',
				'flat-google-maps',
				'browser-frame-for-screenshots',
				'random words & passwords',
				'js-imperial-march',
				'booksGraph',
				'lyrics',
				'ongoing'
			],
			'Gamedev': [
				'yajla',
				'xnul',
				'kalah-ai',
				'vocabulary-game',
				'atd',
				'osu-shocker',
				'osu-bpm-training'
			],
			'CTFs & Security': [
				'siso',
				'ctf-solo-engine',
				'shellcrypt',
				'findface-check-bot',
				'random-person',
				'assctf'
			],
			'Shitty Landings': [
				'valka',
				'pc-build-landing',
				'this(recursion)'
			],
			'Web Applications': [
				'web-phoenix-bios',
				'k732gram',
				'ws-chat',
				'shellcrypt',
				'jsterm',
				'cloudx',
				'pixel',
				'matrix-client',
				'facts'
			],
			'CLI Utilities': [
				'imap-attachments',
				'ytmhist2csv.py',
				'webp2gif',
				'tab',
				'danbooru-favs',
				'derpiboo.ru-dumper',
				'qset-interpret',
				'iwascool',
				'raw-tcp-chat-server'
			],
			'Libraries': [
				'node-vkapi',
				'tdbot',
				'rust-turbopfor-bindings',
				'rust-inverted-index',
				'node-distributed',
				'phrasegen',
				'dictgen',
				'siso',
				'simple-data-draw'
			],
			'Data Science': [
				'task-time-predict',
				'cspi'
			],
			'Other': [
				'tosterbot',
				'spy'
			]
		}
	}
}