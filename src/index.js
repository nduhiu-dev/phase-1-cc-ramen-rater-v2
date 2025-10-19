// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  const detailImg = document.querySelector("#ramen-detail img");
  const detailName = document.querySelector("#ramen-detail .name");
  const detailRestaurant = document.querySelector("#ramen-detail .restaurant");
  const ratingDisplay = document.getElementById("rating-display");
  const commentDisplay = document.getElementById("comment-display");

  detailImg.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

const addSubmitListener = () => {
  // Add code
  const form = document.getElementById("new-ramen");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newRamen = {
      name: e.target["new-name"].value,
      restaurant: e.target["new-restaurant"].value,
      image: e.target["new-image"].value,
      rating: e.target["new-rating"].value,
      comment: e.target["new-comment"].value,
    };

    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRamen),
    })
      .then((resp) => resp.json())
      .then((savedRamen) => {
        const menu = document.getElementById("ramen-menu");
        const img = document.createElement("img");
        img.src = savedRamen.image;
        img.addEventListener("click", () => handleClick(savedRamen));
        menu.appendChild(img);
      });

    form.reset();
  });
};

const displayRamens = () => {
  // Add code
  fetch("http://localhost:3000/ramens")
    .then((resp) => resp.json())
    .then((ramens) => {
      const menu = document.getElementById("ramen-menu");
      menu.innerHTML = "";
      ramens.forEach((ramen) => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.addEventListener("click", () => handleClick(ramen));
        menu.appendChild(img);
      });
      if (ramens.length > 0) handleClick(ramens[0]);
    });
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens();
  addSubmitListener();
};

main();

// Export functions for testing
export { displayRamens, addSubmitListener, handleClick, main };
