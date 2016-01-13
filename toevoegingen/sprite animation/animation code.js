// stel de coin-sprite.png als afbeelding in voor de treasure

//vervang de code voor het treasure object met de onderstaande code

var treasure = {
		x: 0,
		y: 0,
		width: 32,
		height: 32,
		indexFrame: 9,//amount of frames minus the last
		currentFrame:0,//which frame location should load 
		delayFrame:5,//time between frames
		countFrame:0,//counter for frmaes past
		tickLoc:0// outcome from currentframe *width
		
	};

//vervang de code voor het renderen van de treasure in de render functie met de onderstaande code

if (treasureReady) {
			++treasure.countFrame;
			
			if (treasure.delayFrame==treasure.countFrame){
				

				treasure.countFrame=0;
				++treasure.currentFrame;
				treasure.clipLoc = treasure.currentFrame * treasure.width;
				console.log(treasure.clipLoc);
				
				if (treasure.currentFrame==treasure.indexFrame){
					
					treasure.currentFrame=1;
						
				}
	}