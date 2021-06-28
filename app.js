// Create Dino Constructor
function Dino(name, weight, height, diet, where, when, fact) {
  this.species = name;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = [fact];
}

// Create Dino Objects
const triceratops = new Dino("Triceratops", 13000, 114, "herbavor", "North America", "Late Cretaceous", "First discovered in 1889 by Otheniel Charles Marsh");

const tRex = new Dino("Tyrannosaurus Rex", 11905, 144,
  "carnivor", "North America", "Late Cretaceous", "The largest known skull measures in at 5 feet long.");

const anklyo = new Dino("Anklyosaurus", 10500, 55, "herbavor", "North America", "Late Cretaceous", "Anklyosaurus survived for approximately 135 million years.");

const brachio = new Dino("Brachiosaurus", 70000, 372, "70000", "North America", "Late Jurasic", "An asteroid was named 9954 Brachiosaurus in 1991.");

const steg = new Dino("Stegosaurus", 11600, 79, "herbavor", "North America, Europe, Asia", "Late Jurasic to Early Cretaceous", "The Stegosaurus had between 17 and 22 seperate places and flat spines.");

const elasmo = new Dino("Elasmosaurus", 16000, 59, "carnivor", "North America", "Late Cretaceous", "Elasmosaurus was a marine reptile first discovered in Kansas.");

const ptera = new Dino("Pteranodon", 44, 20, "carnivor", "North America", "Late Cretaceous", "Actually a flying reptile, the Pteranodon is not a dinosaur.");

const pigeon = new Dino("Pigeon", 0.5, 9, "herbavor", "World Wide", "Holocene", "All birds are living dinosaurs.");

// Put Dino objects into a dinos array

const dinos = [triceratops, tRex, anklyo, brachio, steg, elasmo, ptera, pigeon];

// Shuffle the dinos array into a new shuffledDinos array. This will randomize the position of the tiles in the grid when this array is used in the addTiles() function

const shuffledDinos = dinos.sort(() => 0.5 - Math.random());

// Create Human Object

let humanInfo = {};

// Use IIFE to get human data from form

const addHuman = (event) => {
  event.preventDefault();
  let humanDiet = document.getElementById("diet").value;
  let human = {
    name: document.getElementById("name").value,
    height: parseInt(((document.getElementById("feet").value) * 12)) + parseInt(document.getElementById("inches").value),
    weight: parseInt(document.getElementById("weight").value),
    diet: humanDiet.toLowerCase()
  }
  humanInfo = human;
};

const btn = document.getElementById("btn");
btn.addEventListener("click", addHuman);

// Create Dino Compare Method 1 - comparing height
// NOTE: Weight in JSON file is in lbs, height in inches.

let compHeight = "";

function compareHeight() {
  dinos.forEach((dino, index) => {
    if (humanInfo.height > dinos[index].height) {
      compHeight = "You are taller than a " + dinos[index].species;
      dinos[index].fact.push(compHeight);
    } else {
      compHeight = "You are smaller than a " + dinos[index].species;
      dinos[index].fact.push(compHeight);
    }
  })
};

btn.addEventListener("click", compareHeight);

// Create Dino Compare Method 2 - comparing weight
// NOTE: Weight in JSON file is in lbs, height in inches.

let compWeight = "";

function compareWeight() {
  dinos.forEach((dino, index) => {
    if (humanInfo.weight > dinos[index].weight) {
      compWeight = "You are heavier than a " + dinos[index].species;
      dinos[index].fact.push(compWeight);
    } else {
      compWeight = "You are lighter than a " + dinos[index].species;
      dinos[index].fact.push(compWeight);
    }
  })
};

btn.addEventListener("click", compareWeight);

// Create Dino Compare Method 3 - comparing diet

let compDiet = "";

function compareDiet() {
  dinos.forEach((dino, index) => {
    if (humanInfo.diet === dinos[index].diet) {
      compDiet = "You eat the same food as a " + dinos[index].species;
      dinos[index].fact.push(compDiet);
    } else {
      compDiet = "You eat different food to a " + dinos[index].species;
      dinos[index].fact.push(compDiet);
    }
  });
}

btn.addEventListener("click", compareDiet);

//Random number 0 - 3 to use in selecting random dino fact

let ranNum = function randomNumber0to7() {
  return (Math.floor(Math.random() * 4));
};

// Generate Tiles for each Dino in Array

function generateTiles() {
  //Generates random number for getting random dinosaur text content
  randomFactIndex = ranNum();

  //creates html elements
  let newDiv = document.createElement("div");
  let newH3 = document.createElement("H3");
  let newImg = document.createElement("img");
  let newP = document.createElement("p");

  //creates value of the class and id attribute to the html elements
  newDiv.className = "grid-item";
  newDiv.id = i;

  //sets the source of the image
  const dinoName = shuffledDinos[i].species;
  newImg.src = "images/" + dinoName.toLowerCase() + ".png";

  //sets the text content
  newH3.innerText = shuffledDinos[i].species;
  newP.innerText = shuffledDinos[i].fact[randomFactIndex];

  //positions the new elements in the html document
  let position = document.getElementById("grid");

  position.appendChild(newDiv);
  newDiv.append(newH3, newImg, newP);
}

// Add tiles to DOM
function addTiles() {
  for (i = 0; i < shuffledDinos.length; i++) {
    generateTiles(shuffledDinos[i]);
  }
}

btn.addEventListener("click", addTiles);

//Insert human tile to centre of grid
function humanCentre() {
  let newDiv = document.createElement("div");
  let newH3 = document.createElement("H3");
  let newImg = document.createElement("img");
  let grid = document.getElementById("grid");

  newDiv.className = "grid-item";
  newImg.src = "images/human.png";
  newH3.innerText = humanInfo.name;

  let centre = document.getElementById("4")
  grid.insertBefore(newDiv, centre);
  newDiv.append(newH3, newImg);
}

btn.addEventListener("click", humanCentre);

// Remove form from screen and display grid

function removeFormAddGrid() {
  document.getElementById("dino-compare").style.visibility = "hidden";
  document.getElementById("dino-compare").style.position = "absolute";
  document.getElementById("grid").style.visibility = "visible";
  document.getElementById("grid").style.position = "";
}
// On button click, prepare and display infographic

btn.addEventListener("click", removeFormAddGrid);