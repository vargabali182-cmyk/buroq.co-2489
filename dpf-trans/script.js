// DPF Trans – kis interakciók (menü, animációk, ajánlatkérő űrlap)
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");

  // --- Fejléc árnyék görgetéskor ---
  var header = document.querySelector(".header");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- Mobil menü ---
  var nav = document.getElementById("nav");
  var toggle = document.querySelector(".nav-toggle");
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }
  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("is-open"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  // --- Megjelenés görgetésre ---
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el, i) {
      // testvér elemek kis késleltetéssel jönnek egymás után
      el.style.transitionDelay = (i % 3) * 80 + "ms";
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // --- Ajánlatkérő űrlap ---
  var form = document.getElementById("quote-form");
  var done = document.getElementById("quote-done");
  var reset = document.getElementById("quote-reset");

  var dateInput = form.querySelector('input[type="date"]');
  dateInput.min = new Date().toISOString().slice(0, 10);

  var fileInput = form.querySelector('input[type="file"]');
  var fileLabel = form.querySelector(".file-btn em");
  fileInput.addEventListener("change", function () {
    var n = fileInput.files.length;
    fileLabel.textContent = n === 0 ? "Kép feltöltése" : n === 1 ? fileInput.files[0].name : n + " kép kiválasztva";
  });

  function markInvalid(input) {
    var wrap = input.closest(".field, .consent");
    var bad = !input.checkValidity();
    wrap.classList.toggle("is-invalid", bad);
    return bad;
  }

  form.addEventListener("input", function (e) {
    if (e.target.closest(".is-invalid")) markInvalid(e.target);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var firstBad = null;
    form.querySelectorAll("[required]").forEach(function (input) {
      if (markInvalid(input) && !firstBad) firstBad = input;
    });
    if (firstBad) {
      firstBad.focus();
      return;
    }

    // DEMO: itt még nem megy el sehova az adat.
    // Élesítéskor pl. Web3Forms / Formspree végpontra küldjük (lásd README).
    form.hidden = true;
    done.hidden = false;
    done.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  reset.addEventListener("click", function () {
    form.reset();
    fileLabel.textContent = "Kép feltöltése";
    done.hidden = true;
    form.hidden = false;
  });

  // --- Évszám a láblécben ---
  document.getElementById("year").textContent = new Date().getFullYear();
})();
