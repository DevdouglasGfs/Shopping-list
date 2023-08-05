const ADD_PRODUCT_TO_BUY = document.querySelector("#add-product-cta");
let ProductsTotalPrice = 0;
const PRODUCTS = [];
const PRODUCTS_TOTAL_PRICE = document.querySelector(".total-price");
let biggestId = 0;

/**
 * This listener will add products on the vector PRODUCTS
 * */
ADD_PRODUCT_TO_BUY.addEventListener("click", function(e) {
  const PRODUCT_NAME = document.querySelector("#product-name").value;
  const PRODUCT_PRICE = Number(document.querySelector("#product-price").value);
  const PRODUCT_AMOUNT = Number(document.querySelector("#product-amount").value);

  const productExists = PRODUCTS.find(product => product._id === biggestId);

  if (!productExists) {
    const PRODUCT_FACTORY = new ProductFactory(biggestId, PRODUCT_NAME, PRODUCT_AMOUNT, PRODUCT_PRICE);
    const PRODUCT_BUILDED = PRODUCT_FACTORY.createProduct();
    console.log(PRODUCT_BUILDED);
    biggestId++;
    ListProducts();
  } else {
    console.log("Product exists:", productExists);
  }
})


class ProductFactory {
  constructor(id, name, amount, price) {
    this._id = id;
    this._name = name;
    this._amount = amount;
    this._price = price;
  }

  createProduct() {
    this._product = {};
    this._product.id = this._id;
    this._product.name = this._name;
    this._product.amount = this._amount;
    this._product.price = this._price;
    PRODUCTS.push(this._product);
    return this._product;
  }
  
  replaceProduct(id){
    PRODUCTS.forEach(product => {
      if(product.id === id){
        const newProduct = {};
        newProduct.name = this._name;
        newProduct.amount = this._amount;
        newProduct.price = this._price;
        
        Object.assign(product, newProduct)
      }
    })
  }

  get product() {
    return this._product;
  }
  set product(input) {
    this._product = input;
  }

  get productId() {
    return this._id;
  }
  set productId(newId) {
    this._id = newId;
  }

  get productName() {
    return this._product.name;
  }
  set productName(name) {
    this._product.name = name;
  }

  get productAmount() {
    return this._product.amount;
  }
  set productAmount(amount) {
    this._product.amount = amount;
  }

  get productPrice() {
    return this._product.price;
  }
  set productPrice(price) {
    this._product.price = price;
  }
}

function ListProducts() {
  const PRODUCTS_LIST = document.querySelector(".shopping-list__list");
  PRODUCTS_LIST.innerHTML = "";

  PRODUCTS.forEach(product => {
    const ID = product.id;
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
    const TOTAL_PRICE = product.amount * product.price;
    ProductsTotalPrice += TOTAL_PRICE;
    PRODUCTS_TOTAL_PRICE.textContent = ProductsTotalPrice;

    PRODUCT.classList.add("shopping-list__product");
    PRODUCT.setAttribute("data-product-id", ID);
    PRODUCT_NAME.textContent = `${product.name}`;
    PRODUCT_DATA.classList.add("shopping-list__product-data");
    PRODUCT_DATA_DETAILS.classList.add("shopping-list__product-data-details")
    PRODUCT_AMOUNT.textContent = `Quantidade: ${product.amount}`;
    PRODUCT_AMOUNT.classList.add("product-amount");
    PRODUCT_PRICE.textContent = `Preço total: ${ TOTAL_PRICE }`;
    PRODUCT_PRICE.classList.add("product-price");
    PRODUCT_CTAS.classList.add("shopping-list__product-ctas");
    PRODUCT_CTA_ADD.classList.add("add-product");
    PRODUCT_CTA_ADD.type = "button";
    PRODUCT_CTA_ADD.value = "+";
    PRODUCT_CTA_ADD.textContent = "+";
    PRODUCT_CTA_ADD.addEventListener("click", AddProducts);
    PRODUCT_CTA_ADD.setAttribute("data-parent-id", ID)

    if (product.amount === 0) {
      PRODUCT_CTA_REMOVE.classList.add("remove-product");
      PRODUCT_CTA_REMOVE.type = "button";
      PRODUCT_CTA_REMOVE.value = "-";
      PRODUCT_CTA_REMOVE.textContent = "-";
      PRODUCT_CTA_ADD.setAttribute("data-parent-id", ID)
      PRODUCT_CTA_ADD.onclick = "RemoveProducts";
    } else if (product.amount > 0) {
      PRODUCT_CTA_REMOVE.classList.add("remove-product");
      PRODUCT_CTA_REMOVE.classList.add("removable");
      PRODUCT_CTA_REMOVE.type = "button";
      PRODUCT_CTA_REMOVE.value = "-";
      PRODUCT_CTA_REMOVE.textContent = "-";
      PRODUCT_CTA_ADD.setAttribute("data-parent-id", ID)
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

function AddProducts(e) {
  const PRODUCT = e.currentTarget;
  const PRODUCT_ID = Number(PRODUCT.getAttribute("data-parent-id"));
  const PRODUCTS_LIST = document.querySelector(".shopping-list__list");
  const PRODUCT_ON_LIST = PRODUCTS_LIST.querySelector(`[data-product-id="${PRODUCT_ID}"]`);
  
  PRODUCTS.forEach(product =>{
    if(product.id === PRODUCT_ID){
      const PRODUCT_NAME = PRODUCT_ON_LIST.querySelector(".product-name");
      let productPriceText = PRODUCT_ON_LIST.querySelector(".product-price").textContent;
      let productPrice = Number(productPriceText.split(" ")[2]);
      let productAmountText = PRODUCT_ON_LIST.querySelector(".product-amount").textContent;
      let productAmount = Number(productAmountText.split(" ")[1]);
      
      const TOTAL_PRICE = productPrice * productAmount; 
      console.log(productAmount, productPrice)
      product.amount = productAmount++;
      product.price = TOTAL_PRICE;
      
      /*const PRODUCT_FACTORY = new ProductFactory(PRODUCT_ID, PRODUCT_NAME, productAmount, productPrice);*/
      ListProducts();
    }
  })
}