const params = new URLSearchParams(window.location.search);

const id = params.get("id") || "01";

fetch(`assets/content/${id.padStart(2, "0")}.html`)
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("project-content").innerHTML = html;

    Navigation.init();

    if (typeof Worksheet !== "undefined") {
      Worksheet.init();
    }
  })
  .catch(() => {
    document.getElementById("project-content").innerHTML =
      `<div class="alert alert-danger">
        Project tidak ditemukan.
    </div>`;
  });
