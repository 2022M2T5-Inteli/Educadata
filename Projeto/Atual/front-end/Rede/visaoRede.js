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
  const profileBtn = document.getElementById("profileBtn")
  const editProfileBtn = document.getElementById("editProfileBtn")
  profileBtn.classList.add("disabled")
  editProfileBtn.classList.remove("disabled")

  document.getElementById("profile").style.display = "block";
  document.getElementById("editProfile").style.display = "none";
}


//Desativa o botao de resultados (HARD-CODE)
function resultsDisable(){
  const btn = document.getElementById("resultsBtn")
  var survey = 1;
  if(survey == 0){
    btn.classList.add("disabled")
  }else{
    btn.classList.remove("disabled")
  };
}

function editProfileBtn(){
  const profileBtn = document.getElementById("profileBtn")
  const editProfileBtn = document.getElementById("editProfileBtn")
  profileBtn.classList.remove("disabled")
  editProfileBtn.classList.add("disabled")

  document.getElementById("profile").style.display = "none";
  document.getElementById("editProfile").style.display = "block";
}



