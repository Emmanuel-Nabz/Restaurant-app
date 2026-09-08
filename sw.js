// ============================================================
// SERVICE WORKER FOR NABZ-TECH EATS
// ============================================================

const CACHE_NAME = 'nabz-eats-v1';
const urlsToCache = [
    '/restaurant-app/',
    '/restaurant-app/restaurant.html',
    '/restaurant-app/manifest.json'
];

// Install the service worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('✅ Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch from cache if available
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});

// Update service worker
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
// ============================================================
// BOTTOM NAVIGATION FUNCTIONS
// ============================================================

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveNav('home');
}

function scrollToMenu() {
    var menu = document.getElementById('menuContainer');
    if (menu) {
        menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveNav('menu');
    }
}

function scrollToCart() {
    var cart = document.querySelector('.cart-section');
    if (cart) {
        cart.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveNav('cart');
    }
}

function scrollToContact() {
    var contact = document.querySelector('.contact-details');
    if (contact) {
        contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveNav('contact');
    }
}

function setActiveNav(activeId) {
    var items = document.querySelectorAll('.bottom-nav .nav-item');
    items.forEach(function(item) {
        item.classList.remove('active');
    });
    // Find the matching button
    var buttons = document.querySelectorAll('.bottom-nav .nav-item');
    var names = ['home', 'menu', 'cart', 'contact'];
    for (var i = 0; i < buttons.length; i++) {
        if (names[i] === activeId) {
            buttons[i].classList.add('active');
        }
    }
}

// Update cart badge on bottom nav
function updateNavBadge() {
    var badge = document.getElementById('navCartBadge');
    var totalItems = 0;
    for (var i = 0; i < cart.length; i++) {
        totalItems += cart[i].quantity;
    }
    if (badge) {
        badge.textContent = totalItems;
        if (totalItems === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'inline';
        }
    }
}

// Update the renderCart function to also update the badge
var originalRenderCart = renderCart;
renderCart = function() {
    originalRenderCart();
    updateNavBadge();
};