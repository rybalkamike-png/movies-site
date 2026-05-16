const actorsCards = document.querySelector(".actors__cards")

async function getActors(){

try{

const res = await fetch("http://185.72.144.247:7757/actors")

if(!res.ok){
throw new Error("Ошибка " + res.status)
}

const data = await res.json()

data.forEach(actor => {

drawActor(actor)

})

}catch(err){

console.error(err)

}

}

function drawActor(actor){

actorsCards.innerHTML += `

<div class="actors__card">

<img class="actors__img"
src="http://185.72.144.247:7757${actor.photo_URL}"
alt="${actor.name}">

<h3 class="actors__name">

${actor.name}

</h3>

<p class="actors__movies">

Фильмов: ${actor.movies_count}

</p>

</div>

`

}

getActors()