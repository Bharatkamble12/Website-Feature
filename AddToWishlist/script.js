const cartCount=document.getElementById('cart-count');
const wishlistCount=document.getElementById('wishlist-count');
let cartItems=new Set();
let wishlistItems=new Set();

// Load from localStorage on page load
function loadFromStorage() {
    const savedCart = localStorage.getItem('cartItems');
    const savedWishlist = localStorage.getItem('wishlistItems');
    if (savedCart) {
        cartItems = new Set(JSON.parse(savedCart));
    }
    if (savedWishlist) {
        wishlistItems = new Set(JSON.parse(savedWishlist));
    }
    updateCounts();
    updateButtons();
    renderViews();
}

// Save to localStorage
function saveToStorage() {
    localStorage.setItem('cartItems', JSON.stringify([...cartItems]));
    localStorage.setItem('wishlistItems', JSON.stringify([...wishlistItems]));
}

// Update counts with animation
function updateCounts() {
    cartCount.textContent = cartItems.size;
    wishlistCount.textContent = wishlistItems.size;
    cartCount.classList.add('counter-update');
    wishlistCount.classList.add('counter-update');
    setTimeout(() => {
        cartCount.classList.remove('counter-update');
        wishlistCount.classList.remove('counter-update');
    }, 200);
}

// Update button states
function updateButtons() {
    document.querySelectorAll('.product-card').forEach(card => {
        const id = card.dataset.id;
        const cartBtn = card.querySelector('.cart-btn');
        const wishBtn = card.querySelector('.wish-btn');
        if (cartItems.has(id)) {
            cartBtn.textContent = 'Remove from Cart';
            cartBtn.classList.add('added');
        } else {
            cartBtn.textContent = 'Add to Cart';
            cartBtn.classList.remove('added');
        }
        if (wishlistItems.has(id)) {
            wishBtn.textContent = 'Remove from Wishlist';
            wishBtn.classList.add('added');
        } else {
            wishBtn.textContent = 'Add to Wishlist';
            wishBtn.classList.remove('added');
        }
    });
}

// Render cart and wishlist views
function renderViews() {
    const cartContainer = document.getElementById('cart-items');
    const wishlistContainer = document.getElementById('wishlist-items');
    cartContainer.innerHTML = '';
    wishlistContainer.innerHTML = '';

    // Render cart items
    cartItems.forEach(id => {
        const card = document.querySelector(`.product-card[data-id="${id}"]`);
        if (card) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item-card';
            itemDiv.innerHTML = `
                <img src="${card.querySelector('img').src}" alt="${card.querySelector('h3').textContent}">
                <h4>${card.querySelector('h3').textContent}</h4>
                <button class="remove-btn" onclick="removeFromCart('${id}')">Remove</button>
            `;
            cartContainer.appendChild(itemDiv);
        }
    });

    // Render wishlist items
    wishlistItems.forEach(id => {
        const card = document.querySelector(`.product-card[data-id="${id}"]`);
        if (card) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item-card';
            itemDiv.innerHTML = `
                <img src="${card.querySelector('img').src}" alt="${card.querySelector('h3').textContent}">
                <h4>${card.querySelector('h3').textContent}</h4>
                <button class="remove-btn" onclick="removeFromWishlist('${id}')">Remove</button>
            `;
            wishlistContainer.appendChild(itemDiv);
        }
    });
}

// Toggle views
function toggleCartView() {
    const view = document.getElementById('cart-view');
    const wishlistView = document.getElementById('wishlist-view');
    wishlistView.classList.add('hidden');
    view.classList.toggle('hidden');
}

function toggleWishlistView() {
    const view = document.getElementById('wishlist-view');
    const cartView = document.getElementById('cart-view');
    cartView.classList.add('hidden');
    view.classList.toggle('hidden');
}

// Remove functions
function removeFromCart(id) {
    cartItems.delete(id);
    saveToStorage();
    updateCounts();
    updateButtons();
    renderViews();
}

function removeFromWishlist(id) {
    wishlistItems.delete(id);
    saveToStorage();
    updateCounts();
    updateButtons();
    renderViews();
}

// Clear functions
document.getElementById('clear-cart').addEventListener('click', () => {
    cartItems.clear();
    saveToStorage();
    updateCounts();
    updateButtons();
    renderViews();
});

document.getElementById('clear-wishlist').addEventListener('click', () => {
    wishlistItems.clear();
    saveToStorage();
    updateCounts();
    updateButtons();
    renderViews();
});

// Initialize
loadFromStorage();

document.querySelectorAll('.product-card').forEach((card)=>{
    const id=card.dataset.id;
    const cartBtn=card.querySelector('.cart-btn');
    const wishBtn=card.querySelector('.wish-btn');

    cartBtn.addEventListener("click",()=>{
        if(cartItems.has(id)){
            cartItems.delete(id);
        } else {
            cartItems.add(id);
        }
        saveToStorage();
        updateCounts();
        updateButtons();
        renderViews();
    });

    wishBtn.addEventListener("click",()=>{
        if(wishlistItems.has(id)){
            wishlistItems.delete(id);
        } else {
            wishlistItems.add(id);
        }
        saveToStorage();
        updateCounts();
        updateButtons();
        renderViews();
    });
});
