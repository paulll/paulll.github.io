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
	}
}