//TODO: API stuff for inserting new user and validating user's login
//Also need log in just waiting for Node.js lab to have a better understanding of it
//mostly password validation for sign up so far just from the lab we had
/*
function openLogModal(){

}*/

var database = firebase.firestore();
var docRef = database.collection("users");

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

    //var user = document.getElementById("username");
    //var username = document.getElementById("username").value;
    //var unique = document.getElementById("unique");
    var myInput = document.getElementById("psw");
    var confirmMyInput = document.getElementById("cpsw");
	var letter = document.getElementById("letter");
	var capital = document.getElementById("capital");
	var number = document.getElementById("number");
	var length = document.getElementById("length");
    var match = document.getElementById("match");

	// When the user starts to type something inside the password field
	myInput.onkeyup = function(){
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
    }
    if(condition) {
            button.disabled = false;
    }
    if(button.disabled == true){
        console.log("still disabled");
    }
}

function onClickFunction() {
    console.log("1");
    var newUser = document.getElementById("username").value;
    
    var query = docRef.where("username", "==", newUser);
    query.orderBy("password");
    console.log(query);
    
    if(query == null){
        signUp();
        console.log(newUser);
        alert("Welcome to Runner, "+newUser+"!!!");
    }else{
        alert("Username is already taken!");
        var user = document.getElementById("username");
        user.innerHTML="";
    }
    var reference = database.getInstance().getReference();

    var query = reference.child("issue").orderByChild("id").equalTo(0);
    query.addListenerForSingleValueEvent(new ValueEventListener() {
        @Override
        public void onDataChange(DataSnapshot dataSnapshot) {
            if (dataSnapshot.exists()) {
                // dataSnapshot is the "issue" node with all children with id 0
                for (DataSnapshot issue : dataSnapshot.getChildren()) {
                    // do something with the individual "issues"
                }
            }
        }

        @Override
        public void onCancelled(DatabaseError databaseError) {

        }
    });
}