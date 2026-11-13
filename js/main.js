/**
 * Demo Café — Core Website Scripts
 * 
 * Handles navigation, mobile menu, hero carousel slider,
 * testimonials carousel, lightbox, and dynamic config population.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Populate Dynamic Config Data from CAFE_CONFIG ---
  if (typeof CAFE_CONFIG !== "undefined") {
    // Update phone numbers
    document.querySelectorAll(".cfg-phone").forEach(el => {
      el.textContent = CAFE_CONFIG.phone;
    });
    document.querySelectorAll(".cfg-phone-link").forEach(el => {
      el.href = CAFE_CONFIG.phoneCallUrl;
    });

    // Update WhatsApp links
    document.querySelectorAll(".cfg-whatsapp-display").forEach(el => {
      el.textContent = CAFE_CONFIG.whatsappDisplay;
    });
    document.querySelectorAll(".cfg-whatsapp-link").forEach(el => {
      el.href = `https://wa.me/${CAFE_CONFIG.whatsappNumber}`;
    });

    // Update Emails
    document.querySelectorAll(".cfg-email").forEach(el => {
      el.textContent = CAFE_CONFIG.email;
      if (el.tagName === "A") el.href = `mailto:${CAFE_CONFIG.email}`;
    });

    // Update Address & Hours
    document.querySelectorAll(".cfg-address").forEach(el => {
      el.textContent = CAFE_CONFIG.address.full;
    });
    document.querySelectorAll(".cfg-hours").forEach(el => {
      el.textContent = CAFE_CONFIG.hours.display;
    });
    document.querySelectorAll(".cfg-directions-link").forEach(el => {
      el.href = CAFE_CONFIG.maps.directionsUrl;
    });
  }

  // --- 2. Sticky Navigation Bar & Scroll Detection ---
  const header = document.querySelector(".site-header");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    if (header) {
      if (scrollPos > 60) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    if (scrollTopBtn) {
      if (scrollPos > 400) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- 3. Mobile Navigation Drawer ---
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      mainNav.classList.toggle("active");
      document.body.style.overflow = mainNav.classList.contains("active") ? "hidden" : "";
    });

    // Close when clicking nav links on mobile
    mainNav.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        mainNav.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // --- 4. Hero Slider / Carousel ---
  const heroSlides = [
    {
      title: "Good Coffee.<br><span class=\"title-accent\">Beautiful Moments.</span>",
      desc: "Experience the perfect blend of premium coffee, delicious treats and cozy ambiance at Demo Café.",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Handcrafted Bakes.<br><span class=\"title-accent\">Baked Fresh Daily.</span>",
      desc: "From flaky French butter croissants to rich Belgian chocolate tortes, every bake is an artisanal masterpiece.",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Artisan Roasts.<br><span class=\"title-accent\">Single Origin Beans.</span>",
      desc: "Ethically sourced high-altitude Arabica beans, roasted to perfection by our certified master baristas.",
      image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  let currentSlide = 0;
  let heroInterval = null;

  const heroTitleEl = document.getElementById("heroSlideTitle");
  const heroDescEl = document.getElementById("heroSlideDesc");
  const heroImgEl = document.getElementById("heroSlideImg");
  const heroDots = document.querySelectorAll(".hero-dot");
  const prevHeroBtn = document.getElementById("heroPrevBtn");
  const nextHeroBtn = document.getElementById("heroNextBtn");

  const updateHeroSlide = (index) => {
    currentSlide = (index + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[currentSlide];

    if (heroTitleEl) heroTitleEl.innerHTML = slide.title;
    if (heroDescEl) heroDescEl.textContent = slide.desc;
    if (heroImgEl) heroImgEl.src = slide.image;

    heroDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  };

  const startHeroAutoplay = () => {
    stopHeroAutoplay();
    heroInterval = setInterval(() => {
      updateHeroSlide(currentSlide + 1);
    }, 6000);
  };

  const stopHeroAutoplay = () => {
    if (heroInterval) clearInterval(heroInterval);
  };

  if (heroTitleEl && heroImgEl) {
    if (prevHeroBtn) {
      prevHeroBtn.addEventListener("click", () => {
        updateHeroSlide(currentSlide - 1);
        startHeroAutoplay();
      });
    }
    if (nextHeroBtn) {
      nextHeroBtn.addEventListener("click", () => {
        updateHeroSlide(currentSlide + 1);
        startHeroAutoplay();
      });
    }
    heroDots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        updateHeroSlide(i);
        startHeroAutoplay();
      });
    });

    const heroWrap = document.querySelector(".hero-section");
    if (heroWrap) {
      heroWrap.addEventListener("mouseenter", stopHeroAutoplay);
      heroWrap.addEventListener("mouseleave", startHeroAutoplay);
    }

    startHeroAutoplay();
  }

  // --- 5. Testimonials Carousel ---
  const testimonials = [
    {
      quote: "“The best coffee in town! Amazing ambiance and friendly staff.”",
      author: "Anisha Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "“The blueberry cheesecake and flat white are pure perfection. My go-to workspace!”",
      author: "Rohan Mehta",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "“Warm, luxurious, and impeccably brewed. Demo Café is our weekend family ritual.”",
      author: "Priya Sengupta",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    }
  ];

  let currentTestimonial = 0;
  const quoteEl = document.getElementById("testimonialQuote");
  const authorEl = document.getElementById("testimonialAuthor");
  const avatarEl = document.getElementById("testimonialAvatar");
  const prevTestimonialBtn = document.getElementById("testimonialPrevBtn");
  const nextTestimonialBtn = document.getElementById("testimonialNextBtn");

  const updateTestimonial = (index) => {
    currentTestimonial = (index + testimonials.length) % testimonials.length;
    const item = testimonials[currentTestimonial];

    if (quoteEl) quoteEl.textContent = item.quote;
    if (authorEl) authorEl.textContent = item.author;
    if (avatarEl) avatarEl.src = item.avatar;
  };

  if (prevTestimonialBtn) {
    prevTestimonialBtn.addEventListener("click", () => updateTestimonial(currentTestimonial - 1));
  }
  if (nextTestimonialBtn) {
    nextTestimonialBtn.addEventListener("click", () => updateTestimonial(currentTestimonial + 1));
  }

  // --- 6. Lightbox Gallery Viewer ---
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("galleryLightbox");

  if (lightbox && galleryItems.length > 0) {
    let activeLightboxIndex = 0;
    const lightboxImg = lightbox.querySelector(".lightbox-img");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption-text");
    const closeBtn = lightbox.querySelector(".lightbox-close-btn");
    const prevBtn = lightbox.querySelector(".lightbox-btn-prev");
    const nextBtn = lightbox.querySelector(".lightbox-btn-next");

    const openLightbox = (index) => {
      activeLightboxIndex = index;
      const targetItem = galleryItems[index];
      const img = targetItem.querySelector("img");
      const caption = targetItem.dataset.caption || (img ? img.alt : "Demo Café");

      if (lightboxImg && img) lightboxImg.src = img.src;
      if (lightboxCaption) lightboxCaption.textContent = caption;

      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    };

    galleryItems.forEach((item, index) => {
      item.addEventListener("click", () => openLightbox(index));
    });

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openLightbox((activeLightboxIndex - 1 + galleryItems.length) % galleryItems.length);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openLightbox((activeLightboxIndex + 1) % galleryItems.length);
      });
    }

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
      if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
    });
  }

  // --- 7. Gallery Category Filter (on gallery.html) ---
  const galleryFilterBtns = document.querySelectorAll(".gallery-filter-btn");
  if (galleryFilterBtns.length > 0) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        galleryFilterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.dataset.category;

        galleryItems.forEach(item => {
          if (category === "all" || item.dataset.category === category) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }
});

