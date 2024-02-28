const featuresItems = document.querySelector(".features_items");

const carouselInner = document.querySelector(".carousel-inner");

const blazersElement = document.querySelector("#blazers");
const tshirtElement = document.querySelector("#tshirt");
const sunglassElement = document.querySelector("#sunglass");
const kidsElement = document.querySelector("#kids");
const poloshirtElement = document.querySelector("#poloshirt");

const recommendedItemActive = document.querySelector(
  "#recommended-item-carousel .item.active"
);
const recommendedItem = document.querySelector(
  "#recommended-item-carousel .item:not(.active)"
);

var productApi = "https://65d87debc96fbb24c1bba4d8.mockapi.io/api/v1/products2";

// HÀM TRIỂN KHAI
function start() {
  getProduct((products) => {
    featuresItems.innerHTML = renderFeaturesItems(products, 1, 6);
    carouselInner.innerHTML = rendercarouselInner(products, 7, 8, 9);

    tshirtElement.innerHTML = renderTabcontent(products, 10, 13);
    blazersElement.innerHTML = renderTabcontent(products, 14, 17);
    sunglassElement.innerHTML = renderTabcontent(products, 18, 21);
    kidsElement.innerHTML = renderTabcontent(products, 22, 25);
    poloshirtElement.innerHTML = renderTabcontent(products, 26, 29);

    recommendedItemActive.innerHTML = renderRecommendedItems(products, 27, 29);
    recommendedItem.innerHTML = renderRecommendedItems(products, 30, 32);

    handleEvent(products);
  });
}

start();

// CALL API
function getProduct(callback) {
  fetch(productApi)
    .then((reponse) => reponse.json())
    .then(callback);
}

// HÀM HANDLEEVENT
function handleEvent(products) {
  document.onclick = function (e) {
    let idTarget = Number(e.target.dataset.id);
    if (idTarget) {
      e.preventDefault();
      localStorage.setItem(idTarget, JSON.stringify(products[idTarget - 1]));
      alert(
        `Sản phẩm ${JSON.stringify(
          products[idTarget - 1].name
        )} với đơn giá là ${JSON.stringify(
          products[idTarget - 1].price + "$"
        )} đã được thêm vào giỏ hàng hành công`
      );
    }
  };
}

// RENDER
function renderFeaturesItems(products, id1, id2) {
  var htmls = products.map((product, index) => {
    if (product.id >= id1 && product.id <= id2) {
      return `<div class="col-sm-4">
							<div class="product-image-wrapper">
								<div class="single-products">
										<div class="productinfo text-center">
											<img src="${product.imageUrl}" alt="" />
											<h2>${product.price}</h2>
											<p>${product.name}</p>
											<a href="#" class="btn btn-default add-to-cart" data-id = "${product.id}"><i class="fa fa-shopping-cart"></i>Add to cart</a>
										</div>
										<div class="product-overlay">
											<div class="overlay-content">
												<h2>${product.price}</h2>
												<p>${product.name}</p>
												<a href="#" class="btn btn-default add-to-cart" data-id = "${product.id}"><i class="fa fa-shopping-cart"></i>Add to cart</a>
											</div>
										</div>
								</div>
								<div class="choose">
									<ul class="nav nav-pills nav-justified">
										<li><a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
										<li><a href="#"><i class="fa fa-plus-square"></i>Add to compare</a></li>
									</ul>
								</div>
							</div>
						</div>`;
    }
  });
  htmls.unshift('<h2 class="title text-center">Features Items</h2>');
  return htmls.join("\n");
}

function rendercarouselInner(products, id1, id2, id3) {
  return `<div class="item active">
                  <div class="col-sm-6">
                    <h1><span>E</span>-SHOPPER</h1>
                    <h2>${products[id1 - 1].name}</h2>
                    <p>
                     ${products[id1 - 1].description}
                    </p>
                    <button type="button" class="btn btn-default get">
                      Get it now
                    </button>
                  </div>
                  <div class="col-sm-6">
                    <img
                      src="${products[id1 - 1].imageUrl}"
                      class="girl img-responsive"
                      alt=""
                    />
                    <img src="images/home/pricing.png" class="pricing" alt="" />
                  </div>
                </div>
                <div class="item">
                  <div class="col-sm-6">
                    <h1><span>E</span>-SHOPPER</h1>
                    <h2>${products[id2 - 1].name}</h2>
                    <p>
                      ${products[id2 - 1].description}
                    </p>
                    <button type="button" class="btn btn-default get">
                      Get it now
                    </button>
                  </div>
                  <div class="col-sm-6">
                    <img
                      src="${products[id2 - 1].imageUrl}"
                      class="girl img-responsive"
                      alt=""
                    />
                    <img src="images/home/pricing.png" class="pricing" alt="" />
                  </div>
                </div>

                <div class="item">
                  <div class="col-sm-6">
                    <h1><span>E</span>-SHOPPER</h1>
                    <h2>${products[id3 - 1].name}</h2>
                    <p>
                    ${products[id3 - 1].description}
                    </p>
                    <button type="button" class="btn btn-default get">
                      Get it now
                    </button>
                  </div>
                  <div class="col-sm-6">
                    <img
                      src="${products[id3 - 1].imageUrl}"
                      class="girl img-responsive"
                      alt=""
                    />
                    <img src="images/home/pricing.png" class="pricing" alt="" />
                  </div>
                </div>`;
}

function renderTabcontent(products, id1, id2) {
  var htmls = products.map((product, index) => {
    if (product.id >= id1 && product.id <= id2) {
      return `<div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="${product.imageUrl}" alt="" />
                          <h2>${product.price}</h2>
                          <p>${product.description}</p>
                          <a href="#" class="btn btn-default add-to-cart" data-id = "${product.id}"
                            ><i class="fa fa-shopping-cart"></i>Add to cart</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>`;
    }
  });

  return htmls.join("\n");
}

function renderRecommendedItems(products, id1, id2) {
  var htmls = products.map((product, index) => {
    if (product.id >= id1 && product.id <= id2) {
      return ` <div class="col-sm-4">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="${product.imageUrl}" alt="" />
                            <h2>${product.price}</h2>
                            <p>${product.description}</p>
                            <a href="#" class="btn btn-default add-to-cart" data-id = "${product.id}" 
                              ><i class="fa fa-shopping-cart"></i>Add to cart</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>`;
    }
  });

  return htmls.join("\n");
}
