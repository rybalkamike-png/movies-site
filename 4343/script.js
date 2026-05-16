const burger = document.querySelector(".header__menu-burger")
const menuList = document.querySelector(".header__menu-list")
const moviesCards = document.querySelector(".movies__cards")

const nextBtn = document.querySelector(".next")
const prevBtn = document.querySelector(".prev")
const pageText = document.querySelector(".movies__page")

let page = 1


burger.addEventListener("click", function () {
  menuList.classList.toggle("menu-list--active")
})



function draw_card(film) {

  const card = document.createElement("div")
  card.classList.add("movies__card")

  card.innerHTML = `
      <img class="movies__card-img"
      src="http://185.72.144.247:7757${film.poster_URL}"
      alt="${film.title}">

      <h3 class="movies__card-title">
        ${film.title}
      </h3>

      <div class="movies__card-wrapper">
        <p class="movies__card-data">${film.year} год</p>
        <p class="movies__card-data">Рейтинг: ${film.rating}</p>
      </div>

      <a class="movies__card-link" href="film.html?id=${film.id}">
        Перейти
      </a>
  `

  moviesCards.appendChild(card)
}



async function get_films(pageNumber) {

  try {

    moviesCards.innerHTML = ""

    const res = await fetch(`http://185.72.144.247:7757/films?page=${pageNumber}`)

    if (!res.ok) {
      throw new Error("Ошибка! " + res.status)
    }

    const data = await res.json()

    data.forEach(film => {
      draw_card(film)
    })

  } catch (err) {
    console.error("Ошибка загрузки фильмов:", err)
  }

}



nextBtn.addEventListener("click", function () {

  page++
  pageText.textContent = page

  get_films(page)

})



prevBtn.addEventListener("click", function () {

  if (page > 1) {

    page--

    pageText.textContent = page

    get_films(page)

  }

})



window.addEventListener("load", function () {
  get_films(page)
})
const themeToggle = document.querySelector('.theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
   
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});