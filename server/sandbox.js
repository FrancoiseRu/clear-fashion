/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sites/dedicatedbrand');
const adresse = require('./sites/adresse');
const montlimart = require('./sites/montlimart');


'https://adresse.paris/630-toute-la-collection'
'https://www.dedicatedbrand.com/en/loadfilter?'
'https://www.montlimart.com/toute-la-collection.html?p=8'
//async function sandbox (eshop ='https://www.montlimart.com/toute-la-collection.html?p=8'){
  async function sandbox (){
  try {
    //console.log(`🕵️‍♀️  browsing ${eshop} source`);

    //const products = await montlimart.scrape(eshop);
    //console.log(products.length)
    //console.log(products);


    let productsadressse = [];
    let pagesadresse = [
      'https://adresse.paris/630-toute-la-collection',
      'https://adresse.paris/630-toute-la-collection?p=2'
    ];

    console.log(`🕵️‍♀️  browsing ${pagesadresse.length} pages with for...of`);

    // Way 1 with for of: we scrape page by page
    for (let pageadresse of pagesadresse) {
      console.log(`🕵️‍♀️  scraping ${pageadresse}`);

      let productpageadressse = await adresse.scrape(pageadresse);

      console.log(`👕 ${productpageadressse.length} products found`);

      productsadressse.push(productpageadressse);
    }
    console.log('done for adresse');



    let productsmontlimart = [];
    let pagesmontlimart = [
      //'https://www.montlimart.com/toute-la-collection.html?p=1',
      'https://www.montlimart.com/toute-la-collection.html?p=2',
      'https://www.montlimart.com/toute-la-collection.html?p=3',
      'https://www.montlimart.com/toute-la-collection.html?p=4',
      'https://www.montlimart.com/toute-la-collection.html?p=5',
      'https://www.montlimart.com/toute-la-collection.html?p=6',
      'https://www.montlimart.com/toute-la-collection.html?p=7',
      'https://www.montlimart.com/toute-la-collection.html?p=8'
    ];

    console.log(`🕵️‍♀️  browsing ${pagesmontlimart.length} pages with for...of`);

    // Way 1 with for of: we scrape page by page
    for (let pagemontlimart of pagesmontlimart) {
      console.log(`🕵️‍♀️  scraping ${pagemontlimart}`);

      let productpagemontlimart = await montlimart.scrape(pagemontlimart);

      console.log(`👕 ${productpagemontlimart.length} products found`);

      productsmontlimart.push(productpagemontlimart);
    }
    //supprimer la carte cadeau
    console.log('done for montlimart');




    let productsdedicated = [];
    let pagesdedicated = [
      'https://www.dedicatedbrand.com/en/loadfilter?'
    ];

    console.log(`🕵️‍♀️  browsing ${pagesdedicated.length} pages with for...of`);

    // Way 1 with for of: we scrape page by page
    for (let pagededicated of pagesdedicated) {
      console.log(`🕵️‍♀️  scraping ${pagededicated}`);

      let productpagededicated = await dedicatedbrand.scrape(pagededicated);

      console.log(`👕 ${productpagededicated.length} products found`);

      productsdedicated.push(productpagededicated);
    }
    console.log('done for dedicated');


    process.exit(0);

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

//const [,, eshop] = process.argv;

//sandbox(eshop);
sandbox();
