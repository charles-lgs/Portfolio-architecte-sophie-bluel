const gallery = document.querySelector(".gallery");

//////////// Data recovery function ////////////
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

//////////// Display function on the DOM ////////////
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
