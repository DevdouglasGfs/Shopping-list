const ADD_PRODUCT_TO_BUY = document.querySelector("#add-product-cta");
let ProductsTotalPrice = 0;
const PRODUCTS = [];
const TOTAL_PRICE = document.querySelector(".total-price");
TOTAL_PRICE.textContent = ProductsTotalPrice;


ADD_PRODUCT_TO_BUY.addEventListener("click", e => {
  const PRODUCT_NAME = document.getElementById("product-name").value;
  const PRODUCT_PRICE = Number(document.getElementById("product-price").value);
  const PRODUCT_AMOUNT = Number(document.getElementById("product-amount").value);

  if (PRODUCTS.length === 0) {
    PRODUCTS.push({
      id: 1,
      name: PRODUCT_NAME,
      price: PRODUCT_PRICE,
      amount: PRODUCT_AMOUNT
    });
    ListProducts(PRODUCTS[0]);
  } else {
    const NEXT_ID = PRODUCTS.length + 1;
    PRODUCTS.push({
      id: NEXT_ID,
      name: PRODUCT_NAME,
      price: PRODUCT_PRICE,
      amount: PRODUCT_AMOUNT
    });
    ListProducts(PRODUCTS[PRODUCTS.lenght - 1]);
  }
  ProductsTotalPrice += PRODUCT_AMOUNT * PRODUCT_PRICE;
})

/**
 * product <— {id, name, price, amount} <— ADD_PRODUCT_TO_BUY()
 **/
function ListProducts(product) {
  const PRODUCTS_LIST = document.querySelector(".shopping-list__list");
  PRODUCTS_LIST.innerHTML = "";

  PRODUCTS.forEach(productOnProducts => {
    const ID = productOnProducts.id;
    const PRODUCT_FRAGMENT = document.createDocumentFragment();
    const LI = document.createElement("li");
    const PRODUCT = document.createElement("div");
    const PRODUCT_NAME = document.createElement("h2");
    const PRODUCT_DATA = document.createElement("div");
    const PRODUCT_DATA_DETAILS = document.createElement("div");
    const PRODUCT_PRICE = document.createElement("span");
    const PRODUCT_AMOUNT = document.createElement("span");
    const PRODUCT_CTAS = document.createElement("div");
    const PRODUCT_CTA_ADD = document.createElement("button");
    const PRODUCT_CTA_REMOVE = document.createElement("button");

    PRODUCT.classList.add("shopping-list__product");
    PRODUCT.setAttribute("data-product-id", ID);
    PRODUCT_NAME.textContent = `${productOnProducts.name}`;
    PRODUCT_DATA.classList.add("shopping-list__product-data");
    PRODUCT_DATA_DETAILS.classList.add("shopping-list__product-data-details")
    PRODUCT_AMOUNT.textContent = `Quantidade: ${productOnProducts.amount}`;
    PRODUCT_AMOUNT.classList.add("product-amount");
    PRODUCT_PRICE.textContent = `Preço total: ${productOnProducts.price * productOnProducts.amount}`;
    PRODUCT_PRICE.classList.add("product-price");
    PRODUCT_CTAS.classList.add("shopping-list__product-ctas");
    PRODUCT_CTA_ADD.classList.add("add-product");
    PRODUCT_CTA_ADD.type = "button";
    PRODUCT_CTA_ADD.value = "+";
    PRODUCT_CTA_ADD.textContent = "+";
    PRODUCT_CTA_ADD.addEventListener("click", AddProducts);

    if (productOnProducts.amount === 0) {
      PRODUCT_CTA_REMOVE.classList.add("remove-product");
      PRODUCT_CTA_REMOVE.type = "button";
      PRODUCT_CTA_REMOVE.value = "-";
      PRODUCT_CTA_REMOVE.textContent = "-";
      PRODUCT_CTA_ADD.onclick = "RemoveProducts";
    } else if (productOnProducts.amount > 0) {
      PRODUCT_CTA_REMOVE.classList.add("remove-product");
      PRODUCT_CTA_REMOVE.classList.add("removable");
      PRODUCT_CTA_REMOVE.type = "button";
      PRODUCT_CTA_REMOVE.value = "-";
      PRODUCT_CTA_REMOVE.textContent = "-";
      PRODUCT_CTA_ADD.onclick = "RemoveProducts";
    }

    PRODUCT_CTAS.appendChild(PRODUCT_CTA_REMOVE);
    PRODUCT_CTAS.appendChild(PRODUCT_CTA_ADD);
    PRODUCT_DATA_DETAILS.appendChild(PRODUCT_AMOUNT);
    PRODUCT_DATA_DETAILS.appendChild(PRODUCT_PRICE);
    PRODUCT_DATA.appendChild(PRODUCT_DATA_DETAILS);
    PRODUCT_DATA.appendChild(PRODUCT_CTAS);
    PRODUCT.appendChild(PRODUCT_NAME);
    PRODUCT.appendChild(PRODUCT_DATA);
    LI.appendChild(PRODUCT);

    PRODUCT_FRAGMENT.appendChild(LI);
    PRODUCTS_LIST.appendChild(PRODUCT_FRAGMENT);
  })
}
/**
 * PRODUCTS = [] (array vazio)
 * e = evento <— botão
 * product = {id, name, price, amount} <— PRODUCTS[] <— ListProducts()
 * PRODUCT_LIST = <ul>...<ul/>
 * PRODUCT_LIST_ITEMS = MapNode <— [<li>...<li/>]
 * PRODUCT = data-product-id <— PRODUCT_LIST_ITEMS[Nodes]
 **/
function AddProducts(e) {
  const PRODUCT_CTA_ADD = e.target;
  const PRODUCT_LIST = document.querySelector(".shopping-list__list");
  const PRODUCT_LIST_ITEMS = PRODUCT_LIST.childNodes;

  PRODUCT_LIST_ITEMS.forEach(item => {
    let productOnItem = item.firstChild;
    let amount = Number(productOnItem.querySelector(".product-amount").textContent.split(" ")[1]);
  
    PRODUCTS.forEach(product => {
      if (Number(productOnItem.getAttribute("data-product-id")) === product.id) {
        amount += 1;
        const NEW_PRODUCT_DATA = {
          id: product.id,
          name: product.name,
          price: product.price,
          amount: amount
        }
        UpdateElementValues(product, NEW_PRODUCT_DATA);
      }
    })
  });
}

/**
 * product = {id, name, price, amount} <— PRODUCTS[]
 * productData = {id, name, price, amount} <- {}
 * */
function UpdateElementValues(product, productData) {
  if (product && productData) {
    const { id: ID, name: NAME, price: PRICE, amount: AMOUNT } = productData;
    const PRODUCT_LIST = document.querySelector(".shopping-list__list");
    const PRODUCT_ON_LIST = PRODUCT_LIST.querySelector(`[data-product-id="${ID}"]`);

    if (product.id === Number(PRODUCT_ON_LIST.getAttribute("data-product-id"))) {
      console.log("step 1")
      console.log(product, productData)

      if (PRODUCT_LIST.contains(PRODUCT_ON_LIST)) {
        const PRODUCT_NAME = PRODUCT_ON_LIST.querySelector(".product-name");
        const PRODUCT_PRICE = PRODUCT_ON_LIST.querySelector(".product-price");
        const PRODUCT_AMOUNT = PRODUCT_ON_LIST.querySelector(".product-amount");

        if (NAME !== product.name || PRICE !== product.price || AMOUNT !== product.amount) {
          let newData = {};
          newData.id = ID;
          
          if (NAME !== product.name) {
            PRODUCT_NAME.textContent = NAME;
            newData.name = NAME;
          }
          console.log(`Nome do produto: ${product.name}`)
          if (PRICE !== product.price) {
            PRODUCT_PRICE.textContent.split(" ")[1] = PRICE;
            newData.price = PRICE;
          }
          console.log(`Preço do produto: ${product.price}`)
          if (AMOUNT !== product.amount) {
            PRODUCT_AMOUNT.textContent.split(" ")[1] = AMOUNT;
            newData.amount = AMOUNT;
          }
          console.log(`Quantidade do produto: ${product.amount}`)
          // Atualizando o objeto do produto original com os novos dados
          Object.assign(product, newData);
        }
        console.log("step 2")
        console.log(product, productData);
        return;
      }
    }
  }
}