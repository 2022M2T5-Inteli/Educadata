//COLORS
var primaryColor = '#948d28'
var black = '#151515'
var gray = '#C4C4C4'
var white = '#F3F3F3'

//FUNCTION TO CHANGE PAGE

// Profile page:
function profileBtn(){
  const profileBtn = document.getElementById("profileBtn")
  const editProfileBtn = document.getElementById("editProfileBtn")
  profileBtn.classList.add("disabled")
  editProfileBtn.classList.remove("disabled")

  document.getElementById("profile").style.display = "block";
  document.getElementById("survey").style.display = "none";
  document.getElementById("editProfile").style.display = "none";
}

// Survey page:
function surveyBtn(){
  document.getElementById("profile").style.display = "none";
  document.getElementById("survey").style.display = "block";
  document.getElementById("editProfile").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  loadSurvey();
}

//Turn off results button:
function resultsDisable(){
  const btn = document.getElementById("resultsBtn")
  var survey = 1;
  if(survey == 0){
    btn.classList.add("disabled")
  }else{
    btn.classList.remove("disabled")
  };
}

//Edit profile:
function editProfileBtn(){
  const profileBtn = document.getElementById("profileBtn")
  const editProfileBtn = document.getElementById("editProfileBtn")
  profileBtn.classList.remove("disabled")
  editProfileBtn.classList.add("disabled")

  document.getElementById("profile").style.display = "none";
  document.getElementById("survey").style.display = "none";
  document.getElementById("editProfile").style.display = "block";
}


//QUESTIONS

//Database variables
var url = "http://127.0.0.1:3080/pergunta/users";
var resposta;
var xhttp = new XMLHttpRequest();
xhttp.open("GET", url, false);
xhttp.send();
resposta = JSON.parse(xhttp.responseText);
var notLoaded = true;
var multiplier;
var lastQuestion = 2;
var gray = '#C4C4C4'
var eixo1 = 0;
var eixo2 = 0;

//Function to load survey
function loadSurvey(){
  if(notLoaded === true){
      for(var i=0; i < resposta.length; i++){
        var idPerguntaX = resposta[i].idPergunta
        var getQuestion = document.createElement("button")
        getQuestion.setAttribute("id", "getQuestion" + idPerguntaX);
        getQuestion.setAttribute("class", "questionBtn");
        getQuestion.setAttribute("onclick", "mudarQuestao(" + idPerguntaX + ")");
        getQuestion.setAttribute("onmouseover", "getQuestionMouseOver(" + idPerguntaX + ")");
        getQuestion.setAttribute("onmouseout", "getQuestionMouseOut(" + idPerguntaX + ")");
        document.getElementById("questionsBox").appendChild(getQuestion);
        document.getElementById("getQuestion" + idPerguntaX).innerHTML = i+1;

        var question = document.createElement("p");
        question.textContent = i + 1 + ". " + resposta[i].Pergunta;
        question.setAttribute("style", "display: none");
        question.setAttribute("id", "question" + idPerguntaX);
        question.setAttribute("class", "text-primarycolor");
        document.getElementById("container").appendChild(question);

        var answerDiv = document.createElement("div");
        answerDiv.setAttribute("style", "display: none");
        answerDiv.setAttribute("id", "answerDivID" + idPerguntaX);
        document.getElementById("container").appendChild(answerDiv);

        var url1 = "http://127.0.0.1:3080/resposta/users";
        var resposta1;
        var xhttp1 = new XMLHttpRequest();
        xhttp1.open("GET", url1, false);
        xhttp1.send();
        resposta1 = JSON.parse(xhttp1.responseText);
      }
// Create questions on front:
      for(var a=0; a < resposta1.length; a++){
          var answers = document.createElement("button");
          answers.setAttribute("id", "answerID" + resposta1[a].idPergunta + a);
          answers.setAttribute("class", "answersBtn");
          answers.setAttribute("onclick", "compute(" + (resposta1[a].idPergunta+1) + ", " + resposta1[a].Maturidade +")");
          document.getElementById("answerDivID" + (resposta1[a].idPergunta)).appendChild(answers);
          document.getElementById("answerID" + resposta1[a].idPergunta + a).innerHTML = resposta1[a].Resposta;
      }
      notLoaded = false;
  }
}


//Function to switch to the question that was clicked: 
function mudarQuestao(i) {
  document.getElementById("question" + lastQuestion).style.display = "none";
  document.getElementById("question" + i).style.display = "block";
  document.getElementById("answerDivID" + lastQuestion).style.display = "none";
  document.getElementById("answerDivID" + i).style.display = "block";
  document.getElementById("getQuestion" + lastQuestion).style.backgroundColor = white;
  document.getElementById("getQuestion" + lastQuestion).disabled = false;
  document.getElementById("getQuestion" + i).style.backgroundColor = "#989393";
  document.getElementById("getQuestion" + i).disabled = true;
  lastQuestion = i;
}

// go to the question that was clicked
function compute(i, a){
  document.getElementById("question" + lastQuestion).style.display = "none";
  document.getElementById("question" + i).style.display = "block";
  document.getElementById("answerDivID" + lastQuestion).style.display = "none";
  document.getElementById("answerDivID" + i).style.display = "block";
  document.getElementById("getQuestion" + lastQuestion).style.backgroundColor = white;
  document.getElementById("getQuestion" + lastQuestion).disabled = false;
  document.getElementById("getQuestion" + i).style.backgroundColor = "#989393";
  document.getElementById("getQuestion" + i).disabled = true;
  lastQuestion = i;


}

//Functions to animate quetions buttons:
function getQuestionMouseOver(i){
  document.getElementById("getQuestion" + i).style.backgroundColor = "#C4C4C4"
}
function getQuestionMouseOut(i){
  var a = document.getElementById("getQuestion" + i).style.backgroundColor
  if (document.getElementById("getQuestion" + i).disabled != true){
    document.getElementById("getQuestion" + i).style.backgroundColor = "#F3F3F3"
  }
}