let kittens = []
const baseMood = 'tolerant'
const baseAffection = 41
const maxAffection = 100 
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
  let kittenName = event.target.name.value
  let newKitten = {}

  if(kittens.length == 0) {
    newKitten = {
      id: generateId(),
      name: kittenName,
      mood: baseMood,
      affection: baseAffection
    }
    kittens.push(newKitten)
  } else if(kittens.findIndex(kitten => kitten.name == kittenName) == -1) {
      newKitten = {
        id: generateId(),
        name: kittenName,
        mood: baseMood,
        affection: baseAffection
      }
      kittens.push(newKitten)
    } 

  saveKittens()
  event.target.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem('kittens', JSON.stringify(kittens))
  drawKittens()
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
}

/**
 * Draw all of the kittens to the kittens element
 * the kitten id is added to image class list
 */
function drawKittens() {
  let template = ""

  for(let kitten of kittens) {
    template += `
      <div class="card">
        <img TODO>
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
    return kittens[index]
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
  let importedKitten = findKittenById(id)
  let randomNum = Math.random()
  let affectionIncrease = Math.floor((Math.random() * 8) + 6)

  if(randomNum > .5) {
    if(importedKitten.affection + affectionIncrease > maxAffection) {
      importedKitten.affection = 100
    } else{
      importedKitten.affection += affectionIncrease
    }
  } else {
    importedKitten.affection -= 5
  }
  setKittenMood(importedKitten)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let importedKitten = findKittenById(id)
  importedKitten.affection = 50
  setKittenMood(importedKitten)
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  let toggleClass = document.getElementsByClassName(JSON.stringify(kitten.id)).toggle(kitten.mood)
  
  if(kitten.affection == 0) {
    toggleClass
    kitten.mood = "gone"
    toggleClass
  } else if(kitten.affection < 41) {
    toggleClass
    kitten.mood = "angry"
    toggleClass
  } else if(kitten.affection < 81) {
    toggleClass
    kitten.mood = "tolerant"
    toggleClass
  } else {
    toggleClass
    kitten.mood = "happy"
    toggleClass
  }
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
  drawKittens()
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
