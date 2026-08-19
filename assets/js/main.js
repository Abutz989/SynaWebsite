(() => {
  const nav = document.querySelector("#nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
  const revealItems = document.querySelectorAll(".reveal:not(.is-visible)");
  const hero = document.querySelector(".hero");
  const heroHeadline = document.querySelector(".hero h1");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasFinePointer = window.matchMedia("(any-pointer: fine)").matches;

  const animateHeroHeadline = () => {
    if (!heroHeadline) return;

    const text = heroHeadline.textContent.replace(/\s+/g, " ").trim();
    heroHeadline.setAttribute("aria-label", text);

    if (prefersReducedMotion) return;

    const words = text.split(" ");
    const fragment = document.createDocumentFragment();

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.className = "hero-word";
      span.setAttribute("aria-hidden", "true");
      span.style.setProperty("--word-index", index);
      span.textContent = index < words.length - 1 ? `${word} ` : word;
      fragment.appendChild(span);
    });

    heroHeadline.classList.remove("is-animated");
    heroHeadline.replaceChildren(fragment);
    heroHeadline.classList.add("motion-ready");
    void heroHeadline.offsetWidth;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => heroHeadline.classList.add("is-animated"));
    });
  };

  const trackPointer = (element, activeClass, xProperty, yProperty) => {
    let animationFrame = 0;
    let latestEvent;

    element.addEventListener("pointermove", (event) => {
      latestEvent = event;
      if (animationFrame) return;

      animationFrame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const x = ((latestEvent.clientX - bounds.left) / bounds.width) * 100;
        const y = ((latestEvent.clientY - bounds.top) / bounds.height) * 100;

        element.style.setProperty(xProperty, `${x.toFixed(2)}%`);
        element.style.setProperty(yProperty, `${y.toFixed(2)}%`);
        element.classList.add(activeClass);
        animationFrame = 0;
      });
    });

    element.addEventListener("pointerleave", () => {
      element.classList.remove(activeClass);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    });
  };

  animateHeroHeadline();
  document.addEventListener("syna:languagechange", animateHeroHeadline);

  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${(index % 2) * 90}ms`);
  });

  if (!prefersReducedMotion && hasFinePointer) {
    if (hero) trackPointer(hero, "is-pointer-active", "--pointer-x", "--pointer-y");

    document.querySelectorAll(".hero-media, .section-media, .contact-details").forEach((surface) => {
      trackPointer(surface, "is-spotlit", "--spotlight-x", "--spotlight-y");
    });
  }

  const closeMenu = () => {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const updateNav = () => {
    nav?.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${visible.target.id}`;
          link.classList.toggle("active", isActive);
          if (isActive) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-25% 0px -58%", threshold: [0, 0.15, 0.35] }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  window.addEventListener(
    "load",
    () => {
      if (!window.location.hash) return;

      const target = document.getElementById(window.location.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: "auto", block: "start" });
    },
    { once: true }
  );

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
})();
