const booksUrl = "http://localhost:3000/books";
const bookList = document.querySelector("#list");
const showPanel = document.querySelector("#show-panel");

document.addEventListener("DOMContentLoaded", function () {
  fetch(booksUrl)
    .then((Response) => Response.json())
    .then((books) => {
      books.forEach((book) => {
        renderBookList(book);
      });
    });
});

const renderBookList = (book) => {
  const li = document.createElement("li");
  li.textContent = book.title;
  bookList.append(li);

  li.addEventListener("click", () => {
    showPanel.innerHTML = "";

    const img = document.createElement("img");
    const title = document.createElement("h4");
    const userList = document.createElement("ul");
    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
      // book.users.push(user);
      fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        contentType: "Application/json",
        body: book.users,
      });

      userList.innerHTML = "";
      book.users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = user.username;
        userList.append(li);
      });
    });

    img.src = `${book.img_url}, cover`;
    title.textContent = book.title;
    book.users.forEach((user) => {
      const li = document.createElement("li");
      li.id = "user";
      li.textContent = user.username;
      userList.append(li);
    });
    btn.textContent = "LIKE";

    showPanel.append(img, title, userList, btn);
  });
};
