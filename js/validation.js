/* ============================================================
   TSABIH COLLECTION — validation.js
   تحقق كامل من صحة النماذج في المتصفح (Client-Side)
   يعمل جنباً إلى جنب مع التحقق الموجود في ملفات PHP
   (التحقق في PHP إلزامي دائماً، وتحقق JS هنا لتحسين تجربة المستخدم فقط)
   ============================================================ */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     أدوات مساعدة عامة
     --------------------------------------------------------- */
  const patterns = {
    // بريد إلكتروني بصيغة صحيحة
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    // رقم سوداني: يبدأ بـ 09 أو 01 متبوعاً بـ 8 أرقام (أو صيغة +249)
    phoneSD: /^(?:\+249|0)?(9|1)\d{8}$/,
    // اسم عربي/إنجليزي لا يقل عن حرفين، يسمح بمسافات
    name: /^[\u0600-\u06FFa-zA-Z\s]{2,50}$/,
    // كلمة مرور: 8 أحرف على الأقل، حرف كبير، حرف صغير، رقم
    passwordStrong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    postal: /^\d{3,10}$/,
  };

  function setError(input, message) {
    input.classList.add("invalid");
    input.classList.remove("valid");
    const err = fieldError(input);
    if (err) { err.textContent = message; err.classList.add("show"); }
  }
  function setValid(input) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    const err = fieldError(input);
    if (err) err.classList.remove("show");
  }
  function fieldError(input) {
    const group = input.closest(".form-group");
    return group ? group.querySelector(".field-error") : null;
  }
  function showAlert(form, type, message) {
    const box = form.querySelector(".alert-box");
    if (!box) return;
    box.className = "alert-box show " + (type === "error" ? "alert-error" : "alert-success");
    box.innerHTML = (type === "error" ? "⚠️ " : "✅ ") + message;
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* ---------------------------------------------------------
     قواعد تحقق لكل نوع حقل — تُقرأ من data-validate="rule"
     --------------------------------------------------------- */
  function validateField(input) {
    const rule = input.dataset.validate;
    const val = input.value.trim();
    const required = input.hasAttribute("required");

    if (required && val === "") {
      setError(input, "هذا الحقل إلزامي ولا يمكن تركه فارغاً");
      return false;
    }
    if (!required && val === "") { setValid(input); return true; }

    switch (rule) {
      case "name":
        if (!patterns.name.test(val)) { setError(input, "الاسم يجب أن يحتوي حروفاً فقط (٢-٥٠ حرف)"); return false; }
        break;
      case "email":
        if (!patterns.email.test(val)) { setError(input, "صيغة البريد الإلكتروني غير صحيحة"); return false; }
        break;
      case "phone":
        if (!patterns.phoneSD.test(val.replace(/\s/g, ""))) { setError(input, "رقم الهاتف غير صحيح، مثال: 0912345678"); return false; }
        break;
      case "password":
        if (!patterns.passwordStrong.test(val)) { setError(input, "٨ أحرف على الأقل، حرف كبير وصغير ورقم واحد على الأقل"); return false; }
        break;
      case "confirm-password": {
        const target = document.getElementById(input.dataset.matches);
        if (!target || val !== target.value) { setError(input, "كلمتا المرور غير متطابقتين"); return false; }
        break;
      }
      case "address":
        if (val.length < 8) { setError(input, "يرجى كتابة عنوان تفصيلي لا يقل عن ٨ أحرف"); return false; }
        break;
      case "message":
        if (val.length < 10) { setError(input, "الرسالة قصيرة جداً، اكتبي ١٠ أحرف على الأقل"); return false; }
        break;
      case "postal":
        if (!patterns.postal.test(val)) { setError(input, "الرمز البريدي غير صحيح"); return false; }
        break;
      case "checkbox":
        if (!input.checked) { setError(input, "يجب الموافقة على الشروط والأحكام"); return false; }
        return true;
      default:
        break;
    }
    setValid(input);
    return true;
  }

  /* ---------------------------------------------------------
     قياس قوة كلمة المرور بصرياً
     --------------------------------------------------------- */
  function passwordStrengthMeter(input) {
    const wrap = input.closest(".form-group").querySelector(".pass-strength");
    if (!wrap) return;
    const bars = wrap.querySelectorAll("span");
    const val = input.value;
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[a-z]/.test(val) && /\d/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    const colors = ["#B23A3A", "#D98B3A", "#D9C43A", "#3E7A4C"];
    bars.forEach((bar, i) => {
      bar.style.background = i < score ? colors[Math.max(score - 1, 0)] : "";
    });
  }

  /* ---------------------------------------------------------
     ربط الأحداث بكل نموذج يحمل data-validate-form
     --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("form[data-validate-form]").forEach((form) => {
      const fields = form.querySelectorAll("[data-validate]");

      fields.forEach((input) => {
        input.addEventListener("blur", () => validateField(input));
        input.addEventListener("input", () => {
          if (input.classList.contains("invalid")) validateField(input);
          if (input.dataset.validate === "password") passwordStrengthMeter(input);
        });
      });

      form.addEventListener("submit", function (e) {
        let allValid = true;
        fields.forEach((input) => {
          if (!validateField(input)) allValid = false;
        });

        if (!allValid) {
          e.preventDefault();
          showAlert(form, "error", "يوجد خطأ في بعض الحقول، يرجى مراجعتها قبل الإرسال.");
          const firstInvalid = form.querySelector(".invalid");
          if (firstInvalid) firstInvalid.focus();
          return false;
        }

        // إن كان النموذج تجريبياً بدون خادم PHP فعلي (data-demo="true")
        // نمنع الإرسال الحقيقي ونعرض رسالة نجاح توضيحية بدلاً من ذلك
        if (form.dataset.demo === "true") {
          e.preventDefault();
          showAlert(form, "success", form.dataset.successMsg || "تم إرسال البيانات بنجاح!");
          setTimeout(() => form.reset(), 1200);
        }
        // غير ذلك: يسمح للنموذج بالإرسال الفعلي إلى ملف PHP المحدد في action=""
        // حيث يتم تكرار كل هذا التحقق مرة أخرى من جهة الخادم لضمان الأمان
      });
    });
  });

  window.TsabihValidate = { validateField, patterns };
})();
