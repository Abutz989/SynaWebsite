(() => {
  const defaultLang = "he";
  const supported = new Set(["he", "en"]);
  const cache = {};

  const getSavedLang = () => {
    const stored = localStorage.getItem("synaLang");
    return supported.has(stored) ? stored : null;
  };

  const setHtmlLangDir = (lang) => {
    const isHebrew = lang === "he";
    document.documentElement.lang = lang;
    document.documentElement.dir = isHebrew ? "rtl" : "ltr";
  };

  const updateToggle = (lang) => {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  const applyTranslations = (strings) => {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const value = key.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), strings);
      if (typeof value === "string") {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.dataset.i18nHtml;
      const value = key.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), strings);
      if (typeof value === "string") {
        el.innerHTML = value;
      }
    });
  };

  const loadTranslations = async (lang) => {
    if (cache[lang]) return cache[lang];

    const response = await fetch(`assets/i18n/${lang}.json`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${lang}`);
    }
    const data = await response.json();
    cache[lang] = data;
    return data;
  };

  const setLanguage = async (lang) => {
    const resolved = supported.has(lang) ? lang : defaultLang;
    const strings = await loadTranslations(resolved);

    setHtmlLangDir(resolved);
    applyTranslations(strings);
    updateToggle(resolved);
    localStorage.setItem("synaLang", resolved);
  };

  document.addEventListener("DOMContentLoaded", () => {
    const initialLang = getSavedLang() || defaultLang;

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setLanguage(btn.dataset.lang).catch((err) => {
          console.error(err);
        });
      });
    });

    setLanguage(initialLang).catch((err) => {
      console.error(err);
    });
  });
})();
