/* ============================================================
   TSABIH COLLECTION — main.js
   القائمة المتنقلة، الحركات عند التمرير، السلة، المفضلة،
   الفلاتر، الأسئلة الشائعة، خطوات الطلب، زر العودة للأعلى...
   ============================================================ */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    /* ---------- 1) قائمة الجوال (Burger Menu) مع التغطية ---------- */
    var burger = document.querySelector(".burger");
    var navLinks = document.querySelector(".nav-links");

    // إنشاء طبقة التغطية الخلفية
    var overlay = document.querySelector(".nav-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "nav-overlay";
      document.body.appendChild(overlay);
    }

    // دالة لفتح/إغلاق القائمة
    function toggleMenu() {
      if (!burger || !navLinks) return;

      burger.classList.toggle("active");
      navLinks.classList.toggle("open");
      overlay.classList.toggle("active");

      // منع التمرير خلف القائمة عند فتحها
      document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
      
      console.log("القائمة مفتوحة؟", navLinks.classList.contains("open"));
    }

    // دالة لإغلاق القائمة
    function closeMenu() {
      if (!burger || !navLinks) return;

      burger.classList.remove("active");
      navLinks.classList.remove("open");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
      
      console.log("تم إغلاق القائمة");
    }

    if (burger && navLinks) {
      console.log("✅ تم العثور على البرغر والقائمة");

      // عند الضغط على زر البرغر
      burger.addEventListener("click", function(e) {
        e.stopPropagation();
        console.log("✅ تم الضغط على البرغر");
        toggleMenu();
      });

      // عند الضغط على التغطية الخلفية
      overlay.addEventListener("click", closeMenu);

      // عند الضغط على أي رابط داخل القائمة
      navLinks.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function(e) {
          console.log("تم الضغط على رابط:", link.textContent);
          // نغلق القائمة بعد الضغط على الرابط
          closeMenu();
          // نسمح للرابط بالعمل بشكل طبيعي
          return true;
        });
      });

      // عند الضغط على زر ESC
      document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") closeMenu();
      });

    } else {
      console.log("❌ لم يتم العثور على البرغر أو القائمة");
    }

    /* ---------- 2) ظل الهيدر عند التمرير + زر العودة للأعلى ---------- */
    var header = document.querySelector(".site-header");
    var scrollTopBtn = document.querySelector(".scroll-top");

    window.addEventListener("scroll", function() {
      var y = window.scrollY;
      if (header) {
        header.classList.toggle("scrolled", y > 10);
      }
      if (scrollTopBtn) {
        scrollTopBtn.classList.toggle("show", y > 500);
      }
      revealOnScroll();
    });

    if (scrollTopBtn) {
      scrollTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* ---------- 3) الكشف التدريجي عن العناصر عند التمرير ---------- */
    function revealOnScroll() {
      var items = document.querySelectorAll("[data-reveal]:not(.revealed)");
      var winH = window.innerHeight;
      items.forEach(function(el) {
        var top = el.getBoundingClientRect().top;
        if (top < winH - 80) el.classList.add("revealed");
      });
    }
    revealOnScroll();

    /* ---------- 4) عداد السلة والمفضلة ---------- */
    var CART_KEY = "tsabih_cart_count";
    var FAV_KEY = "tsabih_fav_count";

    function bumpCounter(key, selector) {
      var n = parseInt(localStorage.getItem(key) || "0", 10) + 1;
      localStorage.setItem(key, n);
      document.querySelectorAll(selector).forEach(function(el) {
        el.textContent = n;
      });
    }

    function loadCounters() {
      var cart = localStorage.getItem(CART_KEY) || "0";
      var fav = localStorage.getItem(FAV_KEY) || "0";
      document.querySelectorAll(".cart-count").forEach(function(el) {
        el.textContent = cart;
      });
      document.querySelectorAll(".fav-count").forEach(function(el) {
        el.textContent = fav;
      });
    }
    loadCounters();

    document.querySelectorAll(".js-add-cart").forEach(function(btn) {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        bumpCounter(CART_KEY, ".cart-count");
        showToast("تمت الإضافة للسلة", "تم إضافة المنتج إلى سلة التسوق بنجاح.");
      });
    });

    document.querySelectorAll(".js-add-fav").forEach(function(btn) {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        btn.classList.toggle("active-fav");
        bumpCounter(FAV_KEY, ".fav-count");
        showToast("أضيف للمفضلة", "يمكنك مراجعة قائمة المفضلة في أي وقت.");
      });
    });

    /* ---------- 5) اختيار المقاس واللون ---------- */
    document.querySelectorAll(".size-options").forEach(function(wrap) {
      wrap.addEventListener("click", function(e) {
        var opt = e.target.closest(".size-opt");
        if (!opt) return;
        wrap.querySelectorAll(".size-opt").forEach(function(o) {
          o.classList.remove("selected");
        });
        opt.classList.add("selected");
      });
    });

    document.querySelectorAll(".color-options").forEach(function(wrap) {
      wrap.addEventListener("click", function(e) {
        var opt = e.target.closest(".color-opt");
        if (!opt) return;
        wrap.querySelectorAll(".color-opt").forEach(function(o) {
          o.classList.remove("selected");
        });
        opt.classList.add("selected");
      });
    });

    /* ---------- 6) عداد الكمية ---------- */
    document.querySelectorAll(".qty-input").forEach(function(wrap) {
      var input = wrap.querySelector("input");
      wrap.querySelectorAll("button").forEach(function(btn) {
        btn.addEventListener("click", function() {
          var val = parseInt(input.value || "1", 10);
          val = btn.classList.contains("qty-plus") ? val + 1 : Math.max(1, val - 1);
          input.value = val;
          input.dispatchEvent(new Event("change"));
        });
      });
    });

    /* ---------- 7) طرق الدفع ---------- */
    document.querySelectorAll(".pay-opt").forEach(function(opt) {
      opt.addEventListener("click", function() {
        document.querySelectorAll(".pay-opt").forEach(function(o) {
          o.classList.remove("selected");
        });
        opt.classList.add("selected");
        var radio = opt.querySelector("input[type=radio]");
        if (radio) radio.checked = true;
      });
    });

    /* ---------- 8) التبويبات ---------- */
    document.querySelectorAll(".tab-btn").forEach(function(tab) {
      tab.addEventListener("click", function() {
        var group = tab.closest(".tabs").parentElement;
        group.querySelectorAll(".tab-btn").forEach(function(t) {
          t.classList.remove("active");
        });
        group.querySelectorAll(".tab-panel").forEach(function(p) {
          p.classList.remove("active");
        });
        tab.classList.add("active");
        document.getElementById(tab.dataset.tabTarget).classList.add("active");
      });
    });

    /* ---------- 9) إظهار/إخفاء كلمة المرور ---------- */
    document.querySelectorAll(".toggle-pass").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var input = btn.parentElement.querySelector("input");
        var isPass = input.type === "password";
        input.type = isPass ? "text" : "password";
        btn.textContent = isPass ? "🙈" : "👁";
      });
    });

    /* ---------- 10) الأسئلة الشائعة ---------- */
    document.querySelectorAll(".faq-q").forEach(function(q) {
      q.addEventListener("click", function() {
        var item = q.closest(".faq-item");
        var wasOpen = item.classList.contains("open");
        item.parentElement.querySelectorAll(".faq-item").forEach(function(i) {
          i.classList.remove("open");
        });
        if (!wasOpen) item.classList.add("open");
      });
    });

    /* ---------- 11) فلاتر المنتجات ---------- */
    var priceRange = document.querySelector(".price-range");
    var priceOut = document.querySelector(".price-range-out");
    if (priceRange && priceOut) {
      priceRange.addEventListener("input", function() {
        priceOut.textContent = Number(priceRange.value).toLocaleString("ar-SD");
      });
    }

    document.querySelectorAll(".swatch").forEach(function(sw) {
      sw.addEventListener("click", function() {
        sw.classList.toggle("selected");
      });
    });

    /* ---------- 12) نظام التوست ---------- */
    var toastWrap = document.querySelector(".toast-wrap");
    if (!toastWrap) {
      toastWrap = document.createElement("div");
      toastWrap.className = "toast-wrap";
      document.body.appendChild(toastWrap);
    }

    window.showToast = function(title, msg, type) {
      var t = document.createElement("div");
      t.className = "toast" + (type === "error" ? " error" : "");
      t.innerHTML = "<div><strong>" + title + "</strong><p>" + msg + "</p></div>";
      toastWrap.appendChild(t);
      setTimeout(function() {
        t.style.opacity = "0";
        t.style.transform = "translateX(30px)";
        t.style.transition = "all .4s ease";
        setTimeout(function() {
          t.remove();
        }, 400);
      }, 3800);
    };

    /* ---------- 13) تحديد الرابط النشط ---------- */
    var current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(function(a) {
      var href = a.getAttribute("href");
      if (href === current) a.classList.add("active");
    });

    /* ---------- 14) إغلاق القائمة عند تغيير حجم الشاشة ---------- */
    window.addEventListener("resize", function() {
      if (window.innerWidth > 880) {
        closeMenu();
      }
    });

    /* ---------- 15) تأكيد تحميل الصفحة ---------- */
    console.log("✅ Tsabih Collection - تم تحميل الموقع بنجاح");

  });
})();