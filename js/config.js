/**
 * Demo Café - Master Configuration File
 * 
 * Update your café details, contact information, hours, and WhatsApp ordering settings
 * in this file. Changes here take effect immediately across all pages.
 */
const CAFE_CONFIG = {
  // Brand Information
  name: "Demo Café",
  tagline: "Good Coffee. Beautiful Moments.",
  description: "Experience the perfect blend of premium coffee, delicious treats and cozy ambiance at Demo Café.",
  foundedYear: 2021,

  // WhatsApp Click-to-Chat Ordering & Reservations
  // Format: Country code + number without spaces, hyphens, or '+' (e.g., '918779747746' for India)
  whatsappNumber: "918779747746",
  whatsappDisplay: "+91 87797 47746",

  // Direct Phone & Email
  phone: "+91 87797 47746",
  phoneCallUrl: "tel:+918779747746",
  email: "hello@democafe.com",

  // Physical Location & Navigation
  address: {
    street: "123 Coffee Street, Inner Circle",
    locality: "Connaught Place",
    city: "New Delhi",
    postalCode: "110001",
    country: "India",
    full: "123 Coffee Street, Connaught Place, New Delhi 110001, India"
  },
  
  // Google Maps Integration
  maps: {
    directionsUrl: "https://maps.google.com/?q=Connaught+Place+New+Delhi",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114885741006!2d77.2144565!3d28.6328325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b027d121%3A0x4030157d067971b!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },

  // Operating Hours
  hours: {
    display: "Mon - Sun: 8:00 AM - 11:00 PM",
    weekday: "8:00 AM - 11:00 PM",
    weekend: "8:00 AM - 11:30 PM",
    kitchenCloses: "10:30 PM"
  },

  // Currency & Commercial Settings
  currency: {
    symbol: "₹",
    code: "INR"
  },
  tax: {
    rate: 0.05, // 5% GST
    label: "GST (5%)"
  },
  delivery: {
    enabled: true,
    minOrderAmount: 150,
    freeDeliveryAbove: 500,
    standardFee: 40
  },

  // Social Links
  social: {
    instagram: "https://instagram.com/democafe",
    facebook: "https://facebook.com/democafe",
    youtube: "https://youtube.com/democafe",
    tripadvisor: "https://tripadvisor.com"
  },

  // Special Promotional Offer Banner
  specialOffer: {
    badge: "Special Offer",
    title: "Buy 1 Get 1 Free",
    subtitle: "On Hot Coffee",
    timing: "Happy Hours: 4:00 PM – 7:00 PM (Mon–Thu)",
    ctaText: "Order Now",
    ctaLink: "menu.html?category=hot-coffee"
  }
};

// Make accessible in both window context and module environments
if (typeof window !== "undefined") {
  window.CAFE_CONFIG = CAFE_CONFIG;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = CAFE_CONFIG;
}

