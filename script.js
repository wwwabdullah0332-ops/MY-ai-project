const products = [
  { id: 1, name: 'STRIDE Falcon Elite', category: 'Football', price: 129, sizes: [8,9,10], color: 'Blue', brand: 'STRIDE', img: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=700&q=80', alt: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=700&q=80' },
  { id: 2, name: 'Velocity Dash Pro', category: 'Running', price: 99, sizes: [7,8,9,10], color: 'Red', brand: 'Velocity', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80', alt: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=700&q=80' },
  { id: 3, name: 'STRIDE Urban Flex', category: 'Casual', price: 79, sizes: [8,9,10,11], color: 'Black', brand: 'STRIDE', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80', alt: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=700&q=80' },
  { id: 4, name: 'Pace Aero Sprint', category: 'Running', price: 109, sizes: [7,8,9], color: 'White', brand: 'Pace', img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=700&q=80', alt: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=80' },
  { id: 5, name: 'STRIDE Street Nova', category: 'Sneakers', price: 119, sizes: [8,9,10,11], color: 'White', brand: 'STRIDE', img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=700&q=80', alt: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80' },
  { id: 6, name: 'Velocity Court Classic', category: 'Sneakers', price: 89, sizes: [7,8,9,10], color: 'Black', brand: 'Velocity', img: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=700&q=80', alt: 'https://images.unsplash.com/photo-1597248881519-db089d3744a5?auto=format&fit=crop&w=700&q=80' },
  { id: 7, name: 'STRIDE Turf Master', category: 'Football', price: 139, sizes: [9,10,11], color: 'Red', brand: 'STRIDE', img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80', alt: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=700&q=80' },
  { id: 8, name: 'Pace Everyday Comfort', category: 'Casual', price: 69, sizes: [7,8,9,10,11], color: 'Blue', brand: 'Pace', img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=80', alt: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=700&q=80' }
];

const cart = JSON.parse(localStorage.getItem('strideCart') || '[]');

function updateCartCount() {
  document.querySelectorAll('#cartCount').forEach(node => node.textContent = cart.length);
}

function productCard(product) {
  return `<article class="product-card">
    <div class="image-wrap">
      <img loading="lazy" src="${product.img}" alt="${product.name}" />
      <img loading="lazy" class="alt-angle" src="${product.alt}" alt="${product.name} alternate angle" />
    </div>
    <div class="product-card-content">
      <h3>${product.name}</h3>
      <p class="price">$${product.price}</p>
      <span class="size-badge">Sizes: ${product.sizes.join(', ')}</span>
      <div class="cta-row">
        <a class="btn btn-outline" href="product.html">Quick View</a>
        <button class="btn btn-primary" data-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  </article>`;
}

function renderFeatured() {
  const el = document.getElementById('featuredGrid');
  if (el) el.innerHTML = products.slice(0, 8).map(productCard).join('');
}

function renderShop(items = products) {
  const el = document.getElementById('shopGrid');
  if (!el) return;
  el.innerHTML = items.map(productCard).join('') || '<p>No products found.</p>';
}

function setupFilters() {
  const shopGrid = document.getElementById('shopGrid');
  if (!shopGrid) return;

  const apply = () => {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const size = document.getElementById('sizeFilter').value;
    const color = document.getElementById('colorFilter').value;
    const brand = document.getElementById('brandFilter').value;
    const price = document.getElementById('priceFilter').value;

    const filtered = products.filter(p => {
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchCategory = !category || p.category === category;
      const matchSize = !size || p.sizes.includes(Number(size));
      const matchColor = !color || p.color === color;
      const matchBrand = !brand || p.brand === brand;
      const matchPrice = !price || (p.price >= Number(price.split('-')[0]) && p.price <= Number(price.split('-')[1]));
      return matchQ && matchCategory && matchSize && matchColor && matchBrand && matchPrice;
    });
    renderShop(filtered);
  };

  ['searchInput', 'categoryFilter', 'sizeFilter', 'colorFilter', 'brandFilter', 'priceFilter']
    .forEach(id => document.getElementById(id).addEventListener('input', apply));

  const params = new URLSearchParams(window.location.search);
  if (params.get('category')) {
    document.getElementById('categoryFilter').value = params.get('category');
    apply();
  } else {
    renderShop();
  }
}

function setupCartActions() {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-id]')) {
      const id = Number(e.target.dataset.id);
      const found = products.find(p => p.id === id);
      if (found) {
        cart.push(found);
        localStorage.setItem('strideCart', JSON.stringify(cart));
        updateCartCount();
      }
    }
  });

  const addProductBtn = document.getElementById('addProductBtn');
  if (addProductBtn) {
    addProductBtn.addEventListener('click', () => {
      cart.push(products[0]);
      localStorage.setItem('strideCart', JSON.stringify(cart));
      updateCartCount();
    });
  }
}

function renderCart() {
  const wrapper = document.getElementById('cartItems');
  const total = document.getElementById('cartTotal');
  if (!wrapper || !total) return;
  wrapper.innerHTML = cart.map((item, idx) => `<div class="cart-item"><span>${idx + 1}. ${item.name}</span><strong>$${item.price}</strong></div>`).join('') || '<p>Your cart is empty.</p>';
  const sum = cart.reduce((acc, item) => acc + item.price, 0);
  total.textContent = `$${sum}`;
}

function setupNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

function setupTestimonials() {
  const carousel = document.getElementById('testimonialCarousel');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('blockquote')];
  let idx = 0;
  setInterval(() => {
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
  }, 3500);
}

function setupModal() {
  document.querySelectorAll('[data-open]').forEach(btn => btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.open)?.classList.add('open');
  }));
  document.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.close)?.classList.remove('open');
  }));
}

function setupGallery() {
  const main = document.getElementById('mainProductImage');
  const thumbs = document.querySelectorAll('.thumbs img');
  if (main && thumbs.length) thumbs.forEach(thumb => thumb.addEventListener('click', () => main.src = thumb.src));
}

function setupForms() {
  const newsletter = document.getElementById('newsletterForm');
  if (newsletter) newsletter.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for subscribing to STRIDE updates!');
    newsletter.reset();
  });
  const contact = document.querySelector('.contact-form');
  if (contact) contact.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks! We will contact you soon.');
    contact.reset();
  });
}

renderFeatured();
setupFilters();
setupCartActions();
renderCart();
setupNav();
setupTestimonials();
setupModal();
setupGallery();
setupForms();
updateCartCount();
