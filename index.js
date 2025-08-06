  
        // Sample product data
        const products = [
            {
                id: 1,
                name: "Wireless Headphones Pro",
                description: "Premium noise-canceling headphones with 30-hour battery life",
                price: 299.99,
                icon: "🎧"
            },
            {
                id: 2,
                name: "Smart Watch Ultra",
                description: "Advanced fitness tracking with GPS and health monitoring",
                price: 399.99,
                icon: "⌚"
            },
            {
                id: 3,
                name: "Wireless Speaker",
                description: "High-fidelity portable speaker with 360° sound",
                price: 199.99,
                icon: "🔊"
            },
            {
                id: 4,
                name: "Gaming Mouse Elite",
                description: "RGB gaming mouse with customizable buttons and precision tracking",
                price: 89.99,
                icon: "🖱️"
            },
            {
                id: 5,
                name: "USB-C Hub Pro",
                description: "7-in-1 hub with 4K HDMI, USB 3.0, and fast charging",
                price: 79.99,
                icon: "🔌"
            },
            {
                id: 6,
                name: "Smartphone Camera Lens",
                description: "Professional-grade lens attachment for mobile photography",
                price: 149.99,
                icon: "📱"
            }
        ];

        let cart = [];

        // Load products
        function loadProducts() {
            const productsGrid = document.getElementById('productsGrid');
            productsGrid.innerHTML = products.map(product => `
                <div class="product-card">
                    <div class="product-image">${product.icon}</div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">$${product.price}</div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Add to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({...product, quantity: 1});
            }
            
            updateCartUI();
            animateCartButton();
        }

        // Update cart UI
        function updateCartUI() {
            const cartCount = document.getElementById('cartCount');
            const cartItems = document.getElementById('cartItems');
            const totalAmount = document.getElementById('totalAmount');
            
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            cartCount.textContent = totalItems;
            cartCount.classList.toggle('show', totalItems > 0);
            
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">$${item.price}</div>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            `).join('');
            
            totalAmount.textContent = total.toFixed(2);
        }

        // Update quantity
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    cart = cart.filter(cartItem => cartItem.id !== productId);
                }
                updateCartUI();
            }
        }

        // Toggle cart
        function toggleCart() {
            const cartSidebar = document.getElementById('cartSidebar');
            const cartOverlay = document.getElementById('cartOverlay');
            
            cartSidebar.classList.toggle('open');
            cartOverlay.classList.toggle('show');
        }

        // Animate cart button
        function animateCartButton() {
            const cartBtn = document.querySelector('.cart-btn');
            cartBtn.classList.add('pulse');
            setTimeout(() => cartBtn.classList.remove('pulse'), 300);
        }

        // Checkout
        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            alert(`Thank you for your purchase! Total: $${total.toFixed(2)}\n\nThis is a demo. In a real store, you would be redirected to payment processing.`);
            
            cart = [];
            updateCartUI();
            toggleCart();
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            loadProducts();
            updateCartUI();
        });

        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    