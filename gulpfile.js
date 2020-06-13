const yaml = require('yaml');
const fs = require('fs/promises');
const fsraw = require('fs');
const path = require('path');
const gulp = require('gulp');
const through2 = require('through2');
const cache = require('gulp-cached');
const stylus = require('gulp-stylus');
const gulpPug = require('gulp-pug');
const Vinyl = require('vinyl');
const postcss = require('gulp-postcss');
const pug = require('pug');
const cssnano = require('cssnano');
const rollup = require('@rollup/stream');
const source = require('vinyl-source-stream');
const glob = require('fast-glob');
const terser  = require('gulp-terser');
const { Readable } = require('stream');
const buffer = require('vinyl-buffer');
const Git = require('simple-git/promise');
const sitemap = require('sitemap');
const hljs = require('highlight.js');
const implicitFigures = require('markdown-it-implicit-figures');

// markdown
const md = require('markdown-it')({
	html: true,
	linkify: true,
	quotes: "«»„“",
	typographer: true,
	breaks: false,
	highlight(str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(lang, str).value;
			} catch (e) {
				console.log(e);
			}
		}
		return ''; // use external default escaping
	}
});

md.use(implicitFigures, {
	figcaption: true
});

// util
const _cacheChange = {};
const cacheChange = async (forceCache, filename, fn) => {
	const fileData = await fs.readFile(filename, {encoding: 'utf-8'});
	if (_cacheChange[filename]?.raw != fileData && !forceCache)
		_cacheChange[filename] = {raw: fileData, computed: fn(fileData)};
	return _cacheChange[filename].computed;
}

// tasks
const taskProjectsPages = async () => {
	const [projectTemplate, {categories}] = await Promise.all([
		cacheChange(false, `${__dirname}/views/projects.pug`, data => {
			delete cache.caches['projects@details'];
			return pug.compile(data)
		}),
		cacheChange(false, `${__dirname}/projects/categories.yaml`, data => {
			delete cache.caches['projects@details'];
			return yaml.parse(data);
		})
	])

	return gulp.src('projects/*/*.yaml')
		.pipe(cache('projects@details'))
		.pipe(through2.obj(function (file, _, cb) {
			const root = yaml.parse(file.contents.toString());
			file.base = `${__dirname}/projects/`;
			for (const hl of Object.keys(root.i18n)) {
				const data = Object.assign({}, root, root.i18n[hl]);
				const category_path = file.relative.split('/').slice(-2,-1)[0];
				data.category = categories.find(x => x.path == category_path).i18n[hl];
				data.canonical_url = `https://paulll.cc/${hl}/${file.relative.slice(0, -file.extname.length)}.html`;
				data.description = md.render(data.description);
				//data.description = data.description.split('\n').map(x=>`<p>${x}</p>`).join(''); 
				//data.description = data.description.replace(/<code>.*?<\/code>/gmi, x => x.replace(/<p>(.*?)<\/p>/gmi, '$1'))
				this.push(new Vinyl({
					contents: Buffer.from(projectTemplate({ project: data, hl })),
					path: `${__dirname}/${hl}/${category_path}/${file.stem}.html`
				}));
			}
			cb()
		}))
		.pipe(gulp.dest('dist/'))
}

const taskMainPage = async () => {
	const [indexRuTemplate, indexEnTemplate, {categories}, projects] = await Promise.all([
	    cacheChange(false, `${__dirname}/views/index/ru.pug`, data => {
			return pug.compile(data)
		}),                                                                     
		cacheChange(false, `${__dirname}/views/index/en.pug`, data => {
			return pug.compile(data)
		}),
		cacheChange(false, `${__dirname}/projects/categories.yaml`, data => {
			delete cache.caches['projects@details'];
			return yaml.parse(data);
		}),
		glob('projects/*/*.yaml').then(x => 
			Promise.all(x.map(async (file) => {
				try {
					return Object.assign({file}, yaml.parse(await fs.readFile(file, {encoding: 'utf-8'})))
				} catch (e) {
					console.log(`Error with project file: ${file}`, e.toString());
					throw e;
				}
			}))
		)
	]);

	for (const category of categories) {
		category.projects = projects
			.filter((x) => x.file.includes(`/${category.path}/`))
			.sort((a, b) => b.awesomeness - a.awesomeness)
	}

	const templates = {en: indexEnTemplate, ru: indexRuTemplate};
	const pages = Readable.from(['en', 'ru'].map (hl => new Vinyl({
		contents: Buffer.from(templates[hl]({
			categories: categories.map(category => Object.assign({}, {
				name: category.i18n[hl],
				projects: category.projects.map(project => Object.assign({}, project, project.i18n[hl], {
					href: project.file.slice('projects/'.length).slice(0,-'.yaml'.length) + '.html'
				}))
			}))
		})),
		path: `${hl}/index.html`
	})))

	return pages
		.pipe(gulp.dest('dist'))
}

let _sitemapGenerated = 0;
const taskSitemap = async () => {
	if (_sitemapGenerated++)
		return;

	const git = Git(__dirname);
	const getLastChangeDate = async (file) => new Date( (await git.log(['-1', file])).latest.date )
	const projects = await glob('projects/*/*.yaml')
	.then(x => 
		Promise.all(x.map(async (file) => ({
			file, 
			mtime: await getLastChangeDate(file),
			data: yaml.parse(await fs.readFile(file, {encoding: 'utf-8'}))
		})))
	)
	.then(x => 
		x.filter( x => (x.data.license||'private').toLowerCase() != 'private' && !x.data.tags.includes('private')));
	
	const lastmod = await getLastChangeDate('.');
	const langs = ['en', 'ru'];
	
	const projectPages = langs.map( hl => {
		return projects.map( project => {
			const name = project.file.slice('projects'.length).slice(0,-'.yaml'.length) + '.html';
			return {
				url: hl + name,
				changefreq: 'daily',
				priority: 0.5,
				lastmod: project.mtime,
				links: langs.filter(x=>x!=hl).map(lang=>({lang, url: `https://paulll.cc/${lang}${name}`}))
			}
		})
	}).flat();

	const systemPages = [
		'/',
		'/ru/',
		'/en/'
	];

	const pages = [
		...projectPages,
		...systemPages.map(url => ({url, changefreq: 'daily', priority: 0.9, lastmod }))
	];

	Readable.from(pages)
		.pipe(new sitemap.SitemapStream({hostname: 'https://paulll.cc'}))
		.pipe(fsraw.createWriteStream('dist/sitemap.xml'));
}

const taskIndexPage = async () => {
	return gulp.src('views/index.pug')
		.pipe(cache('index'))
		.pipe(gulpPug())
		.pipe(gulp.dest('dist'))
}

const taskStylusStyles = async () => {
	return gulp.src('assets/style/*.styl')
		.pipe(cache('stylus'))
		.pipe(stylus())
		.pipe(postcss([cssnano()]))
		.pipe(gulp.dest('dist/style'))
}

const taskStaticAssets = async () => {
	return gulp.src('assets/static/**', {dot: true})
		.pipe(cache('static'))
		.pipe(gulp.dest('dist'))
}

const _jscache = new Map;
const taskJavascript = async () => {
	const entryPoints = await glob('assets/js/*/index.js');
	entryPoints.forEach(ep => {
		rollup({input: ep, output: {format: 'iife'}, cache: _jscache.get(ep)})
			.on('bundle', bundle => _jscache.set(ep, bundle))
			.pipe(source(ep.split('/js/').pop().split('/index').shift() + '.js'))
			.pipe(cache('js'))
			.pipe(buffer())
			.pipe(terser())
			.on('error', console.log.bind(console))
			.pipe(gulp.dest('dist/js'));
	});
}

exports.default = gulp.parallel(
	taskProjectsPages, 
	taskStylusStyles,
	taskStaticAssets,
	taskJavascript,
	taskMainPage,
	taskIndexPage,
	taskSitemap
);

exports.watch = () => gulp.watch(['assets/**', 'projects/**/*.yaml', 'views/**/*.pug'], exports.default)