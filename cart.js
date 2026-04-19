// ১. কার্ট ডাটা স্টোর করার জন্য অ্যারে
let cart = [];

// ২. ড্রয়ার ওপেন এবং ক্লোজ করার ফাংশন
window.openCart = () => {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) drawer.classList.remove("translate-x-full");
};

window.closeCart = () => {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) drawer.classList.add("translate-x-full");
};

// ৩. কার্টে প্রোডাক্ট যোগ করা
window.addToCart = function (productId) {
  // নিশ্চিত করা হচ্ছে যেন fashionData পাওয়া যায়
  if (typeof fashionData === "undefined") {
    console.error("fashionData is not defined. Check your file loading order.");
    return;
  }

  const product = fashionData.products.find((p) => p.id === productId);

  if (product) {
    // সরাসরি অবজেক্ট পুশ না করে কপি পুশ করা ভালো প্র্যাকটিস
    cart.push({ ...product });
    updateUI();
    openCart(); // আইটেম যোগ করলেই ড্রয়ার খুলে যাবে
  }
};

// ৪. কার্ট থেকে রিমুভ করা
window.removeFromCart = function (index) {
  cart.splice(index, 1);
  updateUI();
};

// ৫. ইন্টারফেস (UI) আপডেট করা
function updateUI() {
  const badge = document.getElementById("cart-badge");
  const cartList = document.getElementById("cart-items-list");
  const totalElement = document.getElementById("cart-total");

  // কার্ট ব্যাজ আপডেট (নেভবারে থাকা সংখ্যা)
  if (badge) {
    badge.innerText = cart.length;
    if (cart.length > 0) {
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }

  // যদি কার্ট খালি থাকে
  if (cart.length === 0) {
    if (cartList) {
      cartList.innerHTML = `
        <div class="text-center mt-20 opacity-30 flex flex-col items-center">
            <i class="fas fa-shopping-bag text-5xl mb-4"></i>
            <p class="font-bold uppercase tracking-widest text-xs">Your bag is empty</p>
        </div>`;
    }
    if (totalElement) totalElement.innerText = "0";
  }
  // যদি কার্টে আইটেম থাকে
  else {
    let total = 0;
    if (cartList) {
      cartList.innerHTML = cart
        .map((item, index) => {
          // প্রাইস যদি স্ট্রিং থাকে তবে সেটাকে নাম্বারে কনভার্ট করে যোগ করা
          const itemPrice =
            typeof item.price === "string"
              ? parseInt(item.price.replace(/,/g, ""))
              : item.price;
          total += itemPrice;

          return `
            <div class="flex items-center justify-between mb-6 group animate-fade-in">
                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <img src="${item.img}" class="w-20 h-20 object-cover rounded-2xl shadow-sm border border-gray-100">
                    </div>
                    <div>
                        <h5 class="font-bold text-sm text-gray-800 leading-tight">${item.name}</h5>
                        <p class="text-amber-900 text-xs font-black mt-1">৳${itemPrice.toLocaleString()}</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all duration-300">
                    <i class="fas fa-trash-alt text-[10px]"></i>
                </button>
            </div>
          `;
        })
        .join("");
    }

    if (totalElement) {
      totalElement.innerText = total.toLocaleString();
    }
  }
}
