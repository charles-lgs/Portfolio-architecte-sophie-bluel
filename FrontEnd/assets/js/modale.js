const linkProject = document.querySelector(".link-project");
const containerModale = document.querySelector(".container-modal");
const xMark = document.querySelector(".fa-xmark");

linkProject.addEventListener("click", () => {
  containerModale.style.display = "flex";
});

xMark.addEventListener("click", () => {
  containerModale.style.display = "none";
});

containerModale.addEventListener("click", (e) => {
  if (e.target.classList.value == "container-modal") {
    containerModale.style.display = "none";
  }
});
