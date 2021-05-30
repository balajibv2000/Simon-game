
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
  if(!started){
    nextSequence();
    started = true;
    $("body").removeClass("game-over");
  }
});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  //console.log(userClickedPattern);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);


});



function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#level-title").html("Level " + level);

  setTimeout(function(){
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
  },500)
  level++;

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    if(JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern)){
      //console.log("sucess");
      userClickedPattern = [];
      setTimeout(function(){
        nextSequence();
      },1000);
    }

  }
  else{
    gameOver();

  }
}

function gameOver(){
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").html("Game Over, Press Any Key to Restart");
  gamePattern = [];

  userClickedPattern = [];

  started = false;

  level = 0;
}
