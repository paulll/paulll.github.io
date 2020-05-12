//const categories = require('../projects/categories.yaml');
//const projectFiles = require('../projects/**/*.yaml');

const yaml = require('yaml');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {categories} = yaml.parse(fs.readFileSync(__dirname + '/../projects/categories.yaml', {encoding: 'utf-8'}));

for (const category of categories) {
	category.projects = fs.readdirSync(path.join(__dirname, `../projects`, category.path))
		.map(x => Object.assign({filename: x}, yaml.parse(fs.readFileSync(path.join(__dirname, '../projects', category.path, x), {encoding: 'utf-8'}))))
		.sort((a,b) => (b.awesomeness||0) - (a.awesomeness||0));
	category.projects
		.forEach(x => x.id = crypto.createHash('sha256').update(category.path + x.filename).digest('hex').slice(0,16));
	category.projects
		.forEach(x => x.i18n.ru.description = x.i18n.ru.description.split('\n').map(x=>`<p>${x}</p>`).join(''))
	category.projects
		.forEach(x => x.i18n.en.description = x.i18n.en.description.split('\n').map(x=>`<p>${x}</p>`).join(''))
}

module.exports = {
	locals: {
		categories,
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