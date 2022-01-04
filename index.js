var books = []
function getBooks() {
  fetch('https://book-set-task.herokuapp.com/api/list_books').then(res => {
    if(!res.ok) {
      throw Error('ERROR')
    }
    return res.json()
  }).then(data => {
    let bookDiv = '';  
    data.forEach(book => {
      console.log(book)  
      let child = `<div class="book">
        <div class="book__img"><img src="${book.image}" ></div>
        <div class="book__content">
          <h2>${book.name}</h2>
          <p>${book.published_date}</p>  
        </div>
      </div>`;
      bookDiv += child;
    });
    let booksContainer = document.querySelector('.books');
    booksContainer.innerHTML = bookDiv;
  }).catch(e => console.log('Error ', e))
}
getBooks()
document.getElementById('cart__btn').addEventListener('click', () => {
  let x = document.getElementById('cart__container')
  x.style.transform = 'translateX(0%)'
})