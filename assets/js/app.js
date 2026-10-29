/**
 * Impact Digital - Dynamic Data Store and Admin Management Controller
 * Handles local persistence, dynamic rendering, and admin updates.
 */

const DEFAULT_AGENCY_DATA = {
  tagline: "We create impact, you see growth",
  subTagline: "Elevate your digital footprint with high-converting social strategies, cinematic content, and audience visibility.",
  coreValues: ["Ideas", "Strategy", "Visibility", "Growth"],
  contact: {
    email: "impactdigital642@gmail.com",
    phone: "+91 7006181540",
    location: "Jammu & Kashmir / Delhi NCR, India"
  },
  socials: {
    instagram: "https://www.instagram.com/_impact_digital?rpxt=MXVoMndpeWkzMjQ4cA==",
    facebook: "https://www.facebook.com/share/1dkL3UTSN7",
    youtube: "https://www.youtube.com/@ImpactDigital-d6h"
  },
  partners: [
    {
      id: "partner-1",
      name: "Pallavi Gupta",
      role: "Strategy & Creative Director",
      phone: "7006181540",
      portfolio: "https://portfolio-eight-phi-94.vercel.app/",
      image: "assets/images/pallavi-gupta.jpg"
    },
    {
      id: "partner-2",
      name: "Jaspinder Kaur",
      role: "Operations & Brand Lead",
      phone: "8899722256",
      portfolio: "https://jaspinderkaur.vercel.app/",
      image: "assets/images/jaspinder-kaur.jpg"
    },
    {
      id: "partner-3",
      name: "Sagar Chandrabhash",
      role: "Tech & Media Architect",
      phone: "6006886434",
      portfolio: "https://sagar-chandrabhash-p-2tze.bolt.host/",
      image: "assets/images/sagar-chandrabhash.jpg"
    }
  ],
  stats: {
    reach: "10M+",
    clients: "50+",
    growthRate: "340%",
    retention: "98%"
  },
  testimonials: [
    {
      id: "t1",
      name: "Rahul Mehta",
      role: "Business Owner",
      text: "Impact Digital completely transformed our Instagram presence. In just 3 months, our followers doubled and our engagement went through the roof!",
      rating: 5,
      image: "assets/images/media_1793176935437.jpg"
    },
    {
      id: "t2",
      name: "Priya Sharma",
      role: "Fashion Influencer",
      text: "The team at Impact Digital knows exactly how to craft content that resonates. Our brand collaborations tripled after working with them.",
      rating: 5,
      image: "assets/images/media_1793176943022.jpg"
    },
    {
      id: "t3",
      name: "Arjun Kapoor",
      role: "Startup Founder",
      text: "From zero to 50K followers in 6 months — Impact Digital's strategy is unmatched. They truly live up to their name!",
      rating: 5,
      image: "assets/images/media_1793176955502.jpg"
    }
  ],
  clientPics: [
    "assets/images/media_1793176935437.jpg",
    "assets/images/media_1793176943022.jpg",
    "assets/images/media_1793176955502.jpg",
    "assets/images/media_1793176978234.jpg"
  ]
};

const STORAGE_KEYS = {
  DATA: "impact_digital_data_v1",
  PASSWORD_HASH: "impact_digital_admin_pwd_v1",
  SESSION: "impact_digital_admin_session_v1"
};

// Global Store
let agencyData = { ...DEFAULT_AGENCY_DATA };

// Helper simple hash for local storage security
function hashPassword(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return "hash_" + Math.abs(hash).toString(36);
}

// Load data from localStorage
function initStore() {
  const savedData = localStorage.getItem(STORAGE_KEYS.DATA);
  if (savedData) {
    try {
      agencyData = JSON.parse(savedData);
    } catch (e) {
      console.error("Error parsing saved agency data", e);
      agencyData = { ...DEFAULT_AGENCY_DATA };
    }
  } else {
    agencyData = { ...DEFAULT_AGENCY_DATA };
    localStorage.setItem(STORAGE_KEYS.DATA, JSON.stringify(agencyData));
  }
  renderContent();
}

// Render dynamic content across the page
function renderContent() {
  // Tagline & Hero
  const heroTaglineEl = document.getElementById("hero-tagline");
  if (heroTaglineEl) heroTaglineEl.textContent = agencyData.tagline;

  const heroSubtaglineEl = document.getElementById("hero-subtagline");
  if (heroSubtaglineEl) heroSubtaglineEl.textContent = agencyData.subTagline;

  // Render Core Values
  const valuesContainer = document.getElementById("hero-values");
  if (valuesContainer && Array.isArray(agencyData.coreValues)) {
    valuesContainer.innerHTML = agencyData.coreValues
      .map(
        (val, idx) => `
        <div class="value-pill">
          <span class="value-dot"></span>
          <span>${val}</span>
          ${idx < agencyData.coreValues.length - 1 ? '<span style="color: rgba(255,255,255,0.2); margin-left: 0.5rem;">|</span>' : ''}
        </div>
      `
      )
      .join("");
  }

  // Render Partners
  const partnersContainer = document.getElementById("partners-list");
  if (partnersContainer && Array.isArray(agencyData.partners)) {
    partnersContainer.innerHTML = agencyData.partners
      .map(
        (p) => `
      <div class="partner-card" id="card-${p.id}">
        <div class="partner-img-wrapper">
          <img src="${p.image}" alt="${p.name}" class="partner-img" onerror="this.src='assets/images/impact-logo.jpg'">
          <span class="partner-badge-role">${p.role || "Executive Partner"}</span>
        </div>
        <div class="partner-content">
          <h3 class="partner-name">${p.name}</h3>
          <p class="partner-specialty">Executive Leadership & Strategic Direction</p>
          <ul class="partner-contact-list">
            <li class="partner-contact-item">
              <i class="fas fa-phone-alt"></i>
              <span>Direct: <a href="tel:${p.phone}" class="partner-phone-link">+91 ${p.phone}</a></span>
            </li>
            <li class="partner-contact-item">
              <i class="fas fa-globe"></i>
              <span>Verified Direct Portfolio</span>
            </li>
          </ul>
          <div class="partner-actions">
            <a href="${p.portfolio}" target="_blank" rel="noopener noreferrer" class="btn-portfolio">
              <span>View Portfolio</span>
              <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Render Social Links
  const instagramBtn = document.getElementById("link-instagram");
  if (instagramBtn) instagramBtn.href = agencyData.socials.instagram;

  const facebookBtn = document.getElementById("link-facebook");
  if (facebookBtn) facebookBtn.href = agencyData.socials.facebook;

  const youtubeBtn = document.getElementById("link-youtube");
  if (youtubeBtn) youtubeBtn.href = agencyData.socials.youtube;

  // Footer Socials
  const footerIg = document.getElementById("footer-link-instagram");
  if (footerIg) footerIg.href = agencyData.socials.instagram;
  const footerFb = document.getElementById("footer-link-facebook");
  if (footerFb) footerFb.href = agencyData.socials.facebook;
  const footerYt = document.getElementById("footer-link-youtube");
  if (footerYt) footerYt.href = agencyData.socials.youtube;

  // Render Testimonials
  const testimonialsContainer = document.getElementById("testimonials-list");
  if (testimonialsContainer && Array.isArray(agencyData.testimonials)) {
    testimonialsContainer.innerHTML = agencyData.testimonials.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-stars">
          ${'<i class="fas fa-star"></i>'.repeat(t.rating || 5)}
        </div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <img src="${t.image}" alt="${t.name}" class="testimonial-avatar" onerror="this.src='assets/images/impact-logo.jpg'">
          <div>
            <h5 class="testimonial-name">${t.name}</h5>
            <span class="testimonial-role">${t.role}</span>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Render Client Pics Strip
  const clientsPicsRow = document.getElementById("clients-pics-row");
  if (clientsPicsRow && Array.isArray(agencyData.clientPics)) {
    clientsPicsRow.innerHTML = agencyData.clientPics.map(pic => `
      <div class="client-pic-bubble">
        <img src="${pic}" alt="Client" onerror="this.src='assets/images/impact-logo.jpg'">
      </div>
    `).join("");
  }

  // Contact details
  const contactPhone = document.getElementById("contact-phone-display");
  if (contactPhone) {
    contactPhone.textContent = agencyData.contact.phone;
    contactPhone.href = `tel:${agencyData.contact.phone.replace(/[^0-9+]/g, "")}`;
  }

  const contactEmail = document.getElementById("contact-email-display");
  if (contactEmail) {
    contactEmail.textContent = agencyData.contact.email;
    contactEmail.href = `mailto:${agencyData.contact.email}`;
  }
}

// Toast helper
function showToast(message, isSuccess = true) {
  const toast = document.getElementById("site-toast");
  const toastMsg = document.getElementById("toast-message");
  const toastIcon = document.getElementById("toast-icon");
  if (!toast) return;

  toastMsg.textContent = message;
  toastIcon.className = isSuccess ? "fas fa-check-circle" : "fas fa-exclamation-triangle";
  toastIcon.style.color = isSuccess ? "#FF8C00" : "#ff4444";

  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// Admin Modal Management
function setupAdminPortal() {
  const openBtn = document.getElementById("open-admin-btn");
  const modal = document.getElementById("admin-modal");
  const closeBtn = document.getElementById("close-admin-modal");

  const loginSection = document.getElementById("admin-login-view");
  const setupSection = document.getElementById("admin-setup-view");
  const dashboardSection = document.getElementById("admin-dashboard-view");

  const pwdForm = document.getElementById("admin-login-form");
  const setupForm = document.getElementById("admin-setup-form");
  const logoutBtn = document.getElementById("admin-logout-btn");

  const resetAllBtn = document.getElementById("btn-reset-defaults");

  // Check if first-time password setup is needed
  function checkAuthFlow() {
    const savedPwdHash = localStorage.getItem(STORAGE_KEYS.PASSWORD_HASH);
    const sessionActive = sessionStorage.getItem(STORAGE_KEYS.SESSION);

    loginSection.style.display = "none";
    setupSection.style.display = "none";
    dashboardSection.style.display = "none";

    if (!savedPwdHash) {
      // First-time setup flow
      setupSection.style.display = "block";
    } else if (sessionActive === "true") {
      // Already logged in in this session
      dashboardSection.style.display = "block";
      populateAdminFields();
    } else {
      // Prompt password login
      loginSection.style.display = "block";
    }
  }

  // Open modal
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      checkAuthFlow();
      modal.classList.add("active");
    });
  }

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });

  // Handle first time password setup
  if (setupForm) {
    setupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newPwd = document.getElementById("setup-new-password").value.trim();
      const confirmPwd = document.getElementById("setup-confirm-password").value.trim();

      if (newPwd.length < 4) {
        showToast("Password should be at least 4 characters", false);
        return;
      }
      if (newPwd !== confirmPwd) {
        showToast("Passwords do not match", false);
        return;
      }

      localStorage.setItem(STORAGE_KEYS.PASSWORD_HASH, hashPassword(newPwd));
      sessionStorage.setItem(STORAGE_KEYS.SESSION, "true");
      showToast("Admin password created securely!");
      checkAuthFlow();
    });
  }

  // Handle Login
  if (pwdForm) {
    pwdForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const enteredPwd = document.getElementById("admin-login-password").value;
      const savedHash = localStorage.getItem(STORAGE_KEYS.PASSWORD_HASH);

      if (hashPassword(enteredPwd) === savedHash) {
        sessionStorage.setItem(STORAGE_KEYS.SESSION, "true");
        showToast("Welcome to Admin Dashboard!");
        document.getElementById("admin-login-password").value = "";
        checkAuthFlow();
      } else {
        showToast("Incorrect password. Please try again.", false);
      }
    });
  }

  // Handle Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem(STORAGE_KEYS.SESSION);
      showToast("Logged out of Admin Portal");
      checkAuthFlow();
    });
  }

  // Reset to initial brand defaults
  if (resetAllBtn) {
    resetAllBtn.addEventListener("click", () => {
      if (confirm("Reset all settings and details back to Impact Digital default values?")) {
        agencyData = JSON.parse(JSON.stringify(DEFAULT_AGENCY_DATA));
        localStorage.setItem(STORAGE_KEYS.DATA, JSON.stringify(agencyData));
        renderContent();
        populateAdminFields();
        showToast("Restored brand default data!");
      }
    });
  }

  // Tab switching in Dashboard
  const tabBtns = document.querySelectorAll(".admin-tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".admin-tab-content").forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      const targetId = btn.getAttribute("data-tab");
      document.getElementById(targetId).classList.add("active");
    });
  });

  // Populate Admin Form fields with current data
  function populateAdminFields() {
    // General
    document.getElementById("admin-tagline").value = agencyData.tagline || "";
    document.getElementById("admin-subtagline").value = agencyData.subTagline || "";
    document.getElementById("admin-core-values").value = (agencyData.coreValues || []).join(", ");
    document.getElementById("admin-agency-phone").value = agencyData.contact?.phone || "";
    document.getElementById("admin-agency-email").value = agencyData.contact?.email || "";

    // Partners
    if (agencyData.partners && agencyData.partners.length >= 3) {
      // Partner 1
      document.getElementById("admin-p1-name").value = agencyData.partners[0].name || "";
      document.getElementById("admin-p1-role").value = agencyData.partners[0].role || "";
      document.getElementById("admin-p1-phone").value = agencyData.partners[0].phone || "";
      document.getElementById("admin-p1-portfolio").value = agencyData.partners[0].portfolio || "";

      // Partner 2
      document.getElementById("admin-p2-name").value = agencyData.partners[1].name || "";
      document.getElementById("admin-p2-role").value = agencyData.partners[1].role || "";
      document.getElementById("admin-p2-phone").value = agencyData.partners[1].phone || "";
      document.getElementById("admin-p2-portfolio").value = agencyData.partners[1].portfolio || "";

      // Partner 3
      document.getElementById("admin-p3-name").value = agencyData.partners[2].name || "";
      document.getElementById("admin-p3-role").value = agencyData.partners[2].role || "";
      document.getElementById("admin-p3-phone").value = agencyData.partners[2].phone || "";
      document.getElementById("admin-p3-portfolio").value = agencyData.partners[2].portfolio || "";
    }

    // Socials
    document.getElementById("admin-social-instagram").value = agencyData.socials?.instagram || "";
    document.getElementById("admin-social-facebook").value = agencyData.socials?.facebook || "";
    document.getElementById("admin-social-youtube").value = agencyData.socials?.youtube || "";
  }

  // Save changes from Admin Dashboard
  const saveBtn = document.getElementById("admin-save-all");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      // General
      agencyData.tagline = document.getElementById("admin-tagline").value.trim();
      agencyData.subTagline = document.getElementById("admin-subtagline").value.trim();
      agencyData.coreValues = document
        .getElementById("admin-core-values")
        .value.split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      agencyData.contact.phone = document.getElementById("admin-agency-phone").value.trim();
      agencyData.contact.email = document.getElementById("admin-agency-email").value.trim();

      // Partners
      agencyData.partners[0].name = document.getElementById("admin-p1-name").value.trim();
      agencyData.partners[0].role = document.getElementById("admin-p1-role").value.trim();
      agencyData.partners[0].phone = document.getElementById("admin-p1-phone").value.trim();
      agencyData.partners[0].portfolio = document.getElementById("admin-p1-portfolio").value.trim();

      agencyData.partners[1].name = document.getElementById("admin-p2-name").value.trim();
      agencyData.partners[1].role = document.getElementById("admin-p2-role").value.trim();
      agencyData.partners[1].phone = document.getElementById("admin-p2-phone").value.trim();
      agencyData.partners[1].portfolio = document.getElementById("admin-p2-portfolio").value.trim();

      agencyData.partners[2].name = document.getElementById("admin-p3-name").value.trim();
      agencyData.partners[2].role = document.getElementById("admin-p3-role").value.trim();
      agencyData.partners[2].phone = document.getElementById("admin-p3-phone").value.trim();
      agencyData.partners[2].portfolio = document.getElementById("admin-p3-portfolio").value.trim();

      // Socials
      agencyData.socials.instagram = document.getElementById("admin-social-instagram").value.trim();
      agencyData.socials.facebook = document.getElementById("admin-social-facebook").value.trim();
      agencyData.socials.youtube = document.getElementById("admin-social-youtube").value.trim();

      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.DATA, JSON.stringify(agencyData));

      // Re-render
      renderContent();
      showToast("All changes saved dynamically!");
    });
  }

  // Change password option in security tab
  const changePwdForm = document.getElementById("admin-change-password-form");
  if (changePwdForm) {
    changePwdForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const currentPwd = document.getElementById("admin-curr-pwd").value;
      const newPwd = document.getElementById("admin-new-pwd").value.trim();
      const savedHash = localStorage.getItem(STORAGE_KEYS.PASSWORD_HASH);

      if (hashPassword(currentPwd) !== savedHash) {
        showToast("Current password invalid", false);
        return;
      }
      if (newPwd.length < 4) {
        showToast("New password must be at least 4 characters", false);
        return;
      }

      localStorage.setItem(STORAGE_KEYS.PASSWORD_HASH, hashPassword(newPwd));
      changePwdForm.reset();
      showToast("Password updated successfully!");
    });
  }
}

// Mobile Nav Toggle & Scroll effects
function setupNavigation() {
  const navbar = document.getElementById("navbar");
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const icon = mobileToggle.querySelector("i");
      if (navMenu.classList.contains("open")) {
        icon.className = "fas fa-times";
      } else {
        icon.className = "fas fa-bars";
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("open");
      const icon = mobileToggle ? mobileToggle.querySelector("i") : null;
      if (icon) icon.className = "fas fa-bars";
    });
  });

  // Contact Form Submission Mock
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name").value;
      showToast(`Thank you, ${name}! Your inquiry has been sent to Impact Digital.`);
      contactForm.reset();
    });
  }
}

// Bootstrap on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initStore();
  setupAdminPortal();
  setupNavigation();
});
