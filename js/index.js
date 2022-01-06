var books = []
var carts = []
var genres = ['All', 'Action', 'Adventure', 'Fantasy', 'Comedy', 'Children', 'Crime', 'Drame', 'Documentary', 'Horror', 'Musical', 'Romance', 'Sci-Fi', 'Thriller', 'War']
// get all books list
async function getBooks() {
  document.getElementById('loader').style.display = 'flex'
  await fetch('https://book-set-task.herokuapp.com/api/list_books').then(res => res.json()).then(data => {
    data.forEach(book => books.push(book))
  }).catch(e => console.log('Error ', e))
  document.getElementById('loader').style.display = 'none'
}
// cart items
function cartItems() {
  document.getElementById('cartItems').innerHTML = ''
  carts.forEach((cart, index) => {
    let child = `<div class="cart__item">
      <button id="remove" onclick='remove(${index})'><i class="fa fa-close" aria-hidden="true"></i></button>
      <img src="${cart.image}" alt="${cart.name}">
      <div class="cart__content">
        <div class="cart__book__title">${cart.name}</div>
        <div class="cart__increase">
          <div class="price">Rs.${convertCurrency(cart.price)}</div>
          <div class="increase">
            <button onclick='increase(-1, ${cart})'><i class="fa fa-minus" aria-hidden="true"></i></button>
            <div>${cart.cart}</div>
            <button onclick='increase(1, ${cart})'><i class="fa fa-plus" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
    </div>`;
    document.getElementById('cartItems').innerHTML += child
  })
}
// add to cart
function addToCart (book) {
  if(carts.length < 5) {
    let x = carts.findIndex(c => c.id === book.id)
    if(x === -1) {
      carts.push({ id: book.id, cart: 1, stock: book.stock, name: book.name, image: book.image, price: book.price })
      cartItems()
    } else alert('You already have added this book to cart!')
  } else alert('You only can add upto 5 books to cart!')
}

// remove from cart
var remove = (i) => {
  carts.splice(i, 1)
  cartItems()
}

// increase decrease cart value
var increase = (val, cart) => {
  if(val === 1) {
    if(cart.cart < cart.stock) cart.cart += 1
    else alert('You can\'n add more than stock!')
  } else {
    if(cart.cart > 1) cart.cart -= 1
    else alert('Cart value can\'n be less than 1!')
  }
  cartItems()
} 

window.addEventListener('load', async ()=> {
  await getBooks()
  document.querySelector('.category').innerHTML = `
    <select onchange="filterByGenre(this.value)">
      ${ genres.map(g => `<option>${g}</option>`).join('') }
    </select>`
  books.forEach(book => document.querySelector('.books').innerHTML += bookCard(book));
})

// filter by genre
var filterByGenre = (val) => {
  if(val === 'All') books.forEach(book => document.querySelector('.books').innerHTML += bookCard(book))
  else {
    document.querySelector('.books').innerHTML = '';
    books.filter(x => x.genre.includes(val)).forEach(book => document.querySelector('.books').innerHTML += bookCard(book))
  }
}

// book card
function bookCard(book) {
  let gd = '';
  book.genre.split('|').forEach(g => gd += `<div>${g}</div>`)
  return `<div class="book">
    <div class="book__img">
      <button onclick='addToCart(${JSON.stringify(book)})'>
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
      </button>
      <div class="stock">${book.stock} Left</div>
      <img src="${book.image}" >
    </div>
    <div class="book__content">
      <div class="genre">${gd}</div>
      <div class="book__title">
        <span>${book.name}</span>
        <span>Rs.${convertCurrency(book.price)}</span>
      </div>
      <p>Author:- ${book.author}</p>
      <p>Date:- ${convertDate(book.published_date)}</p>  
    </div>
  </div>`;
}

// show & close cart
let cartContainer = document.getElementById('cart__container')
document.getElementById('cart__btn').addEventListener('click', () => cartContainer.style.transform = 'translateX(0%)')
document.getElementById('close__cart').addEventListener('click', () => cartContainer.style.transform = 'translateX(100%)')

// convert date
function convertDate(date) {
  return date.split('/').reverse().join('-')
}
// convert currentcy
function convertCurrency(dollar) {
  return (parseFloat(dollar.slice(1, dollar.length))* 120).toFixed(2)
}
