const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const hl = 'en';
const {categories} = yaml.parse(fs.readFileSync(path.join(__dirname, 'projects', 'categories.yaml'), {encoding: 'utf8'}));
const projectsByCategory = {};

for (const category of categories) {
	const projectFiles = fs.readdirSync(path.join(__dirname, 'projects', category.path));
	projectsByCategory[category.i11n[hl]] = [];

	const projects = projectFiles.map(projectFile =>
		yaml.parse(fs.readFileSync(path.join(__dirname, 'projects', category.path, projectFile), {encoding: 'utf8'}))
	);

	projects.sort((a,b) => (b.awesomeness||0) - (a.awesomeness||0));

	for (const project of projects)
		projectsByCategory[category.i11n[hl]].push(project.i11n[hl].name) 
}

fs.writeFileSync('project-data.json', JSON.stringify(projectsByCategory))