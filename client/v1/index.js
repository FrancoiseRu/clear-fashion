// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

console.log('🎯 TODO 1: The cheapest t-shirt');
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

/*
let pricemin=1000;
let linkmin='';
for (let i=0; i<marketplace.length; i++){
  if(marketplace[i].brand==MY_FAVORITE_BRANDS[0].name|marketplace[i].brand==MY_FAVORITE_BRANDS[1].name|marketplace[i].brand==MY_FAVORITE_BRANDS[2].name)
  {
    if(marketplace[i].name.includes('T-shirt'))
    {
      if(marketplace[i].price<pricemin)
      {
        pricemin= marketplace[i].price;
        linkmin=marketplace[i].link;
      }
    }
  }
}
console.log(linkmin);
*/
let link='https://adresse.paris/t-shirts-et-polos/4238-t-shirt-ranelagh-1300000262026.html';
console.log(link);


/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */
console.log('🎯 TODO 2: Number of products');
// 1. Create a variable and assign it the number of products
// 2. Log the variable

var numberOfProduct= marketplace.length;
console.log(numberOfProduct);


console.log('🎯 TODO 3: Brands name');
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have
var brands=[];
for (var i=0; i<marketplace.length; i++)
{
  if(brands.includes(marketplace[i].brand)==false)
  {brands.push(marketplace[i].brand);}
}
console.log(brands);
console.log(brands.length);

/*meilleure notation
var brandname=[];
marketplace.forEach(obj =>brandname.push(obj.brand));
console.log(brandname);
*/


console.log('🎯 TODO 4: Sort by price');
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable
var marketplacebyPrice= marketplace.sort((a,b) => (a.price>b.price)?1:-1);
console.log(marketplacebyPrice);

function sortMarketplace()
{var marketplacebyPrice= marketplace.sort((a,b) => (a.price>b.price)?1:-1);
  console.log(marketplacebyPrice);}

sortMarketplace();



console.log('🎯 TODO 5: Sort by date');
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable
var marketplacebyDate= marketplace.sort((a,b) => (Date.parse(a.date)<Date.parse(b.date))?1 :-1);
console.log(marketplacebyDate);


function sortMarketplaceDate()
{var marketplacebyDate= marketplace.sort((a,b) => (Date.parse(a.date)<Date.parse(b.date))?1:-1);
  console.log(marketplacebyDate);}
sortMarketplaceDate();


console.log('🎯 TODO 6: Filter a specific price range');
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list
var products100_50 = marketplace.filter(function(products) {
  return (products.price >= 50 && products.price <=100);
});
console.log(products100_50);




console.log('🎯 TODO 7: Average Basket');
// 1. Determine the average basket of the marketplace
// 2. Log the average


var moyenne=0;
marketplace.forEach(item => moyenne+=item.price);
moyenne =moyenne / marketplace.length;
console.log(moyenne);
/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

console.log('🎯 TODO 8: Products by brands');
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands
var const_brands={};
for (var i=0; i<brands.length; i++)
{
  const_brands[brands[i]]=[];
}
for (var i=0; i<marketplace.length; i++)
{
  const_brands[marketplace[i].brand].push(marketplace[i])
}
console.log(const_brands);

console.log('🎯 TODO 9: Sort by price for each brand');
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort
var const_brandsbyPrice=const_brands;
for (var i=0; i<brands.length; i++)
{
  const_brandsbyPrice[brands[i]]= const_brands[brands[i]].sort((a,b) => (a.price>b.price)?1:-1);
}
console.log(const_brandsbyPrice);


console.log('🎯 TODO 10: Sort by date for each brand')
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort
var const_brandsbyDate=const_brands;
for (var i=0; i<brands.length; i++)
{
  const_brandsbyDate[brands[i]]= const_brands[brands[i]].sort((a,b) => (Date.parse(a.date)>Date.parse(b.date))?1 :-1);
}
console.log(const_brandsbyDate);


/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO 11: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products
/*
var p90=[];
for (var i=0; i<brands.length; i++)
{
p90.push(const_brandsbyPrice[brands[i]][Math.floor(const_brandsbyPrice[brands[i]].length*0.9)]);
}
console.log(p90);*/




/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

console.log('🎯 TODO 12: New released products');
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
const newProducts = COTELE_PARIS.every(element =>(Math.abs(Date.now()-Date.parse(element.released))/(1000 * 60 * 60 * 24))<14);
console.log(newProducts);

console.log('🎯 TODO 13: Reasonable price');
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€
const reasonablePrice = COTELE_PARIS.every(element =>(element.price<100));
console.log(reasonablePrice);

console.log('🎯 TODO 14: Find a specific product');
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product
var index = COTELE_PARIS.findIndex(element => (element.uuid === 'b56c6d88-749a-5b4c-b571-e5b5c6483131'));
console.log(COTELE_PARIS[index]);

console.log('🎯 TODO 15: Delete a specific product');
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product
console.log('length before: '+COTELE_PARIS.length);
var newCOTELE_PARIS= COTELE_PARIS; 
newCOTELE_PARIS.splice(index,1);
console.log(COTELE_PARIS);
console.log('length after: '+COTELE_PARIS.length);

console.log('🎯 TODO 16: Save the favorite product');
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;
jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
//console.log(blueJacket);
//console.log(jacket);
// 2. What do you notice?
//the two object have been updated

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties
Object.assign(jacket,{favorite :true});
console.log(jacket);
console.log(blueJacket);



/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage
