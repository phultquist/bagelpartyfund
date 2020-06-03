var h = window.innerHeight,
		w = window.innerWidth;

var bagelHeight = 150;
var c = h/2 + w/12 + 25 + 30;

var blmimg;

var images = []
function preload(){
	blmimg = loadImage('bpxblm.png');
	for (i = 0; i < 9; i++){
		images.push(loadImage('images/'+i+'.png'));
	}
	for (o in images){
		images[o].resize(bagelHeight,bagelHeight);
	}
}

var goal = 600;
var current = 242;

var bagels = []

var exBagel;

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
	exBagel = {
		image: images[int(random(0, 9))],
		x: random(bagelHeight/2, w-bagelHeight/2),
		y: bagelHeight/2 + 1,
		vx: random(0.5,1.5),
		vy: random(0.5,1.5)
	}
}

var yavg = 0;
var textshows = false;
var framesSinceFade = 0;
let numfadeinframes = 20;
var framesSinceCStart = 0;
var cstart = false;
var cfin = false;

function getR(n, nframes, maxR){
	// return map(sv, 0, nframes, 0, maxR)
	var nadj = map(n, 0, nframes, 0, 1)
	var sv = sin((nadj * PI) / 2);
	return map(sv, 0, 1, 0, maxR)
}

function draw() {
	background(255);

	imageMode(CORNERS)
	if (width > 1000){
		var imgw = 1000;
		image(blmimg, )
	}
	image(blmimg, 0, 0, width, width*blmimg.height/blmimg.width)
	imageMode(CENTER);
  // put drawing code here

	if (cstart){
		var nframes = 30
		var smallestDimension = h;
		if (w < h) smallestDimension = w;
		var maxR = map(current, 0, goal, 0, smallestDimension)
		var r = getR(framesSinceCStart, nframes, maxR)
		if (cfin){
			r = maxR
		}
		fill(189,222,191)
		noStroke();
		circle(w/2, h/2, r*2)
		framesSinceCStart++;
		if (framesSinceCStart > nframes){
			cstart = false;
			cfin = true;
		}
	}

	var nframestill100 = 20;
	var opacity = map(frameCount, 0, nframestill100, 0, 100);
	if (nframestill100 < frameCount){
		opacity = 100
	}
	tint(255, opacity)
	image(exBagel.image, exBagel.x, exBagel.y, bagelHeight, bagelHeight);
	exBagel.x += exBagel.vx;
	exBagel.y += exBagel.vy;
	if (exBagel.x + bagelHeight/2 > w || exBagel.x - bagelHeight/2 < 0){
		exBagel.vx *= -1;
	}
	if (exBagel.y + bagelHeight/2 > h || exBagel.y - bagelHeight/2 < 0){
		exBagel.vy *= -1;
	}
	noTint();




	textSize(15);
	// textStyle(BOLD)
	// textAlign(CENTER, CENTER);
	//
	// text('brought to you by bagel party', w/2, 20)
	// textSize(30)
	// text('for #BLM', w/2, 20+40)

	var ypositions = [];
	if (textshows){
		noFill();
		stroke(200);
		var rectwidth = w/2;
		var progresswidth = map(current, 0, goal, 0, rectwidth)
		rect(w/4, h/2 + w/12 + 75, rectwidth, 10)
		noStroke();
		fill(0,0,0)
		rect(w/4, h/2 + w/12 + 75, progresswidth, 10);

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
		rect(0,h-1,w,1);
		cstart = true;
		// noLoop();
	}
	yavg = arravg(ypositions);
	if (yavg > h/2){
		textshows = true;
	}
}

function touchStarted(){
	mousePressed();
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
