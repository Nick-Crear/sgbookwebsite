// Build: RESPON-20260408-002 | Release: #50 | RESPON-20260408-002 | Env: STAGING
// Project: 132 | Author: 1dd174a8-8af8-4803-979e-8b0d9a3ef4bf | Generated: 2026-04-08T09:37:36.557Z | Build: #2
// Project: 132 | Author: 1dd174a8-8af8-4803-979e-8b0d9a3ef4bf | Generated: 2026-04-07T11:12:35.533Z | Build: #1
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scroll Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Search Functionality ---
    const searchInput = document.getElementById('site-search');
    const bookCards = document.querySelectorAll('.book-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            bookCards.forEach(card => {
                const title = (card.getAttribute('data-title') || '').toLowerCase();
                const author = (card.getAttribute('data-author') || '').toLowerCase();
                
                if (title.includes(searchTerm) || author.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // --- Form Validation & Submission ---
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');

    const isValidEmail = (email) => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    };

    const validateEmail = () => {
        if (!emailInput) return false;
        const val = emailInput.value.trim();
        if (!val || !isValidEmail(val)) {
            emailInput.classList.add('error');
            if (emailError) emailError.style.display = 'block';
            return false;
        } else {
            emailInput.classList.remove('error');
            if (emailError) emailError.style.display = 'none';
            return true;
        }
    };

    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', () => {
            if(emailInput.classList.contains('error')) validateEmail();
        });
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validateEmail()) return;

            const emailValue = emailInput.value.trim();
            
            // Loading state
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Subscribing...';
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback';

            try {
                // Simulate a brief network delay for UX feedback
                await new Promise(resolve => setTimeout(resolve, 500));

                form.reset();
                formFeedback.textContent = 'Thank you for subscribing!';
                formFeedback.classList.add('feedback-success');
            } catch (error) {
                formFeedback.textContent = 'Something went wrong. Please try again.';
                formFeedback.classList.add('feedback-error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // --- Handle broken images globally ---
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="180" viewBox="0 0 120 180"><rect width="120" height="180" fill="%23ddd"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999">No Image</text></svg>');
            e.target.onerror = null;
        }
    }, true);

    // --- Shopping Cart Logic ---
    let cart = [];
    
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartToggleBtn = document.getElementById('cart-toggle');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountEl = document.getElementById('cart-count');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    const toggleCart = () => {
        if (!cartDrawer || !cartOverlay) return;
        const isOpen = cartDrawer.classList.contains('active');
        if (isOpen) {
            cartDrawer.classList.remove('active');
            cartOverlay.classList.remove('active');
            cartDrawer.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        } else {
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
            cartDrawer.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    };

    if (cartToggleBtn) cartToggleBtn.addEventListener('click', toggleCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);
    
    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (cartDrawer && cartDrawer.classList.contains('active')) {
                toggleCart();
            }
            if (liveRoomOverlay && liveRoomOverlay.classList.contains('active')) {
                closeLiveRoom();
            }
        }
    });

    const updateCartUI = () => {
        if (!cartCountEl || !cartItemsContainer || !cartTotalPriceEl || !checkoutBtn) return;
        
        // Update badge
        cartCountEl.textContent = cart.length;
        
        // Default empty state
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-msg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line></svg>
                    <p>Your cart is empty.</p>
                </div>
            `;
            cartTotalPriceEl.textContent = '$0.00';
            checkoutBtn.classList.add('disabled');
            return;
        }

        // Render items
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-author">${item.author}</div>
                    <div class="cart-item-price-row">
                        <span>$${item.price.toFixed(2)}</span>
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        cartTotalPriceEl.textContent = `$${total.toFixed(2)}`;
        checkoutBtn.classList.remove('disabled');

        // Attach remove listeners
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Simple confirmation for destructive action
                if(confirm("Remove this item from cart?")) {
                    const index = parseInt(e.target.getAttribute('data-index'));
                    removeFromCart(index);
                }
            });
        });
    };

    const addToCart = (card) => {
        const id = card.getAttribute('data-id') || '';
        const title = card.getAttribute('data-title') || 'Unknown Title';
        const author = card.getAttribute('data-author') || 'Unknown Author';
        const price = parseFloat(card.getAttribute('data-price')) || 0;
        const imgEl = card.querySelector('img');
        const imgSrc = imgEl ? imgEl.getAttribute('src') || '' : '';

        cart.push({
            id, title, author, price, image: imgSrc
        });

        updateCartUI();
        
        // Visual feedback
        if (cartToggleBtn) {
            cartToggleBtn.style.transform = 'scale(1.2)';
            setTimeout(() => cartToggleBtn.style.transform = 'scale(1)', 200);
        }
        
        // Optional: Open drawer optionally
        if(cartDrawer && !cartDrawer.classList.contains('active')) {
             toggleCart();
        }
    };

    const removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.book-card');
            if (card) {
                addToCart(card);
            }
        });
    });

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if(cart.length > 0) {
                alert('Proceeding to checkout workflow (mock).');
            }
        });
    }

    // --- Live Reading Room Logic ---
    const liveRoomBtn = document.getElementById('join-live-btn');
    const liveRoomOverlay = document.getElementById('live-room-overlay');
    const closeLiveRoomBtn = document.getElementById('close-live-room');
    
    const syncTexts = document.querySelectorAll('.sync-text');
    const chatArea = document.getElementById('live-chat-area');
    const chatForm = document.getElementById('live-chat-form');
    const chatInput = document.getElementById('live-chat-input');
    const reactionBtns = document.querySelectorAll('.reaction-btn');
    const interactionControls = document.querySelector('.interaction-controls');
    
    let mockSyncInterval;
    let mockChatInterval;
    let currentSyncIndex = -1;
    
    const openLiveRoom = (e) => {
        if(e) e.preventDefault();
        if(!liveRoomOverlay) return;
        liveRoomOverlay.classList.add('active');
        liveRoomOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        startMockLiveSession();
    };
    
    const closeLiveRoom = () => {
        if(!liveRoomOverlay) return;
        liveRoomOverlay.classList.remove('active');
        liveRoomOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        stopMockLiveSession();
    };

    if (liveRoomBtn) liveRoomBtn.addEventListener('click', openLiveRoom);
    if (closeLiveRoomBtn) closeLiveRoomBtn.addEventListener('click', closeLiveRoom);
    
    const startMockLiveSession = () => {
        currentSyncIndex = -1;
        syncTexts.forEach(el => el.classList.remove('active'));
        
        // Mock WebSocket Sync Text
        mockSyncInterval = setInterval(() => {
            if (currentSyncIndex >= 0 && currentSyncIndex < syncTexts.length) {
                syncTexts[currentSyncIndex].classList.remove('active');
            }
            currentSyncIndex++;
            if (currentSyncIndex >= syncTexts.length) {
                currentSyncIndex = 0; 
            }
            if (syncTexts[currentSyncIndex]) {
                syncTexts[currentSyncIndex].classList.add('active');
                syncTexts[currentSyncIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 4000);
        
        // Mock incoming chat
        const mockMessages = [
            { user: 'Sam_Reader', text: 'This part always gives me chills.' },
            { user: 'Bookworm99', text: 'The imagery here is just fantastic.' },
            { user: 'Jordan', text: 'Can\'t wait for the next chapter!' }
        ];
        
        let msgIndex = 0;
        mockChatInterval = setInterval(() => {
            if (msgIndex < mockMessages.length) {
                appendChatMessage(mockMessages[msgIndex].user, mockMessages[msgIndex].text);
                msgIndex++;
            }
        }, 6500);
    };
    
    const stopMockLiveSession = () => {
        clearInterval(mockSyncInterval);
        clearInterval(mockChatInterval);
    };
    
    const appendChatMessage = (user, text) => {
        if (!chatArea) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message';
        msgDiv.innerHTML = `<span class="chat-user">${user}:</span> <span>${text}</span>`;
        chatArea.appendChild(msgDiv);
        chatArea.scrollTop = chatArea.scrollHeight;
    };
    
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = chatInput.value.trim();
            if (val) {
                appendChatMessage('You', val);
                chatInput.value = '';
                
                // Mock host reply
                setTimeout(() => {
                    appendChatMessage('System', 'Your message was sent successfully.');
                }, 1000);
            }
        });
    }

    if (reactionBtns) {
        reactionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const emoji = btn.getAttribute('data-emoji');
                const floater = document.createElement('div');
                floater.className = 'floating-reaction';
                floater.textContent = emoji;
                
                // Random position logic relative to button
                const rect = btn.getBoundingClientRect();
                const containerRect = interactionControls.getBoundingClientRect();
                
                const leftPos = (rect.left - containerRect.left) + (rect.width / 2) - 12;
                floater.style.left = `${leftPos}px`;
                interactionControls.appendChild(floater);
                
                setTimeout(() => {
                    floater.remove();
                }, 2000);
            });
        });
    }

    // --- Hero Slider ---
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.slide');
        const dots = heroSlider.querySelectorAll('.dot');
        const prevBtn = heroSlider.querySelector('.prev-btn');
        const nextBtn = heroSlider.querySelector('.next-btn');
        let currentSlide = 0;
        let slideInterval;

        const showSlide = (n) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => showSlide(currentSlide + 1);
        const prevSlide = () => showSlide(currentSlide - 1);

        const startSlider = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const stopSlider = () => {
            clearInterval(slideInterval);
        };

        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopSlider(); startSlider(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopSlider(); startSlider(); });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopSlider();
                startSlider();
            });
        });

        heroSlider.addEventListener('mouseenter', stopSlider);
        heroSlider.addEventListener('mouseleave', startSlider);

        startSlider();
    }
});
