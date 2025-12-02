const products = [
    {
        id: 1,
        name: 'Bvlgari serpent',
        price: 299,
        desc: 'Timeless design with leather strap',
        badge: 'New',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 2,
        name: 'Tissot',
        price: 399,
        desc: 'Luxurious premium watch',
        badge: 'Popular',
        image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 3,
        name: 'Chrono',
        price: 499,
        desc: 'Premium steel strapchrono watch',
        badge: 'Luxury',
        image: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 4,
        name: 'iWatch',
        price: 499,
        desc: 'with OLED screen',
        badge: 'Tech',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 5,
        name: 'Vintage Style',
        price: 349,
        desc: 'Retro inspired timepiece',
        badge: 'Classic',
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 6,
        name: 'Diver Pro',
        price: 599,
        desc: 'Professional diving watch with Tachymeter',
        badge: 'Sport',
        image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 7,
        name: 'Minimalist',
        price: 249,
        desc: 'Clean and simple design',
        badge: 'Minimal',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 8,
        name: 'Samsung Watch',
        price: 699,
        desc: 'White Circular OLED',
        badge: 'Pro',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80'
    }
];

let cart = [];

function init() {
    renderProducts();
    updateCartUI();
}

function renderProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    const allContainer = document.getElementById('allProducts');

    const featuredHTML = products.slice(0, 4).map(p => createProductCard(p)).join('');
    const allHTML = products.map(p => createProductCard(p)).join('');

    featuredContainer.innerHTML = featuredHTML;
    allContainer.innerHTML = allHTML;
}

function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-badge">${product.badge}</div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
    showNotification('Added to cart!');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');

    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some watches to get started!</p>
            </div>
        `;
    } else {
        const total = cart.reduce((sum, item) => sum + item.price, 0);

        cartItems.innerHTML = `
            ${cart.map((item, index) => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price}</div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${index})">×</button>
                </div>
            `).join('')}
            <div class="cart-total">
                <h3>Total: <span class="cart-total-amount">$${total}</span></h3>
                <button class="btn btn-primary" style="margin-top: 1rem;" onclick="checkout()">Checkout</button>
            </div>
        `;
    }
}

function toggleCart() {
    document.getElementById('cartModal').classList.toggle('active');
}

function checkout() {
    alert('Thank you for your order! Total: $' + cart.reduce((sum, item) => sum + item.price, 0));
    cart = [];
    updateCartUI();
    toggleCart();
}

function showPage(pageName) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(pageName).classList.add('active');
    window.scrollTo(0, 0);

    document.getElementById('navLinks').classList.remove('active');
}

function toggleMobileMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

function handleContactSubmit(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

init();

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('themeToggle').textContent = '☀️';
}
