document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("site-header");
  if (!headerContainer) return;

  // IMPORTANT: pages are inside /html, partials is beside /html
  fetch("../partials/header.html")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load header.html");
      return response.text();
    })
    .then((html) => {
      headerContainer.innerHTML = html;

      const currentPage = document.body.dataset.page || "";
      const nav = headerContainer.querySelector(".nav-links");
      const links = nav ? nav.querySelectorAll("a") : [];
      const headerEl = headerContainer.querySelector(".main-header");
      const menuToggle = headerContainer.querySelector(".menu-toggle");

      links.forEach((link) => {
        const showOn = (link.dataset.show || "").trim();
        if (showOn && currentPage) {
          const pages = showOn.split(",").map((p) => p.trim());
          if (!pages.includes(currentPage)) {
            link.style.display = "none";
          }
        }

        // Active link
        const href = link.getAttribute("href") || "";
        if (currentPage && href.includes(`${currentPage}.html`)) {
          link.classList.add("active");
        }
      });

      // Toggle scrolled state for blur effect
      if (headerEl) {
        const handleScroll = () => {
          if (window.scrollY > 10) {
            headerEl.classList.add("scrolled");
          } else {
            headerEl.classList.remove("scrolled");
          }
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
      }

      if (menuToggle && nav) {
        const toggleMenu = () => {
          const isOpen = nav.classList.toggle("open");
          menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        };

        menuToggle.addEventListener("click", toggleMenu);

        links.forEach((link) => {
          link.addEventListener("click", () => {
            if (nav.classList.contains("open")) {
              nav.classList.remove("open");
              menuToggle.setAttribute("aria-expanded", "false");
            }
          });
        });

        // أغلق القائمة عند الضغط خارجها
        document.addEventListener("click", (e) => {
          const clickedInsideNav = nav.contains(e.target);
          const clickedToggle = menuToggle.contains(e.target);
          if (!clickedInsideNav && !clickedToggle && nav.classList.contains("open")) {
            nav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
          }
        });
      }
    })
    .catch((err) => {
      console.error("Header load error:", err);
    });
});
