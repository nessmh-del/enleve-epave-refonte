/* ============================================================
   ENLÈVE ÉPAVE — interactions & motion
   ============================================================ */
(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- NAV : état au scroll ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const burger = document.getElementById("burger");
  const overlay = document.getElementById("menuOverlay");
  const toggleMenu = (force) => {
    const open = force !== undefined ? force : !burger.classList.contains("open");
    burger.classList.toggle("open", open);
    overlay.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    overlay.setAttribute("aria-hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggleMenu());
  overlay.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => toggleMenu(false))
  );

  /* ---------- Formulaire (démo : confirmation client-side) ---------- */
  const form = document.getElementById("leadForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.querySelectorAll(".field, .form-mini, button[type=submit]").forEach(
        (el) => (el.style.display = "none")
      );
      const ok = document.getElementById("formSuccess");
      ok.hidden = false;
      if (window.gsap && !reduce) {
        gsap.fromTo(ok, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: "power2.out" });
      }
    });
  }

  /* ---------- GSAP ---------- */
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  if (reduce) {
    gsap.utils.toArray(".reveal, .reveal-visual").forEach((el) =>
      gsap.set(el, { clearProps: "all" })
    );
    return;
  }

  /* Hero : titre masque + stagger */
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .from(".hero-title .line > span", { yPercent: 110, duration: 1, stagger: .12 }, 0)
    .from(".hero .eyebrow", { y: 20, opacity: 0, duration: .7 }, .15)
    .from(".hero-sub", { y: 22, opacity: 0, filter: "blur(8px)", duration: .8 }, .3)
    .from(".hero-actions", { y: 22, opacity: 0, duration: .8 }, .42)
    .from(".hero-assur li", { y: 16, opacity: 0, duration: .6, stagger: .08 }, .55)
    .from(".hero-shell", { y: 40, opacity: 0, scale: .96, filter: "blur(10px)", duration: 1.1 }, .25)
    .from(".hero-chip", { y: 18, opacity: 0, scale: .9, duration: .7, stagger: .14 }, .8);

  /* Camion : petit flottement + roues */
  gsap.to(".truck-body", { y: -6, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
  gsap.to(".wheel", { rotation: 360, transformOrigin: "center", duration: 6, ease: "none", repeat: -1 });

  /* Reveal générique au scroll (exclut les éléments à animation dédiée) */
  gsap.utils.toArray(".reveal:not(.step):not(.card):not(.zone-pill)").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      y: 40, opacity: 0, filter: "blur(8px)", duration: .9, ease: "power3.out",
    });
  });

  gsap.utils.toArray(".reveal-visual").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      y: 50, opacity: 0, scale: .97, duration: 1.1, ease: "power3.out",
    });
  });

  /* Steps : cascade + léger décalage vertical */
  gsap.utils.toArray(".step").forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: ".steps", start: "top 80%", once: true },
      y: 60, opacity: 0, duration: .9, ease: "power3.out", delay: i * 0.12,
    });
  });

  /* Bento : stagger */
  gsap.from(".bento .card", {
    scrollTrigger: { trigger: ".bento", start: "top 80%", once: true },
    y: 50, opacity: 0, duration: .85, ease: "power3.out", stagger: .09,
  });

  /* Zones pills : pop stagger */
  gsap.from(".zone-pill", {
    scrollTrigger: { trigger: ".zones-list", start: "top 85%", once: true },
    y: 24, opacity: 0, scale: .92, duration: .55, ease: "back.out(1.6)", stagger: .05,
  });

  /* Compteurs animés */
  gsap.utils.toArray(".trust-num").forEach((el) => {
    const target = el.getAttribute("data-count");
    if (target === null) return; // texte (ex. VHU)
    const suffix = el.getAttribute("data-suffix") || "";
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: "top 90%", once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: +target, duration: 1.6, ease: "power2.out",
          onUpdate: () => (el.textContent = Math.round(obj.v) + suffix),
        }),
    });
  });

  /* Boutons magnétiques (desktop, pointeur fin) */
  if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    document.querySelectorAll(".btn-lg").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width / 2) * .18,
          y: (e.clientY - r.top - r.height / 2) * .28,
          duration: .5, ease: "power2.out",
        });
      });
      btn.addEventListener("mouseleave", () =>
        gsap.to(btn, { x: 0, y: 0, duration: .6, ease: "elastic.out(1,.5)" })
      );
    });
  }
})();
