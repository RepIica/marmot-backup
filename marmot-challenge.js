function parseUSD(num){
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// Extracts the number of items in the cart, the cart total, and the item images from the page. Store them in variables.
let x = (await (await fetch('https://www.marmot.com/cart')).text());
const parser = new DOMParser();
const cartDOM = parser.parseFromString(x, "text/html");
const itemElements = cartDOM.documentElement.querySelectorAll('.cart-row')

let numOfItems = 0
itemElements.forEach(item=>{numOfItems += parseInt(item.querySelector('.input-change-value').value)})

const orderTotal = parseUSD((parseFloat(document.querySelector('.order-value').innerHTML.substring(1).replace(/,/g , ""))))

const itemImages = []
itemElements.forEach(item=>{itemImages.push(item.querySelector('.item-image').querySelector('img').src )})
// itemImages = itemElements.map(item=>{item.querySelector('.item-image').querySelector('img').src )}) // alternatively use to_String with <img src=${all the stuff}> 
let imageElements = "" // all the <img> tags to display
itemImages.forEach(path => imageElements += `<img src="${path}" >`)


// Create a trigger that activates when the user scrolls into the bottom 10% of the page.
window.addEventListener('scroll', function(e) {

  if (window.scrollY >= $('body').height()*0.9 || $('body').height() - window.scrollY <= window.innerHeight ) {
    console.log(`window.scrollY >= $('body').height()*0.9`)
    window.scrollY >= $('body').height()*0.9 ? console.log('Scrolled into bottom 10% without hitting bottom of window') : console.log('scrolled to bottom')

  }

});

// The trigger should show a centered overlay on top of the site that displays the information gathered above and two buttons.
// One button should close the overlay and the other should take the user to the cart page.
// It should have a style consistent with the website. Design matters.

// Behind the overlay add a semi­transparent black background that obscures the site.
// The overlay should be able to trigger multiple times if dismissed.

const modalBg = document.createElement('div')
const modalBgStyle = `
  position: absolute;
  background: rgba(0, 0, 0, 0.62);
  width:100vw;
  height:100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 8999;
`
const modal = document.createElement('div')
const modalStyle = `
  position: fixed;
  width: 700px;
  max-width: 100vw;
  height:650px;
  max-height:100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #820a1e;
  display: none;
  z-index: 9000;
`
const modalContent = document.createElement('div')
const modalContentStyle = `
  box-sizing: border-box;
  position: absolute;
  padding: 15px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(255, 255, 255, 1);
  color: black;
  z-index: 9001;
`
modalContent.innerHTML = `
  <div class="pt_cart">
    <a class="minicart-link" target="_blank" href="https://www.marmot.com/cart" style="float:right; right:40px;">
      <svg aria-hidden="true" class="svg-icon svg-icon-bag" version="1.1" width="20" height="23" viewBox="0 0 20 23"><path d="M1.348 22.906C.905 22.74.238 22.07.062 21.612c-.292-.756.52-16.77.88-17.38.485-.818 1.222-1.052 3.32-1.052H6.13l.45-.948c1.45-3.04 5.778-2.955 6.96.138l.308.81h1.888c3.74 0 3.545-.476 4.01 9.784.393 8.674.39 8.755-.438 9.525l-.485.45-8.602.03c-4.73.02-8.72-.01-8.87-.07zM18.31 20.73c.003-1.068-.55-13.554-.648-14.617l-.102-1.128H13.8v1.86c0 1.968-.12 2.29-.84 2.29-.718 0-.965-.633-.965-2.476V4.98H7.843v1.86c0 1.952-.12 2.29-.812 2.29-.69 0-.81-.338-.81-2.29V4.98H2.46l-.097.947c-.094.897-.66 13.74-.655 14.8l.003.494h16.6l.003-.493zM11.823 2.833c-.765-1.428-2.86-1.428-3.624 0l-.19.347h3.993l-.185-.347z"></path></svg>
      <div class="minicart-quantity" style="display:block">${numOfItems}</div>
    </a>
    <button id="modal-close">X</button>
    <h1>Cart - ${numOfItems} items total</h1>
    <div style="padding-top:20px;">
      ${imageElements}
    </div>
    <div class="cart-order-totals" style="border:none;">
      <h4 class="order-totals-table" style="position:absolute; right:15px; bottom: 45px;">Order Total: $${orderTotal}</h4>
    </div
  </div>
`

$('body').append(modal)
modal.appendChild(modalContent)
modal.appendChild(modalBg)
modal.setAttribute('style',modalStyle)
modalContent.setAttribute('style',modalContentStyle)
modalBg.setAttribute('style',modalBgStyle)
const closeBtn = document.querySelector('#modal-close')
closeBtn.style.cssText = 'position:absolute; right:15px; font-size: 37px;'
closeBtn.addEventListener('click',(e) => {
  modal.style.display = 'none'
})
modalBg.addEventListener('click',(e) => {
  modal.style.display = 'none'
})

window.addEventListener('scroll', function(e) {
  const bodyH = document.querySelector('body').scrollHeight
  if (window.scrollY >= bodyH*0.9 || Math.abs(bodyH - window.scrollY - window.innerHeight) <= 1) {
    console.log(`window.scrollY >= $('body').height()*0.9`)
    window.scrollY >= bodyH*0.9 ? console.log('Scrolled into bottom 10% without hitting bottom of window') : console.log('scrolled to bottom', Math.abs(bodyH - window.scrollY - window.innerHeight))
    modal.style.display = "block";
  }

});



// -----------------Tests-------------------
console.log('Cart Num', numOfItems)
console.log('orderTotal', orderTotal )
console.log('itemImages', itemImages)
console.log(imageElements)
