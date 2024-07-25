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
  gallery.innerHTML = "";
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
const galleryPhoto = document.querySelector(".gallery-photo");
const modaleDelete = document.querySelector(".container-gallery");
const modaleAdd = document.querySelector(".container-modale-add");
const btnreturn = document.querySelector(".fa-arrow-left");
const btnModaleAdd = document.getElementById("button-add-works");
const xmarkOne = document.getElementById("xmark-one");
const xmarkTwo = document.getElementById("xmark-two");

const previewImg = document.querySelector(".container-file img");
const inputFile = document.querySelector(".container-file input");
const labelFile = document.querySelector(".container-file label");
const iconFile = document.querySelector(".container-file .fa-image");
const txtFile = document.querySelector(".container-file p");

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ //
///////////// Delete modale /////////////
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ //

//////////// Retrieval and display of projects ////////////
async function displayProject() {
  galleryPhoto.innerHTML = "";
  const works = await getWorks();

  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const span = document.createElement("span");
    const trash = document.createElement("i");

    trash.classList.add("fa-solid", "fa-trash-can", "fa-xs");
    trash.id = work.id;
    img.src = work.imageUrl;

    span.appendChild(trash);
    figure.appendChild(span);
    figure.appendChild(img);
    galleryPhoto.appendChild(figure);

    deleteWork();
  });
}

//////////// Delete projects ////////////
function deleteWork() {
  const allTrash = document.querySelectorAll(".fa-trash-can");
  const token = sessionStorage.getItem("token");

  allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      const id = trash.id;

      const init = {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      };

      fetch("http://localhost:5678/api/works/" + id, init)
        .then((response) => {
          if (!response.ok) {
            console.log("Ca fonctionne po");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Ca fonctionne ! : ", data);
          displayProject();
          // displayWorks();
        });
    });
  });
}
displayProject();

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ //
///////////// Add modale ///////////////
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ //

//////////// Preview of the image to download ////////////
inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];
  console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.style.display = "flex";
      labelFile.style.display = "none";
      iconFile.style.display = "none";
      txtFile.style.display = "none";
    };
    reader.readAsDataURL(file);
  }
});

//////////// Events ////////////
linkProject.addEventListener("click", () => {
  containerModale.style.display = "flex";
});

xmarkOne.addEventListener("click", () => {
  containerModale.style.display = "none";
});

xmarkTwo.addEventListener("click", () => {
  modaleAdd.style.display = "none";
  modaleDelete.style.display = "flex";
  containerModale.style.display = "none";
});

containerModale.addEventListener("click", (e) => {
  if (e.target.classList.value == "container-modal") {
    modaleAdd.style.display = "none";
    modaleDelete.style.display = "flex";
    containerModale.style.display = "none";
  }
});

btnModaleAdd.addEventListener("click", () => {
  modaleDelete.style.display = "none";
  modaleAdd.style.display = "flex";
});

btnreturn.addEventListener("click", () => {
  modaleAdd.style.display = "none";
  modaleDelete.style.display = "flex";
});
