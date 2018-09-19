function parseUSD(num){
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// Extracts the number of items in the cart, the cart total, and the item images from the page. Store them in variables.
let x = (await (await fetch('https://www.marmot.com/cart')).text())
const parser = new DOMParser();
const cartDOM = parser.parseFromString(x, "text/html");
const itemElements = cartDOM.documentElement.querySelectorAll('.cart-row')

let numOfItems = 0
itemElements.forEach(item=>{numOfItems += parseInt(item.querySelector('.input-change-value').value)})

const orderTotal = parseUSD((parseFloat(document.querySelector('.order-value').innerHTML.substring(1))))

const itemImages = []
itemElements.forEach(item=>{itemImages.push(item.querySelector('.item-image').querySelector('img').src )})


// Create a trigger that activates when the user scrolls into the bottom 10% of the page.
let last_known_scroll_position = 0;
let ticking = false;

function doSomething(scroll_pos) {
  // console.log('scrolling? scrll pos = ', scroll_pos)
  console.log(ticking)
}

window.addEventListener('scroll', function(e) {

  last_known_scroll_position = window.scrollY;

  if (last_known_scroll_position >= $('body').height()*0.9 || last_known_scroll_position -  <= window.scrollY-window.innerHeight ) {

  }

});

// The trigger should show a centered overlay on top of the site that displays the information gathered above and two buttons. One button should close the overlay and the other should take the user to the cart page. It should have a style consistent with the website. Design matters.

// Behind the overlay add a semi­transparent black background that obscures the site. The overlay should be able to trigger multiple times if dismissed.


// -----------------Tests-------------------
console.log('Cart Num', numOfItems)
console.log('orderTotal', orderTotal )
console.log('itemImages', itemImages)
