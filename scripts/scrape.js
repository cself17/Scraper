var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
	request("https://markmanson.net", function(err, res, body){

		var $ = cheerio.load(body);

		var articles = [];

		$(".list-posts li").each(function(i, element) {
			
			var headline = $(this).find("h2").text().trim();
			var link = $(this).find('a').attr('href');
			var summary = $(this).find('p').text().trim();
			console.log('summary', summary);
			
			if(headline){
				var headNeat = headline.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
				
				var dataToAdd = {
					headline: headNeat,
					link: link,// also `link,` would work
					summary
				};
				articles.push(dataToAdd);
				console.log(articles);
			}

		});
		cb(articles);
	});
};
module.exports = scrape;