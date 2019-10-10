const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toysURL = "http://localhost:3000/toys"

let addToyForm = document.querySelector('.add-toy-form')
let addToy = false
let toyCollectionDIV = document.querySelector("#toy-collection")


// YOUR CODE HERE
loadPage()

function loadPage() {
  toyCollectionDIV.innerHTML = ""
  fetch(toysURL)
    .then(resp => resp.json())
    .then(jsonObject => {
      jsonObject.forEach((object) => {
        addElemetsDom(object)
      })
    })
}



addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

addToyForm.addEventListener("submit", (event) => {
  event.preventDefault()
  console.log(event);
  let toyName = event.target.name.value
  let toyURL = event.target.image.value


  fetch(toysURL, {
    method: "POST",
    body: JSON.stringify({
      name: toyName,
      image: toyURL,
      likes: 0
    }),
    headers: {
      'Content-type' : 'application/json',
      'Accept' : 'application/json'
    }
  })
  .then(resp => resp.json())
  .then(jsonObject => {
    addElemetsDom(jsonObject)
  })
})

toyCollectionDIV.addEventListener("click", (event) => {
  if (event.target.className === "like-btn") {
    let card = event.target.parentElement
    let id = card.className[card.className.length - 1]
    let span = card.querySelector("span")
    let likes = parseInt(span.innerText) + 1
    span.innerText = likes

  

      fetch(toysURL + `/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          likes: likes
        }),
        headers: {
          'Content-type' : 'application/json',
          'Accept' : 'application/json'
        }
      })
      .then(resp => resp.json())
      .then(jsonObject => {

        console.log("Like PATCHED");
      })
  }

})
// OR HERE!
function addElemetsDom(jsonObject) {

  toyCollectionDIV.innerHTML += `
  <div class="card ${jsonObject.id}">
  <h2>${jsonObject.name}</h2>
    <img src=${jsonObject.image} class="toy-avatar" alt="Andy's Toy">
    <p>Likes: <span>${jsonObject.likes}</span></p>
    <button class="like-btn">Like</button>
  </div>
  `
}














//
