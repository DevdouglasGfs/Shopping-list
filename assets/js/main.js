const ADD_PRODUCT_TO_BUY = document.querySelector("#add-product-cta");
let PRODUCTS = [];


ADD_PRODUCT_TO_BUY.addEventListener("click", async e => {
  const PRODUCT_NAME = document.getElementById("product-name").value;
  const PRODUCT_PRICE = document.getElementById("product-price").value;
  const PRODUCT_AMOUNT = document.getElementById("product-amount").value;

  const PRODUCT = {
    name: PRODUCT_NAME,
    price: PRODUCT_PRICE,
    amount: PRODUCT_AMOUNT
  }

  for (let i = 0; i < PRODUCTS.length || i === PRODUCTS.length; i++) {
    if (PRODUCTS.length === 0) {
      PRODUCTS[0] = PRODUCT;
      PRODUCTS[0].id = 1;
      console.log(PRODUCTS[0])
    } else {
      PRODUCTS[i] = {};
      PRODUCTS[i].id = i;
      console.log(PRODUCTS[i].id)
      PRODUCTS[i].name = PRODUCT_NAME;
      PRODUCTS[i].price = PRODUCT_PRICE;
      PRODUCTS[i].amount = PRODUCT_AMOUNT;
      console.log(PRODUCTS[i])
    }
  }
})

PRODUCTS.forEach(product => {
  const PRODUCT_FRAGMENT = document.createDocumentFragment();
  const PRODUCT = document.createElement("div");
  const PRODUCT_NAME = document.createElement("h2");
  const PRODUCT_DATA = document.createElement("div");
  const PRODUCT_AMOUNT = document.createElement("p");
  const PRODUCT_CTAS = document.createElement("div");
  const PRODUCT_CTA_ADD = document.createElement("input");
  const PRODUCT_CTA_REMOVE = document.createElement("input");
  
  
  CONTAINER.classList.add("shopping-list__product");
  PRODUCT_NAME.textContent = `${product.id}`;
  PRODUCT_DATA.classList.add("shopping-list__product-data");
  PRODUCT_AMOUNT.innerHTML= `Quantidade <span class='product-amount'>${product.amount}</span>`;
  PRODUCT_CTAS.classList.add("shopping-list__product-ctas");
  PRODUCT_CTA_ADD.classList.add("add-product");
  PRODUCT_CTA_ADD.type = "button";
  PRODUCT_CTA_ADD.value = "+";
  PRODUCT_CTA_REMOVE.classList.add("remove-product");
  PRODUCT_CTA_REMOVE.type = "button";
  PRODUCT_CTA_REMOVE.value = "-";
  
  PRODUCT_CTAS.appendChild(PRODUCT_CTA_REMOVE).appendChild(PRODUCT_CTA_ADD);
  PRODUCT_DATA.appendChild(PRODUCT_AMOUNT).appendChild(PRODUCT_CTAS);
  PRODUCT.appendChild(PRODUCT_NAME).appendChild(PRODUCT_DATA);
  
  PRODUCT_FRAGMENT.appendChild(PRODUCT);
})


/*
<div class="shopping-list__product">
              <h2>Produto 1</h2>
              <div class="shopping-list__product-data">
                <p class="shopping-list__product-amount">Quantidade: <span class="product-amount">0</span></p>
                <div class="shopping-list__product-ctas">
                  <input type="button" class="add-product" value="+" />
                  <input type="button" class="remove-product" value="-" />
                </div>
              </div>
            </div>



function checkTypeOfValue(value, type) {
  if (typeof value == type) {
    return value;
  } else {
    return "Error of type";
  }
}
*/
/*
function getID() {
  for (let i = 2; i < PRODUCTS.length || i == PRODUCTS.length; i++) {
    return i;
  }
}
*/