var answerButtonBeingUsed = false
var multiplier = 0
var currentQuestion = 0;
var lastQuestion = 0;
var primaryColor = '#948d28'
var black = '#151515'
var gray = '#C4C4C4'
var verifier = 0
var allPoints = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
var teaching = 0;
var people = 0;
var questions = []
var QuestaoMatriz = {
  pergunta: "null",
  eixo: 1,
  peso: 1,
  respostas: []
}
var quest = 0

//Funções de troca de tela

function profileBtn(){
  document.getElementById("profile").style.display = "block";
  document.getElementById("registeredSchools").style.display = "none";
  document.getElementById("editProfile").style.display = "none";
}


function registeredSchoolsBtn(){
  document.getElementById("profile").style.display = "none";
  document.getElementById("registeredSchools").style.display = "block";
  document.getElementById("editProfile").style.display = "none";
}

function editProfileBtn(){
  document.getElementById("profile").style.display = "none";
  document.getElementById("registeredSchools").style.display = "none";
  document.getElementById("editProfile").style.display = "block";
}

