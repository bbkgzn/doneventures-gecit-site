(() => {
  "use strict";
  const config = window.DONE_VENTURES;
  const menu = document.querySelector(".menu");
  const nav = document.querySelector("#navigation");
  function closeMenu() {
    if (!menu || !nav) return;
    menu.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  }
  if (menu && nav) {
    document.documentElement.classList.add("js");
    menu.addEventListener("click", () => {
      const open = menu.getAttribute("aria-expanded") !== "true";
      menu.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("open", open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menu.focus();
      }
    });
    window.matchMedia("(min-width: 1101px)").addEventListener("change", closeMenu);
  }
  if (!config) return;
  const emailFor = node => node.dataset.email === "corporate" || node.dataset.emailText === "corporate"
    ? config.corporateEmail : config.personalEmail;
  document.querySelectorAll("[data-email]").forEach(link => {
    const email = emailFor(link);
    link.href = "mailto:" + email;
    if (link.classList.contains("email-link")) link.textContent = email;
  });
  document.querySelectorAll("[data-email-text]").forEach(node => node.textContent = emailFor(node));
  document.querySelectorAll("[data-phone-text]").forEach(node => node.textContent = config.phoneDisplay);
  document.querySelectorAll("[data-corporate-phone]").forEach(link => {
    link.href = "tel:" + config.corporatePhone;
    link.textContent = config.corporatePhoneDisplay;
  });
  document.querySelectorAll("[data-corporate-address]").forEach(node => node.textContent = config.corporateAddress);
  document.querySelectorAll("[data-personal-phone]").forEach(link => link.href = "tel:" + config.phone);
  document.querySelectorAll("[data-card-title]").forEach(node => node.textContent = config.cardTitle);
  function httpsUrl(value) {
    try { const url = new URL(value); return url.protocol === "https:" ? url : null; }
    catch { return null; }
  }
  const whatsapp = httpsUrl(config.whatsappUrl);
  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    if (whatsapp && whatsapp.hostname === "wa.me" && /^\/\d+$/.test(whatsapp.pathname)) {
      link.href = whatsapp.href;
      link.setAttribute("aria-label", "WhatsApp: " + config.phoneDisplay + " (opens in a new tab)");
    }
  });
  const website = httpsUrl(config.websiteUrl);
  if (website) {
    document.querySelectorAll("[data-website-link]").forEach(link => link.href = website.href);
    document.querySelectorAll("[data-website-label]").forEach(node => node.textContent = website.hostname);
    const pageUrl = new URL(location.pathname, website).href;
    document.querySelector('link[rel="canonical"]').href = pageUrl;
    document.querySelector('meta[property="og:url"]').content = pageUrl;
  }
  const linkedIn = httpsUrl(config.linkedinUrl);
  document.querySelectorAll("[data-linkedin]").forEach(link => {
    if (linkedIn && /(^|\.)linkedin\.com$/.test(linkedIn.hostname)) {
      link.href = linkedIn.href;
      link.hidden = false;
    }
  });
  // Templates are inert: no photo request, broken image or empty frame until supplied.
  document.querySelectorAll("[data-portrait]").forEach(figure => {
    const path = figure.dataset.portrait === "founder" ? config.founderPhotoUrl : config.connectPhotoUrl;
    if (!path) return;
    const template = figure.querySelector("template");
    const fragment = template.content.cloneNode(true);
    const photo = fragment.querySelector("img");
    photo.addEventListener("load", () => figure.hidden = false);
    photo.addEventListener("error", () => { figure.hidden = true; });
    figure.appendChild(fragment);
    photo.src = path;
  });
  // Save Contact uses the same standalone vCard with its embedded JPEG on every
  // device, including when JavaScript is disabled. Keep its HTML download link.
})();
