// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';
// current products on the page
let currentProducts = [];
let currentPagination = {};
let favouriteuuid =[];
let favouritelist=[];
// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrands = document.querySelector('#brand-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbNewProducts = document.querySelector('#nbNewProducts');
const selectSort = document.querySelector('#sort-select')
const span50 = document.querySelector('#p50');
const span90 = document.querySelector('#p90');
const span95 = document.querySelector('#p95');
const spanLastReleasedDate = document.querySelector('#lastReleasedDate');
/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
  console.log("meta");
  console.log(meta);
};
/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
     // `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
     `https://server-olive-ten.vercel.app/products/search?page=${page}&size=${size}`
    );
    const body = await response.json();
    console.log(response);
    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }
    return body.data;
    
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};
function favourite(uuidElement)
{favouriteuuid.push(uuidElement);}
/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product._id}>
        <span>${product.brand}</span>
        <a href="${product.link}" target="_blank">${product.name}</a>
        <span>${product.price}</span>
        <button onclick=favourite("${product._id}")>fav</button>
      </div>
    `;
    })
    .join('');
  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};
/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');
  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};
/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;
  spanNbProducts.innerHTML = count;
};
/**
 * Render new products selector
 * @param  {Object} paginationNew
 */
  const renderIndicatorsNew = paginationNew => {
  const countNew = paginationNew.length;
  spanNbNewProducts.innerHTML = countNew;
};

function percentile(data, q) {
  var pos = ((data.length) - 1) * q;
  var base = Math.floor(pos);
  var rest = pos - base;
  if( (data[base+1]!==undefined) ) {
    return data[base].price + rest * (data[base+1].price - data[base].price);
  } else {
    return data[base].price;
  }
}
/**
 * Render p50 indicator
 * @param  {Object} p50
 */
 const renderIndicatorsp50 = p50 => {
  p50=p50.sort((a,b) => (a.price<b.price)?1:-1);
  const count50 = percentile(p50,0.5);
  span50.innerHTML = count50.toFixed(2);
};
/**
 * Render p90 indicator
 * @param  {Object} p90
 */
 const renderIndicatorsp90 = p90 => {
  p90=p90.sort((a,b) => (a.price<b.price)?1:-1);
  const count90 = percentile(p90,0.9);
  span90.innerHTML = count90.toFixed(2);
};

/**
 * Render p95 indicator
 * @param  {Object} p90
 */
 const renderIndicatorsp95 = p95 => {
  p95=p95.sort((a,b) => (a.price<b.price)?1:-1);
  const count95 = percentile(p95,0.95);
  span95.innerHTML = count95.toFixed(2);
};

/**
 * Render last released date indicator
 * @param  {Object} last
 */
 const render_last_released_date = last => {
  last=sortbydateDesc(last);
  const last_date = last[0].released;
  spanLastReleasedDate.innerHTML = last_date;
};

/**
 * Render brand selector
 * @param  {Object} brand
 * @param  {Object} brandSelected
 */
 const renderBrands = (brand,brandSelected)=> {
  //const brandstot = brand;
  const options = Array.from(
    brand,
    (brand) =>`<option value="${brand}">${brand}</option>`
  ).join('');
  selectBrands.innerHTML = options;
  selectBrands.selectedIndex = brand.indexOf(brandSelected);
};
/*
const render = (products, pagination) => {
 
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};*/

function newrelease(products){
  let newProductRelease = [];
  for (var i=0; i<products.length; i++)
  {
    if((Math.abs(Date.now()-Date.parse(products[i].released))/(1000 * 60 * 60 * 24))<14)
    {newProductRelease.push(products[i]);}
  }
  return newProductRelease;
}

function reasonable(products){
  let reasonableProducts = [];
  for (var i=0; i<products.length; i++)
  {
    if(products[i].price<50)
    {reasonableProducts.push(products[i]);}
  }
  return reasonableProducts;
}


function sortbypriceDesc(products){
  products=products.sort((a,b) => (a.price<b.price)?1:-1);
  return products;}
  
function sortbypriceAsc(products){
  products=products.sort((a,b) => (a.price>b.price)?1:-1);
  return products;}
  
function sortbydateDesc(products){
    products=products.sort((a,b) => (Date.parse(a.released)<Date.parse(b.released))?1:-1);
    return products;}

function sortbydateAsc(products){
    products=products.sort((a,b) => (Date.parse(a.released)>Date.parse(b.released))?1:-1);
    return products;}


const render2 = (products, pagination,brandSelected) => {
  if (buttonReleasedbool==true)
    {products=newrelease(products);}
  if(buttonReasonablebool==true)
    {products=reasonable(products);}
  if (buttonfavouritebool==true)
    {
      favouritelist=[];
      favouriteuuid=[ ... new Set(favouriteuuid)]
      console.log('favoriteuuid');
      console.log(favouriteuuid);
      favouriteuuid.forEach(element => {
        products.forEach(elemuuid=> {
          if (element==elemuuid._id & favouritelist.indexOf(elemuuid) <0)
          {favouritelist.push(elemuuid);}
          console.log('favouritelist');
          console.log(favouritelist);
        })  
      });
      favouritelist=[ ... new Set(favouritelist)]
      products=favouritelist;
      console.log('products');
      console.log(products);
    }
  let brandstot=['No brand selected'];
  for (let step=0;step<products.length;step++)
  {
    brandstot.push(products[step].brand);
  }
  brandstot=[ ... new Set(brandstot)]
 
  var const_brands={};
  for (var i=0; i<products.length; i++)
  {
    const_brands[products[i].brand]=[];
  }
  for (var i=0; i<products.length; i++)
  {
    const_brands[products[i].brand].push(products[i]);
  }
  if(brandSelected!='No brand selected' )
  {products=const_brands[brandSelected];}

  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderIndicatorsNew(newrelease(products));
  renderIndicatorsp50(products);
  renderIndicatorsp90(products);
  renderIndicatorsp95(products);
  render_last_released_date(products);
  renderBrands(brandstot,brandSelected);
}
/**
 * Declaration of all Listeners
 */
/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage,parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render2(currentProducts, currentPagination,'No brand selected'));
});
selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value),parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => render2(currentProducts, currentPagination,'No brand selected'));
   
});

selectBrands.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage,parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => render2(currentProducts, currentPagination,event.target.value))
});

selectSort.addEventListener('change',event =>{
  if(event.target.value=="price-asc"){
      fetchProducts(currentPagination.currentPage,parseInt(selectShow.value))
      .then(setCurrentProducts)
      .then(() => render2(sortbypriceAsc(currentProducts), currentPagination,'No brand selected'))}
  else if(event.target.value=="price-desc"){
    fetchProducts(currentPagination.currentPage,parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => render2(sortbypriceDesc(currentProducts), currentPagination,'No brand selected'))}
  else if(event.target.value=="date-asc"){
    fetchProducts(currentPagination.currentPage,parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => render2(sortbydateAsc(currentProducts), currentPagination,'No brand selected'))
  console.log(sortbydateAsc(currentProducts));}
  else if(event.target.value=="date-desc"){
    fetchProducts(currentPagination.currentPage,parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => render2(sortbydateDesc(currentProducts), currentPagination,'No brand selected'))
  console.log(sortbydateDesc(currentProducts));}
  else {
    fetchProducts(currentPagination.currentPage,parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => render2(currentProducts, currentPagination,'No brand selected'))
  }
});


document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render2(currentProducts, currentPagination,'No brand selected'))
);

var buttonReleasedbool=false;
function buttonReleased()
{ if (buttonReleasedbool==false){buttonReleasedbool=true;}
else {buttonReleasedbool=false;}
{
  fetchProducts(currentPagination.currentPage, parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => render2(currentProducts, currentPagination,'No brand selected'));
};}

var buttonReasonablebool=false;
function buttonReasonable()
{ if (buttonReasonablebool==false){buttonReasonablebool=true;}
else {buttonReasonablebool=false;}
{
  fetchProducts(currentPagination.currentPage, parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => render2(currentProducts, currentPagination,"No brand selected"));
};}

var buttonfavouritebool=false
function buttonFavourite()
{ if (buttonfavouritebool==false){buttonfavouritebool=true;}
else {buttonfavouritebool=false;}
{
  fetchProducts(currentPagination.currentPage, parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => render2(currentProducts, currentPagination,"No brand selected"));
};}