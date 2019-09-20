
var gamePattern = [];

var buttonColours = ["red","blue","green","yellow"];

var userClickedPattern = [];

var level = 0;

var started = false;


// detecting keypress to start game.

$(document).on("keypress",function(){

	if(!started){

		$("h1").text("Level " + level);

		started = true;

		nextSequence();

	}

});

// function to generate a random sequence of colors and push them to an array, also flashing/playing audio for the choice of color at that instance.
function nextSequence(){

    var randomNumber = Math.floor((Math.random() * 4));

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour); 

    level++;

}

// a function to note down user selection pattern of color choice!

$(".btn").on("click",function(){

    var userChosenColour = $(this).attr("id");

    animatePress(userChosenColour);
    
    userClickedPattern.push(userChosenColour);

   // console.log(userClickedPattern);

   playSound(userChosenColour);  

});

// a function that takes input of a button and plays sound

function playSound(selectedColor){

   var audio = new Audio("sounds/" + selectedColor + ".mp3");

    audio.play();   

}

// a function to animate the buttons

function animatePress(currentColour){

	$("#" + currentColour).addClass("pressed");

	setTimeout(function(){

		$("#" + currentColour).removeClass("pressed");

	},100);

}

