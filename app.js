let kittens = []
const moods = ['happy', 'tolerant', 'angry', 'gone']
let baseMood = 'tolerant'
let baseAffection = 41
/* 0 = gone, 1-40 = angry, 41-80 = tolerant, 80-100 = happy
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let kittenName = event.target.name

  if(kittens.findIndex(kitten => kitten.name == kittenName) == -1) {
    let kitten = {
      id: generateId(),
      name: kittenName,
      mood: baseMood,
      affection: baseAffection
    }
  } else {

  }

  kittens.push(kitten)
  saveKittens()
  event.target.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem('kittens', JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  localKittens = JSON.parse(window.localStorage.getItem('kittens'))

  if(localKittens) {
    kittens = localKittens
  }
  drawKittens()
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let template = ""
  

  for(let kitten of kittens) {`
    <div class="card">
      <img TODO:>
      <div>${kitten.name}</div>
      <div>${kitten.mood}</div>
    </div>
    `
  }
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  let index = kittens.findIndex(kitten => kitten.id == id)
  if(index == -1) {
    throw new Error('Invalid Kitten ID')
  } else {
    return index
  }
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let randomNumber = Math.random()
  if(randomNumber > .5) {

  }
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens = []
  saveKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
