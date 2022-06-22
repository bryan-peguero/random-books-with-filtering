const bookList = document.querySelector('#bookList');
const inputText = document.querySelector('#inputText');
const optionsList = document.querySelector('#options');

let books = [];

window.addEventListener('DOMContentLoaded', async() => {
  bookList.innerHTML = '<em>L o a d i n g</em>';

  const data = await loadBooks();
  books = data.data;
  console.log(data.data);
  renderBooks(data.data);
})


async function loadBooks() {
  const res = await fetch('https://fakerapi.it/api/v1/books?_quantity=100');

  return await res.json();
}


inputText.addEventListener('keyup', e => {
  let newBooks = [];

  optionsList.value === 'title' ? newBooks = books.filter(book => book.title.toLowerCase().includes(inputText.value))
  : optionsList.value === 'genre' ? newBooks = books.filter(book => book.genre.toLowerCase().includes(inputText.value))
  : newBooks = books.filter(book => book.author.toLowerCase().includes(inputText.value));

   
  renderBooks(newBooks);
})

const createBooksItems = books => books.map(e => `<li> 
<div class="card my-5">
<div class="card-header">
  ${e.title}
</div>
<div class="card-body">
  <blockquote class="blockquote mb-0">
    <p>${e.description}</p>
    <footer class="blockquote-footer">${e.author}</footer>
  </blockquote>
</div>
</div></li>`).join(' ');

function renderBooks(books) {
  const itemBooks = createBooksItems(books);
  bookList.innerHTML = itemBooks;
}

