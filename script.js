const PRODUCTS = [
  { id: 1, name: 'Cotton Oversized Shirt', cat: 'Tops', price: 58,
    img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80' },
  { id: 2, name: 'Tailored Wool Trousers', cat: 'Bottoms', price: 92,
    img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80' },
  { id: 3, name: 'Classic Denim Jacket', cat: 'Outerwear', price: 118,
    img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80' },
  { id: 4, name: 'Ribbed Knit Sweater', cat: 'Knitwear', price: 74,
    img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80' },
  { id: 5, name: 'Relaxed Fit Chinos', cat: 'Bottoms', price: 68,
    img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80' },
  { id: 6, name: 'Silk Button-Down Blouse', cat: 'Tops', price: 86,
    img: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80' },
  { id: 7, name: 'Cashmere Cardigan', cat: 'Knitwear', price: 142,
    img: 'https://images.unsplash.com/photo-1616600038427-c5c07f9c1b1a?w=600&q=80' },
  { id: 8, name: 'Wool Overcoat', cat: 'Outerwear', price: 210,
    img: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&q=80' },
  { id: 9, name: 'Leather Belt', cat: 'Accessories', price: 45,
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80' },
  { id: 10, name: 'Canvas Sneakers', cat: 'Footwear', price: 72,
    img: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&q=80' },
  { id: 11, name: 'Linen Midi Dress', cat: 'Dresses', price: 98,
    img: 'https://images.unsplash.com/photo-1595777707802-221b4b541e8b?w=600&q=80' },
  { id: 12, name: 'Premium Cotton T-Shirt', cat: 'Tops', price: 38,
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80' },
  { id: 13, name: 'Tapered Joggers', cat: 'Bottoms', price: 62,
    img: 'https://images.unsplash.com/photo-1506629082632-404101a01a7a?w=600&q=80' },
  { id: 14, name: 'Vintage Leather Jacket', cat: 'Outerwear', price: 195,
    img: 'https://images.unsplash.com/photo-1551645813-83f8dd9daf4f?w=600&q=80' },
  { id: 15, name: 'Merino Wool Socks Pack', cat: 'Accessories', price: 32,
    img: 'https://images.unsplash.com/photo-1585447066223-2ee3e3a4a3eb?w=600&q=80' },
  { id: 16, name: 'White Platform Sneakers', cat: 'Footwear', price: 88,
    img: 'https://images.unsplash.com/photo-1503093691526-58048dc42117?w=600&q=80' },
  { id: 17, name: 'Pleated A-Line Skirt', cat: 'Bottoms', price: 76,
    img: 'https://images.unsplash.com/photo-1598293220395-2f4ec16f4c0f?w=600&q=80' },
  { id: 18, name: 'Turtleneck Knit Sweater', cat: 'Knitwear', price: 84,
    img: 'https://images.unsplash.com/photo-1594866910741-dce84eacc52e?w=600&q=80' },
];

let activeCat = 'all';
let cart = {};

/* ---------- RENDER PRODUCTS ---------- */
const grid = document.getElementById('grid');

function renderProducts() {
  const filtered = PRODUCTS.filter(p => activeCat === 'all' || p.cat === activeCat);
  grid.innerHTML = filtered.map(p => `
    <div class="card">
      <div class="card-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <button class="card-add" onclick="addToCart(${p.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          Add to cart
        </button>
      </div>
      <div class="card-name">${p.name}</div>
      <div class="card-meta"><span class="card-cat">${p.cat}</span><span class="card-price">$${p.price.toFixed(2)}</span></div>
    </div>
  `).join('');
}
renderProducts();

function setActiveCat(cat) {
  activeCat = cat;
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.toggle('active', p.dataset.cat === cat));
  renderProducts();
}
document.querySelectorAll('.cat-pill').forEach(p => p.addEventListener('click', () => setActiveCat(p.dataset.cat)));

function filterAndScroll(cat) {
  setActiveCat(cat);
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

/* ---------- NAV: highlight current section on scroll ---------- */
const navSections = ['home','products','categories','testimonials','contact']
  .map(id => document.getElementById(id)).filter(Boolean);

function updateActiveNav() {
  const midY = window.scrollY + window.innerHeight / 3;
  let current = navSections[0];
  navSections.forEach(sec => { if (sec.offsetTop <= midY) current = sec; });
  document.querySelectorAll('.nav-links a, #mobDrawer a').forEach(a => {
    a.classList.toggle('active', a.dataset.nav === current.id);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

document.querySelectorAll('.nav-links a[data-nav], #mobDrawer a[data-nav]').forEach(a => a.addEventListener('click', closeMob));

/* ---------- NEWSLETTER & CONTACT FORMS ---------- */
document.getElementById('newsletterForm').addEventListener('submit', e => {
  e.preventDefault();
  showToast('Subscribed! Check your inbox for 10% off.');
  e.target.reset();
});
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  showToast('Message sent — we\'ll reply within 24 hours.');
  e.target.reset();
});

/* ---------- CART ---------- */
const cartCount = document.getElementById('cartCount');
const cartList = document.getElementById('cartList');
const cartFoot = document.getElementById('cartFoot');
const cartTotal = document.getElementById('cartTotal');

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCart();
  const p = PRODUCTS.find(x => x.id === id);
  showToast(`Added "${p.name}" to cart`);
}
function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  updateCart();
}
function removeItem(id) { delete cart[id]; updateCart(); }

function updateCart() {
  const ids = Object.keys(cart);
  const count = ids.reduce((s, id) => s + cart[id], 0);
  cartCount.textContent = count;
  cartCount.classList.toggle('show', count > 0);

  if (ids.length === 0) {
    cartList.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.6 12.6a2 2 0 002 1.6h8.8a2 2 0 002-1.6L21.5 7H6"/></svg>
        <p>Your cart is empty.</p>
      </div>`;
    cartFoot.style.display = 'none';
    return;
  }

  let total = 0;
  cartList.innerHTML = ids.map(id => {
    const p = PRODUCTS.find(x => x.id == id);
    const qty = cart[id];
    total += p.price * qty;
    return `
      <div class="cart-item">
        <img src="${p.img}" alt="${p.name}">
        <div class="ci-body">
          <div class="ci-name">${p.name}</div>
          <div class="ci-price">$${p.price.toFixed(2)}</div>
          <div class="ci-row">
            <div class="stepper">
              <button onclick="changeQty(${p.id}, -1)">−</button>
              <span>${qty}</span>
              <button onclick="changeQty(${p.id}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeItem(${p.id})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6"/></svg>
            </button>
          </div>
        </div>
      </div>`;
  }).join('');

  cartFoot.style.display = 'block';
  cartTotal.textContent = `$${total.toFixed(2)}`;
  document.getElementById('modalTotal').textContent = `$${total.toFixed(2)}`;
}
updateCart();

/* ---------- CART DRAWER ---------- */
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
function openCart() { cartDrawer.classList.add('open'); cartOverlay.classList.add('open'); }
function closeCart() { cartDrawer.classList.remove('open'); cartOverlay.classList.remove('open'); }
document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

/* ---------- MOBILE MENU ---------- */
const mobDrawer = document.getElementById('mobDrawer');
const mobOverlay = document.getElementById('mobOverlay');
function openMob() { mobDrawer.classList.add('open'); mobOverlay.classList.add('open'); }
function closeMob() { mobDrawer.classList.remove('open'); mobOverlay.classList.remove('open'); }
document.getElementById('mobBtn').addEventListener('click', openMob);
document.getElementById('mobClose').addEventListener('click', closeMob);
mobOverlay.addEventListener('click', () => { closeMob(); closeCart(); });

/* ---------- CHECKOUT MODAL ---------- */
const checkoutBackdrop = document.getElementById('checkoutBackdrop');
const checkoutForm = document.getElementById('checkoutForm');
const successView = document.getElementById('successView');

function openCheckout() {
  if (Object.keys(cart).length === 0) { showToast('Your cart is empty'); return; }
  closeCart();
  checkoutForm.style.display = 'block';
  successView.style.display = 'none';
  checkoutBackdrop.classList.add('show');
}
function closeCheckout() { checkoutBackdrop.classList.remove('show'); }

document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
document.getElementById('checkoutClose').addEventListener('click', closeCheckout);
document.getElementById('checkoutFormEl').addEventListener('submit', e => {
  e.preventDefault();
  checkoutForm.style.display = 'none';
  successView.style.display = 'block';
  cart = {};
  updateCart();
});
document.getElementById('successClose').addEventListener('click', closeCheckout);

/* ---------- TOAST ---------- */
let toastTimer;
function showToast(text) {
  const toast = document.getElementById('toast');
  document.getElementById('toastText').textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}