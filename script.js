let userName = "Franek"

function load() {
    renderBooks()
}

function renderBooks() {
    let contentRef = document.getElementById("books");
    contentRef.innerHTML = "";

    for (let i = 0; i < books.length; i++) {
        contentRef.innerHTML += bookTemplate(i);
    }
}

function renderHeartIcon(i) {
    if (books[i].liked) {
        return "./img/heartfilled.png"
    } else {
        return "./img/heartoutline.png"
    }
}

function likeBook(i, heartImg) {
    let likesText = heartImg.previousElementSibling;

    if (books[i].liked) {
        books[i].likes--
    } else {
        books[i].likes++
    }
    books[i].liked = !books[i].liked;
    
    likesText.innerText = books[i].likes;
    heartImg.src = renderHeartIcon(i);
}

function sendComment(i) {
    let inputRef = document.getElementById(`commentinput${i}`);
    if (inputRef.value != "") {
        books[i].comments.unshift({
            "name": userName,
            "comment": inputRef.value
        })
        renderBooks();
    }
}

function getCommentsTemplate(i) {
    let htmlText = "";
    for (let x = 0; x < books[i].comments.length; x++) {
        const comment = books[i].comments[x];
        htmlText += `<div class="single_comment">
        <p>${comment.name}:</p><p> ${comment.comment} </p></div>`
    }
    if(htmlText == ""){
        return "Bisher keine Kommentare..."
    }
    return htmlText;
}