'use strict';


let imagesDiv = document.getElementById('images-div');
let buttonElement = document.getElementById('button');
let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');
let maxAttempts = 10;
let userAttemptsCounter = 0;
let leftImageIndex;
let middleImageIndex;
let rightImageIndex;
let namesArr = [];
let votesArr = [];
let shownArr=[];


function Goat(name, src) {
  this.name = name;
  this.source = src;
  this.votes = 0;
  this.shown = 0;

  Goat.allGoats.push(this);
  namesArr.push(this.name);

}

Goat.allGoats = [];

new Goat('cruisin-goat', 'images/cruisin-goat.jpg');
new Goat('float-your-goat', 'images/float-your-goat.jpg');
new Goat('goat-away', 'images/goat-away.jpg');
new Goat('goat-out-of-hand', 'images/goat-out-of-hand.jpg');
new Goat('kissing-goat', 'images/kissing-goat.jpg');
new Goat('sweater-goat', 'images/sweater-goat.jpg');
new Goat('sassy-goat', 'images/sassy-goat.jpg');


function getRandomIndex() {
  return Math.floor(Math.random() * Goat.allGoats.length);
}

function renderTwoImages() {

  leftImageIndex = getRandomIndex();
  rightImageIndex = getRandomIndex();
  middleImageIndex = getRandomIndex();

  while (leftImageIndex === rightImageIndex || leftImageIndex === middleImageIndex || rightImageIndex === middleImageIndex) {

    leftImageIndex = getRandomIndex();
    rightImageIndex = getRandomIndex();
  }

  leftImageElement.src = Goat.allGoats[leftImageIndex].source;
  Goat.allGoats[leftImageIndex].shown++

  middleImageElement.src = Goat.allGoats[middleImageIndex].source;
  Goat.allGoats[middleImageIndex].shown++;

  rightImageElement.src = Goat.allGoats[rightImageIndex].source;
  Goat.allGoats[rightImageIndex].shown++;


}

renderTwoImages();


imagesDiv.addEventListener('click', handleUserClick);
function handleUserClick(event) {

  if (userAttemptsCounter < maxAttempts) {


    if (event.target.id === 'left-image') {

      Goat.allGoats[leftImageIndex].votes++;
      renderTwoImages();

    } else if (event.target.id === 'right-image') {
      Goat.allGoats[rightImageIndex].votes++;
      renderTwoImages();
    } else if (event.target.id === 'middle-image') {
      Goat.allGoats[middleImageIndex].votes++;
      renderTwoImages();

    } else {
      alert('please click on the images');
      userAttemptsCounter--;
    }

  
  } else {


    buttonElement.hidden = false;

    buttonElement.addEventListener('click', showingList);

    function showingList() {
      let list = document.getElementById('results-list');

      for (let i = 0; i < Goat.allGoats.length; i++) {
        let listItem = document.createElement('li');

        list.appendChild(listItem);

        listItem.textContent = `${Goat.allGoats[i].name} has ${Goat.allGoats[i].votes} votes, and was seen ${Goat.allGoats[i].shown} times`;

      }

      buttonElement.removeEventListener('click', showingList);
    }


    for (let i = 0; i < Goat.allGoats.length; i++) {
     
      votesArr.push(Goat.allGoats[i].votes);
      shownArr.push(Goat.allGoats[i].shown);
      
    }
    imagesDiv.removeEventListener('click', handleUserClick);

    showChart();

  }
  userAttemptsCounter++;

}
function showChart() {

  const data = {
    labels: namesArr,
    datasets: [{
      label: 'Votes',
      data: votesArr,
    },
    
  ]
  }

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  }


  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

}