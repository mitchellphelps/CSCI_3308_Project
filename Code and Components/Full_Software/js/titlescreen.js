//TODO: API stuff for inserting new user and validating user's login
//Also need log in just waiting for Node.js lab to have a better understanding of it
//mostly password validation for sign up so far just from the lab we had
/*
function openLogModal(){
    
}*/

var database = firebase.firestore();
var docRef = database.collection("users");
/*
function show(){
    var nameShow = document.getElementById("nameShow");
    var placeShow = document.getElementById("placeShow");
    
    database.collection("users").onSnapshot(function(querySnapshot){
        nameShow.innerHTML = "";
        placeShow.innerHTML = "";
        
        querySnapshot.forEach(function(doc){
            var username = doc.data().username;
            var highscore = doc.data().highscore;
            
            userNameShow.innerHTML += '<p>' + name + '</p>';
            highScoreShow.innerHTML += '<p>' + location + '</p>';
        });
    });
}*/

function signUp(){
    //getting information given
	var newUser = document.getElementById("username").value;
	var newPassword = document.getElementById("psw").value;
	
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

function openSignModal() {       
    //var user = document.getElementById("username"); not needed yet
    var myInput = document.getElementById("psw");
    var confirmMyInput = document.getElementById("cpsw");
	var letter = document.getElementById("letter");
	var capital = document.getElementById("capital");
	var number = document.getElementById("number");
	var length = document.getElementById("length");    
    var match = document.getElementById("match");

	// When the user starts to type something inside the password field
	myInput.onkeyup = function() {
       console.log('java')
        
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
    if(letter.classList.contains("valid") && capital.classList.contains("valid") && number.classList.contains("valid") && length.classList.contains("valid") && match.classList.contains("valid")){
        condition = true;
        console.log("enabled");
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
}

function onLogInFunction() {
    //verify the log in credentials passed by the user with the database
}