var h = window.innerHeight,
		w = window.innerWidth;

var bagelHeight = 150;
var c = h/2 + w/12 + 25 + 30;


var images = []
function preload(){
	for (i = 0; i < 9; i++){
		images.push(loadImage('images/'+i+'.png'));
	}
	for (o in images){
		images[o].resize(bagelHeight,bagelHeight);
	}
}

var goal = 800;
var current = 20;

var bagels = []

function setup() {
	createCanvas(w,h);
	for (i = 0; i < 150; i++){
		bagels.push({
			image: images[i%9],
			x: random(0, w),
			y: random(-50, -400),
			speed: random(5, 10),
			xspeed: random(-.5,.5),
			rotate: random(-.1,.1)
		})
	}
}

var yavg = 0;
var textshows = false;
var framesSinceFade = 0;
let numfadeinframes = 20;

function draw() {
	// console.log('loop'+frameCount);
	//frameRate(1);

	imageMode(CENTER);
  // put drawing code here
	background(255);

	textSize(15);
	var op = map(frameCount - 20, 0, numfadeinframes, 255, 0)
	fill(op)
	textStyle(BOLD)
	textAlign(CENTER, CENTER);

	text('brought to you by bagel party', w/2, 20)
	textSize(30)
	text('for #BLM', w/2, 20+40)

	var ypositions = [];
	if (textshows){
		fill(255)
		stroke(200);
		var rectwidth = w/2;
		var progresswidth = map(current, 0, goal, 0, rectwidth)
		rect(w/4, h/2 - w/12 - 20, rectwidth, 10)
		noStroke();
		fill(0,0,0)
		rect(w/4, h/2 - w/12 - 20, progresswidth, 10);

		fill(map(framesSinceFade, 0, 10, 255, 0));
		textStyle(BOLD)
		textSize(w/6);
		textAlign(CENTER, CENTER);
		text('$'+current, w/2, h/2);
		textSize(25);
		text('GOAL: $'+goal, w/2, h/2 + w/12 + 25)
		textStyle(BOLDITALIC)
		text('venmo @likuzana', w/2, h/2 + w/12 + 25 + 30)
		if (framesSinceFade < 10){
			framesSinceFade ++;
		}
	}
	var smallesty = h+100;
	for (b in bagels){
		// push();
		ypositions.push(bagels[b].y);
		image(bagels[b].image, bagels[b].x, bagels[b].y)
		bagels[b].y += bagels[b].speed;
		bagels[b].x += bagels[b].xspeed;
		if (bagels[b].y<smallesty){
			smallesty = bagels[b].y;
		}
	}
	if (smallesty > (h + 99)){
		bagels = [];
		fill(255);
		noStroke();
		rect(0,h-5,w,5);
		noLoop();
	}
	yavg = arravg(ypositions);
	if (yavg > h/2){
		textshows = true;
	}
}

function mousePressed(){
	if (inRangeOfLink()){
		window.open('https://venmo.com/likuzana')
	}
}

function arravg(arr){
	var total = 0;
	for(var i = 0; i < arr.length; i++) {
	    total += arr[i];
	}
	var avg = total / arr.length;
	return avg;
}

function inRangeOfLink(){
	return (mouseY > c - 20 && mouseY < c + 20 && abs(mouseX - w/2) < w/4)
}
