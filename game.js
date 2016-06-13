'use strict';

window.onload = createTable;

var imagesGame = ['bg1','bg2','bg3','bg4'];
var imageArray = new Array();

var win = false;
var newGame = false;

for(var c=0;c<imagesGame.length;c++){
	imageArray[c] = new Image();
	imageArray[c].src = imagesGame[c]+".jpg";	
}

Array.prototype.randomElement = function(){
	return this[Math.floor(Math.random() * this.length)]
};
var randomImage = imagesGame.randomElement();

var matrix = [[],[],[],[]];
var sedici = {
	i: 3,
	j: 3
}

function createTable () {

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j<4; j++){
			matrix[i][j] = i*4+j;
		}
	}
	initElement();
	win = false;
	draw();
	document.getElementsByTagName('body')[0].setAttribute("class", randomImage);
}

function initElement(){
	var div = document.getElementsByTagName('button')[0];
	div.addEventListener("click", function () {
		mischia(1000);
		mosse = 0;
		randomImage = imagesGame.randomElement();
		document.getElementsByTagName('body')[0].setAttribute("class", randomImage+" incompleto");
	    document.getElementById("status").getElementsByTagName("span")[0].innerHTML = mosse%1000;
	    newGame = true;
	    document.getElementById("game").style.pointerEvents = "auto";

	});
}

function mischia (n) {
	//se una possibile soluzione è verificata la inserisco in un array
	for(var i = 0; i<n; i++) {
		var muovibili = [];
		if(matrix[sedici.i][sedici.j-1]) {
			muovibili.push({i: sedici.i, j: sedici.j-1});
		}
		if(matrix[sedici.i][sedici.j+1]) {
			muovibili.push({i: sedici.i, j: sedici.j+1});
		}
		if(matrix[sedici.i-1]&&matrix[sedici.i-1][sedici.j]) {
			muovibili.push({i: sedici.i-1, j: sedici.j});
		}
		if(matrix[sedici.i+1]&&matrix[sedici.i+1][sedici.j]) {
			muovibili.push({i: sedici.i+1, j: sedici.j});
		}
		//eseguo una delle possibili mosse inserite nell'array
		var tassello = muovibili.randomElement();
		win =false;
		move(tassello.i, tassello.j);
		newGame = true;
	}
}

function move (i, j) {
    //controllo se adiacente
    //scambio o ritorno false;
    if(win) return;
    if(canMove(i,j)) {
    	var a = matrix[i][j];
    	matrix[i][j] = 15;
    	matrix[sedici.i][sedici.j] = a;
    	sedici.i = i;
    	sedici.j = j;
    }
    draw();
    numMosse();
}

function canMove (i,j) {
	return ((matrix[i][j-1]==15)||(matrix[i][j+1]==15)||(matrix[i-1]&&matrix[i-1][j]==15)||(matrix[i+1]&&matrix[i+1][j]==15)); 
}

function draw () {
	var coordinate=[]
	if(matrix[sedici.i][sedici.j] != 15) {
	}
	document.getElementById('game').innerHTML="";
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j<4; j++){
			var box = document.createElement("div");
			if (canMove(i,j) && newGame == true){
				box.setAttribute('class', 'box active');
			}else {
				box.setAttribute('class', 'box');
			}
			box.setAttribute('id', 'box'+(matrix[i][j]));
			coordinate['box'+(matrix[i][j])] = [i,j];
			box.onclick = function(event) {
               move(coordinate[event.target.getAttribute('id')][0],coordinate[event.target.getAttribute('id')][1]);
			}
			box.innerHTML = matrix[i][j]+1;
			document.getElementById('game').appendChild(box);
		}
	}

	win = checkGame();

	if(!win) {
		document.getElementsByTagName('body')[0].setAttribute("class", randomImage+" incompleto");
	} else {
		document.getElementsByTagName('body')[0].setAttribute("class", randomImage);
		var banner = document.createElement("div");
		banner.setAttribute("id", "banner");
		var testo = document.createElement("p");
		testo.innerHTML = "Bravo!! hai vinto";
		banner.appendChild(testo);
		document.getElementById("game").appendChild(banner);
		document.getElementById("game").style.pointerEvents = "none";
		newGame = false;
	}
}

var mosse = 0;
function numMosse () {
		 mosse += 1;
		 document.getElementById("status").getElementsByTagName("span")[0].innerHTML = mosse%1000;
	}

function checkGame () {
	for (var i = 0; i<4; i++) {
		for (var j = 0; j<4; j++) {
			if (matrix[i][j] != i*4+j) return false;
		}
	}
	return true;
}

//funzione shuffle con firma, per provare la funzione shuffle
//il resto del gioco è implementato con la funziona mischia
function shuffle () {
	 var positions = [[1,5,9,13],[2,6,10,14],[3,7,11,15],[4,8,12,0]]
	 var White = {
	 	i: 3,
	    j: 3
	 }
	 for(var i = 0; i<1000; i++){
	 	var muovibili = [];
	 	if(positions[White.i][White.j-1]) {
			muovibili.push({i: White.i, j: White.j-1});
		}
		if(positions[White.i][White.j+1]) {
			muovibili.push({i: White.i, j: White.j+1});
		}
		if(positions[White.i-1]&&positions[White.i-1][White.j]) {
			muovibili.push({i: White.i-1, j: White.j});
		}
		if(positions[White.i+1]&&positions[White.i+1][White.j]) {
			muovibili.push({i: White.i+1, j: White.j});
		}
		//eseguo una delle possibili mosse inserite nell'array
		var tassello = muovibili.randomElement();
		positions[White.i][White.j] = positions[tassello.i][tassello.j]
		positions[tassello.i][tassello.j] = 0;
		White.i = tassello.i;
		White.j = tassello.j
		console.log(positions);
	}
}

