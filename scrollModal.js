const numOfItems = 5
const orderTotal = 298.38
const itemImages = ['./bag.jpg','./blue.jpg','./green.jpg']
console.log('hello js')
//hardcoded^

const imageElements = ""
// itemImages.forEach(path => imageElements += `<img src="${path}" >`)

const body = document.querySelector('body')
body.style.height = '5000px'

const modalBg = document.createElement('div')
const modalBgStyle = `
  position: relative;
  background: rgba(0, 0, 0, 0.92);
  width:100vw;
  height:100vh;
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
  display: block;
`
const modalContent = document.createElement('div')
const modalContentStyle = `
  box-sizing: border-box;
  position: absolute;
  padding: 15px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(255, 255, 255, 0.5);
  color: black;
`
modalContent.innerHTML = `
  <button id="modal-close">X</button>
  <h1>Cart - ${numOfItems} items</h1>
  <div style="color:white">
    ${itemImages.map(path => `<img src=${path}>`)}
  </div>
  <h4 style="position:absolute; right:15px;">Order Total: $${orderTotal}</h4>
`
// ${itemImages.forEach(path => {console.log(`<img src=${path}>`); return `<img src=${path}>`})}

body.appendChild(modal)
modal.appendChild(modalContent)
modal.appendChild(modalBg)
modal.setAttribute('style',modalStyle)
modalContent.setAttribute('style',modalContentStyle)
modalBg.setAttribute('style',modalBgStyle)
// body.querySelector('#modal-close').style.cssText = 'position="absolute";'
body.querySelector('#modal-close').style.cssText = 'position:absolute; right:15px;'

window.addEventListener('scroll', function(e) {
  const bodyH = document.querySelector('body').scrollHeight
  if (window.scrollY >= bodyH*0.9 || bodyH - window.scrollY <= window.innerHeight ) {
    console.log(`window.scrollY >= $('body').height()*0.9`)
    window.scrollY >= bodyH*0.9 ? console.log('Scrolled into bottom 10% without hitting bottom of window') : console.log('scrolled to bottom')
    // modal.style.display = "block";
  }

});
