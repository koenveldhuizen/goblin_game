// JavaScript Document

// Create the canvas
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	//stel de afmetingen in
	canvas.width = 512;
	canvas.height = 480;
	//stuur canvas naar index.html
	document.getElementById("game").appendChild(canvas);
// einde canvas
//afbeeldingen
	// Background image
	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function () {
		bgReady = true;
	};
	bgImage.src = "images/background.png"; 
	// Hero image
	var heroReady = false;
	var heroImage = new Image();
	heroImage.onload = function () {
		heroReady = true;
	};
	heroImage.src = "images/hero.png";
	// Monster image
	var monsterReady = false;
	var monsterImage = new Image();
	monsterImage.onload = function () {
		monsterReady = true;
	};
	monsterImage.src = "images/monster.png";
		// Treasure image
	var treasureReady = false;
	var treasureImage = new Image();
	treasureImage.onload = function () {
		treasureReady = true;
	};
	treasureImage.src = "images/treasure.png";

//einde afbeeldingen
// Game objects
	var hero = {
		speed: 256, // movement in pixels per second
		lives: 3,
		x: 0,
		y: 0
	};
	var monster = {
		speed: 256,
		x: 0,
		y: 0
	};
	var treasure = {
		x: 0,
		y: 0
	};

	var monstersCaught = 0;//dit is de highscore
	var goThisway = 1; //de richting bepalen
	var directionMonster =0;
	var directionTime =100; // de tijd die het monster een richting op loopt

//einde Game objects
// Handle keyboard controls
	var keysDown = {};
	
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);
	
	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);
// einde keyboard input
// Reset the game when the player catches a monster
	var reset = function () {
		hero.x = canvas.width / 2;
		hero.y = canvas.height / 2;
	
		// Throw the monster somewhere on the screen randomly
		monster.x = 32 + (Math.random() * (canvas.width - 64));
		monster.y = 32 + (Math.random() * (canvas.height - 64));
		// Throw the treasure somewhere on the screen randomly
		treasure.x = 32 + (Math.random() * (canvas.width - 64));
		treasure.y = 32 + (Math.random() * (canvas.height - 64));

	};
// einde reset
// Update game objects
	var update = function (modifier) {
		if (38 in keysDown) { // Player holding up
			//check if hero walks from screen
                if (hero.y <= 32){
                        //if hero walks from screen top, stay at exact y axle
                        hero.y = hero.y;
                }
                else{
                        //move hero up
                hero.y -= hero.speed * modifier;
                }
                // end of upmovement
		}
		if (40 in keysDown) { // Player holding down
			               //check if hero walks from screen
                if (hero.y >= canvas.height -64){
                        //if hero walks from screen bottom, stay at exact y axle
                        hero.y = hero.y;
                }
                else{
                        //move hero down
                hero.y += hero.speed * modifier;
                }// end of downmovement
		}
		if (37 in keysDown) { // Player holding left
			//check if hero walks from screen
                if (hero.x <= 32){
                        //if hero walks from screen left, stay at exact x axle
                        hero.x = hero.x;
                }
                else{
                        //move hero left
                hero.x -= hero.speed * modifier;
                }
                // end of leftmovement
		}
		if (39 in keysDown) { // Player holding right
			//check if hero walks from screen
                if (hero.x >= canvas.width -64){
                        //if hero walks from screen right, stay at exact x axle
                        hero.x = hero.x;
                }
                else{
                        //move hero right
                hero.x += hero.speed * modifier;
                }// end of rightmovement
		}
	
		// Are they touching?
		if (
			hero.x <= (monster.x + 32)
			&& monster.x <= (hero.x + 32)
			&& hero.y <= (monster.y + 32)
			&& monster.y <= (hero.y + 32)
		) {
			//++monstersCaught;
			//monster.speed = monster.speed +5;
			hero.lives = hero.lives -1;
			reset();
		}
				// Are they touching?
		if (
			hero.x <= (treasure.x + 32)
			&& treasure.x <= (hero.x + 32)
			&& hero.y <= (treasure.y + 32)
			&& treasure.y <= (hero.y + 32)
		) {
			++monstersCaught;
			monster.speed = monster.speed +5;
			//hero.lives = hero.lives -1;
			reset();
		}

		//reset hele game
                if (hero.lives <=0){
               
                        //spacebar pressed     
                        if (32 in keysDown){
                        //reset assets
                        hero.lives = 3;
                        monstersCaught = 0;
                        }              
                }
                // einde hele game reset

	};
// einde update
// Draw everything
	var render = function () {
		if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}
	
		if (heroReady) {
			ctx.drawImage(heroImage, hero.x, hero.y);
		}
	
		if (monsterReady) {
			ctx.drawImage(monsterImage, monster.x, monster.y);
		}
		
		if (treasureReady) {
			ctx.drawImage(treasureImage, treasure.x, treasure.y);
		}
	
		// Score
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
		ctx.fillText("Lives: " + hero.lives, 32, canvas.height-64);
		if (hero.lives<=0){
                ctx.fillStyle="#000000";//color
                ctx.fillRect(32,32,canvas.width-64,canvas.height-64);//draw rectangle with the bushes still in place   
                //show that you're dead
                ctx.fillStyle = "rgb(250, 250, 250)";
                ctx.textAlign = "center";
                ctx.fillText("You're DEAD! press spacebar to restart", canvas.width/2, canvas.height/2);
                       
                }

	};
// einde draw
//make our monster move :)
var monsterMove = function (modifier){
	
	
	
	++directionMonster;
	
	if (directionMonster <= directionTime){
		//bewegingen
		//rechts => links
	if (goThisway == 1)	{
		monster.x = monster.x - (monster.speed * modifier);
	if (monster.x <= 32){
		goThisway = 2;
	}
	}
	//links => rechts
	if (goThisway == 2)	{
		monster.x = monster.x + (monster.speed * modifier);
	if (monster.x >= canvas.width-64){
		goThisway=1;
	}
	}
	//boven => onderen
	if (goThisway == 3)	{
		monster.y = monster.y + (monster.speed * modifier);
	if (monster.y >= canvas.height-64){
		goThisway=4;

	}
	}
	//onderen => boven
	if (goThisway == 4)	{
		monster.y = monster.y - (monster.speed * modifier);
	if (monster.y <= 32){
		goThisway=3;

	}
	}		
	//bepalen welke richting
	if (directionMonster ==directionTime){
		directionMonster = 0;
		goThisway = Math.floor((Math.random() * 4) + 1);
		//console.log (goThisWay);
	}	
	}
	};
// Einde monster
// The main game loop
	var main = function () {
		var now = Date.now();
		var delta = now - then;
	
		update(delta / 1000);
		monsterMove(delta / 1000);
		render();
	
		then = now;
	
		// Request to do this again ASAP
		requestAnimationFrame(main);
	};
//einde loop
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();