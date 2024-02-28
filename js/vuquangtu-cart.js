const tBodyElement = document.querySelector("tbody");
const totalArea = document.querySelector(".total_area ul");

let carProductArr;

function start() {
  getArrStorage();

  renderCartProducts();

  calculationPrice();

  handleEvent();

  totalOverPrice();
}

start();

function getArrStorage() {
  carProductArr = Object.keys(localStorage).map((key) => {
    return JSON.parse(localStorage[key]);
  });
}

function renderCartProducts() {
  var htmls = carProductArr.map((cartProduct) => {
    return `<tr id="tr${cartProduct.id}">
                <td class="cart_product">
                  <a href=""><img src="${cartProduct.imageUrl}" alt="" /></a>
                </td>
                <td class="cart_description">
                  <h4><a href="">${cartProduct.name}</a></h4>
                  <p>Web ID: ${cartProduct.id}</p>
                </td>
                <td class="cart_price">
                  <p>${cartProduct.price}</p>
                </td>
                <td class="cart_quantity">
                  <div class="cart_quantity_button">
                    <a data-id = ${cartProduct.id} class="cart_quantity_up" href="" > + </a>
                    <input
                      class="cart_quantity_input"
                      id = "cart_quantity_input${cartProduct.id}"
                      type="text"
                      name="quantity"
                      value="1"
                      autocomplete="off"
                      size="2"
                    />
                    <a class="cart_quantity_down" data-id = ${cartProduct.id}   href=""> - </a>
                  </div>
                </td>
                <td class="cart_total">
                  <p id = "cart_total_price${cartProduct.id}" class="cart_total_price">total</p>
                </td>
                <td class="cart_delete" >
                  <a class="cart_quantity_delete"  href=""
                    ><i class="fa fa-times" data-id=${cartProduct.id}></i
                  ></a>
                </td>
              </tr>`;
  });

  tBodyElement.innerHTML = htmls.join("\n");
}

function calculationPrice() {
  carProductArr.map((cartProduct) => {
    var inputQuantity = document.querySelector(
      `#cart_quantity_input${cartProduct.id}`
    );
    var totalPrice = document.querySelector(
      `#cart_total_price${cartProduct.id}`
    );

    totalPrice.innerText = inputQuantity.value * cartProduct.price + "$";
  });
}

function handleEvent() {
  document.onclick = function (e) {
    var element = e.target;

    if (element.classList.contains("fa-times")) {
      e.preventDefault();

      localStorage.removeItem(element.dataset.id);
      var trElement = document.querySelector(`#tr${element.dataset.id}`);

      trElement.remove();

      getArrStorage();

      calculationPrice();
      totalOverPrice();
    }

    if (element.classList.contains("cart_quantity_up")) {
      e.preventDefault();
      element.parentElement.querySelector("input").value++;
      calculationPrice();
      totalOverPrice();
    }

    if (element.classList.contains("cart_quantity_down")) {
      e.preventDefault();
      element.parentElement.querySelector("input").value--;
      if (element.parentElement.querySelector("input").value <= 0) {
        // element.parentElement.querySelector("input").value = 0;

        localStorage.removeItem(element.dataset.id);
        var trElement = document.querySelector(`#tr${element.dataset.id}`);

        trElement.remove();

        getArrStorage();

        calculationPrice();
        totalOverPrice();
      }
      calculationPrice();
      totalOverPrice();
    }
  };
}

function totalOverPrice() {
  var total = carProductArr.reduce(function (value, cartProduct) {
    var totalPrice = document.querySelector(
      `#cart_total_price${cartProduct.id}`
    );

    value = value + Number(totalPrice.innerText.split("$")[0]);
    return value;
  }, 0);
  var htmls = `<li>Cart Sub Total <span>${total}$</span></li>
                <li>Eco Tax <span>${(total * 2) / 100}$</span></li>
                <li>Shipping Cost <span>Free</span></li>
                <li>Total <span>${(total * 102) / 100}$</span></li>`;

  totalArea.innerHTML = htmls;
}
