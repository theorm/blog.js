var Lorem = require('lorem-ipsum')
  , _ = require('lodash')
  , moment = require("moment")
  , fmt = require('util').format;

function generatePost() {
	var title = Lorem({count: 3, units: 'words'});
	title = title.charAt(0).toUpperCase() + title.slice(1);

	return {
		title: title,
		slug: title.toLowerCase().replace(/\s+/g, '_'),
		shortDescription: Lorem({count: 1, units: 'sentences'}),
		timestamp: new Date(),
		text: fmt("# %s\n\n*%s*\n\n%s\n\n%s\n\n%s", 
			Lorem({count: 2, units: 'words'}), 
			Lorem({count: 1, units: 'sentences'}), 
			Lorem({count: 2, units: 'paragraphs'}),
			"<img src='http://lorempixel.com/400/200'/>",
			Lorem({count: 3, units: 'paragraphs'})
		)
	}
}

var DB = function() {
	this.posts = _.times(10, generatePost);
	return this;
}

DB.prototype.getPosts = function(limit) {
	return this.posts;
}

DB.prototype.getPostBySlugAndDay = function(slug, year, month, day) {
	var ymd = fmt('%s/%s/%s', year, month, day);

	var posts = _.filter(this.posts, function(p) {
		return p.slug == slug && ymd == moment(p.timestamp).format("YYYY/MM/DD");
	});

	return posts.length > 0 ? posts[0] : null;
}

module.exports.DB = DB;
