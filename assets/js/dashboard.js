/**
 * ===========================================
 * Workbook DKV
 * Dashboard Engine
 * Version 0.2
 * ===========================================
 */

const Dashboard = {
  data: null,

  async init() {
    await this.loadProjects();

    this.renderSemester1();

    this.renderSemester2();
  },

  async loadProjects() {
    const response = await fetch("assets/data/projects.json");

    this.data = await response.json();
  },

  renderSemester1() {
    const container = document.getElementById("semester1-projects");

    container.innerHTML = "";

    this.data.semester1.forEach((project) => {
      container.innerHTML += this.projectCard(project);
    });
  },

  renderSemester2() {
    const container = document.getElementById("semester2-projects");

    container.innerHTML = "";

    this.data.semester2.forEach((project) => {
      container.innerHTML += this.projectCard(project);
    });
  },

  projectCard(project) {
    let badge = "secondary";
    let button = "secondary";
    let text = "Terkunci";
    let action = `disabled`;

    if (project.status === "active") {
      badge = "success";
      button = "primary";
      text = "Buka";
      action = `href="project.html?id=${project.id}"`;
    }

    return `

<div class="col-lg-4 col-md-6">

<div class="card project-card h-100">

<div class="card-body">

<span class="badge bg-${badge}">

Pertemuan ${project.meeting}

</span>

<h5 class="fw-bold mt-3">

Project ${project.id}

</h5>

<p class="text-secondary">

${project.title}

</p>

<div class="d-flex justify-content-between align-items-center">

<small>

${project.duration}

</small>

<a
${action}
class="btn btn-${button} btn-sm">

${text}

</a>

</div>

</div>

</div>

</div>

`;
  },
};

document.addEventListener("DOMContentLoaded", () => {
  Dashboard.init();
});
