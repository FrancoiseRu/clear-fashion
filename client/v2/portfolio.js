// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';
// current products on the page
let currentProducts = [];
let currentPagination = {};
// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrands = document.querySelector('#brand-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbNewProducts = document.querySelector('#nbNewProducts');
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
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();
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
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
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
    {
      newProductRelease.push(products[i]);
    }
  }
  return newProductRelease;
}

const render2 = (products, pagination,brandSelected) => {
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
  const_brands[products[i].brand].push(products[i])
 
}
if (buttonrel===true){
  renderProducts(newrelease(products));
}
else{
  if(brandSelected=='No brand selected' )
  {
    renderProducts(products);
  }
  else
  {
    renderProducts(const_brands[brandSelected]);
  }
}
  

  renderPagination(pagination);
  renderIndicators(pagination);
  renderBrands(brandstot,brandSelected)
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
  console.log('page');
  console.log(currentPagination.pageSize);
  currentPagination.pageSize=currentPageSize(currentPagination.pageSize);
  console.log(currentPagination.pageSize);
  fetchProducts(parseInt(event.target.value),currentPagination.pageSize)
    .then(setCurrentProducts)
    .then(() => render2(currentProducts, currentPagination,'No brand selected'));
   
});
function currentPageSize(PageSizecurrent)
{
  if(PageSizecurrent>24 | PageSizecurrent==0){return 48;}
  else if(PageSizecurrent>12){return 24;}
  else {return 12;}
}

selectBrands.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage,currentPagination.pageSize)
    .then(setCurrentProducts)
    .then(() => render2(currentProducts, currentPagination,event.target.value))
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render2(currentProducts, currentPagination,'No brand selected'))
);

var buttonrel=false;
function buttonReleased()
{ if (buttonrel==false){buttonrel=true}
else buttonrel=false;
console.log(buttonrel)
{
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
    .then(setCurrentProducts)
    .then(() => render2(currentProducts, currentPagination,'No brand selected'));
    
};}



