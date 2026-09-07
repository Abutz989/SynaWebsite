(() => {
  const defaultLang = "en";
  const supported = new Set(["he", "en"]);
  const embedded = window.SYNA_TRANSLATIONS || {};
  let requestId = 0;

  const getSavedLang = () => {
    try {
      const stored = localStorage.getItem("synaLang");
      return supported.has(stored) ? stored : null;
    } catch {
      return null;
    }
  };

  const saveLang = (lang) => {
    try {
      localStorage.setItem("synaLang", lang);
    } catch {
      // The page still works when storage is unavailable.
    }
  };

  const getValue = (strings, key) =>
    key.split(".").reduce((value, part) => (value ? value[part] : undefined), strings);

  const setHtmlLangDir = (lang) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  };

  const updateToggle = (lang) => {
    document.querySelectorAll(".lang-btn").forEach((button) => {
      const isActive = button.dataset.lang === lang;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const applyTranslations = (strings) => {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = getValue(strings, element.dataset.i18n);
      if (typeof value === "string") element.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const value = getValue(strings, element.dataset.i18nHtml);
      if (typeof value === "string") element.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
      element.dataset.i18nAttr.split(",").forEach((binding) => {
        const separator = binding.indexOf(":");
        if (separator < 1) return;

        const attribute = binding.slice(0, separator).trim();
        const key = binding.slice(separator + 1).trim();
        const value = getValue(strings, key);
        if (typeof value === "string") element.setAttribute(attribute, value);
      });
    });
  };

  const loadTranslations = async (lang) => {
    if (!embedded[lang]) throw new Error(`Missing content file for ${lang}`);
    return embedded[lang];
  };

  const setLanguage = async (lang) => {
    const resolved = supported.has(lang) ? lang : defaultLang;
    const currentRequest = ++requestId;
    const strings = await loadTranslations(resolved);

    if (currentRequest !== requestId) return;

    setHtmlLangDir(resolved);
    applyTranslations(strings);
    updateToggle(resolved);
    saveLang(resolved);
    document.dispatchEvent(new CustomEvent("syna:languagechange", { detail: { lang: resolved } }));
  };

  const init = () => {
    document.querySelectorAll(".lang-btn").forEach((button) => {
      button.addEventListener("click", () => {
        setLanguage(button.dataset.lang).catch((error) => console.error(error));
      });
    });

    setLanguage(getSavedLang() || defaultLang).catch((error) => console.error(error));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
