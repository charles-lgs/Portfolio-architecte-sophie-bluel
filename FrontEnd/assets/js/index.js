const gallery = document.querySelector(".gallery");
const containerButton = document.querySelector(".container-btn-filter");

//////////// Function to retrieve works ////////////
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

//////////// Display works on the DOM ////////////

// Divide the array into work //
async function displayWorks() {
  const dataWorks = await getWorks();

  dataWorks.forEach((work) => {
    createWorks(work);
  });
}
displayWorks();

// Creating elements in the DOM //
function createWorks(work) {
  const figure = document.createElement("figure");
  const image = document.createElement("img");
  const figcaption = document.createElement("figcaption");

  // Display images and titles
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

    // Show button content and add CSS styling
    button.textContent = category.name;
    button.id = category.id;
    button.classList.add("btn-filter");

    containerButton.appendChild(button);
  });
}
displayCategories();

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
filterCategory();
