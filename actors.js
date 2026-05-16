const actorsCards = document.querySelector(".actors__cards");

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");

const themeBtn = document.querySelector("#themeBtn");

const API = "http://185.72.144.247:7757";

if (themeBtn) {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
}

async function getActors() {
  try {
    const res = await fetch(`${API}/actors`);

    const data = await res.json();

    actorsCards.innerHTML = "";

    data.forEach(actor => drawActor(actor));

  } catch (err) {
    console.error(err);
  }
}

function drawActor(actor) {
  const card = document.createElement("div");
  card.classList.add("actors__card");

  card.innerHTML = `
    <img class="actors__img"
      src="${API + actor.photo_URL}"
      alt="${actor.name}">

    <h3 class="actors__name">${actor.name}</h3>

    <p class="actors__movies">Фильмов: ${actor.movies_count}</p>
  `;

  card.onclick = () => {
    modal.classList.add("active");

    modalContent.innerHTML = `
      <h2>${actor.name}</h2>
      <img src="${API + actor.photo_URL}">
    `;
  };

  actorsCards.appendChild(card);
}

modal.onclick = (e) => {
  if (e.target === modal) modal.classList.remove("active");
};

getActors();