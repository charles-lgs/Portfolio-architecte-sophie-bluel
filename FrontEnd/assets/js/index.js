const gallery = document.querySelector(".gallery");
const containerButton = document.querySelector(".container-btn-filter");

//////////// Function to retrieve works ////////////
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

//////////// Display works on the DOM ////////////
async function displayWorks() {
  const dataWorks = await getWorks();

  dataWorks.forEach((work) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    // Display images and titles
    image.src = work.imageUrl;
    figcaption.textContent = work.title;

    figure.appendChild(image);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}
displayWorks();

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

    button.textContent = category.name;
    button.id = category.id;
    button.classList.add("btn-filter");

    containerButton.appendChild(button);
  });
}
displayCategories();
