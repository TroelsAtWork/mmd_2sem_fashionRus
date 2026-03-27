("use strict");
const params = new URLSearchParams(window.location.search);
let category = params.get("category") || "Apparel";
// if (category === null) {
//   category = "Apparel";
// }
console.log("category", category);
let theData;
document.querySelector(".asc").addEventListener("click", klikSorter);
document.querySelector(".desc").addEventListener("click", klikSorter);

function klikSorter(evt) {
  console.log("KLIK SORTER EVT", evt.target.dataset.direction);
  console.log("theData", theData);
  if (evt.target.dataset.direction === "desc") {
    theData.sort(function (a, b) {
      return b.realPrice - a.realPrice;
    });
  }
  if (evt.target.dataset.direction === "asc") {
    theData.sort(function (a, b) {
      return a.realPrice - b.realPrice;
    });
  }
  showProducts(theData);
}

const productContainer = document.querySelector("main");
fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}&limit=50`)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      if (product.discount) {
        product.realPrice = Math.ceil(product.price - (product.price / 100) * product.discount);
      } else {
        product.realPrice = product.price;
      }
    });

    theData = data;
    // data.sort(function (a, b) {
    //   return a.price - b.price;
    // });
    showProducts(theData);
  });

function showProducts(productsArr) {
  // console.log("productsArr", productsArr);
  productContainer.innerHTML = "";
  productsArr.forEach((product) => {
    productContainer.innerHTML += `<article class="smallProduct${product.soldout ? " soldOut" : ""} ${product.discount ? "discounted" : ""}">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="product image" />
        <p class="soldoutTxt color_me_black_and_red">SOLD OUT</p>
        <h3>Blue T20 Indian Cricket Jersey</h3>
        <p class="subtle">${product.articletype} | ${product.brandname}</p>
        <p class="price">DKK <span>${product.price}</span>,-</p>
        <div class="discounted_element">
          <p>Now DKK <span>${Math.ceil(product.price - (product.price / 100) * product.discount)}</span>,-</p>
          <p class="color_me_red"><span>${product.discount}</span>%</p>
        </div>        
        <a href="product.html?id=${product.id}"}>Read More</a>
      </article>`;
  });
}
