/* TechsFixr — header & mobile navigation */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  var backdrop = document.querySelector(".nav-backdrop");
  var mobileQuery = window.matchMedia("(max-width: 960px)");

  /* Shadow on the sticky header once the page scrolls */
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (!toggle || !nav) return;

  function focusables() {
    return Array.prototype.slice.call(nav.querySelectorAll("a[href], button:not([disabled])"));
  }

  function openNav() {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    nav.classList.add("is-open");
    if (backdrop) backdrop.classList.add("is-visible");
    document.body.classList.add("nav-open");
    /* wait a frame so the drawer is visible before moving focus into it */
    setTimeout(function () {
      var first = focusables()[0];
      if (first) first.focus();
    }, 60);
  }

  function closeNav(returnFocus) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    nav.classList.remove("is-open");
    if (backdrop) backdrop.classList.remove("is-visible");
    document.body.classList.remove("nav-open");
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener("click", function () {
    if (toggle.getAttribute("aria-expanded") === "true") closeNav(false);
    else openNav();
  });

  if (backdrop) backdrop.addEventListener("click", function () { closeNav(true); });

  /* Close after choosing a link (same-page anchors otherwise leave the drawer open) */
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a") && mobileQuery.matches) closeNav(false);
  });

  document.addEventListener("keydown", function (e) {
    if (!nav.classList.contains("is-open")) return;

    if (e.key === "Escape") {
      closeNav(true);
      return;
    }

    /* Keep keyboard focus inside the open drawer */
    if (e.key === "Tab") {
      var items = [toggle].concat(focusables());
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* Reset state when resizing up to the desktop layout */
  function onBreakpoint(e) {
    if (!e.matches) closeNav(false);
  }
  if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", onBreakpoint);
  else if (mobileQuery.addListener) mobileQuery.addListener(onBreakpoint);
})();
