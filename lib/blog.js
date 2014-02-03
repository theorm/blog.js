var	exphbs  = require('express3-handlebars');

function Blog(app, options) {
	options = options || {};

	var prefix = options.prefix || '/';
	var dbType = options.db || 'placeholder';
	
	var DB = require('./db/' + dbType).DB;
	var db = new DB(options.dbUrl);

	var blogTitle = options.title || 'The Blog';
	var shortDescription = options.shortDescription || 'Writings...';
	var latestPostsLimit = options.latestPostsLimit || 10;

	hbs = exphbs.create({
		defaultLayout: 'main',
		helpers: require('./helpers')
	});

	app.engine('handlebars', hbs.engine);
	app.set('view engine', 'handlebars');

	app.get(prefix + '', function(req, res) {
		res.render('home', {
			title: blogTitle,
			shortDescription: shortDescription,
			posts: db.getPosts(latestPostsLimit),
		});
	});

	app.get(prefix + ':year/:month/:day/:slug', function(req, res, next) {
		
		var post = db.getPostBySlugAndDay(req.params.slug, 
			req.params.year, req.params.month, req.params.day);

		if (!post) res.send(404);

		res.render('post', {
			title: blogTitle,
			shortDescription: shortDescription,
			post: post,
		});
	});
}

module.exports.Blog = Blog;
