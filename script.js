(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const buildDate = document.getElementById("build-date");
  if (buildDate) {
    buildDate.textContent = new Date().toISOString().slice(0, 10);
  }

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
        "Multi-cloud VM provisioning pipeline spanning AWS and Azure — one of two platforms I lead on the cloud team. Infrastructure defined and versioned end to end, from network to configured host.",
      tags: ["Terraform", "Bicep", "Ansible", "PowerShell DSC", "GitHub Actions", "Azure DevOps"],
      meta: "Client engagement — described at a high level; architecture detail withheld.",
      repoUrl: "#",
      demoUrl: "#",
    },
    gips: {
      kicker: "02",
      title: "GIPS",
      detail:
        "Multi-cloud golden image platform (AWS + Azure) — standardized, versioned base images feeding the provisioning pipeline above, reducing drift between clouds.",
      tags: ["Terraform", "Bicep", "Ansible", "PowerShell DSC"],
      meta: "Client engagement — described at a high level; architecture detail withheld.",
      repoUrl: "#",
      demoUrl: "#",
    },
    legal: {
      kicker: "03",
      title: "Legal document automation pipeline",
      detail:
        "An independent build for a law-firm client: an automated pipeline that ingests, processes, and generates legal documents, orchestrated end to end with a Postgres-backed workflow engine.",
      tags: ["n8n", "PostgreSQL", "Docker", "Claude API"],
      meta: "Independent engagement — client name withheld pending confirmation.",
      repoUrl: "#",
      demoUrl: "#",
    },
  };

  const backdrop = document.getElementById("dialog-backdrop");
  const dialogKicker = document.getElementById("dialog-kicker");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogDetail = document.getElementById("dialog-detail");
  const dialogTags = document.getElementById("dialog-tags");
  const dialogMeta = document.getElementById("dialog-meta");
  const dialogRepo = document.getElementById("dialog-repo");
  const dialogDemo = document.getElementById("dialog-demo");
  const dialogClose = document.getElementById("dialog-close");
  let lastFocused = null;

  const openProject = (id) => {
    const p = PROJECTS[id];
    if (!p || !backdrop) return;
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
    dialogRepo.href = p.repoUrl;
    dialogDemo.href = p.demoUrl;
    lastFocused = document.activeElement;
    backdrop.hidden = false;
    dialogClose.focus();
  };

  const closeProject = () => {
    if (!backdrop) return;
    backdrop.hidden = true;
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll("[data-project]").forEach((card) => {
    card.addEventListener("click", () => openProject(card.getAttribute("data-project")));
  });
  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeProject();
    });
  }
  if (dialogClose) dialogClose.addEventListener("click", closeProject);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop && !backdrop.hidden) closeProject();
  });

  // — copy email —
  const copyBtn = document.getElementById("copy-email-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("hello@example.com").then(() => {
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = "Copy email";
        }, 1800);
      });
    });
  }
})();
