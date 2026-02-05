function bookTemplate(i) {
    let book = books[i]
    return `
    <article class="books">
    <h2 tabindex="0">${book.name}</h2>
            <div class="blueline"></div>
            <div>
                <img class="bookimage" src="./img/a-book-1699641_1280.png" alt="Book Image">
            </div>
            <div class="blueline"></div>
            <div class="description">
                <div class="priceandlikes">
                    <p tabindex="0" class="price">${book.price} €</p>
                    <div class="likes">
                        <p>${book.likes}</p>
                        <img tabindex="0" onclick="likeBook(${i}, this)" class="heartimage" src="${renderHeartIcon(i)}" alt="Heart Icon">
                    </div>
                </div>
                <table>
                    <tr>
                        <td>Author</td>
                        <td>: ${book.author}</td>
                    </tr>
                    <tr>
                        <td>Erscheinungsjahr</td>
                        <td>: *${book.publishedYear}*</td>
                    </tr>
                    <tr>
                        <td>Genre</td>
                        <td>: *${book.genre}*</td>
                    </tr>
                </table>
            </div>
            <div class="blueline"></div>
            <div class="comments">
            <div class="seconddiv">
                <h3>Kommentare:</h3>
                <div class="comments_box">
                    ${getCommentsTemplate(i)}
                </div></div>
                <div class="commentinput">
                <input id="commentinput${i}" type="text" placeholder="Schreibe deinen Kommentar ..." required>
                    <img tabindex="0" onclick="sendComment(${i})" class="sendicon" src="./img/paper-plane-icon.png"
                        alt="send comment icon">
                </div>
            </div>
            </article>`
}