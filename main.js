const bookList = document.querySelector('#bookList');
const inputText = document.querySelector('#inputText');

let books = [];

window.addEventListener('DOMContentLoaded', async() => {
  bookList.innerHTML = 'L o a d i n g';

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
  const newBooks = books.filter(book => book.title.toLowerCase().includes(inputText.value) || book.author.toLowerCase().includes(inputText.value));
  renderBooks(newBooks);
})

const createBooksItems = books => books.map(e => `<li> <h1>${e.title}</h1> <p>${e.description}</p></li>`).join(' ');

function renderBooks(books) {
  const itemBooks = createBooksItems(books);
  bookList.innerHTML = itemBooks;
}

