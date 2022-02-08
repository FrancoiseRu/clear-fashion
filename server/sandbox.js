/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sites/dedicatedbrand');
const adresse = require('./sites/adresse');

'https://adresse.paris/630-toute-la-collection'
'https://www.dedicatedbrand.com/en/loadfilter?'
async function sandbox (eshop ='https://www.dedicatedbrand.com/en/loadfilter?'){
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);
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
