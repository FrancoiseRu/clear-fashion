/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sites/dedicatedbrand');
const adresse = require('./sites/adresse');
const montlimart = require('./sites/montlimart');
const fs = require('fs');
const mongo = require('./mongo-db');
const { insert } = require('./mongo-db');
const { connect } = require('./mongo-db');


async function sandbox (){
  try {

    mongo.connect();
    let products = [];

    let pagesadresse = [
      'https://adresse.paris/630-toute-la-collection',
      'https://adresse.paris/630-toute-la-collection?p=2'
    ];

    console.log(`🕵️‍♀️  browsing ${pagesadresse.length} pages with for...of`);
    for (let pageadresse of pagesadresse) {
      console.log(`🕵️‍♀️  scraping ${pageadresse}`);

      let productpageadressse = await adresse.scrape(pageadresse);

      console.log(`👕 ${productpageadressse.length} products found`);

      products.push(productpageadressse);
    }
    //products = products.flat();
    console.log('done for adresse');
 
    let pagesmontlimart = [
      'https://www.montlimart.com/toute-la-collection.html?p=1',
      'https://www.montlimart.com/toute-la-collection.html?p=2',
      'https://www.montlimart.com/toute-la-collection.html?p=3',
      'https://www.montlimart.com/toute-la-collection.html?p=4',
      'https://www.montlimart.com/toute-la-collection.html?p=5',
      'https://www.montlimart.com/toute-la-collection.html?p=6',
      'https://www.montlimart.com/toute-la-collection.html?p=7',
      'https://www.montlimart.com/toute-la-collection.html?p=8'
    ];

    console.log(`🕵️‍♀️  browsing ${pagesmontlimart.length} pages with for...of`);
    for (let pagemontlimart of pagesmontlimart) {
      console.log(`🕵️‍♀️  scraping ${pagemontlimart}`);

      let productpagemontlimart = await montlimart.scrape(pagemontlimart);

      console.log(`👕 ${productpagemontlimart.length} products found`);

      products.push(productpagemontlimart);
    }
    /*
    products = products.flat();
    products.forEach((element, index) => {
          if (element.name === 'Carte Cadeau Montlimart') {
            products.splice(index,1);
          }
        });*/
    console.log('done for montlimart');



    let pagesdedicated = [
      'https://www.dedicatedbrand.com/en/loadfilter?'
    ];

    console.log(`🕵️‍♀️  browsing ${pagesdedicated.length} pages with for...of`);
    for (let pagededicated of pagesdedicated) {
      console.log(`🕵️‍♀️  scraping ${pagededicated}`);

      let productpagededicated = await dedicatedbrand.scrape(pagededicated);

      console.log(`👕 ${productpagededicated.length} products found`);

      products.push(productpagededicated);
    }
    //products = products.flat();

    
    products = products.flat();
    fs.writeFileSync('productsAll.json', JSON.stringify(products));
    console.log('done for dedicated');

    products.forEach((element, index) => {
      if (element.name === 'Carte Cadeau Montlimart') {
        products.splice(index,1);
      }
    });

    console.log(products)
    
    console.log("avant mongo");
    insert(products);
    console.log("apres mongo");

    //process.exit(0);

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

//const [,, eshop] = process.argv;

//sandbox(eshop);
sandbox();
