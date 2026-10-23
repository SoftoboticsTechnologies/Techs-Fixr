/* TechsFixr — page interactions: reveal animations, testimonial slider, forms */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "918088643818";
  var CONTACT_EMAIL = "support@techsfixer.in"; // address used by the original contact-page form

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-revealed"); });
  }

  /* ------------------------------------------------------------------
     Testimonial slider
     Mirrors the original: 3 / 2 / 1 cards visible, prev/next buttons,
     auto-advance every 4 seconds and loop back to the start.
     ------------------------------------------------------------------ */
  document.querySelectorAll("[data-slider]").forEach(function (slider) {
    var track = slider.querySelector(".slider__track");
    var slides = track ? track.children : [];
    var prev = slider.querySelector("[data-slider-prev]");
    var next = slider.querySelector("[data-slider-next]");
    var dotsWrap = slider.querySelector(".slider__dots");
    var index = 0;
    var timer = null;

    if (!track || !slides.length) return;

    function visible() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth <= 960) return 2;
      return 3;
    }
    function maxIndex() { return Math.max(0, slides.length - visible()); }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      for (var i = 0; i <= maxIndex(); i++) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slider__dot";
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        dot.dataset.index = i;
        dotsWrap.appendChild(dot);
      }
    }

    function update() {
      if (index > maxIndex()) index = maxIndex();
      var shift = index * (100 / visible());
      track.style.transform = "translateX(-" + shift + "%)";
      Array.prototype.forEach.call(slides, function (s, i) {
        var shown = i >= index && i < index + visible();
        s.setAttribute("aria-hidden", shown ? "false" : "true");
      });
      if (dotsWrap) {
        Array.prototype.forEach.call(dotsWrap.children, function (d, i) {
          d.setAttribute("aria-current", i === index ? "true" : "false");
        });
      }
    }

    function go(i) { index = i; update(); }
    function advance() { go(index < maxIndex() ? index + 1 : 0); }

    function start() {
      if (reduceMotion) return;
      stop();
      timer = setInterval(advance, 4000);
    }
    function stop() { if (timer) clearInterval(timer); timer = null; }

    if (next) next.addEventListener("click", function () { if (index < maxIndex()) go(index + 1); start(); });
    if (prev) prev.addEventListener("click", function () { if (index > 0) go(index - 1); start(); });
    if (dotsWrap) dotsWrap.addEventListener("click", function (e) {
      var dot = e.target.closest(".slider__dot");
      if (dot) { go(Number(dot.dataset.index)); start(); }
    });

    slider.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); if (index < maxIndex()) go(index + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); if (index > 0) go(index - 1); }
    });

    /* Pause while the visitor is reading or interacting */
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);

    /* Basic swipe support for touch screens */
    var touchX = null;
    track.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; stop(); }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) {
        if (dx < 0 && index < maxIndex()) go(index + 1);
        if (dx > 0 && index > 0) go(index - 1);
      }
      touchX = null;
      start();
    });

    var lastVisible = visible();
    window.addEventListener("resize", function () {
      if (visible() !== lastVisible) { lastVisible = visible(); buildDots(); }
      update();
    });

    buildDots();
    update();
    start();
  });

  /* ------------------------------------------------------------------
     Forms
     ------------------------------------------------------------------ */
  var MSG_REQUIRED = "This field is required.";
  var MSG_EMAIL = "Enter a valid email address.";
  var MSG_PHONE = "Enter a valid phone number.";

  function setError(field, message) {
    var wrap = field.closest(".field");
    if (!wrap) return;
    var out = wrap.querySelector(".field-error");
    wrap.classList.toggle("has-error", !!message);
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (out) out.textContent = message || "";
  }

  function validateField(field) {
    var value = field.value.trim();
    if (field.hasAttribute("data-required") && !value) return MSG_REQUIRED;
    if (value && field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return MSG_EMAIL;
    if (value && field.dataset.type === "phone" && !/^[+\d][\d\s()-]{5,}$/.test(value)) return MSG_PHONE;
    return "";
  }

  function openWhatsApp(text) {
    /* "noopener" would make window.open() return null, so detach the opener manually */
    var win = window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text), "_blank");
    if (win) win.opener = null;
    return win;
  }

  /* Home page "Request Call Back" form.
     The original posted to a WordPress (SureForms) REST endpoint, which a static
     site cannot reach. The request is handed off to WhatsApp instead — see README. */
  var callback = document.querySelector("[data-form='callback']");
  if (callback) {
    var alertBox = callback.querySelector(".form-alert");
    var fields = callback.querySelectorAll("input, textarea");

    fields.forEach(function (f) {
      f.addEventListener("blur", function () { if (f.closest(".field").classList.contains("has-error")) setError(f, validateField(f)); });
      f.addEventListener("input", function () { if (f.closest(".field").classList.contains("has-error")) setError(f, validateField(f)); });
    });

    callback.addEventListener("submit", function (e) {
      e.preventDefault();
      if (alertBox) alertBox.classList.remove("is-visible");

      var firstInvalid = null;
      fields.forEach(function (f) {
        var msg = validateField(f);
        setError(f, msg);
        if (msg && !firstInvalid) firstInvalid = f;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      var d = function (name) { return callback.querySelector("[name='" + name + "']").value.trim(); };
      var text = "Request Call Back\nName: " + d("name") + "\nEmail: " + d("email") +
        "\nContact Number: " + d("phone") + "\nYour Message: " + d("message");

      var win = openWhatsApp(text);
      if (!win && alertBox) alertBox.classList.add("is-visible");
      else callback.reset();
    });
  }

  /* "Book a Repair" form (Contact page) and the "Get Estimate" pop-up — same behaviour as the
     original contact form: opens WhatsApp with the request, then triggers an email to the support address.
     Delegated so it also covers the pop-up form, which is created later. */
  document.addEventListener("submit", function (e) {
    var form = e.target.closest("[data-form='contact']");
    if (!form) return;
    e.preventDefault();
    var val = function (n) { return form.querySelector("[name='" + n + "']").value; };

    var body = "Name: " + val("name") + "\nEmail: " + val("email") + "\nPhone: " + val("phone") + "\nIssue: " + val("message");

    openWhatsApp("New Repair Request:\n" + body);

    window.location.href = "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent("New Repair Request") +
      "&body=" + encodeURIComponent(body);

    form.reset();
    var dialog = form.closest("dialog");
    if (dialog && dialog.open) dialog.close();
  });

  /* ------------------------------------------------------------------
     "Get Estimate" pop-up form
     Without JS, the button is a plain link to contact.html.
     ------------------------------------------------------------------ */
  var estimateTriggers = document.querySelectorAll("[data-estimate]");
  if (estimateTriggers.length && typeof HTMLDialogElement === "function") {
    var modal = document.createElement("dialog");
    modal.className = "modal";
    modal.id = "estimate-modal";
    modal.setAttribute("aria-labelledby", "estimate-title");
    modal.innerHTML =
      '<div class="modal__card form-card">' +
        '<button class="modal__close" type="button" aria-label="Close">&times;</button>' +
        '<h3 id="estimate-title">Get Estimate</h3>' +
        '<form data-form="contact">' +
          '<div class="field"><label class="visually-hidden" for="est-name">Your Name</label><input type="text" id="est-name" name="name" placeholder="Your Name" autocomplete="name" required></div>' +
          '<div class="field"><label class="visually-hidden" for="est-email">Your Email</label><input type="email" id="est-email" name="email" placeholder="Your Email" autocomplete="email" required></div>' +
          '<div class="field"><label class="visually-hidden" for="est-phone">Phone Number</label><input type="tel" id="est-phone" name="phone" placeholder="Phone Number" autocomplete="tel" required></div>' +
          '<div class="field"><label class="visually-hidden" for="est-message">Describe Issue</label><textarea id="est-message" name="message" placeholder="Describe Issue"></textarea></div>' +
          '<button class="btn btn--block" type="submit">Submit</button>' +
        '</form>' +
      '</div>';
    document.body.appendChild(modal);

    var lastTrigger = null;

    estimateTriggers.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        lastTrigger = btn;
        modal.showModal();
        document.body.classList.add("modal-open");
        setTimeout(function () { modal.querySelector("input").focus(); }, 30);
      });
    });

    modal.querySelector(".modal__close").addEventListener("click", function () { modal.close(); });

    /* Clicking the dimmed backdrop (the dialog element itself, outside the card) closes it */
    modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });

    modal.addEventListener("close", function () {
      document.body.classList.remove("modal-open");
      /* the trigger may sit in the now-closed mobile drawer, so fall back to the menu button */
      var visible = lastTrigger && (lastTrigger.checkVisibility
        ? lastTrigger.checkVisibility({ visibilityProperty: true })
        : getComputedStyle(lastTrigger).visibility !== "hidden" && lastTrigger.offsetParent);
      var target = visible ? lastTrigger : document.querySelector(".nav-toggle");
      if (target) target.focus();
    });
  }
})();
