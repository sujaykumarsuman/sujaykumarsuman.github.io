(function () {
  var data = window.PORTFOLIO_DATA;

  if (!data) {
    return;
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
    renderHighlightStats();
    renderExperiencePreview();
    renderSkillGroups();
    renderProfileLinks();
    renderPhasePageContent();
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
          item.href +
          '"' +
          (isActive ? ' aria-current="page"' : "") +
          ">" +
          item.label +
          "</a>"
        );
      })
      .join("");

    header.innerHTML =
      '<div class="site-nav panel panel-nav">' +
      '<a class="brand-chip" href="/">' +
      '<span class="brand-mark">' +
      data.siteMeta.shortName +
      "</span>" +
      '<span class="brand-text">' +
      "<strong>" +
      data.siteMeta.name +
      "</strong>" +
      "<small>" +
      data.siteMeta.role +
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

    footer.innerHTML =
      '<div class="footer-shell panel">' +
      '<div class="footer-top">' +
      "<div>" +
      '<p class="eyebrow">Phase 1 shell</p>' +
      "<h2>Futuristic interface foundation, ready for the content-heavy pass.</h2>" +
      '<p class="supporting-copy">The shared shell, component system, and content model are now in place for the next phase.</p>' +
      "</div>" +
      '<div class="footer-actions">' +
      '<a class="button button-primary" href="mailto:' +
      data.siteMeta.email +
      '">Email</a>' +
      '<a class="button button-ghost" href="' +
      data.siteMeta.resumeUrl +
      '" target="_blank" rel="noreferrer">Resume</a>' +
      "</div>" +
      "</div>" +
      '<div class="profile-chip-grid">' +
      footerLinks +
      "</div>" +
      '<p class="footer-meta">Static GitHub Pages portfolio for ' +
      data.siteMeta.domain +
      " / " +
      new Date().getFullYear() +
      "</p>" +
      "</div>";
  }

  function renderHighlightStats() {
    var containers = document.querySelectorAll("[data-highlight-stats]");

    containers.forEach(function (container) {
      container.innerHTML = data.highlightStats
        .map(function (item) {
          return (
            '<article class="metric-card panel">' +
            '<span class="metric-value">' +
            item.value +
            "</span>" +
            "<h3>" +
            item.label +
            "</h3>" +
            "<p>" +
            item.detail +
            "</p>" +
            "</article>"
          );
        })
        .join("");
    });
  }

  function renderExperiencePreview() {
    var containers = document.querySelectorAll("[data-experience-preview]");

    containers.forEach(function (container) {
      var limit = Number(container.dataset.highlightLimit || 3);

      container.innerHTML = data.experiencePreview
        .map(function (item) {
          var bullets = item.highlights
            .slice(0, limit)
            .map(function (highlight) {
              return "<li>" + highlight + "</li>";
            })
            .join("");

          return (
            '<article class="experience-card panel">' +
            '<div class="experience-head">' +
            "<div>" +
            "<h3>" +
            item.company +
            "</h3>" +
            '<p class="experience-role">' +
            item.role +
            "</p>" +
            "</div>" +
            '<span class="experience-period">' +
            item.period +
            "</span>" +
            "</div>" +
            '<p class="meta-line">' +
            item.focus +
            "</p>" +
            '<ul class="card-bullets">' +
            bullets +
            "</ul>" +
            "</article>"
          );
        })
        .join("");
    });
  }

  function renderSkillGroups() {
    var containers = document.querySelectorAll("[data-skill-groups]");

    containers.forEach(function (container) {
      var groupLimit = Number(container.dataset.groupsLimit || data.skillGroups.length);
      var tagLimit = Number(container.dataset.tagsLimit || 99);

      container.innerHTML = data.skillGroups
        .slice(0, groupLimit)
        .map(function (group) {
          var tags = group.items
            .slice(0, tagLimit)
            .map(function (item) {
              return '<span class="tag">' + item + "</span>";
            })
            .join("");

          return (
            '<article class="skill-group">' +
            '<p class="skill-group-title">' +
            group.name +
            "</p>" +
            '<div class="tag-row">' +
            tags +
            "</div>" +
            "</article>"
          );
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

  function renderPhasePageContent() {
    var pageKey = document.body.dataset.page;
    var pageData = data.phaseOnePages[pageKey];

    if (!pageData) {
      return;
    }

    setText("[data-page-eyebrow]", pageData.eyebrow);
    setText("[data-page-title]", pageData.title);
    setText("[data-page-summary]", pageData.summary);
    setList("[data-page-locked]", pageData.lockedIn);
    setList("[data-page-next]", pageData.next);
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
        return "<li>" + item + "</li>";
      })
      .join("");
  }

  function buildProfileChip(link) {
    var target = link.local ? "" : ' target="_blank" rel="noreferrer"';

    return (
      '<a class="profile-chip" href="' +
      link.href +
      '"' +
      target +
      ">" +
      "<strong>" +
      link.label +
      "</strong>" +
      '<span class="profile-note">' +
      link.note +
      "</span>" +
      "</a>"
    );
  }
})();
