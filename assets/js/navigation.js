const Navigation = {
  observer: null,

  init() {
    this.build();
    this.bind();
    this.scrollSpy();
  },

  build() {
    const desktop = document.getElementById("sidebar-nav");
    const mobile = document.getElementById("sidebar-nav-mobile");

    let html = "";

    document
      .querySelectorAll("#project-content section")
      .forEach((section, index) => {
        const title = section.querySelector("h2");

        if (!title) return;

        if (!section.id) {
          section.id = "section-" + (index + 1);
        }

        html += `
                <a href="#${section.id}" class="toc-link" data-target="${section.id}">
                    ${title.innerText}
                </a>
            `;
      });

    if (desktop) desktop.innerHTML = html;

    if (mobile) mobile.innerHTML = html;
  },

  bind() {
    document.querySelectorAll(".toc-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const id = link.dataset.target;

        const target = document.getElementById(id);

        if (!target) return;

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Tutup sidebar mobile jika sedang terbuka
        const canvas = document.getElementById("mobileSidebar");

        if (canvas) {
          const offcanvas = bootstrap.Offcanvas.getInstance(canvas);

          if (offcanvas) {
            offcanvas.hide();
          }
        }
      });
    });
  },

  scrollSpy() {
    const options = {
      root: null,

      rootMargin: "-30% 0px -60% 0px",

      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;

        document.querySelectorAll(".toc-link").forEach((link) => {
          link.classList.remove("active");

          if (link.dataset.target === id) {
            link.classList.add("active");
          }
        });
      });
    }, options);

    document.querySelectorAll("#project-content section").forEach((section) => {
      this.observer.observe(section);
    });
  },
};
