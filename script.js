(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // — scroll progress bar —
  const progressFill = document.getElementById("progress-fill");
  if (progressFill) {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      progressFill.style.width = pct + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  // — active nav link —
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
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  // — hero cursor glow —
  const hero = document.getElementById("hero");
  const heroGlow = document.getElementById("hero-glow");
  if (hero && heroGlow && !prefersReducedMotion) {
    hero.addEventListener("pointermove", (e) => {
      const rect = hero.getBoundingClientRect();
      heroGlow.style.setProperty("--mx", e.clientX - rect.left + "px");
      heroGlow.style.setProperty("--my", e.clientY - rect.top + "px");
    });
  }

  // — project dialog —
  const PROJECTS = {
    mciti: {
      kicker: "01",
      title: "MCITI",
      detail:
        "Problem: virtual machines had to be provisioned consistently across two clouds, AWS and Azure. Approach: a multi-cloud provisioning pipeline with infrastructure defined and versioned as code, from network to configured host; one of two platforms I lead on the cloud team. Outcome: repeatable, reviewable provisioning instead of hand-built machines.",
      // TODO(owner): add a real, quantifiable outcome
      tags: ["Terraform", "Bicep", "Ansible", "PowerShell DSC", "GitHub Actions", "Azure DevOps"],
      meta: "Client engagement.",
    },
    gips: {
      kicker: "02",
      title: "GIPS",
      detail:
        "Problem: base images needed to stay standardized across AWS and Azure. Approach: a multi-cloud golden image platform producing versioned, standardized base images that feed the provisioning pipeline above. Outcome: every machine starts from the same known, versioned baseline on both clouds.",
      // TODO(owner): add a real, quantifiable outcome
      tags: ["Terraform", "Bicep", "Ansible", "PowerShell DSC"],
      meta: "Client engagement.",
    },
    legal: {
      kicker: "03",
      title: "Legal document automation pipeline",
      detail:
        "Problem: a law-firm client needed legal documents handled with less manual work. Approach: an independent build of an automated pipeline that ingests, processes, and generates documents, orchestrated end to end with n8n on a Postgres-backed workflow, containerized with Docker and using the Claude API. Outcome: an end-to-end automated document flow for the client.",
      // TODO(owner): add a real, quantifiable outcome
      tags: ["n8n", "PostgreSQL", "Docker", "Claude API"],
      meta: "Independent engagement.",
    },
  };

  // Optional per-project links: add `repoUrl` / `demoUrl` (real https URLs) to a
  // PROJECTS entry and a matching action link is rendered in the dialog.
  const PROJECT_LINKS = [
    ["repoUrl", "Repo"],
    ["demoUrl", "Live demo"],
  ];

  const dialog = document.getElementById("project-dialog");
  const dialogKicker = document.getElementById("dialog-kicker");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogDetail = document.getElementById("dialog-detail");
  const dialogTags = document.getElementById("dialog-tags");
  const dialogMeta = document.getElementById("dialog-meta");
  const dialogActions = document.getElementById("dialog-actions");
  const dialogClose = document.getElementById("dialog-close");
  let lastFocused = null;

  const openProject = (id, opener) => {
    const p = PROJECTS[id];
    if (!p || !dialog || typeof dialog.showModal !== "function") return;
    dialogKicker.textContent = p.kicker;
    dialogTitle.textContent = p.title;
    dialogDetail.textContent = p.detail;
    dialogTags.innerHTML = "";
    p.tags.forEach((t) => {
      const span = document.createElement("span");
      span.className = "tag tag-neutral";
      span.textContent = t;
      dialogTags.appendChild(span);
    });
    dialogMeta.textContent = p.meta;
    dialogActions.querySelectorAll("a[data-link]").forEach((a) => a.remove());
    PROJECT_LINKS.forEach(([key, label]) => {
      if (!p[key]) return;
      const a = document.createElement("a");
      a.href = p[key];
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "btn btn-secondary";
      a.dataset.link = key;
      a.textContent = label;
      dialogActions.insertBefore(a, dialogClose);
    });
    lastFocused = opener || document.activeElement;
    dialog.showModal();
    dialogClose.focus();
  };

  document.querySelectorAll(".view-details[data-project]").forEach((btn) => {
    btn.addEventListener("click", () => openProject(btn.getAttribute("data-project"), btn));
  });
  if (dialog) {
    // Native <dialog> handles Esc, focus trap, inert background and scroll lock.
    // The dialog has no margin box of its own beyond its padding, and clicks on
    // ::backdrop are dispatched to the <dialog> element, so a click whose target
    // is the dialog itself and whose point lies outside its rect is a backdrop click.
    dialog.addEventListener("click", (e) => {
      if (e.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      const outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      if (outside) dialog.close();
    });
    dialog.addEventListener("close", () => {
      if (lastFocused && lastFocused.isConnected) lastFocused.focus();
      lastFocused = null;
    });
  }
  if (dialogClose && dialog) dialogClose.addEventListener("click", () => dialog.close());

  // — copy email —
  const copyBtn = document.getElementById("copy-email-btn");
  const copyStatus = document.getElementById("copy-status");
  if (copyBtn) {
    const emailLink = document.querySelector('.contact-card a[href^="mailto:"]');
    const email = emailLink ? emailLink.getAttribute("href").replace(/^mailto:/i, "").split("?")[0] : "";
    let resetTimer;
    const announce = (label, message) => {
      copyBtn.textContent = label;
      if (copyStatus) copyStatus.textContent = message;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        copyBtn.textContent = "Copy email";
        if (copyStatus) copyStatus.textContent = "";
      }, 2500);
    };
    const selectFallback = () => {
      // Clipboard API unavailable/denied: select the visible address so Ctrl+C works.
      if (emailLink && window.getSelection) {
        const range = document.createRange();
        range.selectNodeContents(emailLink);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
      announce("Press Ctrl+C", "Copy failed. Email address selected, press Ctrl+C to copy.");
    };
    copyBtn.addEventListener("click", () => {
      if (!email) return;
      if (!navigator.clipboard || !navigator.clipboard.writeText) return selectFallback();
      navigator.clipboard
        .writeText(email)
        .then(() => announce("Copied!", "Email address copied to clipboard."))
        .catch(selectFallback);
    });
  }
})();
