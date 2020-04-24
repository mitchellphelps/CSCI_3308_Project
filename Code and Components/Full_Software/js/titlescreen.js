var database = firebase.firestore();
var docRef = database.collection("users");
var loggedUser;
var loggedIn = false;

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
    document.getElementById("signModalShort").innerHTML = '<div class="modal-header"><h4 class="modal-title">Welcome to Runner, '+'</h4></div>';
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