const d = document;
const closeBtns = d.querySelectorAll("[data-close]");
const bg = d.querySelectorAll("[data-bg]");
const menu = d.querySelector("[data-menu]");
const cart = d.getElementById("cart");
const cartComponent = d.getElementById("cart-component");
const cartcontent = d.getElementById("cart-content");
const addCartBtn = d.getElementById("add-cart");
const thumbnails = [undefined, true, true, true, true];
const image = d.getElementById("image-shop");
const btnImage = d.querySelectorAll("[data-image]");
const imageThumb = [...d.getElementById("img-t").children];

let nextLight;
let previousLight 
let imgLight ;
let lightBoxImg ;
let lightBtns ;
let closeLight ;

let imageSelected = 0;
let imageView = 1;
let shopCart = localStorage.getItem("cart") ?? 0;
let shopCounters = d.querySelectorAll("[data-shop]");
let count = parseInt(d.getElementById("count").innerHTML);
let countElement = d.getElementById("count");
let imageLightView = 0;



image.onclick = () => {
  let lightBox = document.createElement("div");
  lightBox.innerHTML = lightBoxComponent();
  lightBox.id = "lightboxcomponent";
  document
    .querySelector("body")
    .insertBefore(lightBox, d.querySelector("header"));
    restoreLightClick();
};

imageThumb.forEach((img, i) => {
  img.onclick = () => {
    selectImage(i);
  };
});

btnImage.forEach((btn) => {
  btn.onclick = () => {
    changeImage(btn);
  };
});

addCartBtn.onclick = () => {
  addtocart();
};

shopCounters.forEach((shopCount) => {
  shopCount.onclick = () => {
    countShop(shopCount);
  };
});

closeBtns.forEach((btn) => {
  btn.onclick = () => {
    menu.classList.toggle("hide-menu");
    bg.forEach((e) => e.classList.toggle("invisible"));
  };
});

cart.onclick = () => {
  cartComponent.classList.toggle("hide-cart");
  cartComponent.classList.toggle("cart-pop");
};

function setLightImg(e, i) {
  imgLight.forEach((e) => e.classList.remove("light-sel"));
  e.classList.add("light-sel");
  lightBoxImg.src = "./images/image-product-" + (i + 1) + ".jpg";
  imageLightView = i;
}
function countShop(e) {
  if ((e.id == "minus") & (count > 0)) {
    count = count - 1;
  }

  if (e.id == "add") {
    count = count + 1;
  }

  countElement.innerHTML = count;
}

function detectEmpty(shop) {
  if (!shop) {
    d.getElementById("shop-counter").classList.add("hidden");
    cartcontent.innerHTML = `
            <div class="flex w-full justify-center">
                <p class="font-bold text-Darkgrayishblue select-none">Your cart is empty</p>
            </div>
        `;
  } else {
    addtocart();
  }
}
function addtocart(x = true) {
  let src = "./images/image-product-1-thumbnail.jpg";
  let name = "Autum Limited Edition...";
  let price = 125.0;
  let c = d.getElementById("product-counter")
    ? parseInt(d.getElementById("product-counter").innerHTML)
    : parseInt(shopCart);
  let counter = x ? count + c : c - 1;
  localStorage.setItem("cart", counter);
  shopCart = counter;
  if (counter) {
    d.getElementById("shop-counter").classList.remove("hidden");
    d.getElementById("shop-counter").innerHTML = counter;

    cartcontent.innerHTML = cartShopComponent(src, name, price, counter);
    d.getElementById("delete").onclick = () => {
      addtocart(false);
    };
  } else {
    detectEmpty(0);
  }
}
function changeImage(e, i = false) {
  if (i) {
    if ((e.id == "next-light") & thumbnails[imageLightView + 1 + 1]) {
      imageLightView = imageLightView + 1;
      setLightImg(imgLight[imageLightView], imageLightView);
    }
    if ((e.id == "previous-light") & thumbnails[imageLightView + 1 - 1]) {
      imageLightView = imageLightView - 1;
      setLightImg(imgLight[imageLightView], imageLightView);
    }
    return true;
  }

  if ((e.id == "next") & thumbnails[imageView + 1]) {
    imageView = imageView + 1;
    image.src = "./images/image-product-" + imageView + ".jpg";
    paintSelectedImg(imageView - 1);
  }
  if ((e.id == "previous") & thumbnails[imageView - 1]) {
    imageView = imageView - 1;
    image.src = "./images/image-product-" + imageView + ".jpg";
    paintSelectedImg(imageView - 1);
  }
}
function selectImage(count) {
  paintSelectedImg(count);
  imageView = count + 1;
  image.src = "./images/image-product-" + imageView + ".jpg";
}
function paintSelectedImg(count) {
  imageThumb.forEach((img) => {
    img.classList.remove("selected");
    img.children[0].classList.remove("opacity-30");
  });
  imageThumb[count].classList.add("selected");
  imageThumb[count].children[0].classList.add("opacity-30");
}

//know that is only one product
// let src = './images/image-product-1-thumbnail.jpg';
// let name = 'Autum Limited Edition...';
// let price = 125.00;

function cartShopComponent(src, name, price, counter = 0) {
  return `
<div class="w-full flex flex-col p-5  gap-5">
    <div class="grid grid-cols-[max-content_1fr_max-content] items-center gap-3">
      <img class="w-14 rounded-md" src="${src}" alt="image-product-1">
      <div class="flex flex-col">
        <p class="text-Darkgrayishblue">${name}</p>
        <p class="text-Darkgrayishblue">$${price.toFixed(
          2
        )} x <span$ id="product-counter">${counter} </span> <span class="text-black font-bold" id="total">$${(
    price * counter
  ).toFixed(2)}</span></p>
      </div>
      <img id="delete" class="w-4 cursor-pointer" src="./images/icon-delete.svg" alt="trash">
    </div>
    <div class="flex justify-center bg-Orange py-4 rounded-lg">
      <p class="text-white font-bold">Checkout</p>
    </div>
  </div>
    `;
}
function lightBoxComponent() {
  return `
  <div  class="absolute top-0 z-30 h-screen w-full flex items-center justify-center">
    <div class="absolute top-1/2 -translate-y-[60%] z-50 flex flex-col">
      <div
      data-close-light
        class="self-end my-6 justify-self-end bg-[url(./images/icon-close-white.svg)] hover:bg-[url(./images/icon-close-orange.svg)] transition-all duration-150 ease-in w-6 h-6 bg-no-repeat bg-cover">
      </div>
      <div class="relative">
        <div id="previous-light" data-light-btn
          class="bg-white absolute group cursor-pointer top-1/2 -translate-y-1/2 -ml-5 flex items-center justify-center w-fit rounded-full p-4">
          <div
            class="bg-[url(./images/icon-previous.svg)] group-hover:bg-[url(./images/icon-previous-orange.svg)] duration-150 transition-all bg-no-repeat bg-contain ml-px w-5 h-5">
          </div>
        </div>
        <img id="lightBox-img" class="max-w-sm md:max-w-xl rounded-xl" src="./images/image-product-1.jpg" alt="img" />
        <div id="next-light" data-light-btn
          class="bg-white group cursor-pointer absolute top-1/2 right-0 -translate-y-1/2 -mr-5 flex items-center justify-center w-fit rounded-full p-4">
          <div
            class="bg-[url(./images/icon-next.svg)] group-hover:bg-[url(./images/icon-next-orange.svg)] duration-150 transition-all bg-no-repeat bg-contain ml-1 w-4 h-5">
          </div>
        </div>
      </div>
      <div id="img-light" class="flex justify-between my-2">
        <div class="relative group light-sel" data-light-img>
          <img class="w-14 md:w-20 lg:w-24 rounded-lg transition-all ease-linear duration-150"
            src="./images/image-product-1-thumbnail.jpg" alt="image-product-1-thumbnail" />
          <div
            class="opacity-0 group-hover:opacity-40 absolute top-0 left-0 right-0 bottom-0 bg-white rounded-lg transition-all ease-linear duration-150">
          </div>
        </div>
        <div class="relative group" data-light-img>
          <img class="w-14 md:w-20 lg:w-24 rounded-lg transition-all ease-linear duration-150"
            src="./images/image-product-2-thumbnail.jpg" alt="image-product-1-thumbnail" />
          <div
            class="opacity-0 group-hover:opacity-40 absolute top-0 left-0 right-0 bottom-0 bg-white rounded-lg transition-all ease-linear duration-150">
          </div>
        </div>
        <div class="relative group" data-light-img>
          <img class="w-14 md:w-20 lg:w-24 rounded-lg transition-all ease-linear duration-150"
            src="./images/image-product-3-thumbnail.jpg" alt="image-product-1-thumbnail" />
          <div
            class="opacity-0 group-hover:opacity-40 absolute top-0 left-0 right-0 bottom-0 bg-white rounded-lg transition-all ease-linear duration-150">
          </div>
        </div>
        <div class="relative group" data-light-img>
          <img class="w-14 md:w-20 lg:w-24 rounded-lg transition-all ease-linear duration-150"
            src="./images/image-product-4-thumbnail.jpg" alt="image-product-1-thumbnail" />
          <div
            class="opacity-0 group-hover:opacity-40 absolute top-0 left-0 right-0 bottom-0 bg-white rounded-lg transition-all ease-linear duration-150">
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bg-black opacity-40 w-full h-full"></div>
  </div>
  `;
}
function restoreLightClick(){
  nextLight = d.getElementById("previous-light");
  previousLight = d.getElementById("next-light");
  imgLight = d.querySelectorAll("[data-light-img]");
  lightBoxImg = d.querySelector("#lightBox-img");
  lightBtns = d.querySelectorAll("[data-light-btn]");
  closeLight = d.querySelector("[data-close-light]");

  closeLight.onclick = () => {
    if (d.getElementById("lightboxcomponent")) {
      imageLightView = 0;
      d.getElementById("lightboxcomponent").remove();
    }
  };
  
  lightBtns.forEach((btn) => {
    btn.onclick = () => {
      changeImage(btn, true);
    };
  });
  
  imgLight.forEach((img, i) => {
    img.onclick = () => {
      setLightImg(img, i);
    };
  });
}

paintSelectedImg(imageSelected);
detectEmpty(shopCart);
