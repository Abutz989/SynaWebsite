(() => {
  document.documentElement.classList.add("js");
  const nav = document.querySelector("#nav");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#nav-menu");
  const links = [...document.querySelectorAll(".nav-links a")];
  const closeMenu = (restoreFocus = false) => {
    const wasOpen = document.body.classList.contains("nav-open");
    document.body.classList.remove("nav-open");
    toggle?.setAttribute("aria-expanded", "false");
    if (restoreFocus && wasOpen) toggle?.focus();
  };
  toggle?.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => closeMenu()));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(true); });
  document.addEventListener("click", event => { if (!nav?.contains(event.target)) closeMenu(); });
  nav?.addEventListener("focusout", () => {
    requestAnimationFrame(() => { if (!nav.contains(document.activeElement)) closeMenu(); });
  });
  window.matchMedia("(min-width: 901px)").addEventListener("change", event => { if (event.matches) closeMenu(); });
  // Evaluate every section together so the current link remains stable while scrolling.
  const sections = links.map(link => document.querySelector(link.getAttribute("href")));
  let scheduled = false;
  const updateNav = () => {
    const cutoff = nav.getBoundingClientRect().height + 100;
    let current = -1;
    sections.forEach((section, index) => { if (section && section.getBoundingClientRect().top <= cutoff) current = index; });
    links.forEach((link, index) => {
      link.classList.toggle("active", index === current);
      if (index === current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    scheduled = false;
  };
  window.addEventListener("scroll", () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateNav); } }, { passive: true });
  document.addEventListener("syna:languagechange", updateNav);
  updateNav();
})();
