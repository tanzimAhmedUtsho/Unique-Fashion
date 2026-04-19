// ১. ওয়েবসাইট ডাটা
const siteConfig = {
  brandName: "SUN FASHION",
  owner: "Tanzim Ahmed Utsho",
  established: 1998,
  collections: [
    {
      id: 1,
      name: "Premium Panjabi",
      price: "4,500",
      img: "/image/Premium Panjabi.jpg",
    },
    {
      id: 2,
      name: "Luxury Suit",
      price: "12,000",
      img: "/image/Luxury Suit.webp",
    },
    {
      id: 3,
      name: "Classic Watch",
      price: "8,500",
      img: "/image/watch .webp",
    },
    {
      id: 4,
      name: "Slim Fit Shirt",
      price: "2,200",
      img: "/image/Slim Fit Shirt.webp",
    },
  ],
};

const root = document.getElementById("root");

// ২. কম্পোনেন্ট ফাংশনস
function Navbar() {
  return `
    <nav class="flex justify-between items-center px-10 py-6 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <h1 class="serif text-2xl font-black tracking-tighter">${siteConfig.brandName}</h1>
        <div class="space-x-8 font-semibold text-sm">
            <a href="#" class="hover:text-amber-700">Home</a>
            <a href="#" class="hover:text-amber-700">Collections</a>
            <a href="#" class="hover:text-amber-700">About</a>
        </div>
    </nav>`;
}

function Hero() {
  return `
    <header class="relative h-[80vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div class="absolute inset-0 bg-gray-100 -z-10">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600" class="w-full h-full object-cover opacity-30">
        </div>
        <div>
            <span class="text-xs font-bold tracking-[0.5em] text-amber-800">ESTABLISHED ${siteConfig.established}</span>
            <h2 class="serif text-6xl md:text-8xl mt-4 mb-8">Timeless Elegance</h2>
            <button class="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-amber-900 transition">Shop Now</button>
        </div>
    </header>`;
}

function Products() {
  const items = siteConfig.collections
    .map(
      (item) => `
        <div class="group cursor-pointer">
            <div class="h-96 overflow-hidden bg-gray-100 mb-4 rounded-xl">
                <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            </div>
            <h4 class="font-bold text-gray-900">${item.name}</h4>
            <p class="text-amber-800 font-medium">৳ ${item.price}</p>
        </div>
    `,
    )
    .join("");

  return `
    <section class="max-w-7xl mx-auto py-24 px-10">
        <h3 class="serif text-4xl mb-12">New Arrival</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            ${items}
        </div>
    </section>`;
}

function Footer() {
  return `
    <footer class="bg-black text-white py-20 px-10">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <h4 class="serif text-3xl mb-4">${siteConfig.brandName}</h4>
                <p class="text-gray-400">Owner: ${siteConfig.owner}</p>
                <p class="text-gray-400 mt-2 italic">Crafting luxury since ${siteConfig.established}.</p>
            </div>
            <div class="flex md:justify-end gap-6 text-2xl">
                <i class="fab fa-instagram hover:text-amber-500 cursor-pointer"></i>
                <i class="fab fa-facebook hover:text-amber-500 cursor-pointer"></i>
                <i class="fab fa-twitter hover:text-amber-500 cursor-pointer"></i>
            </div>
        </div>
    </footer>`;
}

// ৩. রেন্ডার ফাংশন
function renderApp() {
  root.innerHTML = `
        ${Navbar()}
        ${Hero()}
        ${Products()}
        ${Footer()}
    `;
}

// সাইট লোড হলে রেন্ডার করো
renderApp();
