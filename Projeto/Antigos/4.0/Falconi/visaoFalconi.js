var answerButtonBeingUsed = false
var multiplier = 0
var currentQuestion = 0;
var lastQuestion = 0;
var primaryColor = '#948d28'
var black = '#151515'
var verifier = 0
var allPoints = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
var teaching = 0;
var people = 0;
var questions = []
var questaoMatriz = {
  pergunta: "null",
  eixo: 1,
  peso: 1,
  respostas: []
}
var respostaMatriz = {
  resposta: "null",
  valor: 1
}
var quest = 0
var answ = 0


//Passa  para a próxima questão, faz o cálculo de pontos e soma os pontos na variável do eixo da pergunta
function passar(i) {
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
    document.getElementById("getQuestion" + lastQuestion).style.backgroundColor = '#151515';
    document.getElementById("getQuestion" + lastQuestion).disabled = false;
    document.getElementById("getQuestion" + i).style.backgroundColor = '#948d28';
    document.getElementById("getQuestion" + i).disabled = true;
    lastQuestion = currentQuestion;
  }
  else{
    answerButtonBeingUsed = false
  }
  for(var a = 0; a < questions[i].respostas.length; a++){
    var questionAnswers = {
      answer: document.createElement("button")
    };
    questionAnswers.answer.setAttribute("onclick", "passar(" + a + ")");
    questionAnswers.answer.setAttribute("id", "button" + a);
    questionAnswers.answer.setAttribute("class", "answers_Btn");
    questionAnswers.answer.textContent = questions[i].respostas[a].resposta
    document.getElementById("questions").appendChild(questionAnswers.answer);
  }
}


//funções para mudar a cor dos botões de navegação
function mouseOver(i){
  document.getElementById("getQuestion" + i).style.backgroundColor = primaryColor
}

function mouseOut(i){
  document.getElementById("getQuestion" + i).style.backgroundColor = black
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
  document.getElementById("registeredSchools").style.display = "none";
  document.getElementById("surveyEdit").style.display = "none";
  document.getElementById("editProfile").style.display = "none";
}


function registeredSchoolsBtn(){
  document.getElementById("profile").style.display = "none";
  document.getElementById("registeredSchools").style.display = "block";
  document.getElementById("surveyEdit").style.display = "none";
  document.getElementById("editProfile").style.display = "none";
}

function surveyEditBtn(){
  document.getElementById("profile").style.display = "none";
  document.getElementById("registeredSchools").style.display = "none";
  document.getElementById("surveyEdit").style.display = "block";
  document.getElementById("editProfile").style.display = "none";
}

function editProfileBtn(){
  document.getElementById("profile").style.display = "none";
  document.getElementById("registeredSchools").style.display = "none";
  document.getElementById("surveyEdit").style.display = "none";
  document.getElementById("editProfile").style.display = "block";
}


//Cria uma pergunta nova na array "questions[]"
function addQuestion(){
  var addNewQuestion = {
    questionShowDiv: document.createElement("div"),
    questionShow: document.createElement("p"),
    axleShow: document.createElement("p"),
    buttonShow: document.createElement("button"),
    questionDiv: document.createElement("div"),
    question: document.createElement("input"),
    axle: document.createElement("select"),
    weight: document.createElement("input"),
    answers: document.createElement("button"),
    confirm: document.createElement("button"),
    erase: document.createElement("button"),
    jump: document.createElement("p")
  };
  addNewQuestion.questionShowDiv.setAttribute("id", "questionShowDivID" + quest);
  addNewQuestion.questionShowDiv.setAttribute("class", "addQuestion");
  addNewQuestion.questionShowDiv.style.backgroundColor = "#FFFFFF";
  addNewQuestion.questionShow.setAttribute("id", "questionShowID" + quest);
  addNewQuestion.questionShow.setAttribute("class", "questionShow")
  addNewQuestion.questionShow.innerHTML = "Pergunta " + (quest + 1) + ". voce e do rock?";
  addNewQuestion.axleShow.setAttribute("id", "axleShowID" + quest);
  addNewQuestion.axleShow.setAttribute("class", "weightAxleSize axleShow");
  addNewQuestion.axleShow.innerHTML = "Eixo: 1";
  addNewQuestion.buttonShow.setAttribute("id", "buttonShowID" + quest);
  addNewQuestion.buttonShow.setAttribute("class", "buttonShow float-right");
  addNewQuestion.buttonShow.setAttribute("data-bs-toggle", "modal");
  addNewQuestion.buttonShow.setAttribute("data-bs-target", "#falconiModal");
  addNewQuestion.buttonShow.setAttribute("onclick", "editQuestion(" + quest + ")");
  addNewQuestion.questionDiv.setAttribute("id", "questionDivID" + quest);
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
  addNewQuestion.answers.setAttribute("data-bs-toggle", "modal");
  addNewQuestion.answers.setAttribute("data-bs-target", "#falconiModal");
  addNewQuestion.answers.setAttribute("onclick", "editQuestion(" + quest + ")");
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
  document.getElementById("surveyEdit").appendChild(addNewQuestion.questionShowDiv);
  document.getElementById("questionShowDivID" + quest).appendChild(addNewQuestion.buttonShow);
  document.getElementById("questionShowDivID" + quest).appendChild(addNewQuestion.questionShow);
  document.getElementById("questionShowDivID" + quest).appendChild(addNewQuestion.axleShow);
  document.getElementById("falconiModal").appendChild(addNewQuestion.questionDiv);
  document.getElementById("questionDivID" + quest).appendChild(addNewQuestion.jump);
  document.getElementById("questionDivID" + quest).appendChild(addNewQuestion.question);
  document.getElementById("questionDivID" + quest).appendChild(addNewQuestion.axle);
  document.getElementById("axleID" + quest).innerHTML = "<option value='1'>Eixo 1</option><option value='2'>Eixo 2</option><option value='3'>Eixo 3</option><option value='4'>Eixo 4</option><option value='5'>Eixo 5</option><option value='6'>Eixo 6</option><option value='7'>Eixo 7</option>"
  document.getElementById("questionDivID" + quest).appendChild(addNewQuestion.weight);
  document.getElementById("questionDivID" + quest).appendChild(addNewQuestion.answers);
  document.getElementById("questionDivID" + quest).appendChild(addNewQuestion.confirm);
  document.getElementById("questionDivID" + quest).appendChild(addNewQuestion.erase);
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
    document.getElementById("questions").appendChild(getQuestion);
    document.getElementById("getQuestion" + i).textContent = i + 1;
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
  var objetoCriado = Object.create(questaoMatriz);
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
  document.getElementById("falconiModal").removeChild(document.getElementById("questionDivID" + i));
  document.getElementById("falconiModal").removeChild(document.getElementById("axleID" + i));
  document.getElementById("falconiModal").removeChild(document.getElementById("weightID" + i));
  document.getElementById("falconiModal").removeChild(document.getElementById("answersID" + i));
  document.getElementById("falconiModal").removeChild(document.getElementById("confirmID" + i));
  document.getElementById("falconiModal").removeChild(document.getElementById("eraseID" + i));
  document.getElementById("falconiModal").removeChild(document.getElementById("jumpID" + i));
  for (var a = i; a < questions.length - 1; a++){
    questions[a].pergunta = questions[a+1].pergunta;
    questions[a].eixo = questions[a+1].eixo;
    questions[a].peso = questions[a+1].peso;
    document.getElementById("questionID" + (a + 1)).id = "questionID" + a;
    document.getElementById("questionID" + a).setAttribute("placeholder", "Digite a pergunta " + (a + 1));
    document.getElementById("axleID" + (a + 1)).id = "axleID" + a;
    document.getElementById("weightID" + (a + 1)).id = "weightID" + a;
    document.getElementById("answersID" + (a + 1)).setAttribute("onclick", "editQuestion(" + a + ")");
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
    document.getElementById("questions").removeChild(document.getElementById("getQuestion" + i));
    document.getElementById("questions").removeChild(document.getElementById("question" + i));
    for(var a = 0; a < questions[i].respostas.length; a++){
      document.getElementById("questions").removeChild(document.getElementById("button" + a));
    }
  }
  currentQuestion = 0;
  lastQuestion = 0;
}

function editQuestion(i){
  answ = i
  for(var a = 0; a < questions[answ].respostas.length; a++){
    var addNewAnswer = {
      answer: document.createElement("input"),
      value: document.createElement("input"),
      erase: document.createElement("button")
    };
    addNewAnswer.answer.setAttribute("type", "text");
    addNewAnswer.answer.setAttribute("id", "answerID" + a);
    addNewAnswer.answer.setAttribute("class", "addQuestion");
    addNewAnswer.answer.setAttribute("placeholder", "Resposta " + (a + 1));
    addNewAnswer.value.setAttribute("type", "number");
    addNewAnswer.value.setAttribute("id", "valueID" + a);
    addNewAnswer.value.setAttribute("placeholder", "Peso");
    addNewAnswer.value.setAttribute("class", "addQuestion weightAxleSize");
    addNewAnswer.erase.setAttribute("onclick", "eraseAnswer(" + a + ")");
    addNewAnswer.erase.setAttribute("id", "eraseAnswerID" + a);
    addNewAnswer.erase.setAttribute("class", "modifyBtn");
    addNewAnswer.erase.style.backgroundColor = "#FF0000";
    document.getElementById("questionShowDivID" + answ).appendChild(addNewAnswer.answer);
    document.getElementById("answerID" + a).value = questions[answ].respostas.resposta[a]
    document.getElementById("questionShowDivID" + answ).appendChild(addNewAnswer.value);
    document.getElementById("questionShowDivID" + answ).appendChild(addNewAnswer.erase);
  }
}

function addAnswer(){
  var addNewAnswer = {
    answer: document.createElement("input"),
    value: document.createElement("input"),
    erase: document.createElement("button")
  };
  for(var a = 0; a < questions[answ].respostas.length; a++){}
  addNewAnswer.answer.setAttribute("type", "text");
  addNewAnswer.answer.setAttribute("id", "answerID" + a);
  addNewAnswer.answer.setAttribute("class", "addQuestion");
  addNewAnswer.answer.setAttribute("placeholder", "Resposta " + (a + 1));
  addNewAnswer.value.setAttribute("type", "number");
  addNewAnswer.value.setAttribute("id", "valueID" + a);
  addNewAnswer.value.setAttribute("placeholder", "Peso");
  addNewAnswer.value.setAttribute("class", "addQuestion weightAxleSize");
  addNewAnswer.erase.setAttribute("onclick", "eraseAnswer(" + a + ")");
  addNewAnswer.erase.setAttribute("id", "eraseAnswerID" + a);
  addNewAnswer.erase.setAttribute("class", "modifyBtn");
  addNewAnswer.erase.style.backgroundColor = "#FF0000";
  document.getElementById("questionShowDivID" + answ).appendChild(addNewAnswer.answer);
  document.getElementById("questionShowDivID" + answ).appendChild(addNewAnswer.value);
  document.getElementById("questionShowDivID" + answ).appendChild(addNewAnswer.erase);
  var objetoCriado = Object.create(respostaMatriz);
  objetoCriado.pergunta = document.getElementById("answerID" + a).value;
  objetoCriado.valor = document.getElementById("valueID" + a).value;
  questions[answ].respostas.push(objetoCriado);
  console.log(questions[answ])
}

function eraseAnswer(i){
  document.getElementById("questionShowDivID" + i).removeChild(document.getElementById("answerID" + i));
  document.getElementById("questionShowDivID" + i).removeChild(document.getElementById("valueID" + i));
  document.getElementById("questionShowDivID" + i).removeChild(document.getElementById("eraseAnswerID" + i));
  for (var a = i; a < questions[answ].respostas.length - 1; a++){
    questions[answ].respostas[a] = questions[answ].respostas[a+1];
    document.getElementById("answerID" + (a + 1)).id = "answerID" + a
    document.getElementById("answerID" + a).setAttribute("placeholder", "Pergunta " + (a +1))
    document.getElementById("valueID" + (a + 1)).id = "valueID" + a
    document.getElementById("eraseAnswerID" + (a + 1)).id = "eraseAnswerID" + a
    document.getElementById("eraseAnswerID" + a).setAttribute("onclick", "eraseAnswer(" + a + ")");
  }
  questions[answ].respostas.pop();
}

function resetSurveyEdit(){
  console.log("bonk survey")
  for(var a = 0; a < questions[answ].respostas.length; a++){
    document.getElementById("questionShowDivID" + answ).removeChild(document.getElementById("answerID" + a));
    document.getElementById("questionShowDivID" + answ).removeChild(document.getElementById("valueID" + a));
    document.getElementById("questionShowDivID" + answ).removeChild(document.getElementById("eraseAnswerID" + a));
  }
}

function saveAnswers(){
  console.log("bonk 2 save")
  for(i = 0; i < questions[answ].respostas.length; i++){
    questions[answ].respostas[i].resposta = document.getElementById("answerID" + i).value;
  }
  document.getElementById("falconiModal").style.overflow = "hidden"
}