const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.left-block')
    .map((i, element) => {
      const link =$(element)
      .find('.product-image-container a')
      .attr('href');
      var rand=Math.floor(Math.random()*(3))+1;
      var rand2=Math.floor(Math.random()*28)+1;
      var date=new Date(2022,rand,rand2);
      return {
        link,
        'brand': 'adresse paris',
        'price': 
          parseFloat($(element).parent()
            .find('.price')
            .text())
        ,
        'name': $(element).parent()
            .find('.product-name-container a')
            .attr('title'),
        'photo': $(element)
          .find('.product-image-container a img')
          .attr('data-original'),

        '_id': uuidv5(link, uuidv5.URL),
        'released':date.getFullYear() + "-" + (date.getMonth()) + "-" + date.getDate()
      };
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
 module.exports.scrape = async url => {
    try {
      const response = await fetch(url);
  
      if (response.ok) {
        const body = await response.text();
        return parse(body);
      }
  
      console.error(response);
  
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  