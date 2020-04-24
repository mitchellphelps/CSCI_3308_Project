var database = firebase.firestore();
var docRef = database.collection("users");
//track the loggin in username
var loggedUser;
var loggedIn = false;

var highscore = parseInt(window.localStorage.getItem('HighScore'));
// var highscore = 45;
var databaseRef;
// var playerId;
// console.log(highscore);
// console.log(playerId);
// console.log(databaseRef);

function setHighscore (highscore) {
  // console.log(databaseRef);
  // // console.log(playerId);
  //
  // return databaseRef.update({
  //     highscore: highscore
  // })
  // .then(function() {
  //     console.log("Document successfully updated!");
  // })
  // .catch(function(error) {
  //     // The document probably doesn't exist.
  //     console.error("Error updating document: ", error);
  // });

  database.collection("users").onSnapshot(function(querySnapshot){
      querySnapshot.forEach(function(doc){
          if(doc.data().username == loggedUser){
                  //set highscore
                  return databaseRef.update({
                      highscore: highscore
                  })
                  .then(function() {
                      console.log("Document successfully updated!");
                  })
                  .catch(function(error) {
                      // The document probably doesn't exist.
                      console.error("Error updating document: ", error);
                  });
          }
      });
  });
}

$('#scoreboardModal').on('shown.bs.modal', function (e){
    console.log("Im here");
    var nameShow = document.getElementById("nameShow");
    var scoreShow = document.getElementById("scoreShow");

    database.collection("users").onSnapshot(function(querySnapshot){
        nameShow.innerHTML = "";
        scoreShow.innerHTML = "";

				var scoreArray = [];
        querySnapshot.forEach(function(doc){
            var name = doc.data().username;
            var highscore = doc.data().highscore;

						console.log(name);
						console.log(highscore);
						scoreArray.push(doc.data());
        });
				scoreArray.sort(compare);
				scoreArray.reverse();
				console.log(scoreArray);


				scoreArray.forEach((item, i) => {
					scoreShow.innerHTML += scoreArray[i].username + " " + scoreArray[i].highscore + "<br>";
				});

    });
})

//sort highscores
function compare(a,b) {
  if (a.highscore < b.highscore)
     return -1;
  if (a.highscore > b.highscore)
    return 1;
  return 0;
}

function signUp(){
    //getting information given
	var newUser = document.getElementById("username").value;
	var newPassword = document.getElementById("psw").value;
    console.log(newUser);
    alert("Welcome to Runner, "+newUser+"!!!!");
	//adding new document to collection with input values
	database.collection("users").add({
		    username: newUser,
        password: newPassword,
        highscore: 0
	})
	.then(function(docRef) {
		console.log("Document written with ID: ", docRef.id);
    databaseRef = database.collection("users").doc(docRef.id);
    // console.log(database.collection("users").doc(docRef.id));

	})
	.catch(function(error) {
		console.error("Error adding document: ", error);
	});
}

function login(){
    var user = document.getElementById("logUsername").value;
    var psw = document.getElementById("logPsw").value;
    database.collection("users").onSnapshot(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            if(doc.data().username == user){
                if(doc.data().password == psw){
                    loggedUser = user;
                    loggedIn = true;
                    console.log(doc.data().username);
                    databaseRef = database.collection("users").doc(docRef.id);
                    console.log(databaseRef);
                }
            }
        });
        onLogIn();
    });
}


function openSignModal() {

    var username = document.getElementById("username");
    var unique = document.getElementById("unique");
    var myInput = document.getElementById("psw");
    var confirmMyInput = document.getElementById("cpsw");
	var letter = document.getElementById("letter");
	var capital = document.getElementById("capital");
	var number = document.getElementById("number");
	var length = document.getElementById("length");
    var match = document.getElementById("match");

    username.onkeyup = function(){
        var count = 0;
        database.collection("users").onSnapshot(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                if(doc.data().username == username.value){
                    count++;
                }
            });
            if(count>0){
                unique.classList.remove("valid");
                unique.classList.add("invalid");
            }
            else{
                unique.classList.remove("invalid");
                unique.classList.add("valid");
            }
        });
    }


	// When the user starts to type something inside the password field
	myInput.onkeyup = function(){

        var lowerCaseLetters = new RegExp("[a-z]");
        var upperCaseLetters = new RegExp("[A-Z]");
        var numbers = new RegExp("[0-9]");
        var minLength = 8;

        // Validate lowercase letters
        if(myInput.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // Validate capital letters
        if(myInput.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers
        if(myInput.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate length
        if(myInput.value.length >= minLength) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }

    }

    confirmMyInput.onkeyup = function() {
                // Validate password and confirmPassword
                var passEqualsConfPass = (false);
                if(myInput.value == confirmMyInput.value){
                    passEqualsConfPass = true;
                }
                if(passEqualsConfPass) {
                    match.classList.remove("invalid");
                    match.classList.add("valid");
                } else {
                    match.classList.remove("valid");
                    match.classList.add("invalid");
                }

                // Disable or Enable the button based on the elements in classList
                enableButton(letter, capital, number, length, match);
    }
}

function enableButton(letter, capital, number, length, match) {

    var button = document.getElementById('my_submit_button');
    var condition = (false);
    if(letter.classList.contains("valid") && capital.classList.contains("valid") && number.classList.contains("valid") && length.classList.contains("valid") && match.classList.contains("valid") && unique.classList.contains("valid")){
        condition = true;
    }
    if(condition) {
            button.disabled = false;
    }
    if(button.disabled == true){
        console.log("still disabled");
    }
}

function onClickFunction() {
    signUp();
    // document.getElementById("signModalShort").innerHTML = '<div class="modal-header"><h4 class="modal-title">Welcome to Runner, '+'</h4></div>';
}

function onLogIn(){
    console.log(loggedIn);
    if(loggedIn == true){
        var newMessage = document.getElementById("logInModal");
        newMessage.innerHTML = '<div class="modal-dialog modal-login"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Welcome to Runner, '+loggedUser+'</h4><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><br></div></div></div>';
        document.getElementById("userNav").innerHTML = "";
        document.getElementById("runnerTitle").innerHTML += '<h2>Welcome, ' +loggedUser+ '!</h2>';
    }else{
        document.getElementById("modalMessage").innerHTML = "<br>Please enter an existing username and password combination.";
    }
}

//ALL THE STUFF FOR RUNNER BASED OFF PHASER


//boot.js
var Boot = function(game){

};

Boot.prototype = {

	preload: function(){

	},

  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.state.start("Preload");
	}
}

//gameover.js

var GameOver = function(game){};

GameOver.prototype = {

  	create: function(){

			this.game.stage.backgroundColor = '479cde';

			this.quit = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
			this.resume = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			this.showScore();
	},

	update: function () {

		if (this.resume.isDown) {
			this.restartGame();
		}
		if (this.quit.isDown) {
			// this.quitGame();
		}

	},

	showScore: function () {

		var scoreFont = "60px Arial";

		this.scoreLabel = this.game.add.text(this.game.world.centerX
			, this.game.world.centerY / 2, "0", { font: scoreFont, fill: "#fff" });
		this.scoreLabel.anchor.setTo(0.5, 0.5);
		this.scoreLabel.align = 'center';
		this.game.world.bringToTop(this.scoreLabel);
		this.scoreLabel.text = "Your score is " + (score);

		this.highScore = this.game.add.text(this.game.world.centerX
			, this.game.world.centerY, "0", { font: scoreFont, fill: "#fff" });
		this.highScore.anchor.setTo(0.5, 0.5);
		this.highScore.align = 'center';
		this.game.world.bringToTop(this.highScore);

		this.hs = window.localStorage.getItem('HighScore');

		if (this.hs == null) {
			this.highScore.setText("High score: " + score);
			window.localStorage.setItem('HighScore', score)
		}
		else if (parseInt(this.hs) < score) {
			this.highScore.setText("High score: " + (score ));
			window.localStorage.setItem('HighScore', score)

		}
		else {
			this.highScore.setText("High score: " + this.hs);
		}

		this.restart = this.game.add.text(this.game.world.centerX
			, this.game.world.centerY * 1.5
			, "Press \n Space to retry ", { font: scoreFont, fill: "#fff" });
		this.restart.anchor.setTo(0.5, 0.5);
		this.restart.align = 'center';
		this.game.world.bringToTop(this.restart);
		// this.scoreLabel.bringToTop()

	},

	restartGame: function(){
		this.game.state.start("Main");
	}

}


//gametitle.js
var GameTitle = function(game){};

GameTitle.prototype = {

	create: function(){

	},

	startGame: function(){
		this.game.state.start("Main");
	}

}

//main.js
var Main = function(game){

};

var score = 0;

Main.prototype = {


	create: function() {

		this.tileVelocity = -450;
		this.rate = 1500;
		score = 0;

		this.tileWidth = this.game.cache.getImage('tile').width;
		this.tileHeight = this.game.cache.getImage('tile').height;
		this.boxHeight = this.game.cache.getImage('box').height;

		this.game.stage.backgroundColor = '479cde';


		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.floor = this.game.add.group();
		this.floor.enableBody = true;
		this.floor.createMultiple(Math.ceil(this.game.world.width / this.tileWidth), 'tile');

		this.boxes = this.game.add.group();
		this.boxes.enableBody = true;
		this.boxes.createMultiple(20, 'box');
		this.game.world.bringToTop(this.floor)

		this.jumping = false;

		this.addBase();
		this.createScore();
		this.createPlayer();
		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.timer = game.time.events.loop(this.rate, this.addObstacles, this);
		this.Scoretimer = game.time.events.loop(100, this.incrementScore, this);

	},

	update: function() {

		this.game.physics.arcade.collide(this.player, this.floor);
		this.game.physics.arcade.collide(this.player, this.boxes, this.gameOver, null, this);

		var onTheGround = this.player.body.touching.down;

		// If the player is touching the ground, let him have 2 jumps
		if (onTheGround) {
			this.jumps = 2;
			this.jumping = false;
		}

		// Jump!
		if (this.jumps > 0 && this.upInputIsActive(5)) {
			this.player.body.velocity.y = -1000;
			this.jumping = true;
		}

		// Reduce the number of available jumps if the jump input is released
		if (this.jumping && this.upInputReleased()) {
			this.jumps--;
			this.jumping = false;
		}

	},

	addBox: function (x, y) {

		var tile = this.boxes.getFirstDead();

		tile.reset(x, y);
		tile.body.velocity.x = this.tileVelocity;
		tile.body.immovable = true;
		tile.checkWorldBounds = true;
		tile.outOfBoundsKill = true;
		// tile.body.friction.x = 1000;
	},

	addObstacles: function () {
		var tilesNeeded = Math.floor( Math.random() * (5 - 0));
		// var gap = Math.floor( Math.random() * (tilesNeeded - 0));
		if (this.rate > 200) {
			this.rate -= 10;
			this.tileVelocity = -(675000 / this.rate);

		}

		for (var i = 0; i < tilesNeeded; i++) {

			this.addBox(this.game.world.width , this.game.world.height -
				this.tileHeight - ((i + 1)* this.boxHeight ));

		}
	},

	addTile: function (x, y) {

		var tile = this.floor.getFirstDead();

		tile.reset(x, y);
		// tile.body.velocity.y = me.vel;
		tile.body.immovable = true;
		tile.checkWorldBounds = true;
		tile.outOfBoundsKill = true;
		// tile.body.friction.x = 1000;
	},

	addBase: function () {
		var tilesNeeded = Math.ceil(this.game.world.width / this.tileWidth);
		var y = (this.game.world.height - this.tileHeight);

		for (var i = 0; i < tilesNeeded; i++) {

			this.addTile(i * this.tileWidth, y);

		}
	},

	upInputIsActive: function (duration) {
		var isActive = false;

		isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
		isActive |= (this.game.input.activePointer.justPressed(duration + 1000 / 60) &&
			this.game.input.activePointer.x > this.game.width / 4 &&
			this.game.input.activePointer.x < this.game.width / 2 + this.game.width / 4);

		return isActive;
	},

	// This function returns true when the player releases the "jump" control
	upInputReleased: function () {
		var released = false;

		released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
		released |= this.game.input.activePointer.justReleased();

		return released;
	},

	createPlayer: function () {

		this.player = this.game.add.sprite(this.game.world.width/5, this.game.world.height -
			(this.tileHeight*2), 'player');
		this.player.scale.setTo(4, 4);
		this.player.anchor.setTo(0.5, 1.0);
		this.game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 2200;
		this.player.body.collideWorldBounds = true;
		this.player.body.bounce.y = 0.1;
		this.player.body.drag.x = 150;
		var walk = this.player.animations.add('walk');
		this.player.animations.play('walk', 6, true);

	},

	createScore: function () {

		var scoreFont = "70px Arial";

		this.scoreLabel = this.game.add.text(this.game.world.centerX, 70, "0", { font: scoreFont, fill: "#fff" });
		this.scoreLabel.anchor.setTo(0.5, 0.5);
		this.scoreLabel.align = 'center';
		this.game.world.bringToTop(this.scoreLabel);

		this.highScore = this.game.add.text(this.game.world.centerX * 1.6, 70, "0", { font: scoreFont, fill: "#fff" });
		// console.log(this.highScore);
		this.highScore.anchor.setTo(0.5, 0.5);
		this.highScore.align = 'right';
		this.game.world.bringToTop(this.highScore);

		if (window.localStorage.getItem('HighScore') == null) {
			this.highScore.setText(0);
			this.highScore.setText(window.localStorage.setItem('HighScore', 0));
		}
		else {
			this.highScore.setText(window.localStorage.getItem('HighScore'));
		}
		// this.scoreLabel.bringToTop()
		// console.log(window.localStorage.getItem('HighScore'));
		// writeUserData(1, window.localStorage.getItem('HighScore'));
	},

	incrementScore: function () {

		score += 1;
		this.scoreLabel.setText(score);
		this.game.world.bringToTop(this.scoreLabel);
		this.highScore.setText("HS: " + window.localStorage.getItem('HighScore'));
		this.game.world.bringToTop(this.highScore);

	},

	gameOver: function(){
		this.game.state.start('GameOver');
		// console.log(databaseRef);
		// console.log(playerId);
		console.log("about to call");
    console.log(highscore);
    console.log(loggedUser);
    setHighscore(highscore);

	}

};

//preload.js
var Preload = function(game){};

Preload.prototype = {

	preload: function(){
		this.game.load.image('tile', 'assets/tile.png');
		this.game.load.image('box', 'assets/box.png');

		this.game.load.spritesheet('player', 'assets/player.png', 24, 24, 9, -2);


	},

	create: function(){
		this.game.state.start("Main");
	}
}

function startGame(){
    //Create a new game that fills the screen
    var pageBody = document.getElementById("page");
    pageBody.innerHTML = "";
				game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO);

				//Add all states
				game.state.add("Boot", Boot);
				game.state.add("Preload", Preload);
				game.state.add("GameTitle", GameTitle);
                game.state.add("GameOver", GameOver);
				game.state.add("Main", Main);

				//Start the first state
				game.state.start("Boot");
}
