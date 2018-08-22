var data =[];

class GameScoreboard {
    preload () {
        this.game.load.text("Scoreboard", "https://accelerate-game.firebaseio.com/scoreboards/PeterIce.json");

        this.game.load.text("Scoreboard", "./board.json")  
    }

    create(){
    var background = game.add.image(0,0,"background");

    var text = game.add.image (0,0,"scoreboardtext");
    text.anchor.setTo(-0.3,-0.5);
    
    this.playButton = game.add.button(game.width / 2, game.height - 150, "door", this.startGame);
    this.playButton.animations.add("open", [0,1]);
    this.playButton.anchor.setTo(0.5);
    this.playButton.scale.setTo(1);
    this.playButton.inputEnabled = true;
    this.playButton.events.onInputOver.add(this.playOn, this);
    this.playButton.events.onInputOut.add(this.playOut, this);

    this.home = game.add.button(game.width / 4 - 30, game.height - 150, "home", this.homePage);
    this.home.anchor.setTo(0.5,0.5);
    this.home.scale.setTo(0.5);
    this.home.inputEnabled = true;

    this.instruction = game.add.button((game.width / 2) + game.width/2/2 + 30, game.height - 150, "instructions", this.gameInstruction);
    this.instruction.anchor.setTo(0.5);
    this.instruction.scale.setTo(0.15);
    this.instruction.inputEnabled = true;
    this.instruction.animations.add("change", [0,1,2,3,4,5,6]);
    this.instruction.events.onInputOver.add(this.instructionOn, this);
    this.instruction.events.onInputOut.add(this.instructionOut, this);
    this.instructionWidth = this.instruction.width;
    this.instructionHeight = this.instruction.height;


    this.rank = JSON.parse(this.game.cache.getText("Scoreboard"));
    var a = Object.keys(this.rank);
    var i = 0;

    while(i < a.length) {
        data.push(this.rank[a[i]]);
        i++;
    }
    

    data.sort((a, b) => {return b.score - a.score;});

    var player1 = game.add.bitmapText(120,250, "font", data[0]["playerName"], 55);
    var player2 = game.add.bitmapText(120,320, "font", data[1]["playerName"], 55);
    var player3 = game.add.bitmapText(120,390, "font", data[2]["playerName"], 55);
    var player4 = game.add.bitmapText(120,460, "font", data[3]["playerName"], 55);
    var player5 = game.add.bitmapText(120,530, "font", data[4]["playerName"], 55);    
       
    var score1 = game.add.bitmapText(380,250, "font", data[0]["score"], 55);
    var score2 = game.add.bitmapText(380,320, "font", data[1]["score"], 55);
    var score3 = game.add.bitmapText(380,390, "font", data[2]["score"], 55);
    var score4 = game.add.bitmapText(380,460, "font", data[3]["score"], 55);
    var score5 = game.add.bitmapText(380,530, "font", data[4]["score"], 55);

    var array = [player1, player2, player3, player4, player5, score1, score2, score3, score4, score5];

    array.forEach(function(item) {
        item.tint = 0xC10032;
    });

    }
		
		update() {
			
		}
	
    playOn() {
        this.playButton.animations.play("open", 5, true);
        this.tween1 = game.add.tween(this.playButton).to({
            width: 150,
            height: 150,
        }, 1900, "Bounce", true, 0, -1);
        this.tween1.yoyo(true);
    }
	
    playOut() {
        this.playButton.animations.stop();
        this.playButton.frame = 0;
        this.playButton.width = 98;
        this.playButton.height = 127;
        this.tween1.stop();      
    }
	
    startGame(){
        game.state.start("GameStart");
    }

    homePage (){
        game.state.start("GameTitleScreen");	
    }

    instructionOn() {
        this.instruction.animations.play("change", 5, true);
        this.tween3 = game.add.tween(this.instruction).to({
            width: 150,
            height: 150,
        }, 1900, "Bounce", true, 0, -1);
        this.tween3.yoyo(true);
    }

    instructionOut() {
        this.instruction.animations.stop();
        this.instruction.frame = 0;
        this.instruction.width = this.instructionWidth;
        this.instruction.height = this.instructionHeight;
        this.tween3.stop();
    }
    gameInstruction() {
        game.state.start("GameInstruction");
    }

}