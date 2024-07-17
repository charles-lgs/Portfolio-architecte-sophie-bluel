const gallery = document.querySelector(".gallery");
const containerButton = document.querySelector(".container-btn-filter");

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ //
///////////////////// Login part //////////////////
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ //

//////////// Authentication and Page Customization ////////////
document.addEventListener("DOMContentLoaded", function () {
  checkUserStatus();
  displayWorks();
  displayCategories();
  filterCategory();
});

//////////// Checking the logged in user ////////////
function checkUserStatus() {
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  if (token && userId) {
    customHomePage();
  } else {
    displayLoginLink();
  }
}

//////////// Changing the home page if the user is login ////////////
function customHomePage() {
  const loginLink = document.querySelector(".link-login");
  const logoutLink = document.querySelector(".link-logout");
  const editMode = document.querySelector(".edit-mode");
  const linkProject = document.querySelector(".link-project");
  const btnFilter = document.querySelector(".container-btn-filter");

  loginLink.style.display = "none";
  logoutLink.style.display = "block";
  editMode.style.display = "flex";
  if (linkProject) linkProject.style.display = "flex";
  btnFilter.style.display = "none";
}

//////////// Return to default home page if user is logout ////////////
function displayLoginLink() {
  const loginLink = document.querySelector(".link-login");
  const logoutLink = document.querySelector(".link-logout");
  const editMode = document.querySelector(".edit-mode");
  const linkProject = document.querySelector(".link-project");
  const btnFilter = document.querySelector(".container-btn-filter");

  loginLink.style.display = "block";
  logoutLink.style.display = "none";
  editMode.style.display = "none";
  if (linkProject) linkProject.style.display = "none";
  btnFilter.style.display = "flex";
}

//////////// Disconnection and deletion ////////////
function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userId");
  window.location.href = "index.html";
}

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ //
////////////// Gallery and filter part /////////////
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ //

//////////// Function to retrieve works ////////////
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

//////////// Display works on the DOM ////////////
async function displayWorks() {
  const dataWorks = await getWorks();

  dataWorks.forEach((work) => {
    createWorks(work);
  });
}

//////////// Creating elements in the DOM ////////////
function createWorks(work) {
  const figure = document.createElement("figure");
  const image = document.createElement("img");
  const figcaption = document.createElement("figcaption");

  ///// Display images and titles /////
  image.src = work.imageUrl;
  figcaption.textContent = work.title;

  figure.appendChild(image);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

//////////// Function to retrieve categories ////////////
async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

//////////// Display categories button on the DOM ////////////
async function displayCategories() {
  const categories = await getCategories();

  categories.forEach((category) => {
    const button = document.createElement("button");

    ///// Show button content and add CSS styling /////
    button.textContent = category.name;
    button.id = category.id;
    button.classList.add("btn-filter");

    containerButton.appendChild(button);
  });
}

//////////// Filter works by category ////////////
async function filterCategory() {
  const works = await getWorks();
  const buttons = document.querySelectorAll(".container-btn-filter button");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      buttonId = e.target.id;
      gallery.innerHTML = "";

      if (buttonId !== "0") {
        const worksFilterCategory = works.filter((work) => {
          return work.categoryId == buttonId;
        });
        worksFilterCategory.forEach((work) => {
          createWorks(work);
        });
      } else {
        displayWorks();
      }
    });
  });
}

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ //
//////////////////// Modale part //////////////////
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ //

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
