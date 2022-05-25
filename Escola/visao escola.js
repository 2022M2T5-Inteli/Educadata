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


//Passa  para a próxima questão, faz o cálculo de pontos e soma os pontos na variável do eixo da pergunta
function passar(i) {
  console.log(multiplier)
  console.log(i)
  if (currentQuestion <= questions.length){
    answerButtonBeingUsed = true
    document.getElementById("getQuestion" + currentQuestion).disabled = false;
    document.getElementById("getQuestion" + currentQuestion).click();
    document.getElementById("getQuestion" + currentQuestion).disabled = true;
  }
  //calculo de pontos
  if(i == 1) {
    allPoints[currentQuestion] = 5 * multiplier
  }else if (i == 2) {
    allPoints[currentQuestion] = 4 * multiplier
  }else if (i == 3) {
    allPoints[currentQuestion] = 3 * multiplier
  }else if (i == 4) {
    allPoints[currentQuestion] = 2 * multiplier
  }else if (i == 5) {
    allPoints[currentQuestion] = 1 * multiplier
  }
  teaching = 0;
  var totalWeight = 0
  for (var a = 0; a < questions.length; a++){
    totalWeight += Number(questions[a].peso);
  }
  for (var a = 0; a < questions.length; a++){
    teaching += allPoints[a] * ((100/totalWeight)/5);
  }
  people = 0;
  for (var i = 14; i <= 33; i++){
    people += allPoints[i] * 0.21739130435;
  }
  document.getElementById("teachingPoints").textContent = teaching;
  document.getElementById("peoplePoints").textContent = people;
  for (var a = 0; a <= questions.length; a++){
    if (allPoints[a] != 0){
      verifier += 1;
      if (verifier >= questions.length){
        document.getElementById("buttonNext").style.display = "block";
      }
    }
  }
  verifier = 0;

  //passar pra próxima questão
  currentQuestion++;
  if (currentQuestion > questions.length - 1) {
    currentQuestion = 0;
  }
  document.getElementById("question" + currentQuestion).style.display = "block";
  document.getElementById("question" + lastQuestion).style.display = "none";
  document.getElementById("getQuestion" + currentQuestion).style.backgroundColor = '#948d28';
  document.getElementById("getQuestion" + currentQuestion).disabled = true;
  document.getElementById("getQuestion" + lastQuestion).style.backgroundColor = '#151515';
  document.getElementById("getQuestion" + lastQuestion).disabled = false;
  lastQuestion = currentQuestion;
}

function mudarQuestao(i, a) {
  //passar pra questão que foi clicada
  multiplier = questions[i].peso
  if (answerButtonBeingUsed == false){
    currentQuestion = i;
    document.getElementById("question" + lastQuestion).style.display = "none";
    document.getElementById("question" + i).style.display = "block";
    document.getElementById("getQuestion" + lastQuestion).style.backgroundColor = gray;
    document.getElementById("getQuestion" + lastQuestion).disabled = false;
    document.getElementById("getQuestion" + i).style.backgroundColor = '#948d28';
    document.getElementById("getQuestion" + i).disabled = true;
    lastQuestion = currentQuestion;
  }
  else{
    answerButtonBeingUsed = false
  }
  console.log(multiplier)
}


//funções para mudar a cor dos botões de navegação
function mouseOver(i){
  document.getElementById("getQuestion" + i).style.backgroundColor = primaryColor
}

function mouseOut(i){
  document.getElementById("getQuestion" + i).style.backgroundColor = gray
}


//faz aparecer o gráfico e sumir com as perguntas e respostas
function next(){
  for (i = 0; i < questions.length; i++){
    document.getElementById("question" + i).style.display = "none";
    document.getElementById("getQuestion" + i).style.display = "none";
  }
  document.getElementById("button1").style.display = "none";
  document.getElementById("button2").style.display = "none";
  document.getElementById("button3").style.display = "none";
  document.getElementById("button4").style.display = "none";
  document.getElementById("button5").style.display = "none";
  document.getElementById("buttonNext").style.display = "none";
  document.getElementById("title").textContent = "Resultado:";
  document.getElementById("heptagonGraphDiv").style.display = "block";

  //seta um gráfico de heptágono para o chart.js
  var data = {
    labels: [
      'Ensino',
      'Pessoas',
      'Fluxo',
      'Infraestrutura e TI',
      'Gestão para Resultados',
      'Incentivos',
      'Equidade'
    ],
    datasets: [{
      label: 'Sua instituição de ensino',
      data: [teaching, 50, 50, 50, 50, 50, 50],
      fill: true,
      backgroundColor: 'rgba(135, 206, 250, 0.2)',
      borderColor: 'rgb(135, 206, 250)',
      pointBackgroundColor: 'rgb(135, 206, 250)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(135, 206, 250)'
    }, {
      label: 'Média das instituições de ensino',
      data: [42, 42, 42, 42, 42, 42, 42],
      fill: true,
      backgroundColor: 'rgba(255, 255, 0, 0.2)',
      borderColor: 'rgb(255, 255, 0)',
      pointBackgroundColor: 'rgb(255, 255, 0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 255, 0)'
    }]
  };
  const config = {
    type: 'radar',
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 1
        }
      },
      scale: {
        ticks: {
          beginAtZero: true,
          max: 5,
        }
      }
    },
  };
  var heptagonGraph = new Chart(
    document.getElementById('heptagonGraph'),
    config
  );
}


//Funções de troca de tela

function profileBtn(){
  document.getElementById("profile").style.display = "block";
  document.getElementById("survey").style.display = "none";
  document.getElementById("results").style.display = "none";
  loadSurvey();
}

function surveyBtn(){
  document.getElementById("profile").style.display = "none";
  document.getElementById("survey").style.display = "block";
  document.getElementById("results").style.display = "none";
  loadSurvey();
}

function resultsBtn(){
  document.getElementById("profile").style.display = "none";
  document.getElementById("survey").style.display = "none";
  document.getElementById("results").style.display = "block";
  resetSurvey();
}


//Cria uma pergunta nova na array "questions[]"
function addQuestion(){
  var addNewQuestion = {
    question: document.createElement("input"),
    axle: document.createElement("select"),
    weight: document.createElement("input"),
    answers: document.createElement("button"),
    confirm: document.createElement("button"),
    erase: document.createElement("button"),
    jump: document.createElement("p")
  };
  addNewQuestion.question.setAttribute("type", "text");
  addNewQuestion.question.setAttribute("id", "questionID" + quest);
  addNewQuestion.question.setAttribute("class", "addQuestion");
  addNewQuestion.question.setAttribute("placeholder", "Digite a pergunta " + (quest + 1));
  addNewQuestion.axle.setAttribute("id", "axleID" + quest);
  addNewQuestion.axle.setAttribute("class", "addQuestion weightAxleSize");
  addNewQuestion.weight.setAttribute("type", "number");
  addNewQuestion.weight.setAttribute("id", "weightID" + quest);
  addNewQuestion.weight.setAttribute("placeholder", "Peso");
  addNewQuestion.weight.setAttribute("class", "addQuestion weightAxleSize");
  addNewQuestion.answers.setAttribute("id", "answersID" + quest);
  addNewQuestion.answers.setAttribute("class", "modifyBtn");
  addNewQuestion.answers.setAttribute("onclick", "changeAnswers(" + quest + ")");
  addNewQuestion.confirm.setAttribute("onclick", "confirmQuestion(" + quest + ")");
  addNewQuestion.confirm.setAttribute("id", "confirmID" + quest);
  addNewQuestion.confirm.setAttribute("class", "modifyBtn");
  addNewQuestion.confirm.style.backgroundColor = "#7CFC00";
  addNewQuestion.erase.setAttribute("onclick", "eraseQuestion(" + quest + ")");
  addNewQuestion.erase.setAttribute("id", "eraseID" + quest);
  addNewQuestion.erase.setAttribute("class", "modifyBtn");
  addNewQuestion.erase.style.backgroundColor = "#FF0000";
  addNewQuestion.jump.innerHTML = "</br>";
  addNewQuestion.jump.setAttribute("id", "jumpID" + quest);
  document.getElementById("surveyEdit").appendChild(addNewQuestion.jump);
  document.getElementById("surveyEdit").appendChild(addNewQuestion.question);
  document.getElementById("surveyEdit").appendChild(addNewQuestion.axle);
  document.getElementById("axleID" + quest).innerHTML = "<option value='1'>Eixo 1</option><option value='2'>Eixo 2</option><option value='3'>Eixo 3</option><option value='4'>Eixo 4</option><option value='5'>Eixo 5</option><option value='6'>Eixo 6</option><option value='7'>Eixo 7</option>"
  document.getElementById("surveyEdit").appendChild(addNewQuestion.weight);
  document.getElementById("surveyEdit").appendChild(addNewQuestion.answers);
  document.getElementById("surveyEdit").appendChild(addNewQuestion.confirm);
  document.getElementById("surveyEdit").appendChild(addNewQuestion.erase);
  confirmQuestion(quest)
  quest ++;
}

//Carrega o questionário com as perguntas atuais
function loadSurvey(){
  for (var i = 0; i < questions.length; i++){
    var getQuestion = document.createElement("button")
    getQuestion.setAttribute("id", "getQuestion" + i);
    getQuestion.setAttribute("class", "questionBtn");
    getQuestion.setAttribute("onclick", "mudarQuestao(" + i +", " +  questions[i].peso + ")");
    getQuestion.setAttribute("onmouseover", "mouseOver(" + i + ")");
    getQuestion.setAttribute("onmouseout", "mouseOut(" + i + ")");
    document.getElementById("questionsBox").appendChild(getQuestion);
    document.getElementById("getQuestion" + i).innerHTML = i + 1;
  }
  var jump = document.createElement("p")
  document.getElementById("questions").appendChild(jump);
  for (var i = 0; i < questions.length; i++){
    var question = document.createElement("p");
    question.textContent = i + 1 + ". " + questions[i].pergunta;
    question.setAttribute("style", "display: none");
    question.setAttribute("id", "question" + i);
    question.setAttribute("class", "text-primarycolor");
    document.getElementById("questions").appendChild(question);
  }
  mudarQuestao(0, questions[0].peso)
}

//Edita a questão ao clicar no botão verde
function confirmQuestion(i){
  var objetoCriado = Object.create(QuestaoMatriz);
  objetoCriado.pergunta = document.getElementById("questionID" + i).value;
  objetoCriado.eixo = document.getElementById("axleID" + i).value;
  objetoCriado.peso = document.getElementById("weightID" + i).value;
  if (i >= questions.length){
    questions.push(objetoCriado);
  }
  else{
    questions[i].pergunta = document.getElementById("questionID" + i).value;
    questions[i].eixo = document.getElementById("axleID" + i).value;
    questions[i].peso = document.getElementById("weightID" + i).value;
  }
}

//Deleta a questão
function eraseQuestion(i){
  document.getElementById("surveyEdit").removeChild(document.getElementById("questionID" + i));
  document.getElementById("surveyEdit").removeChild(document.getElementById("axleID" + i));
  document.getElementById("surveyEdit").removeChild(document.getElementById("weightID" + i));
  document.getElementById("surveyEdit").removeChild(document.getElementById("answersID" + i));
  document.getElementById("surveyEdit").removeChild(document.getElementById("confirmID" + i));
  document.getElementById("surveyEdit").removeChild(document.getElementById("eraseID" + i));
  document.getElementById("surveyEdit").removeChild(document.getElementById("jumpID" + i));
  for (var a = i; a < questions.length - 1; a++){
    questions[a].pergunta = questions[a+1].pergunta;
    questions[a].eixo = questions[a+1].eixo;
    questions[a].peso = questions[a+1].peso;
    document.getElementById("questionID" + (a + 1)).id = "questionID" + a;
    document.getElementById("questionID" + a).setAttribute("placeholder", "Digite a pergunta " + (a + 1));
    document.getElementById("axleID" + (a + 1)).id = "axleID" + a;
    document.getElementById("weightID" + (a + 1)).id = "weightID" + a;
    document.getElementById("answersID" + (a + 1)).setAttribute("onclick", "changeAnswers(" + a + ")");
    document.getElementById("answersID" + (a + 1)).id = "answersID" + a;
    document.getElementById("confirmID" + (a + 1)).setAttribute("onclick", "confirmQuestion(" + a + ")");
    document.getElementById("confirmID" + (a + 1)).id = "confirmID" + a;
    document.getElementById("eraseID" + (a + 1)).setAttribute("onclick", "eraseQuestion(" + a + ")");
    document.getElementById("eraseID" + (a + 1)).id = "eraseID" + a;
    document.getElementById("jumpID" + (a + 1)).id = "jumpID" + a;
  }
  quest -= 1;
  questions.pop()
}


//Ao sair da tela do questionário, reseta ele, para poder carregá-lo novamente
function resetSurvey(){
  for (var i = 0; i < questions.length; i++){
    document.getElementById("questionsBox").removeChild(document.getElementById("getQuestion" + i));
    document.getElementById("questions").removeChild(document.getElementById("question" + i));
  }
  currentQuestion = 0;
  lastQuestion = 0;
}

function changeAnswers(){
  var answers = {
    popup: document.createElement("div")
  };
  answers.popup.setAttribute("class", "modal");
  document.getElementById("surveyEdit").appendChild(answers.popup);
}