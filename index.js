var books = []
// get all books list
function getBooks() {
  fetch('https://book-set-task.herokuapp.com/api/list_books').then(res => {
    if(!res.ok) {
      throw Error('ERROR')
    }
    return res.json()
  }).then(data => {
    let bookDiv = '';  
    data.forEach(book => {
      let gd = '';
      book.genre.split('|').forEach(g => gd += `<div>${g}</div>`)
      let child = `<div class="book">
        <div class="book__img">
          <button>
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
          </button>
          <div class="stock">${book.stock} Left</div>
          <img src="${book.image}" >
        </div>
        <div class="book__content">
          <div class="genre">${gd}</div>
          <div class="book__title">
            <span>${book.name}</span>
            <span>${book.price}</span>
          </div>
          <p>Author:- ${book.author}</p>
          <p>Date:- ${convertDate(book.published_date)}</p>  
        </div>
      </div>`;
      bookDiv += child;
    });
    let booksContainer = document.querySelector('.books');
    booksContainer.innerHTML = bookDiv;
  }).catch(e => console.log('Error ', e))
}
getBooks()
// show cart
document.getElementById('cart__btn').addEventListener('click', () => {
  let x = document.getElementById('cart__container')
  x.style.transform = 'translateX(0%)'
})
// convert date
function convertDate(date) {
  return date.split('/').reverse().join('-')
}