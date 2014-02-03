var marked = require("marked")
  , moment = require("moment")
  , fmt = require("util").format;

module.exports = {
	md2html: function(md) {
		return marked(md);
	},
	postLink: function(post) {
		return fmt("%s/%s",
			moment(post.timestamp).format('YYYY/MM/DD'),
			post.slug
		)
	}
}
