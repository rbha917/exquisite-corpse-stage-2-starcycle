let counter = 0;
let imgs = [];
let currentIndex = 0;
let imgWidth;
let imgHeight;
let spacing = 50;
let totalWidth;
let blackhole, mss, nebula, supermassive, supernova;
let displayCounter = 0; // Counter to keep track of displayNextImage calls
let input;
let userLine;
let answers = [];
let response;

function preload() {
  blackhole = loadImage('images/blackhole.png');
  mss = loadImage('images/mss.png');
  nebula = loadImage('images/nebula.png');
  supermassive = loadImage('images/supermassive.png');
  supernova = loadImage('images/supernova.png');

  imgs.push(nebula);
  imgs.push(mss);
  imgs.push(supermassive);
  imgs.push(blackhole);
  imgs.push(supernova);
}

function StarSurprise(){
  resetCanvas();
  userLine = input.value(); //define userLine at top//
  input.value(''); //clears input box//
  answers.push(userLine);
  StarLoop();

  let words = RiTa.tokenize(userLine);//creates an array from the inputs//
	response = ''; //clears input, define response variable at top//

	for (x = 0; x < words.length; x++){
    let word = words[x]    
		if(RiTa.isVerb(word)){
			image(nebula, windowWidth / 2, windowHeight / 2, imgWidth, imgHeight);
    } else if(RiTa.isNoun(word)) {
      image(mss, windowWidth / 2, windowHeight / 2, imgWidth, imgHeight);
		} else if(RiTa.isAdverb(word)){
      image(blackhole, windowWidth / 2, windowHeight / 2, imgWidth, imgHeight);
    } else if(RiTa.isAdjective(word)){
      image(supernova, windowWidth / 2, windowHeight / 2, imgWidth, imgHeight);
    } else if(RiTa.isStopWord(word)){
      image(supermassive, windowWidth / 2, windowHeight / 2, imgWidth, imgHeight);
    } else {
      resetCanvas();
      fill(255);
      textFont('Georgia');
      textSize(24);
      textAlign(CENTER);
      text("Please enter a valid word", windowWidth / 2, windowHeight / 2);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(22, 12, 41);
  frameRate(3)
  
  imageMode(CENTER);
  imgWidth =  windowWidth / 2;  //width of each image in relation to window size
  imgHeight = imgWidth; // craetes symetrical images

  input = createInput();
	input.position(20, 50);
  greeting = createElement('h3', 'Type a word for a Starry Surprise');
	greeting.style('color', 'white');
	greeting.position(input.x, input.y - 45);


  let enter = createButton('ENTER')
	enter.position(input.x, input.y + 22);
	enter.mousePressed(StarSurprise);

}

function resetCanvas() {
  background(22, 12, 41);
}

function StarLoop() {
  countInterval = setInterval(drawStar, 10);
}

function drawStar() { //this will draw the stars randomly
  drawStarShape(random(0, windowWidth), random(0, windowHeight), 5, 4, 2, 0);
  counter++;
  if (counter >= 150) {
    clearInterval(countInterval);
    counter = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(22, 12, 41);
}

function drawStarShape(x, y, n, outerRadius, innerRadius, rotation) { //this is just the formula to create a star shape
  noStroke();
  fill(190);
  let theta = TAU / n;
  beginShape();
  for (let i = 0; i < n; i++) {
    let x1 = x + cos(i * theta + rotation) * outerRadius;
    let y1 = y + sin(i * theta + rotation) * outerRadius;
    vertex(x1, y1);
    let x2 = x + cos((i + 0.5) * theta + rotation) * innerRadius;
    let y2 = y + sin((i + 0.5) * theta + rotation) * innerRadius;
    vertex(x2, y2);
  }
  endShape(CLOSE);
}
