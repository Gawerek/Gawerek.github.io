(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const buildDate = document.getElementById("build-date");
  if (buildDate) {
    buildDate.textContent = new Date().toISOString().slice(0, 10);
  }

  const revealTargets = [...document.querySelectorAll(".reveal")];
  if (prefersReducedMotion || location.hash) {
    // A direct #hash load lands mid-page with nothing scrolled past yet, so
    // content above the target would otherwise sit invisible until the next
    // scroll — just show everything instead of animating in this case.
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  } else {
    // Polled per frame against actual layout rather than IntersectionObserver:
    // a fast flick-scroll, scrollbar drag, or direct #hash navigation can jump
    // past an element's intersection window between observer samples, leaving
    // it stuck at opacity 0. Checking getBoundingClientRect() every frame
    // can't be outrun the same way.
    let pending = revealTargets;
    const checkReveal = () => {
      pending = pending.filter((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
          el.classList.add("is-visible");
          return false;
        }
        return true;
      });
      if (pending.length) requestAnimationFrame(checkReveal);
    };
    requestAnimationFrame(checkReveal);
  }

  const navLinks = document.querySelectorAll("[data-nav]");
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = document.querySelector(`[data-nav][href="#${entry.target.id}"]`);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.removeAttribute("aria-current"));
            link.setAttribute("aria-current", "location");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((section) => navObserver.observe(section));
  }
})();
