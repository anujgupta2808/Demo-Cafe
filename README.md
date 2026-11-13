# Demo Café — Luxury Coffee House Website
### Responsive Website Without Database (Client-Side Architecture)

A modern, luxury, fully responsive website for **Demo Café**, built with HTML5, CSS3, Vanilla JavaScript, WhatsApp Click-to-Chat ordering, Table Reservations, and Google Maps integration.

Designed to match the aesthetic of an editorial, high-end European coffee house — with warm espresso tones, champagne gold metallic accents, silky microfoam typography, and zero server or database maintenance.

---

## ☕ Technology Stack & Philosophy

- **Frontend:** Semantic HTML5, CSS3 (CSS Grid, Flexbox, custom design tokens), Vanilla JavaScript (ES6+).
- **Architecture:** 100% Static Client-Side Application.
- **Hosting:** Netlify (Free Tier compatible, zero cold starts, global CDN distribution).
- **Ordering:** WhatsApp Click-to-Chat formatted ordering engine.
- **Reservations:** Client-side validated WhatsApp reservation request workflow with pending verification protocol.
- **Maps:** Google Maps responsive embed + dynamic "Get Directions" navigation deep-links.

### Strict Non-Database Architecture
- **No Database:** No MongoDB, PostgreSQL, MySQL, Firebase, or Supabase required.
- **No Backend:** No Node.js server, Express, or backend APIs to maintain or crash.
- **No Frontend Framework Overhead:** No React, Vue, or Angular build steps required; works straight out of any browser or static host.

---

## 📁 Project Structure

```
demo-cafe/
│
├── index.html            # Flagship Homepage (Hero Carousel, Bestsellers, Quick Reserve, Testimonials)
├── about.html            # Story, Roasting Philosophy, Master Baristas, 4 Core Pillars
├── menu.html             # Interactive Digital Menu with Instant Search, Sorting & Veg Filters
├── gallery.html          # Visual Gallery with Filter Tabs & Lightbox Modal Preview
├── reservation.html      # Comprehensive Table Booking Request Form with Date Validation
├── contact.html          # Contact Cards, Interactive Google Map, Direct WhatsApp Messaging & FAQs
│
├── css/
│   ├── style.css         # Master Luxury Design System, Theme Tokens, Typography & Components
│   └── responsive.css    # Responsive Breakpoints (320px, 375px, 425px, 768px, 1024px, 1280px, 1440px)
│
├── js/
│   ├── config.js         # Café Configuration (Phone, WhatsApp, Address, Hours, GST Tax, Maps)
│   ├── menu-data.js      # Self-Contained Menu Database (Items, Prices, Descriptions, Images, Tags)
│   ├── cart.js           # Shopping Cart Engine (localStorage, Stepper, Subtotal/Tax, WhatsApp Dispatch)
│   ├── menu.js           # Menu Renderer, Search Filter, Sort Logic & Quick View Modal
│   ├── reservation.js    # Date Validation (No Past Dates) & WhatsApp Booking Formatter
│   └── main.js           # Sticky Header, Mobile Drawer, Hero Slider, Testimonials & Lightbox
│
├── assets/
│   ├── logo/
│   │   ├── logo.svg      # Vector Brand Wordmark & Coffee Swirl Icon (Light/Cream)
│   │   ├── logo-dark.svg # Dark Variant for Light Backgrounds
│   │   └── favicon.svg   # Scalable Browser Tab Favicon
│   ├── icons/            # SVG vector icons
│   └── images/           # Curated imagery & fallbacks
│
├── netlify.toml          # Netlify Hosting & Security Headers Configuration
└── README.md             # Complete Documentation & Deployment Manual
```

---

## ⚙️ Administration & Updates (No Database Needed)

You do **not** need an expensive database, SQL query knowledge, or a backend administration dashboard. Updating your café website is as simple as editing two clean, well-commented JavaScript files:

### 1. Updating Café Information (`js/config.js`)
Open `js/config.js` to change:
- **WhatsApp Number:** Change `whatsappNumber: "918779747746"` to your real business WhatsApp number (country code + number without `+` or spaces).
- **Phone & Email:** Update `phone` and `email`.
- **Address & Directions:** Update `address.full` and paste your Google Maps link in `maps.directionsUrl`.
- **Opening Hours:** Change `hours.display` or seasonal timings.
- **Taxes & Delivery:** Modify `tax.rate` (default 5% GST) or delivery thresholds.

### 2. Updating Menu Items & Prices (`js/menu-data.js`)
Open `js/menu-data.js` to manage your menu:
```javascript
{
  id: "cappuccino",
  name: "Cappuccino",
  category: "hot-coffee",
  price: 180,           // Edit price here
  isBestseller: true,   // Show gold crown badge
  isVegetarian: true,   // Show green veg indicator
  available: true,      // Set to false if sold out
  description: "Espresso with equal parts of steamed milk and velvety microfoam...",
  image: "https://your-image-url.com/image.jpg"
}
```

---

## 🛒 WhatsApp Ordering & Table Reservations Workflow

### How WhatsApp Ordering Works:
1. Customer browses the menu and adds products to the shopping cart.
2. The cart automatically tracks quantities, computes subtotals, and calculates 5% GST tax.
3. Customer opens the cart drawer, provides their Name, WhatsApp phone number, and selects order type (*Dine-in*, *Takeaway*, or *Delivery*).
4. Clicking **"Order via WhatsApp"** opens WhatsApp Click-to-Chat pre-filled with an organized order summary:
   ```
   ☕ *NEW ORDER — DEMO CAFÉ*
   --------------------------------------
   👤 *Customer:* Rahul Sharma
   📞 *Phone:* +91 98765 00000
   📍 *Order Type:* Takeaway
   📝 *Notes:* Oat milk for cappuccino please

   *ORDER ITEMS:*
   • 2x Cappuccino — ₹360 (₹180 each)
   • 1x Butter Croissant — ₹120 (₹120 each)
   • 1x Blueberry Cheesecake — ₹280 (₹280 each)

   --------------------------------------
   Subtotal: ₹760
   GST (5%): ₹38
   *Total Amount:* ₹798
   --------------------------------------
   _Please confirm availability and estimated preparation time._
   ```
5. The customer hits **Send**, allowing the café staff to review and immediately confirm preparation time directly in WhatsApp.

### How Table Reservations Work:
1. Customers enter their Name, Phone, Date, Time, Number of Guests, and seating preference.
2. The form validates all required fields and **strictly prevents booking dates in the past**.
3. A formatted reservation request is generated and opened in WhatsApp.
4. The customer is clearly informed that their table request is **pending** until confirmed by café staff.

---

## 🚀 Netlify Deployment Guide (Free Tier)

This website is pre-configured for instant zero-configuration deployment to [Netlify](https://www.netlify.com).

### Method 1: Git-Based Automated Deployment (Recommended)
1. **Create a GitHub Repository:**
   - Log in to your GitHub account and click **New Repository**.
   - Name it `demo-cafe` and keep it Public or Private.
2. **Push Your Files to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Demo Cafe luxury static website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/demo-cafe.git
   git push -u origin main
   ```
3. **Connect to Netlify:**
   - Go to [Netlify App](https://app.netlify.com/) and click **Add new site** > **Import an existing project**.
   - Select **GitHub** and choose your `demo-cafe` repository.
4. **Deploy Settings:**
   - Base directory: *(leave empty)*
   - Build command: *(leave empty — no build step required!)*
   - Publish directory: `.`
   - Click **Deploy Site**.
   - Your website is now live worldwide in less than 30 seconds!

### Method 2: Manual Drag-and-Drop Deploy
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `demo-cafe` folder directly into your browser window.
3. Netlify will immediately publish your website and provide a free `https://<site-name>.netlify.app` URL.

### Connecting a Custom Domain:
1. In your Netlify dashboard, navigate to **Site configuration** > **Domain management**.
2. Click **Add a domain** and enter your domain name (e.g., `democafe.com`).
3. Add the Netlify DNS records (or CNAME/ALIAS) to your domain registrar (GoDaddy, Namecheap, Google Domains).
4. Netlify will automatically generate and renew a free Let's Encrypt SSL/TLS Certificate.

### Updating Your Live Website:
Whenever you change a price in `js/menu-data.js` or change your phone number in `js/config.js`:
```bash
git add js/menu-data.js
git commit -m "Update summer menu prices"
git push
```
Netlify automatically detects the commit and redeploys the site globally within seconds.

---

## 📱 Responsive Design Verification

The website layout has been rigorously designed with CSS Grid, Flexbox, `clamp()`, and media queries. Tested across all standard screen dimensions:
- **320px (Small Mobile):** Single-column stacked cards, compact typography, non-overflowing buttons.
- **375px & 425px (Modern Smartphones):** Refined mobile cart drawer, sticky header, touch-friendly tap targets.
- **768px (Tablets):** 2-column product grids, compact navigation, adjusted hero banners.
- **1024px (Small Laptops):** 3-column menu grids, balanced tri-card highlight row.
- **1280px & 1440px+ (Desktops & Retina Screens):** Full 5-card bestselling row, prominent special offer card, widescreen hero display.

---

## 📄 License & Credits
- Design System: Demo Café Luxury Editorial
- Imagery: High-resolution curated cafe & coffee assets via Unsplash CDN
- Fonts: Playfair Display & DM Sans (Google Fonts)
- © 2026 Demo Café. Crafted with ♥ for coffee lovers.

