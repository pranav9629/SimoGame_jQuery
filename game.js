
alert("To initiate the game, press any key. Click on the buttons in the sequence it apprears to level up!");

var gamePattern = [];

var buttonColours = ["red","blue","green","yellow"];

var userClickedPattern = [];

var level = 0;

var started = false;


// detecting keypress to start game.

$(document).on("keypress",function(){

	if(!started){

		$("h1").text("Level 0");

		nextSequence();

		started = true;

	}

});

//   note down user selection pattern of color choice

$(".btn").on("click",function(){

	var userChosenColour = $(this).attr("id");

    animatePress(userChosenColour);
    
    userClickedPattern.push(userChosenColour);

   // console.log(userClickedPattern);

   playSound(userChosenColour);

   checkAnswer(userClickedPattern.length - 1);

});

// function to generate a random sequence of colors and push them to an array, also flashing/playing audio for the choice of color at that instance.
function nextSequence(){

	userClickedPattern = [];

    var randomNumber = Math.floor((Math.random() * 4));

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour); 

    level++;

    $("#level-title").text("Level " + level);

}



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

//gameplay logic

function checkAnswer(currentLevel){

	if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){


		if(userClickedPattern.length === gamePattern.length){
			setTimeout(function(){
				nextSequence()
			},800);

		}

		}else{

		   var audio = new Audio("sounds/wrong.mp3");

		   audio.play();

		   $("body").addClass("game-over");	

		   $("h1").text("Game Over!!!");

		   setTimeout(function(){
           
 		   		$("body").removeClass("game-over");
 		   		

		   },200);	

		   setTimeout(function(){
 		   		
 		   		$("h1").text("Press Any Key to Start");

 		   		startOver();

		   },600);

		}

}

function startOver(){

	level = 0;
	gamePattern = [];
	started = false;

}


