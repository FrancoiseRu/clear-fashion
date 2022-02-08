/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sites/dedicatedbrand');
const adresse = require('./sites/adresse');
const montlimart = require('./sites/montlimart');


'https://adresse.paris/630-toute-la-collection'
'https://www.dedicatedbrand.com/en/loadfilter?'
'https://www.montlimart.com/toute-la-collection.html?p=8'
async function sandbox (eshop ='https://www.montlimart.com/toute-la-collection.html?p=8'){
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await montlimart.scrape(eshop);
    console.log(products.length)
    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
