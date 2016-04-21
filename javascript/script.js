//declare array of choices
var cities = ["Paris", "Moscow", "Dublin", "Tokyo", "Madrid", "London" //, "Lisbon", "Soeul", "Dubai", "Monaco", "Barcelona", "Venice",
    //"Shanghai", "Vancouver", "Cairo", "Istanbul", "Prague", "Casablanca", "Budapest", "Athens", "Delhi", "Florence", "Stockholm",
    //"Kiev", "Copenhagen", "Melbourne", "Manila", "Lima", "Santiago"
];

var pictures = ['<a href="#"><img src="../assets/images/paris.jpeg" height="200" width="200" alt="Paris skyline"/></a>', '<a href="#"><img src="../assets/images/moscow.jpg"/></a>', "assets/images/dublin.jpeg", "assets/images/tokyo.jpeg", "assets/images/madrid.jpeg", "assets/images/london.jpeg"];

var len = cities.length;

var guesses = [];
var ans, ansArray, userPick;
var hiddenWord = [];
var guessesRemaining = 12;


$("#images").append(pictures[1]);

//computer chooses
var answer = function() {
    var index = Math.floor((Math.random() * 6));
    ans = cities[index];
    return ans;
};


var game = function() {
    for (var i = 0; i <= ansArray.length; i++) {
        hiddenWord += " _ ";
    }
    $("#game").html(hiddenWord);
};

//win function
//when all letters complete, display picture of city

var win = function() {
    var newpicture = $("#newpicture");
    newpicture = $('<div>' + pictures[ans] + '</div>');
    $("#images").append(newpicture);
};

//correct function
//when the user picks correct letter, fill in the blank AND add to letters usesd
var correct = function() {
    //fill in the blank
    hiddenWord[i] = userPick;
    $("#game").html(hiddenWord);

    //delete letter from ansArray
    ansArray.splice(ans, 1);
};

var incorrect = function() {
    //add letter to guesses array
    guesses.push(userPick);
    //put new array on screen
    $("#guesses").append(guesses);
    guessesRemaining--;

};


//game begins
$(document).ready(function() {

    //enables game to be replayed
   // $("#button").on("click", function() {

        $("#guessesRemaining").html("Guesses Remaining: " + guessesRemaining);
        //test
        //$('#images').prepend($('<img>',{id:'theImg',src:'assets/images/paris.jpg'}));
        answer();
        ansArray = ans.split("");
        game();

        //user input
        while (guessesRemaining < 0) {
            document.onkeyup = function(event) {

                userPick = String.fromCharCode(event.keyCode).toLowerCase();

                //compare array
                for (var j = 0; j <= len; j++) {
                    if (ans[j] == userPick) {
                        //replace underscore with correct letter
                        correct();
                        if (ansArray.length === 0) {
                            win();
                            break;
                        }
                    } else {
                        //add wrong pick to used letters array and refresh onscreen
                        incorrect();
                    }
                }
            };
        }

});
