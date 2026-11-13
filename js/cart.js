/**
 * Demo Café — Client-Side Shopping Cart & WhatsApp Ordering
 * 
 * Manages cart state in localStorage, renders slideout cart drawer,
 * computes subtotals and taxes, and formats click-to-chat WhatsApp orders.
 */

const DemoCart = (() => {
  const STORAGE_KEY = "demo_cafe_cart";
  const CUSTOMER_KEY = "demo_customer_draft";

  // Helper to retrieve cart items from localStorage
  const getCart = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn("Could not read cart from localStorage:", e);
      return [];
    }
  };

  // Helper to persist cart items to localStorage
  const saveCart = (items) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Could not save cart to localStorage:", e);
    }
  };

  // Get single product information by ID
  const getProductById = (id) => {
    if (typeof MENU_ITEMS !== "undefined") {
      return MENU_ITEMS.find(item => item.id === id);
    }
    return null;
  };

  // Add an item to the cart
  const addItem = (productId, quantity = 1) => {
    const product = getProductById(productId);
    if (!product) {
      console.error("Product not found:", productId);
      return;
    }

    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity
      });
    }

    saveCart(cart);
    updateUI();
    showToast(`Added ${quantity}x "${product.name}" to cart`);
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    let cart = getCart();
    if (newQuantity <= 0) {
      cart = cart.filter(item => item.id !== productId);
    } else {
      const item = cart.find(item => item.id === productId);
      if (item) {
        item.quantity = newQuantity;
      }
    }
    saveCart(cart);
    updateUI();
  };

  // Remove an item entirely
  const removeItem = (productId) => {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    cart = cart.filter(i => i.id !== productId);
    saveCart(cart);
    updateUI();
    if (item) {
      showToast(`Removed "${item.name}" from cart`);
    }
  };

  // Clear entire cart
  const clearCart = () => {
    saveCart([]);
    updateUI();
  };

  // Calculate Subtotal, Tax and Grand Total
  const getTotals = () => {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxRate = (typeof CAFE_CONFIG !== "undefined" && CAFE_CONFIG.tax) ? CAFE_CONFIG.tax.rate : 0.05;
    const tax = Math.round(subtotal * taxRate);
    const total = subtotal + tax;
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal,
      tax,
      total,
      count
    };
  };

  // Update UI representations of the cart
  const updateUI = () => {
    const totals = getTotals();
    const cart = getCart();

    // 1. Update all cart count badges in header
    const badges = document.querySelectorAll(".cart-counter-badge");
    badges.forEach(badge => {
      badge.textContent = totals.count;
      badge.style.display = totals.count > 0 ? "inline-flex" : "none";
    });

    // 2. Render cart items inside drawer
    const container = document.getElementById("cartItemsContainer");
    const footer = document.getElementById("cartFooter");

    if (container) {
      if (cart.length === 0) {
        container.innerHTML = `
          <div class="cart-empty-state">
            <div class="cart-empty-icon">☕</div>
            <h3 class="cart-empty-title">Your Cart is Empty</h3>
            <p>Explore our handcrafted coffee, artisanal bakes and savory bites to begin your order.</p>
            <a href="menu.html" class="btn btn-primary" style="margin-top: 1.5rem;" onclick="DemoCart.closeDrawer()">
              Explore Menu
            </a>
          </div>
        `;
        if (footer) footer.style.display = "none";
      } else {
        if (footer) footer.style.display = "block";
        const currency = (typeof CAFE_CONFIG !== "undefined") ? CAFE_CONFIG.currency.symbol : "₹";

        container.innerHTML = cart.map(item => `
          <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150'">
            <div class="cart-item-details">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">${currency}${item.price} each</div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.4rem;">
                <div class="quantity-stepper">
                  <button type="button" class="stepper-btn" onclick="DemoCart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                  <span class="stepper-value">${item.quantity}</span>
                  <button type="button" class="stepper-btn" onclick="DemoCart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <button type="button" class="cart-item-remove" onclick="DemoCart.removeItem('${item.id}')" title="Remove item">
                  ✕ Remove
                </button>
              </div>
            </div>
          </div>
        `).join("");

        // Update Subtotal, Tax, and Total fields
        const subtotalEl = document.getElementById("cartSubtotal");
        const taxEl = document.getElementById("cartTax");
        const totalEl = document.getElementById("cartTotal");

        if (subtotalEl) subtotalEl.textContent = `${currency}${totals.subtotal}`;
        if (taxEl) taxEl.textContent = `${currency}${totals.tax}`;
        if (totalEl) totalEl.textContent = `${currency}${totals.total}`;
      }
    }
  };

  // Open & Close Cart Drawer
  const openDrawer = () => {
    const overlay = document.getElementById("cartDrawerOverlay");
    if (overlay) {
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  const closeDrawer = () => {
    const overlay = document.getElementById("cartDrawerOverlay");
    if (overlay) {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  };

  const toggleDrawer = () => {
    const overlay = document.getElementById("cartDrawerOverlay");
    if (overlay && overlay.classList.contains("active")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  // Toast notification helper
  const showToast = (message) => {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <span style="color: #C29A66; font-size: 1.2rem;">☕</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-out");
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  };

  // Process WhatsApp Click-to-Chat Checkout
  const checkoutViaWhatsApp = () => {
    const cart = getCart();
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    const nameInput = document.getElementById("cartCustomerName");
    const phoneInput = document.getElementById("cartCustomerPhone");
    const notesInput = document.getElementById("cartCustomerNotes");
    const orderTypeRadio = document.querySelector('input[name="cartOrderType"]:checked');

    const customerName = nameInput ? nameInput.value.trim() : "";
    const customerPhone = phoneInput ? phoneInput.value.trim() : "";
    const customerNotes = notesInput ? notesInput.value.trim() : "";
    const orderType = orderTypeRadio ? orderTypeRadio.value : "Takeaway";

    if (!customerName) {
      alert("Please enter your name so we know who the order is for.");
      if (nameInput) nameInput.focus();
      return;
    }

    if (!customerPhone || customerPhone.length < 8) {
      alert("Please enter a valid contact phone number.");
      if (phoneInput) phoneInput.focus();
      return;
    }

    const totals = getTotals();
    const currency = (typeof CAFE_CONFIG !== "undefined") ? CAFE_CONFIG.currency.symbol : "₹";
    const waNumber = (typeof CAFE_CONFIG !== "undefined") ? CAFE_CONFIG.whatsappNumber : "918779747746";

    // Format the WhatsApp message cleanly with emojis and bold text
    let message = `☕ *NEW ORDER — DEMO CAFÉ*\n`;
    message += `--------------------------------------\n`;
    message += `👤 *Customer:* ${customerName}\n`;
    message += `📞 *Phone:* ${customerPhone}\n`;
    message += `📍 *Order Type:* ${orderType}\n`;
    if (customerNotes) {
      message += `📝 *Notes/Allergies:* ${customerNotes}\n`;
    }
    message += `--------------------------------------\n`;
    message += `*ORDER ITEMS:*\n`;

    cart.forEach(item => {
      const itemSubtotal = item.price * item.quantity;
      message += `• ${item.quantity}x ${item.name} — ${currency}${itemSubtotal} (${currency}${item.price} each)\n`;
    });

    message += `--------------------------------------\n`;
    message += `Subtotal: ${currency}${totals.subtotal}\n`;
    message += `GST (5%): ${currency}${totals.tax}\n`;
    message += `*Total Amount:* ${currency}${totals.total}\n`;
    message += `--------------------------------------\n`;
    message += `_Please confirm availability and estimated preparation time._`;

    // Encode message for URL
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${waNumber}?text=${encoded}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Close cart drawer & show friendly status
    closeDrawer();
    alert(`Your order draft has been opened in WhatsApp!\n\nPlease press "Send" in WhatsApp to submit your order to Demo Café.\n\nNote: Orders are pending until confirmed by our barista team.`);
  };

  // Initialize on page load
  const init = () => {
    updateUI();

    // Attach click events to close drawer on overlay click
    const overlay = document.getElementById("cartDrawerOverlay");
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeDrawer();
      });
    }

    // Escape key closes drawer
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
  };

  return {
    init,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getTotals,
    getCart,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    checkoutViaWhatsApp
  };
})();

if (typeof window !== "undefined") {
  window.DemoCart = DemoCart;
}

// Auto-initialize when DOM is ready
document.addEventListener("DOMContentLoaded", DemoCart.init);

