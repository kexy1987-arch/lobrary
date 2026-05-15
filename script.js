const addBtn = document.getElementById("add-btn");
const formContainer = document.getElementById("form-container");
const booksContainer = document.getElementById("books-container");
const addToLibrary = document.querySelector('button[type="submit"]');
const authorInput = document.getElementById("author-input");
const titleInput = document.getElementById("title-input");
const pagesInput = document.getElementById("pages-input");
const imgInput = document.getElementById("img-input");
const readInput = document.getElementById("read-input");
const bookSelect = document.getElementById("book-select");


const myLibrary = [
    new Book("A J.K. Rowling", "f Harry Potter And The Philosopher's Stone",   309, false, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTuD2QwMyE53IwNG70rMpQepQrHt8gTzecuddmHo6C8o5OlxXlAGr9t77gzSW4vZW9NWCC6jDeE67x8J8fJ4SPH8dCMX1__Rpr3XJA4IKHizHhg_mKGD3p-&usqp=CAc"),
    new Book("C J.K. Rowling", "k Harry Potter And The Chamber of Secrets", 341, true, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTsFOL5D4d3z9EVcVpUjmhjhu2As2Ufe0Dh8GgOj1wiga0mfNx_TWV221trzdJ13SacolgsltSRBHy4QGv64M_AcgSChtCY9lgAQNfLLSo6_AoxL-x4lZlW&usqp=CAc"),
    new Book("z J.K. Rowling", "z Harry Potter And The Prisoner of Azkaban", 435, false, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTjzbMCXmCPGnUNnF2t6OgYPp33XmHRSxoOoCnkq7Maipk00NpN1vEOaPp3l2YH3ySp7JyLsmdZjoHV-czYxLBD5Olot-vc-uca4eTvOKLm&usqp=CAc"),
    new Book("J.K. Rowling", "a Harry Potter And The Goblet of Fire", 734, true, "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRPfKjyqwmvk61_JAP2v4gp_yaF8P-FKr8xw84Duq3OqIxe8OMg5AmQSqDj6UffKW39ws58_TiKfc9V99vyvuAH7E5c8fyobacPsJBTdETo&usqp=CAc"),
    new Book("b J.K. Rowling", "c Harry Potter And The Order of Phoenix", 870, true, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSlVRc6_5Ska9kP5bZEz6EU-5wtMFAWxcKdPM2Hy5J1whSwqYEaxiA8WGGFEoBuBfoQyQuNVZWRb9UoizTqBZBlDCSiUipVaZyCTqxpevs&usqp=CAc"),
    new Book("J.K. Rowling", "b Harry Potter And The Half-Blood Prince", 652, false, "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSITSdV_QQnqM-jKb_gso9zBzfd5XzD6eQy_zXmASHtkr9RtkdP7XqSJF5h9YM8UNd17asw4sASFTwGtc923SlI2ihoWvYHp9f7nvaHkkLSautQdeIYBELH&usqp=CAc"),
    new Book("e J.K. Rowling", "d Harry Potter And The Deathly Hallows", 759, true, "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRa6eR_AgaSZDKunq5PKds6QnXzFtuZ_1hnmxts44zDG36LSCh5dYKMGgGhjrLv4aelrEB3m9dEQVKONU_EVjyYJYtJIRBGe2pw8aeJ_qeU&usqp=CAc"),
];

createBooks(myLibrary);

bookSelect.addEventListener("change", (e) =>{
    sort(e)
})

addToLibrary.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary();
    toggleSide();
    createBooks(myLibrary);
})

addBtn.addEventListener("click", () => {
    toggleSide()
})

function toggleSide(){
    formContainer.classList.toggle("show");
    if (addBtn.textContent === "New Book") {
        addBtn.textContent = "X";
    } else {
        addBtn.textContent = "New Book";
    }
}

function Book(author, title, pages, read = false, img){
    if(img === ""){
        img = "./cover.jpeg"
    }
    return {
        id: crypto.randomUUID(),
        author,
        img,
        title,
        pages,
        read
    }
}

function addBookToLibrary(){
    myLibrary.unshift(new Book(
        authorInput.value,
        titleInput.value,
        pagesInput.value,
        readInput.checked,
        imgInput.value
    ))
    console.log(myLibrary)
}

function createBooks(library){
    booksContainer.innerHTML = "";
    library.forEach((bookObj, index) => {
        const book = document.createElement("div");
        book.classList.add("card", "shadow");
        book.innerHTML = `
            <h2>${bookObj.title}</h2>
            <img class="card-img" src="${bookObj.img}" alt="${bookObj.title}"
            <p>Author: ${bookObj.author}</p>
            <span>Pages: ${bookObj.pages}</span>
            <div>
                <button class="read-btn shadow" type="button" id="${index}">Read: ${bookObj.read ? "✔" : "✘"}</button>
                <button class="delete-btn shadow" type="button" id="${bookObj.id}">Delete</button>
            </div>`
        booksContainer.appendChild(book)
    });

    attachDeleteEvent();
}

function sort(e) {
    const selected = e.target.value.toLowerCase();

    if (selected === "title") {
        myLibrary.sort((a, b) => a.title.localeCompare(b.title));
        createBooks(myLibrary);
        return;
    } else if (selected === "author") {
        myLibrary.sort((a, b) => a.author.localeCompare(b.author));
        createBooks(myLibrary);
        return;
    } else if (selected === "page") {
        myLibrary.sort((a, b) => a.pages - b.pages)
        createBooks(myLibrary);
        return;
    } else if (selected === "read") {
        myLibrary.sort((a, b) => Number(b.read) - Number(a.read));
        createBooks(myLibrary);
        return;
    } else if (selected === "not read") {
        myLibrary.sort((a, b) => Number(a.read) - Number(b.read));
        createBooks(myLibrary);
        return;
    } else {
        createBooks(myLibrary);
    }
}

const deleteBtn = document.querySelectorAll(".delete-btn");

deleteBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        deleteBook(e.target.id)
    });
})

function deleteBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    myLibrary.splice(index, 1);
    createBooks(myLibrary);
}

function attachDeleteEvent(){
    const deleteBtn = document.querySelectorAll(".delete-btn");

    deleteBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            deleteBook(e.target.id)
        });
    })
}

const readBtn = document.querySelectorAll(".read-btn");

booksContainer.addEventListener("click", e => {
    if (e.target.classList.contains("read-btn")) {
        read(e.target.id);
    }
});

function read(id){
    myLibrary[id].read = !myLibrary[id].read;
    createBooks(myLibrary);
    console.log(myLibrary[id].read)
}

