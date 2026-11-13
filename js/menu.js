/**
 * Demo Café — Interactive Digital Menu
 * 
 * Powers category filtering, search, sorting, product details modal,
 * and seamless integration with the shopping cart.
 */

const DemoMenu = (() => {
  let activeCategory = "all";
  let searchQuery = "";
  let currentSort = "featured";
  let vegOnlyFilter = false;

  // Render the 5 Featured Favorites on the homepage
  const renderFeaturedFavorites = () => {
    const container = document.getElementById("featuredFavoritesContainer");
    if (!container || typeof MENU_ITEMS === "undefined") return;

    // Grab the 5 featured items matching the reference design
    // Cappuccino, Cold Coffee, Chocolate Cake, Blueberry Cheesecake, Butter Croissant
    const targetIds = ["cappuccino", "cold-coffee", "chocolate-cake", "blueberry-cheesecake", "butter-croissant"];
    const featuredItems = targetIds
      .map(id => MENU_ITEMS.find(item => item.id === id))
      .filter(Boolean);

    const currency = (typeof CAFE_CONFIG !== "undefined") ? CAFE_CONFIG.currency.symbol : "₹";

    container.innerHTML = featuredItems.map(item => `
      <div class="product-card" data-id="${item.id}">
        ${item.isBestseller ? `
          <div class="product-badge-crown" title="Bestseller">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
            </svg>
          </div>
        ` : ""}
        <div class="product-card-thumb-wrap">
          <img src="${item.image}" alt="${item.name}" class="product-card-thumb" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'">
        </div>
        <div class="product-card-body">
          <h4 class="product-card-name">${item.name}</h4>
          <div class="product-card-price">${currency}${item.price}</div>
          <button type="button" class="btn-card-add" onclick="DemoCart.addItem('${item.id}', 1)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    `).join("");
  };

  // Render the full interactive menu on menu.html
  const renderFullMenu = () => {
    const grid = document.getElementById("menuGridContainer");
    if (!grid || typeof MENU_ITEMS === "undefined") return;

    let items = [...MENU_ITEMS];

    // Filter by Category
    if (activeCategory !== "all") {
      items = items.filter(item => item.category === activeCategory);
    }

    // Filter by Veg
    if (vegOnlyFilter) {
      items = items.filter(item => item.isVegetarian);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Sort items
    if (currentSort === "price-low") {
      items.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-high") {
      items.sort((a, b) => b.price - a.price);
    } else if (currentSort === "rating") {
      items.sort((a, b) => b.rating - a.rating);
    } else if (currentSort === "name") {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === "featured") {
      items.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    const currency = (typeof CAFE_CONFIG !== "undefined") ? CAFE_CONFIG.currency.symbol : "₹";

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: #6B5E55;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #21150F; margin-bottom: 0.5rem;">No items found</h3>
          <p>We couldn't find anything matching "${searchQuery}". Try a different category or search term.</p>
          <button type="button" class="btn btn-primary" style="margin-top: 1.5rem;" onclick="DemoMenu.resetFilters()">
            Reset All Filters
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => `
      <div class="menu-card" data-id="${item.id}" data-category="${item.category}">
        <div class="menu-card-img-wrap">
          <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'">
          ${item.isVegetarian ? `<div class="veg-badge" title="Vegetarian"></div>` : ""}
          ${item.isBestseller ? `<div class="menu-card-badge badge-bestseller">Bestseller</div>` : ""}
        </div>
        <div class="menu-card-content">
          <div class="menu-card-header">
            <h3 class="menu-card-title">${item.name}</h3>
            <div class="menu-card-price">${currency}${item.price}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.8rem; color: #6B5E55;">
            <span style="color: #F5A623;">★ ${item.rating}</span>
            <span>(${item.reviews} reviews)</span>
          </div>
          <p class="menu-card-desc">${item.description}</p>
          <div class="menu-card-footer">
            <button type="button" class="btn-card-add" onclick="DemoCart.addItem('${item.id}', 1)" style="flex-grow: 1;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Add to Cart
            </button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="DemoMenu.showProductModal('${item.id}')" title="View Details">
              Details
            </button>
          </div>
        </div>
      </div>
    `).join("");
  };

  // Product quick-view modal
  const showProductModal = (productId) => {
    const item = MENU_ITEMS.find(p => p.id === productId);
    if (!item) return;

    const currency = (typeof CAFE_CONFIG !== "undefined") ? CAFE_CONFIG.currency.symbol : "₹";

    let modal = document.getElementById("productDetailsModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "productDetailsModal";
      modal.className = "cart-drawer-overlay";
      modal.style.zIndex = "3500";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div style="background: #fff; width: 92%; max-width: 520px; border-radius: var(--radius-lg); overflow: hidden; margin: 40px auto; box-shadow: var(--shadow-dark); border: 1px solid rgba(194, 154, 102, 0.3); position: relative;">
        <button type="button" onclick="document.getElementById('productDetailsModal').classList.remove('active')" style="position: absolute; top: 12px; right: 12px; z-index: 10; width: 36px; height: 36px; border-radius: 50%; background: rgba(33, 21, 15, 0.7); color: #fff; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer;">
          ✕
        </button>
        <div style="height: 260px; overflow: hidden; position: relative;">
          <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
          ${item.isBestseller ? `<div class="menu-card-badge badge-bestseller">★ Bestseller</div>` : ""}
        </div>
        <div style="padding: 1.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
            <h2 style="font-family: var(--font-heading); font-size: 1.6rem; color: #21150F;">${item.name}</h2>
            <div style="font-size: 1.5rem; font-weight: 700; color: #C29A66;">${currency}${item.price}</div>
          </div>
          <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
            ${(item.tags || []).map(tag => `
              <span style="font-size: 0.75rem; background: #FAF6F0; border: 1px solid rgba(194,154,102,0.25); color: #38251C; padding: 0.2rem 0.6rem; border-radius: 999px;">${tag}</span>
            `).join("")}
          </div>
          <p style="color: #6B5E55; line-height: 1.6; font-size: 0.95rem; margin-bottom: 1.5rem;">${item.description}</p>
          <div style="display: flex; gap: 1rem;">
            <button type="button" class="btn btn-primary" style="flex-grow: 1;" onclick="DemoCart.addItem('${item.id}', 1); document.getElementById('productDetailsModal').classList.remove('active');">
              Add to Cart — ${currency}${item.price}
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("active");
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.remove("active");
    };
  };

  const resetFilters = () => {
    activeCategory = "all";
    searchQuery = "";
    currentSort = "featured";
    vegOnlyFilter = false;

    const searchInput = document.getElementById("menuSearchInput");
    if (searchInput) searchInput.value = "";

    const sortSelect = document.getElementById("menuSortSelect");
    if (sortSelect) sortSelect.value = "featured";

    document.querySelectorAll(".category-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.category === "all");
    });

    renderFullMenu();
  };

  // Wire search input, category buttons, and sort select
  const initControls = () => {
    // Check URL parameters (e.g. ?category=hot-coffee)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get("category");
    if (catParam) {
      activeCategory = catParam;
    }
    const searchParam = urlParams.get("search");
    if (searchParam) {
      searchQuery = searchParam;
    }

    // Category Tabs
    const tabs = document.querySelectorAll(".category-tab-btn");
    tabs.forEach(tab => {
      if (tab.dataset.category === activeCategory) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }

      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeCategory = tab.dataset.category;
        renderFullMenu();
      });
    });

    // Search Input
    const searchInput = document.getElementById("menuSearchInput");
    if (searchInput) {
      if (searchQuery) searchInput.value = searchQuery;
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        renderFullMenu();
      });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById("menuSortSelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        currentSort = e.target.value;
        renderFullMenu();
      });
    }

    // Veg Toggle
    const vegCheckbox = document.getElementById("filterVegOnly");
    if (vegCheckbox) {
      vegCheckbox.addEventListener("change", (e) => {
        vegOnlyFilter = e.target.checked;
        renderFullMenu();
      });
    }
  };

  const init = () => {
    renderFeaturedFavorites();
    initControls();
    renderFullMenu();
  };

  return {
    init,
    renderFeaturedFavorites,
    renderFullMenu,
    showProductModal,
    resetFilters
  };
})();

if (typeof window !== "undefined") {
  window.DemoMenu = DemoMenu;
}

document.addEventListener("DOMContentLoaded", DemoMenu.init);

