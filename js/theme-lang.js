/* ============================================================
   TSABIH COLLECTION — theme-lang.js
   يتحكم في: تبديل اللون (الثيم) + تبديل اللغة (عربي/إنجليزي)
   ويحفظ الاختيار في localStorage ليبقى ثابتاً في كل صفحات الموقع
   ============================================================ */

(function () {
  "use strict";

  const STORAGE_THEME_KEY = "tsabih_theme";
  const STORAGE_LANG_KEY = "tsabih_lang";
  const DEFAULT_THEME = "default";
  const DEFAULT_LANG = "ar";

  /* ---------------------------------------------------------
     1) قاموس الترجمة الكامل لكل نصوص الموقع
     أي عنصر عليه data-i18n="key" سيتم استبدال نصه تلقائياً
     --------------------------------------------------------- */
  const translations = {
    ar: {
      top_track: "تتبع طلبك", top_help: "المساعدة", top_ship: "شحن مجاني للطلبات فوق 50,000 ج.س",
      nav_home: "الرئيسية", nav_shop: "المتجر", nav_about: "من نحن", nav_contact: "تواصل معنا",
      nav_login: "حسابي", nav_order: "اطلب الآن",
      theme_label: "اختر لون الموقع", lang_label: "اللغة / Language",
      hero_badge: "مجموعة الموسم الجديد ٢٠٢٦",
      hero_title_1: "أناقة تُروى", hero_title_2: "بخيوط الأصالة",
      hero_desc: "تسبيح كولكشن — وجهتك الأولى للأزياء الراقية المصممة بحب، لتجمع بين الطابع التراثي واللمسة العصرية في كل قطعة.",
      hero_shop: "تسوّق المجموعة", hero_story: "قصتنا",
      hero_stat1: "قطعة أصلية", hero_stat2: "عميلة سعيدة", hero_stat3: "سنوات خبرة",
      perk1_t: "شحن سريع وآمن", perk1_d: "توصيل لكل الولايات خلال ٢-٥ أيام",
      perk2_t: "دفع عند الاستلام", perk2_d: "أو دفع إلكتروني آمن ١٠٠٪",
      perk3_t: "إرجاع مجاني", perk3_d: "خلال ١٤ يوم من الاستلام",
      perk4_t: "دعم على مدار الساعة", perk4_d: "فريقنا جاهز للرد على استفساراتك",
      cats_eyebrow: "تصفّح حسب الفئة", cats_title: "فئات مختارة بعناية",
      cats_desc: "من الزي التقليدي الفاخر إلى الإطلالات العصرية اليومية — كل فئة مصممة لتلائم ذوقك.",
      cat1: "عبايات وتوب", cat2: "فساتين سهرة", cat3: "أزياء يومية", cat4: "إكسسوارات",
      cat_link: "تسوّقي الآن",
      new_eyebrow: "وصل حديثاً", new_title: "أحدث القطع في المجموعة",
      new_desc: "تشكيلة مختارة من أجدد إصدارات الموسم، بجودة عالية وتفاصيل مبهرة.",
      sort_label: "ترتيب حسب:", sort1: "الأحدث", sort2: "الأقل سعراً", sort3: "الأعلى سعراً", sort4: "الأكثر مبيعاً",
      add_cart: "أضف للسلة", quick_view: "عرض سريع",
      why_eyebrow: "لماذا تختارين تسبيح", why_title: "تجربة تسوّق استثنائية",
      why1_t: "خامات فاخرة", why1_d: "نختار أجود الأقمشة المستوردة لضمان راحة وجودة تدوم طويلاً.",
      why2_t: "تصميم حصري", why2_d: "كل قطعة مصممة داخلياً بلمسة فنية لا تجدينها في مكان آخر.",
      why3_t: "خدمة عملاء مميزة", why3_d: "فريق متخصص لمساعدتك في اختيار المقاس والموديل المناسب.",
      test_eyebrow: "آراء عميلاتنا", test_title: "ماذا يقلن عنّا",
      news_title: "انضمي لعائلة تسبيح", news_desc: "اشتركي في نشرتنا البريدية واحصلي على خصم ١٥٪ على طلبك الأول",
      news_placeholder: "بريدك الإلكتروني", news_btn: "اشتراك",
      footer_about: "تسبيح كولكشن علامة سودانية للأزياء الراقية، نقدم قطعاً تجمع بين الأصالة والحداثة بجودة استثنائية وخدمة تليق بكِ.",
      footer_links: "روابط سريعة", footer_help: "خدمة العملاء", footer_newsletter: "النشرة البريدية",
      footer_help1: "سياسة الشحن", footer_help2: "سياسة الإرجاع", footer_help3: "الأسئلة الشائعة", footer_help4: "دليل المقاسات", footer_help5: "تتبع الطلب",
      footer_rights: "جميع الحقوق محفوظة",
      footer_terms: "الشروط والأحكام", footer_privacy: "سياسة الخصوصية",
      page_top: "العودة للأعلى",
    },
    en: {
      top_track: "Track Order", top_help: "Help", top_ship: "Free shipping on orders over 50,000 SDG",
      nav_home: "Home", nav_shop: "Shop", nav_about: "About", nav_contact: "Contact",
      nav_login: "My Account", nav_order: "Order Now",
      theme_label: "Choose site color", lang_label: "Language / اللغة",
      hero_badge: "New Season Collection 2026",
      hero_title_1: "Elegance woven", hero_title_2: "with authenticity",
      hero_desc: "Tsabih Collection — your first destination for premium fashion, designed with love to blend heritage with a modern touch in every piece.",
      hero_shop: "Shop Collection", hero_story: "Our Story",
      hero_stat1: "Original Pieces", hero_stat2: "Happy Clients", hero_stat3: "Years of Craft",
      perk1_t: "Fast & Safe Shipping", perk1_d: "Delivery to all states within 2-5 days",
      perk2_t: "Cash on Delivery", perk2_d: "Or 100% secure online payment",
      perk3_t: "Free Returns", perk3_d: "Within 14 days of receipt",
      perk4_t: "24/7 Support", perk4_d: "Our team is ready to answer you",
      cats_eyebrow: "Browse by Category", cats_title: "Carefully Curated Categories",
      cats_desc: "From luxurious traditional wear to modern everyday looks — every category is crafted for your taste.",
      cat1: "Abayas & Tobes", cat2: "Evening Dresses", cat3: "Everyday Fashion", cat4: "Accessories",
      cat_link: "Shop Now",
      new_eyebrow: "New Arrivals", new_title: "Latest Pieces in the Collection",
      new_desc: "A curated selection of this season's newest pieces, with premium quality and stunning detail.",
      sort_label: "Sort by:", sort1: "Newest", sort2: "Price: Low to High", sort3: "Price: High to Low", sort4: "Best Selling",
      add_cart: "Add to Cart", quick_view: "Quick View",
      why_eyebrow: "Why Choose Tsabih", why_title: "An Exceptional Shopping Experience",
      why1_t: "Premium Fabrics", why1_d: "We select the finest imported fabrics for lasting comfort and quality.",
      why2_t: "Exclusive Design", why2_d: "Every piece is designed in-house with an artistic touch you won't find elsewhere.",
      why3_t: "Outstanding Service", why3_d: "A dedicated team to help you choose the right size and style.",
      test_eyebrow: "Customer Reviews", test_title: "What They Say About Us",
      news_title: "Join the Tsabih Family", news_desc: "Subscribe to our newsletter and get 15% off your first order",
      news_placeholder: "Your email address", news_btn: "Subscribe",
      footer_about: "Tsabih Collection is a Sudanese fashion brand offering pieces that blend authenticity and modernity with exceptional quality and service worthy of you.",
      footer_links: "Quick Links", footer_help: "Customer Care", footer_newsletter: "Newsletter",
      footer_help1: "Shipping Policy", footer_help2: "Return Policy", footer_help3: "FAQ", footer_help4: "Size Guide", footer_help5: "Track Order",
      footer_rights: "All rights reserved",
      footer_terms: "Terms & Conditions", footer_privacy: "Privacy Policy",
      page_top: "Back to top",
    }
  };
  window.TSABIH_I18N = translations;

  /* ---------------------------------------------------------
     2) تطبيق الثيم المحفوظ
     --------------------------------------------------------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelectorAll(".theme-dot").forEach((dot) => {
      dot.classList.toggle("active", dot.dataset.themeBtn === theme);
    });
    localStorage.setItem(STORAGE_THEME_KEY, theme);
  }

  /* ---------------------------------------------------------
     3) تطبيق اللغة المحفوظة (يبدّل الاتجاه + كل النصوص)
     --------------------------------------------------------- */
  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem(STORAGE_LANG_KEY, lang);

    const dict = translations[lang] || translations.ar;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });

    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.langBtn === lang);
    });
  }

  /* ---------------------------------------------------------
     4) التهيئة عند تحميل كل صفحة
     --------------------------------------------------------- */
  function init() {
    const savedTheme = localStorage.getItem(STORAGE_THEME_KEY) || DEFAULT_THEME;
    const savedLang = localStorage.getItem(STORAGE_LANG_KEY) || DEFAULT_LANG;
    applyTheme(savedTheme);
    applyLang(savedLang);

    // أزرار تبديل الثيم
    document.querySelectorAll(".theme-dot").forEach((dot) => {
      dot.addEventListener("click", () => applyTheme(dot.dataset.themeBtn));
    });

    // أزرار تبديل اللغة
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      btn.addEventListener("click", () => applyLang(btn.dataset.langBtn));
    });

    // فتح/غلق القوائم المنسدلة (اللون واللغة)
    document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const dropdown = toggle.closest(".dropdown");
        document.querySelectorAll(".dropdown").forEach((d) => {
          if (d !== dropdown) d.classList.remove("open");
        });
        dropdown.classList.toggle("open");
      });
    });
    document.addEventListener("click", () => {
      document.querySelectorAll(".dropdown.open").forEach((d) => d.classList.remove("open"));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // إتاحة الدوال عالمياً لو احتجناها من ملفات أخرى
  window.TsabihTheme = { applyTheme, applyLang };
})();
