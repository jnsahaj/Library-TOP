function Book(name, author, isRead) {
    this.name = name;
    this.author = author;
    this.isRead = isRead;
}

function addBookToLibrary(name, author, isRead) {
    let newBook = new Book();
    newBook.name = name;
    newBook.author = author
    newBook.isRead = isRead;
    myLibrary.push(newBook);
}

function updateTable() {
    table.innerHTML = '';
    let i = 0;

    myLibrary.forEach(book => {
        const tr = document.createElement('tr');
        tr.classList.add(`${i++}`);
        
        tr.appendChild(addData(document.createElement('div'), book.name));
        tr.appendChild(addData(document.createElement('div'), book.author));
        tr.appendChild(addData(document.createElement('div'), book.isRead ? "\uD83D\uDDF8" : "\u2716", 'read-btn'));
        tr.appendChild(addData(document.createElement('div'), "\uD83D\uDDD1", 'delete-btn'));

        table.appendChild(tr);
    })
    deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => btn.addEventListener('click', deleteEntry));
    readButtons = document.querySelectorAll('.read-btn');
    readButtons.forEach(btn => btn.addEventListener('click', toggleRead));
}

function addData(element, text = '', className = '') {
    const td = document.createElement('td');
    if (className) element.classList.add(className);
    if (text) element.textContent = text;
    td.appendChild(element);
    return td;
}

function showModal() {
    modal.classList.add('active');
}

function clearModal() {
    modal.classList.remove('active');
    newBookInputs[0].value = '';
    newBookInputs[1].value = '';
    newBookInputs[2].checked = false;
}

function createNewEntry() {
    addBookToLibrary(newBookInputs[0].value, newBookInputs[1].value, newBookInputs[2].checked);
    updateTable();
    clearModal();
}

function deleteEntry() {
    let index = (this.parentNode.parentNode.classList.value);
    myLibrary.splice(index, 1);
    updateTable();
}

function toggleRead() {
    let index = (this.parentNode.parentNode.classList.value);
    myLibrary[index].isRead = !myLibrary[index].isRead;
    updateTable();
}

let myLibrary = []

let table = document.querySelector('tbody');
const modal = document.querySelector('.modal-active');
const addButton = document.querySelector('.add-button');
const cancelButton = document.querySelector('.cancel-btn');
const okButton = document.querySelector('.ok-btn');
const newBookInputs = document.querySelectorAll('.input');
let deleteButtons = document.querySelectorAll('.delete-btn');
let readButtons = document.querySelectorAll('.read-btn');

addButton.addEventListener('click', showModal);
okButton.addEventListener('click', createNewEntry);
cancelButton.addEventListener('click', clearModal);

