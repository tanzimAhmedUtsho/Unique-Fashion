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
  social: {
    facebook: "https://www.facebook.com/tanzim.ahmed.utsho/",
    instagram: "https://www.instagram.com/indecisive_utsho/",
    twitter: "https://twitter.com/yourprofile",
  },
};

const root = document.getElementById("root");
let currentPage = "home";
let selectedProduct = null;
let isChatOpen = false;

// ২. নেভিগেশন ফাংশন
window.navigate = function (page) {
  currentPage = page;
  renderApp();
  window.scrollTo(0, 0);
};

window.openQuickView = function (productId) {
  selectedProduct = fashionData.products.find((p) => p.id === productId);
  renderApp();
  document.body.style.overflow = "hidden"; // Prevent background scrolling
};

window.closeQuickView = function () {
  selectedProduct = null;
  renderApp();
  document.body.style.overflow = "auto"; // Restore scrolling
};

window.toggleChat = function () {
  isChatOpen = !isChatOpen;
  renderApp();
};

// ৩. কম্পোনেন্ট ফাংশনস
function Navbar() {
  return `
    <nav class="flex justify-between items-center px-10 py-6 sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <h1 class="serif text-2xl font-black tracking-tighter cursor-pointer" onclick="navigate('home')">${fashionData.brandName}</h1>
        <div class="flex items-center space-x-8">
            <div class="hidden md:flex space-x-8 font-semibold text-sm uppercase tracking-widest">
                <a href="javascript:void(0)" onclick="navigate('home')" class="${currentPage === "home" ? "text-amber-700" : "text-black"} hover:text-amber-700 transition no-underline">Home</a>
                <a href="javascript:void(0)" onclick="navigate('collection')" class="${currentPage === "collection" ? "text-amber-700" : "text-black"} hover:text-amber-700 transition no-underline">Collections</a>
                <a href="javascript:void(0)" onclick="navigate('about')" class="${currentPage === "about" ? "text-amber-700" : "text-black"} hover:text-amber-700 transition no-underline">About</a>
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
    <header class="relative h-[70vh] flex items-center justify-center text-center px-6 overflow-hidden bg-gray-50">
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
    <div class="group relative bg-white border border-gray-100 p-4 rounded-3xl hover:shadow-2xl hover:-translate-y-1 hover:border-amber-300 transition duration-500">
        ${p.discount ? `<span class="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full z-10 animate-bounce">SAVE ${p.discount}</span>` : ""}
        <div class="h-96 overflow-hidden rounded-2xl mb-6 bg-gray-50 cursor-zoom-in" onclick="openQuickView(${p.id})">
            <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
        </div>
        <h4 class="text-lg font-bold text-gray-900 mb-1 leading-tight">${p.name}</h4>
        <div class="flex items-center space-x-3 mb-6">
            <span class="text-xl font-black text-amber-900">৳${p.price.toLocaleString()}</span>
            ${p.oldPrice ? `<span class="text-sm text-gray-400 line-through font-medium">৳${p.oldPrice.toLocaleString()}</span>` : ""}
        </div>
        <button onclick="addToCart(${p.id})" class="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-amber-800 transition-all flex items-center justify-center space-x-2 active:scale-95 shadow-lg shadow-black/5 group-hover:shadow-amber-500/30">
            <i class="fas fa-shopping-bag text-sm"></i>
            <span>Add to Cart</span>
        </button>
    </div>`,
    )
    .join("");

  const title =
    currentPage === "collection" ? "Full Collection" : "Curated Collection";

  return `
    <section class="max-w-7xl mx-auto py-24 px-10 animate-fade-in">
        <h3 class="serif text-4xl mb-12 font-black italic tracking-tight">${title}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            ${cards}
        </div>
    </section>`;
}

function About() {
  return `
    <section class="max-w-7xl mx-auto py-24 px-10 animate-fade-in">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
            <div class="relative">
                <div class="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=800" class="w-full h-full object-cover" alt="Heritage Image">
                </div>
                <div class="absolute -bottom-10 -right-10 bg-amber-900 text-white p-10 rounded-[2rem] hidden lg:block shadow-xl">
                    <p class="serif text-4xl font-black italic mb-2">26+</p>
                    <p class="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">Years of Heritage</p>
                </div>
            </div>
            <div>
                <span class="text-xs font-bold tracking-[0.5em] text-amber-800 uppercase italic">Our Story</span>
                <h2 class="serif text-5xl md:text-6xl mt-6 mb-8 font-black text-gray-900 leading-tight">Crafting Elegance Since ${fashionData.established}</h2>
                <div class="space-y-6 text-gray-500 leading-relaxed text-lg font-medium">
                    <p>Welcome to <span class="text-black font-bold">${fashionData.brandName}</span>, Jhenaidah's premier destination for luxury fashion. We don't just create clothes; we curate experiences that define your unique style and identity.</p>
                    <p>Founded by <span class="text-black font-bold">${fashionData.owner}</span>, our journey began with a simple passion for exquisite tailoring. Over the decades, we have evolved into a symbol of trust and sophistication, blending traditional craftsmanship with contemporary trends.</p>
                    <p class="italic border-l-4 border-amber-800 pl-6 py-2">"Style is a way to say who you are without having to speak. At SUN FASHION, we give you the voice."</p>
                </div>
            </div>
        </div>

        <!-- Our Values Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-24">
            <div class="text-center p-10 bg-gray-50 rounded-[3rem] hover:shadow-xl transition duration-500 group">
                <div class="w-16 h-16 bg-black text-white flex items-center justify-center rounded-2xl mx-auto mb-8 group-hover:bg-amber-900 transition-colors">
                    <i class="fas fa-gem text-2xl"></i>
                </div>
                <h4 class="serif text-2xl font-bold mb-4">Premium Quality</h4>
                <p class="text-gray-500 text-sm leading-relaxed">We source the finest materials globally to ensure every stitch reflects our commitment to perfection.</p>
            </div>
            <div class="text-center p-10 bg-gray-50 rounded-[3rem] hover:shadow-xl transition duration-500 group">
                <div class="w-16 h-16 bg-black text-white flex items-center justify-center rounded-2xl mx-auto mb-8 group-hover:bg-amber-900 transition-colors">
                    <i class="fas fa-magic text-2xl"></i>
                </div>
                <h4 class="serif text-2xl font-bold mb-4">Unique Designs</h4>
                <p class="text-gray-500 text-sm leading-relaxed">Each piece is exclusively crafted to make sure you stand out in every crowd with timeless elegance.</p>
            </div>
            <div class="text-center p-10 bg-gray-50 rounded-[3rem] hover:shadow-xl transition duration-500 group">
                <div class="w-16 h-16 bg-black text-white flex items-center justify-center rounded-2xl mx-auto mb-8 group-hover:bg-amber-900 transition-colors">
                    <i class="fas fa-handshake text-2xl"></i>
                </div>
                <h4 class="serif text-2xl font-bold mb-4">Customer First</h4>
                <p class="text-gray-500 text-sm leading-relaxed">Your satisfaction is our legacy. We believe in building relationships, not just making sales.</p>
            </div>
        </div>

        <!-- Contact Section -->
        <div class="mt-32 bg-white rounded-[3rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-gray-100">
            <div class="bg-black p-12 md:p-20 text-white">
                <span class="text-xs font-bold tracking-[0.5em] text-amber-500 uppercase italic">Contact Us</span>
                <h3 class="serif text-4xl md:text-5xl mt-6 mb-10 font-black leading-tight">We'd love to hear from you.</h3>
                <div class="space-y-8">
                    <div class="flex items-start space-x-6">
                        <div class="w-12 h-12 bg-amber-900 rounded-2xl flex items-center justify-center shrink-0">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div>
                            <h5 class="font-bold text-lg mb-1 text-white">Visit Our Atelier</h5>
                            <p class="text-gray-400 text-sm">Main Road, Jhenaidah, Bangladesh</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-6">
                        <div class="w-12 h-12 bg-amber-900 rounded-2xl flex items-center justify-center shrink-0">
                            <i class="fas fa-phone-alt"></i>
                        </div>
                        <div>
                            <h5 class="font-bold text-lg mb-1 text-white">Call Us</h5>
                            <p class="text-gray-400 text-sm">+880 1234 567890</p>
                        </div>
                    </div>
                </div>
                <div class="mt-12 pt-12 border-t border-gray-800">
                    <h5 class="font-bold text-lg mb-4 text-white">Find Us Here</h5>
                    <div class="aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-700">
                        <!-- Replace the src with your actual Google Maps embed URL -->
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.341517415814!2d89.1678257743997!3d22.92383027920111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff752912443477%3A0x35639149423c907!2sJhenaidah%20Sadar%20Hospital!5e0!3m2!1sen!2sbd!4v1701880000000!5m2!1sen!2sbd" 
                                width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
            <div class="p-12 md:p-20 bg-white">
                <form class="space-y-6" onsubmit="event.preventDefault(); alert('Thank you! Your message has been sent.');">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest font-black mb-3 text-gray-400">Full Name</label>
                        <input type="text" placeholder="Your Name" class="w-full bg-gray-50 border-none rounded-2xl py-5 px-8 text-sm focus:ring-2 focus:ring-amber-900 outline-none transition-all" required>
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest font-black mb-3 text-gray-400">Email Address</label>
                        <input type="email" placeholder="Your Email" class="w-full bg-gray-50 border-none rounded-2xl py-5 px-8 text-sm focus:ring-2 focus:ring-amber-900 outline-none transition-all" required>
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest font-black mb-3 text-gray-400">Message</label>
                        <textarea rows="4" placeholder="How can we help you today?" class="w-full bg-gray-50 border-none rounded-2xl py-5 px-8 text-sm focus:ring-2 focus:ring-amber-900 outline-none transition-all" required></textarea>
                    </div>
                    <button type="submit" class="w-full bg-black text-white py-5 rounded-2xl font-bold hover:bg-amber-900 transition-all shadow-xl active:scale-95">Send Message</button>
                </form>
            </div>
        </div>
    </section>`;
}

function QuickViewModal(product) {
  if (!product) return "";
  return `
    <div id="quick-view-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-fade-in">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeQuickView()"></div>
        <div class="relative bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row transform transition-all duration-500">
            <button onclick="closeQuickView()" class="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full hover:bg-black hover:text-white transition shadow-lg">
                <i class="fas fa-times"></i>
            </button>
            <div class="w-full md:w-1/2 h-[400px] md:h-auto overflow-hidden">
                <img src="${product.img}" class="w-full h-full object-cover hover:scale-110 transition duration-1000">
            </div>
            <div class="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center bg-white border-l border-gray-50">
                <span class="text-xs font-bold tracking-[0.4em] text-amber-800 uppercase mb-4 italic">Exclusive Piece</span>
                <h2 class="serif text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">${product.name}</h2>
                <div class="flex items-center space-x-6 mb-8">
                    <span class="text-4xl font-black text-amber-900">৳${product.price.toLocaleString()}</span>
                    ${product.oldPrice ? `<span class="text-xl text-gray-300 line-through font-medium">৳${product.oldPrice.toLocaleString()}</span>` : ""}
                </div>
                <p class="text-gray-500 mb-10 text-lg leading-relaxed font-medium">
                    Redefine your wardrobe with this signature ${product.name}. Carefully crafted for those who appreciate the finer things in life. Perfect for making a statement at any event.
                </p>
                <div class="space-y-4">
                    <button onclick="addToCart(${product.id}); closeQuickView();" class="w-full bg-black text-white py-5 rounded-2xl font-bold hover:bg-amber-900 transition-all flex items-center justify-center space-x-3 shadow-2xl active:scale-95">
                        <i class="fas fa-shopping-bag"></i>
                        <span>Add to Shopping Bag</span>
                    </button>
                    <p class="text-[10px] text-center uppercase tracking-widest text-gray-400 font-bold">Free Premium Delivery in Jhenaidah</p>
                </div>
            </div>
        </div>
    </div>`;
}

function ChatWidget() {
  return `
    <div class="fixed bottom-10 right-10 z-[90]">
        ${
          isChatOpen
            ? `
        <div class="bg-white w-80 h-[450px] rounded-[2.5rem] shadow-2xl mb-6 flex flex-col overflow-hidden animate-fade-in border border-gray-100">
            <div class="bg-black p-6 text-white flex justify-between items-center">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center font-bold text-xs uppercase">SF</div>
                    <div>
                        <h4 class="font-bold text-sm leading-none">Support Team</h4>
                        <p class="text-[9px] opacity-60 mt-1 uppercase tracking-widest font-bold">Typically replies in 5m</p>
                    </div>
                </div>
                <button onclick="toggleChat()" class="text-white/50 hover:text-white transition"><i class="fas fa-times"></i></button>
            </div>
            <div class="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/50">
                <div class="bg-white p-4 rounded-2xl rounded-tl-none text-xs text-gray-600 shadow-sm max-w-[85%] leading-relaxed">
                    Welcome to <b>SUN FASHION</b>! How can we assist you with your style today?
                </div>
            </div>
            <div class="p-4 bg-white border-t border-gray-50">
                <div class="relative">
                    <input type="text" placeholder="Write a message..." class="w-full bg-gray-100 border-none rounded-xl py-4 px-5 text-xs focus:ring-1 focus:ring-amber-900 outline-none transition-all">
                    <button class="absolute right-4 top-1/2 -translate-y-1/2 text-amber-900 hover:scale-110 transition"><i class="fas fa-paper-plane text-sm"></i></button>
                </div>
            </div>
        </div>`
            : ""
        }
        <button onclick="toggleChat()" class="w-16 h-16 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group border-4 border-white">
            <i class="fas ${isChatOpen ? "fa-comment-slash" : "fa-comment-alt"} text-2xl"></i>
            <span class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </button>
    </div>`;
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
  } else if (currentPage === "about") {
    pageContent += About();
  }

  pageContent += Footer();
  pageContent += QuickViewModal(selectedProduct);
  pageContent += ChatWidget();
  root.innerHTML = pageContent;

  if (currentPage === "home") startAdAnimation();
  if (typeof updateUI === "function") updateUI();
}

renderApp();
