var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

//Adiconar listener para keydown - Começar jogo
$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

// O que fazer quando clicar
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animatedPress(userChosenColour);
  playSound(userChosenColour);

  //Enviar ultima posição do array dos clickes do utilizador para confirmar se é igual à dada
  checkAnswer(userClickedPattern.length-1);
})

// Reproduzir som
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Adicionar classe com animação quando clicar
function animatedPress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Gerar nova sequência
function nextSequence(){
  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

//Confirmar se cor clicada é igual à pedida
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
      nextSequence();
    }, 100);
  }}else{
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart")

    startOver();
  }
}

// Recomeçar jogo
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
