(function () {
  var data = window.PORTFOLIO_DATA;

  if (!data) {
    return;
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
    renderHomePage();
    renderSubpageContent();
    renderHighlightStats();
    renderExperienceLists();
    renderSkillGroups();
    renderProfileLinks();
    renderContactCards();
    bindEmailLinks();
    bindCopyEmail();
  });

  function normalizePath(pathname) {
    var normalized = pathname || "/";

    if (normalized.endsWith("index.html")) {
      normalized = normalized.slice(0, -10);
    }

    if (!normalized.endsWith("/")) {
      normalized += "/";
    }

    return normalized;
  }

  function renderHeader() {
    var header = document.querySelector("[data-site-header]");

    if (!header) {
      return;
    }

    var currentPath = normalizePath(window.location.pathname);
    var nav = data.navItems
      .map(function (item) {
        var itemPath = normalizePath(item.href);
        var isActive = currentPath === itemPath;

        return (
          '<a class="nav-link' +
          (isActive ? " is-active" : "") +
          '" href="' +
          escapeAttr(item.href) +
          '"' +
          (isActive ? ' aria-current="page"' : "") +
          ">" +
          escapeHTML(item.label) +
          "</a>"
        );
      })
      .join("");

    header.innerHTML =
      '<div class="site-nav panel panel-nav">' +
      '<a class="brand-chip" href="/">' +
      '<span class="brand-mark">' +
      escapeHTML(data.siteMeta.shortName) +
      "</span>" +
      '<span class="brand-text">' +
      "<strong>" +
      escapeHTML(data.siteMeta.name) +
      "</strong>" +
      "<small>" +
      escapeHTML(data.siteMeta.role) +
      "</small>" +
      "</span>" +
      "</a>" +
      '<nav class="nav-links" aria-label="Primary">' +
      nav +
      "</nav>" +
      "</div>";
  }

  function renderFooter() {
    var footer = document.querySelector("[data-site-footer]");

    if (!footer) {
      return;
    }

    var footerLinks = data.profileLinks
      .slice(0, 4)
      .map(function (link) {
        return buildProfileChip(link);
      })
      .join("");

    var footerActions = [
      {
        label: "Email",
        href: "mailto:" + data.siteMeta.email,
        style: "button-primary",
      },
      {
        label: "Resume",
        href: data.siteMeta.resumeUrl,
        style: "button-ghost",
        newTab: true,
      },
    ]
      .map(buildActionButton)
      .join("");

    footer.innerHTML =
      '<div class="footer-shell panel">' +
      '<div class="footer-top">' +
      "<div>" +
      '<p class="eyebrow">Open channel</p>' +
      "<h2>" +
      escapeHTML(data.siteMeta.footerHeading) +
      "</h2>" +
      '<p class="supporting-copy">' +
      escapeHTML(data.siteMeta.footerSummary) +
      "</p>" +
      "</div>" +
      '<div class="footer-actions">' +
      footerActions +
      "</div>" +
      "</div>" +
      '<div class="profile-chip-grid">' +
      footerLinks +
      "</div>" +
      '<p class="footer-meta">Static portfolio for ' +
      escapeHTML(data.siteMeta.domain) +
      " / " +
      escapeHTML(data.siteMeta.location) +
      " / " +
      new Date().getFullYear() +
      "</p>" +
      "</div>";
  }

  function renderHomePage() {
    if (document.body.dataset.page !== "home") {
      return;
    }

    var page = data.pages.home;

    setText("[data-home-eyebrow]", page.eyebrow);
    setText("[data-home-title]", page.title);
    setText("[data-home-summary]", page.summary);
    setText("[data-home-signal-title]", page.signalTitle);
    setText("[data-home-signal-summary]", page.signalSummary);
    setText("[data-home-status]", page.status);
    setText("[data-home-contact-summary]", page.contactSummary);
    setList("[data-home-focus-list]", page.focusList);
    renderActions("[data-home-actions]", page.actions);
    renderActions("[data-home-contact-actions]", page.contactActions);
  }

  function renderSubpageContent() {
    var pageKey = document.body.dataset.page;

    if (!pageKey || pageKey === "home") {
      return;
    }

    var page = data.pages[pageKey];

    if (!page) {
      return;
    }

    setText("[data-page-eyebrow]", page.eyebrow);
    setText("[data-page-title]", page.title);
    setText("[data-page-summary]", page.summary);

    var panelsContainer = document.querySelector("[data-page-panels]");

    if (panelsContainer && page.panels) {
      panelsContainer.innerHTML = page.panels.map(buildInfoPanel).join("");
    }

    if (pageKey === "connect") {
      setText("[data-contact-email]", data.siteMeta.email);
      setText("[data-contact-note]", page.note);
      setText("[data-contact-availability-title]", page.availabilityTitle);
      setText("[data-contact-availability-summary]", page.availabilitySummary);
      setList("[data-contact-availability-list]", page.availabilityList);
      renderActions("[data-contact-hero-actions]", page.actions);
    }
  }

  function renderHighlightStats() {
    var containers = document.querySelectorAll("[data-highlight-stats]");

    containers.forEach(function (container) {
      container.innerHTML = data.highlightStats.map(buildMetricCard).join("");
    });
  }

  function renderExperienceLists() {
    var containers = document.querySelectorAll("[data-experience-list]");

    containers.forEach(function (container) {
      var limit = Number(container.dataset.highlightLimit || 99);
      var variant = container.dataset.variant || "preview";

      container.innerHTML = data.experienceTimeline
        .map(function (item) {
          return buildExperienceCard(item, variant, limit);
        })
        .join("");
    });
  }

  function renderSkillGroups() {
    var containers = document.querySelectorAll("[data-skill-groups]");

    containers.forEach(function (container) {
      var groupLimit = Number(container.dataset.groupsLimit || data.skillGroups.length);
      var tagLimit = Number(container.dataset.tagsLimit || 99);
      var detailed = container.dataset.detailed === "true";

      container.innerHTML = data.skillGroups
        .slice(0, groupLimit)
        .map(function (group) {
          return buildSkillGroup(group, detailed, tagLimit);
        })
        .join("");
    });
  }

  function renderProfileLinks() {
    var containers = document.querySelectorAll("[data-profile-links]");

    containers.forEach(function (container) {
      var linkLimit = Number(container.dataset.linkLimit || data.profileLinks.length);

      container.innerHTML = data.profileLinks
        .slice(0, linkLimit)
        .map(function (link) {
          return buildProfileChip(link);
        })
        .join("");
    });
  }

  function renderContactCards() {
    var containers = document.querySelectorAll("[data-contact-cards]");

    containers.forEach(function (container) {
      container.innerHTML = data.contactCtas.map(buildContactCard).join("");
    });
  }

  function renderActions(selector, actions) {
    var containers = document.querySelectorAll(selector);

    containers.forEach(function (container) {
      container.innerHTML = (actions || []).map(buildActionButton).join("");
    });
  }

  function bindEmailLinks() {
    document.querySelectorAll("[data-email-link]").forEach(function (link) {
      link.href = "mailto:" + data.siteMeta.email;
    });
  }

  function bindCopyEmail() {
    document.querySelectorAll("[data-copy-email]").forEach(function (button) {
      var defaultLabel = button.textContent;
      var statusNode = button.closest(".info-panel")
        ? button.closest(".info-panel").querySelector("[data-copy-status]")
        : null;

      button.addEventListener("click", function () {
        copyToClipboard(data.siteMeta.email)
          .then(function () {
            button.textContent = "Copied";
            button.classList.add("is-success");

            if (statusNode) {
              statusNode.textContent = "Email address copied to clipboard.";
            }

            window.clearTimeout(button._copyTimer);
            button._copyTimer = window.setTimeout(function () {
              button.textContent = defaultLabel;
              button.classList.remove("is-success");

              if (statusNode) {
                statusNode.textContent = "";
              }
            }, 2200);
          })
          .catch(function () {
            if (statusNode) {
              statusNode.textContent = "Copy failed. Use the compose email button instead.";
            }
          });
      });
    });
  }

  function copyToClipboard(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value);
    }

    return new Promise(function (resolve, reject) {
      var textArea = document.createElement("textarea");
      textArea.value = value;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "absolute";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();

      try {
        var success = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (success) {
          resolve();
          return;
        }
      } catch (error) {
        document.body.removeChild(textArea);
        reject(error);
        return;
      }

      reject(new Error("Clipboard copy failed."));
    });
  }

  function buildMetricCard(item) {
    return (
      '<article class="metric-card panel">' +
      '<span class="metric-value">' +
      escapeHTML(item.value) +
      "</span>" +
      "<h3>" +
      escapeHTML(item.label) +
      "</h3>" +
      "<p>" +
      escapeHTML(item.detail) +
      "</p>" +
      "</article>"
    );
  }

  function buildExperienceCard(item, variant, limit) {
    var highlights = item.highlights
      .slice(0, limit)
      .map(function (highlight) {
        return "<li>" + escapeHTML(highlight) + "</li>";
      })
      .join("");
    var impact = buildPillRow(item.impact || []);
    var tech = buildTagRow(item.tech || []);

    if (variant === "timeline") {
      return (
        '<article class="timeline-card panel">' +
        '<div class="experience-head">' +
        "<div>" +
        "<h3>" +
        escapeHTML(item.company) +
        "</h3>" +
        '<p class="experience-role">' +
        escapeHTML(item.role) +
        "</p>" +
        "</div>" +
        '<span class="experience-period">' +
        escapeHTML(item.period) +
        "</span>" +
        "</div>" +
        '<p class="meta-line">' +
        escapeHTML(item.location) +
        "</p>" +
        '<p class="timeline-summary">' +
        escapeHTML(item.summary) +
        "</p>" +
        impact +
        '<ul class="card-bullets">' +
        highlights +
        "</ul>" +
        tech +
        "</article>"
      );
    }

    return (
      '<article class="experience-card panel">' +
      '<div class="experience-head">' +
      "<div>" +
      "<h3>" +
      escapeHTML(item.company) +
      "</h3>" +
      '<p class="experience-role">' +
      escapeHTML(item.role) +
      "</p>" +
      "</div>" +
      '<span class="experience-period">' +
      escapeHTML(item.period) +
      "</span>" +
      "</div>" +
      '<p class="meta-line">' +
      escapeHTML(item.summary) +
      "</p>" +
      impact +
      '<ul class="card-bullets">' +
      highlights +
      "</ul>" +
      "</article>"
    );
  }

  function buildSkillGroup(group, detailed, tagLimit) {
    var summary = detailed && group.summary
      ? '<p class="skill-group-summary">' + escapeHTML(group.summary) + "</p>"
      : "";
    var tags = group.items
      .slice(0, tagLimit)
      .map(function (item) {
        return '<span class="tag">' + escapeHTML(item) + "</span>";
      })
      .join("");

    return (
      '<article class="skill-group">' +
      '<p class="skill-group-title">' +
      escapeHTML(group.name) +
      "</p>" +
      summary +
      '<div class="tag-row">' +
      tags +
      "</div>" +
      "</article>"
    );
  }

  function buildProfileChip(link) {
    var target = link.newTab ? ' target="_blank" rel="noopener noreferrer"' : "";

    return (
      '<a class="profile-chip" href="' +
      escapeAttr(link.href) +
      '"' +
      target +
      ">" +
      "<strong>" +
      escapeHTML(link.label) +
      "</strong>" +
      '<span class="profile-note">' +
      escapeHTML(link.note) +
      "</span>" +
      "</a>"
    );
  }

  function buildContactCard(card) {
    return (
      '<article class="contact-cta-card panel">' +
      '<p class="panel-label">' +
      escapeHTML(card.note) +
      "</p>" +
      "<h3>" +
      escapeHTML(card.title) +
      "</h3>" +
      "<p>" +
      escapeHTML(card.body) +
      "</p>" +
      buildActionButton(card) +
      "</article>"
    );
  }

  function buildInfoPanel(panel) {
    var listMarkup = panel.list && panel.list.length
      ? '<ul class="bullet-list">' +
        panel.list
          .map(function (item) {
            return "<li>" + escapeHTML(item) + "</li>";
          })
          .join("") +
        "</ul>"
      : "";

    return (
      '<article class="info-panel panel">' +
      '<p class="panel-label">' +
      escapeHTML(panel.label) +
      "</p>" +
      "<h3>" +
      escapeHTML(panel.title) +
      "</h3>" +
      "<p>" +
      escapeHTML(panel.summary) +
      "</p>" +
      listMarkup +
      "</article>"
    );
  }

  function buildActionButton(action) {
    var style = action.style || "button-ghost";
    var target = action.newTab ? ' target="_blank" rel="noopener noreferrer"' : "";

    return (
      '<a class="button ' +
      style +
      '" href="' +
      escapeAttr(action.href) +
      '"' +
      target +
      ">" +
      escapeHTML(action.label) +
      "</a>"
    );
  }

  function buildPillRow(items) {
    if (!items || !items.length) {
      return "";
    }

    var pills = items
      .map(function (item) {
        return '<span class="metric-pill">' + escapeHTML(item) + "</span>";
      })
      .join("");

    return '<div class="metric-pill-row">' + pills + "</div>";
  }

  function buildTagRow(items) {
    if (!items || !items.length) {
      return "";
    }

    var tags = items
      .map(function (item) {
        return '<span class="tag">' + escapeHTML(item) + "</span>";
      })
      .join("");

    return '<div class="tag-row experience-tech">' + tags + "</div>";
  }

  function setText(selector, value) {
    var node = document.querySelector(selector);

    if (node && value) {
      node.textContent = value;
    }
  }

  function setList(selector, items) {
    var node = document.querySelector(selector);

    if (!node || !items) {
      return;
    }

    node.innerHTML = items
      .map(function (item) {
        return "<li>" + escapeHTML(item) + "</li>";
      })
      .join("");
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(value) {
    return escapeHTML(value);
  }
})();
