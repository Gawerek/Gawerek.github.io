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
      repoUrl: "#",
      demoUrl: "#",
    },
    gips: {
      kicker: "02",
      title: "GIPS",
      detail:
        "Problem: base images needed to stay standardized across AWS and Azure. Approach: a multi-cloud golden image platform producing versioned, standardized base images that feed the provisioning pipeline above. Outcome: every machine starts from the same known, versioned baseline on both clouds.",
      // TODO(owner): add a real, quantifiable outcome
      tags: ["Terraform", "Bicep", "Ansible", "PowerShell DSC"],
      meta: "Client engagement.",
      repoUrl: "#",
      demoUrl: "#",
    },
    legal: {
      kicker: "03",
      title: "Legal document automation pipeline",
      detail:
        "Problem: a law-firm client needed legal documents handled with less manual work. Approach: an independent build of an automated pipeline that ingests, processes, and generates documents, orchestrated end to end with n8n on a Postgres-backed workflow, containerized with Docker and using the Claude API. Outcome: an end-to-end automated document flow for the client.",
      // TODO(owner): add a real, quantifiable outcome
      tags: ["n8n", "PostgreSQL", "Docker", "Claude API"],
      meta: "Independent engagement.",
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
    const mailLink = copyBtn.parentElement.querySelector('a[href^="mailto:"]');
    const email = mailLink ? mailLink.href.replace("mailto:", "") : "";
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(email).then(() => {
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = "Copy email";
        }, 1800);
      });
    });
  }
})();
