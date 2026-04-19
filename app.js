// ১. ফ্যাশন ব্র্যান্ড ডাটা
const fashionData = {
  brandName: "SUN FASHION",
  owner: "Tanzim Ahmed Utsho",
  established: 1998,
  products: [
    {
      id: 1,
      name: "Premium Panjabi",
      price: 4500,
      oldPrice: 5200,
      discount: "15%",
      img: "/image/Premium Panjabi.jpg",
    },
    {
      id: 2,
      name: "Luxury Suit",
      price: 12000,
      oldPrice: null,
      discount: null,
      img: "/image/Luxury Suit.webp",
    },
    {
      id: 3,
      name: "Classic Watch",
      price: 8500,
      oldPrice: 10000,
      discount: "15%",
      img: "/image/watch .webp",
    },
    {
      id: 4,
      name: "Slim Fit Shirt",
      price: 2200,
      oldPrice: null,
      discount: null,
      img: "/image/Slim Fit Shirt.webp",
    },
    {
      id: 5,
      name: "Designer Leather Bag",
      price: 5500,
      oldPrice: 6500,
      discount: "10%",
      img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400",
    },
    {
      id: 6,
      name: "Formal Trousers",
      price: 1800,
      oldPrice: null,
      discount: null,
      img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=400",
    },
  ],
  // --- এখানে তোমার নিজের লিঙ্কগুলো বসিয়ে দাও ---
  social: {
    facebook: "https://www.facebook.com/tanzim.ahmed.utsho/",
    instagram: "https://www.instagram.com/indecisive_utsho/",
    twitter: "https://twitter.com/yourprofile",
  },
};

const root = document.getElementById("root");
let currentPage = "home";

// ২. নেভিগেশন ফাংশন
window.navigate = function (page) {
  currentPage = page;
  renderApp();
  window.scrollTo(0, 0);
};

// ৩. কম্পোনেন্ট ফাংশনস
function Navbar() {
  return `
    <nav class="flex justify-between items-center px-10 py-6 sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <h1 class="serif text-2xl font-black tracking-tighter cursor-pointer" onclick="navigate('home')">${fashionData.brandName}</h1>
        <div class="flex items-center space-x-8">
            <div class="hidden md:flex space-x-8 font-semibold text-sm uppercase tracking-widest">
                <a href="javascript:void(0)" onclick="navigate('home')" class="${currentPage === "home" ? "text-amber-700" : ""} hover:text-amber-700 transition text-black no-underline">Home</a>
                <a href="javascript:void(0)" onclick="navigate('collection')" class="${currentPage === "collection" ? "text-amber-700" : ""} hover:text-amber-700 transition text-black no-underline">Collections</a>
                <a href="#" class="hover:text-amber-700 transition text-black no-underline">About</a>
            </div>
            <div class="relative cursor-pointer group" onclick="openCart()">
                <i class="fas fa-shopping-bag text-2xl group-hover:text-amber-800 transition"></i>
                <span id="cart-badge" class="absolute -top-2 -right-2 bg-black text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-bold hidden border-2 border-white">0</span>
            </div>
        </div>
    </nav>`;
}

function Hero() {
  return `
    <header class="relative h-[70vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div class="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600" 
                 class="w-full h-full object-cover opacity-20 pointer-events-none">
        </div>
        
        <div class="relative z-10">
            <span class="text-xs font-bold tracking-[0.5em] text-amber-800 uppercase italic">Established ${fashionData.established}</span>
            <h2 class="serif text-6xl md:text-8xl mt-4 mb-8 font-black text-gray-900 leading-none">Timeless Elegance</h2>
            <p class="text-gray-500 mb-8 max-w-md mx-auto text-sm tracking-wide font-medium">Experience the finest craftsmanship in Jhenaidah's premier fashion house.</p>
            <button onclick="navigate('collection')" class="bg-black text-white px-12 py-4 rounded-full font-bold hover:bg-amber-900 transition-all shadow-xl active:scale-95">Explore Now</button>
        </div>
    </header>`;
}

function Collection() {
  const cards = fashionData.products
    .map(
      (p) => `
    <div class="group relative bg-white border border-gray-100 p-4 rounded-3xl hover:shadow-2xl transition duration-500">
        ${p.discount ? `<span class="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full z-10 animate-bounce">SAVE ${p.discount}</span>` : ""}
        <div class="h-96 overflow-hidden rounded-2xl mb-6 bg-gray-50">
            <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
        </div>
        <h4 class="text-lg font-bold text-gray-900 mb-1 leading-tight">${p.name}</h4>
        <div class="flex items-center space-x-3 mb-6">
            <span class="text-xl font-black text-amber-900">৳${p.price.toLocaleString()}</span>
            ${p.oldPrice ? `<span class="text-sm text-gray-400 line-through font-medium">৳${p.oldPrice.toLocaleString()}</span>` : ""}
        </div>
        <button onclick="addToCart(${p.id})" class="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-amber-800 transition-all flex items-center justify-center space-x-2 active:scale-95 shadow-lg shadow-black/5">
            <i class="fas fa-shopping-bag text-sm"></i>
            <span>Add to Cart</span>
        </button>
    </div>`,
    )
    .join("");

  const title =
    currentPage === "collection" ? "Full Collection" : "Curated Collection";

  return `
    <section class="max-w-7xl mx-auto py-24 px-10">
        <h3 class="serif text-4xl mb-12 font-black italic tracking-tight">${title}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            ${cards}
        </div>
    </section>`;
}

function AnimatedAd() {
  return `
    <div id="promo-ad" class="bg-amber-900 text-white py-16 px-10 my-12 overflow-hidden transition-all duration-1000 transform opacity-100 scale-100 mx-4 md:mx-10 rounded-[3rem]">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div>
                <h2 class="serif text-5xl font-bold mb-4 italic">BIG REVEAL!</h2>
                <p class="text-xl opacity-80 uppercase tracking-widest font-light">Extra 20% OFF on all Summer Collections</p>
            </div>
            <button class="mt-8 md:mt-0 bg-white text-black px-12 py-4 font-black rounded-full hover:bg-gray-200 transition active:scale-95 shadow-xl">GRAB NOW</button>
        </div>
    </div>`;
}

function Footer() {
  return `
    <footer class="bg-black text-white py-20 px-10 mt-10">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-center md:text-left">
            <div>
                <h4 class="serif text-3xl mb-4 italic font-black">${fashionData.brandName}</h4>
                <p class="text-gray-400 text-[10px] uppercase tracking-widest font-medium">Founded by ${fashionData.owner} | Since ${fashionData.established}</p>
            </div>
            <div class="flex justify-center md:justify-end gap-10 text-xl text-gray-400">
                <a href="${fashionData.social.instagram}" target="_blank" class="hover:text-white transition cursor-pointer"><i class="fab fa-instagram"></i></a>
                <a href="${fashionData.social.facebook}" target="_blank" class="hover:text-white transition cursor-pointer"><i class="fab fa-facebook"></i></a>
                <a href="${fashionData.social.twitter}" target="_blank" class="hover:text-white transition cursor-pointer"><i class="fab fa-twitter"></i></a>
            </div>
        </div>
    </footer>`;
}

// ৪. রেন্ডার এবং অ্যানিমেশন লজিক
function startAdAnimation() {
  const ad = document.getElementById("promo-ad");
  if (!ad) return;
  setInterval(() => {
    ad.style.opacity = "0";
    ad.style.transform = "scale(0.95)";
    setTimeout(() => {
      ad.style.opacity = "1";
      ad.style.transform = "scale(1)";
    }, 1500);
  }, 7000);
}

function renderApp() {
  let pageContent = Navbar();
  if (currentPage === "home") {
    pageContent += Hero();
    pageContent += Collection();
    pageContent += AnimatedAd();
  } else if (currentPage === "collection") {
    pageContent += `<div class="bg-gray-50 min-h-screen pt-6">${Collection()}</div>`;
  }
  pageContent += Footer();
  root.innerHTML = pageContent;

  if (currentPage === "home") startAdAnimation();
  if (typeof updateUI === "function") updateUI();
}

renderApp();
