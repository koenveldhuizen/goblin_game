// canvas
var canvas = document.createElement("canvas");
var div = document.getElementById("game"); 
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
div.appendChild(canvas);
// end canvas
//devine important informationholders zuch as array's

var monster_list = new Array();
var delta = 0;
var lives = 3;
//var directionMonster = 0;
//var directionDuration = 20;
//var goThisWay = 1;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";	

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";




// the test	
function init_everything() // Call this when your game starts, or when a new level starts etc.
{
  add_Monster(20);
}

function add_Monster(Amount) {
	for (i = 0; i < Amount; i++) {
  var MonsterVar = Object();
  MonsterVar.x =  32 + (Math.random() * (canvas.width - 64));
  MonsterVar.y =  32 + (Math.random() * (canvas.height - 64));
  MonsterVar.speed = 256;
  MonsterVar.directionDuration=Math.floor(Math.random() * 5) + 15;
  MonsterVar.goThisWay=Math.floor((Math.random() * 4) + 1);
  MonsterVar.directionMonster=1;
  MonsterVar.j=1;
  
  monster_list.push(MonsterVar);

  }
}
//end test
//monster movement
var monsterMove = function (modifier){
	
for (i = 0; i < monster_list.length; i++) { 	
	
	++monster_list[i].directionMonster;
	
	if (monster_list[i].directionMonster <= monster_list[i].directionDuration){
		//bewegingen
		//rechts => links
	if (monster_list[i].goThisWay == 1)	{
		monster_list[i].x = monster_list[i].x - (monster_list[i].speed * modifier);
	if (monster_list[i].x < 32){
		monster_list[i].goThisWay = 2;
	}
	}
	//links => rechts
	if (monster_list[i].goThisWay == 2)	{
		monster_list[i].x = monster_list[i].x + (monster_list[i].speed * modifier);
	if (monster_list[i].x > canvas.width-64){
		monster_list[i].goThisWay=1;
	}
	}
	//boven => onderen
	if (monster_list[i].goThisWay == 3)	{
		monster_list[i].y = monster_list[i].y + (monster_list[i].speed * modifier);
	if (monster_list[i].y > canvas.height-64){
		monster_list[i].goThisWay=4;

	}
	}
	//onderen => boven
	if (monster_list[i].goThisWay == 4)	{
		monster_list[i].y = monster_list[i].y - (monster_list[i].speed * modifier);
	if (monster_list[i].y < 32){
		monster_list[i].goThisWay=3;

	}
	}		
	//bepalen welke richting
	if (monster_list[i].directionMonster ==monster_list[i].directionDuration){
		monster_list[i].directionMonster = 0;
		monster_list[i].goThisWay = Math.floor((Math.random() * 4) + 1);
		//console.log (goThisWay);
	}	
	}
	}
	};



//end monster movement
// render
var render = function () {
	if (bgReady) {
	 //backgrounder.x = backgrounder.x +1;	used for making moving background
	//backgrounder.x = 0;
		ctx.drawImage(bgImage, 0, 0);
	}
	if(monsterReady){
		
		for (i = 0; i < monster_list.length; i++) { 

			
					ctx.drawImage(monsterImage, monster_list[i].x, monster_list[i].y);
					
					}
    
	}
};

// end render

// main loop
// The main game loop
var main = function () {
	var now = Date.now();
	delta = now - then;

if (lives > 0){
	//update(delta / 1000);		
		render();
monsterMove(delta / 1000);
//spawnTreasure();
} 
else {
	//restartGame();
}
	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
// Let's play this game!
var then = Date.now();
init_everything();
main();
// end main loop