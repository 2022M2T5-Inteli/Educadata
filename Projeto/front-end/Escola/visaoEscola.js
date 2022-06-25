//COLORS
var primaryColor = "#948d28";
var black = "#151515";
var gray = "#C4C4C4";
var white = "#F3F3F3";

//FUNCTION TO CHANGE PAGE

// Profile page:
function profileBtn() {
  const profileBtn = document.getElementById("profileBtn");
  const editProfileBtn = document.getElementById("editProfileBtn");
  profileBtn.classList.add("disabled");
  editProfileBtn.classList.remove("disabled");

  document.getElementById("profile").style.display = "block";
  document.getElementById("survey").style.display = "none";
  document.getElementById("editProfile").style.display = "none";
}

// Survey page:
function surveyBtn() {
  document.getElementById("profile").style.display = "none";
  document.getElementById("survey").style.display = "block";
  document.getElementById("editProfile").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  loadSurvey();
}

//Turn off results button:
function resultsDisable() {
  const btn = document.getElementById("resultsBtn");
  var survey = 1;
  if (survey == 0) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
}

//Edit profile:
function editProfileBtn() {
  const profileBtn = document.getElementById("profileBtn");
  const editProfileBtn = document.getElementById("editProfileBtn");
  profileBtn.classList.remove("disabled");
  editProfileBtn.classList.add("disabled");

  document.getElementById("profile").style.display = "none";
  document.getElementById("survey").style.display = "none";
  document.getElementById("editProfile").style.display = "block";
}

//QUESTIONS

//Database variables

var url = 'http://127.0.0.1:3080/pergunta/users';
  var resposta;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();
    resposta = JSON.parse(xhttp.responseText);
  var notLoaded = true;
  var multiplier;
  var lastQuestion = 2;
  var gray = "#C4C4C4";
  var eixo1 = 0;
  var eixo2 = 0;
  var pesoSomado = 0;
  var allAnswers = [];

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
  
          pesoSomado += Number(resposta[i].Peso);
          allAnswers.push(0);
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
  document.getElementById("getQuestion" + lastQuestion).style.backgroundColor =
    white;
  document.getElementById("getQuestion" + lastQuestion).disabled = false;
  document.getElementById("getQuestion" + i).style.backgroundColor = "#989393";
  document.getElementById("getQuestion" + i).disabled = true;
  lastQuestion = i;
}

// go to the question that was clicked
function compute(i, a) {
  if (i <= allAnswers.length) {
    mudarQuestao(i);
  } else {
    mudarQuestao(1);
  }

  var url = "http://127.0.0.1:3080/pergunta/users";
  var resposta;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();
  resposta = JSON.parse(xhttp.responseText);

  allAnswers[i - 1] = (100 / (resposta[i - 2].Peso * 3)) * a * resposta[i - 2].Peso;
}

//Functions to animate quetions buttons:
function getQuestionMouseOver(i) {
  document.getElementById("getQuestion" + i).style.backgroundColor = "#C4C4C4";
}
function getQuestionMouseOut(i) {
  var a = document.getElementById("getQuestion" + i).style.backgroundColor;
  if (document.getElementById("getQuestion" + i).disabled != true) {
    document.getElementById("getQuestion" + i).style.backgroundColor =
      "#F3F3F3";
  }
}


// AJAX TO UPDATE ADRESS
function editAddressRegister() {
  $.ajax({
    url: "http://127.0.0.1:3080/escola/userupdate",
    type: "POST",
    async: false,
    data: {
      Instituicao: $("#nomeEscola").val(),
      nAluno: Number($("#numAlunos").val()),
      nFuncionario: $("#numFuncionarios").val(),
      idRede: 12,
      idCEP: Number($("#cep").val()),
      Email: $("#emailInstitucional").val(),
      idEscola: Number($("#idEscola").val()),
    },
  });
  profileBtn()
}
function checkIfExists() {
  $.get("http://127.0.0.1:3080/escola/userselect-ceps", function (ceps) {
    console.log(ceps);
    for (a in ceps.length) {
      if (ceps[a] == "#cep".val()) {
        console.log("existe");
        editAddressRegister();
      } else {
        console.log("não existe");
        ajaxInsertData();
      }
    }
  });
}

function ajaxInsertData() {
  $.ajax({
    url: "http://127.0.0.1:3080/rede/userinsert",
    type: "POST",
    async: false,
    data: {
      idCEP: $("#CEP").val(),
      Pais: $("#pais").val(),
      Estado: $("#estado").val(),
      Cidade: $("#cidade").val(),
      Bairro: $("#bairro").val(),
      Rua: $("#rua").val(),
      Numero: $("#numeroEndereco").val(),
      Complemento: $("#complementoEndereco").val(),
    },
  });
}

function setGraph(){
  var labelsA = []
  var url = "http://127.0.0.1:3080/eixo/users";
  var resposta;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();
  resposta = JSON.parse(xhttp.responseText);
  for(var i=0; i<resposta.length;i++){
    labelsA.push(resposta[i].Eixo)
  }



  var data = {
    labels: labelsA,
    datasets: [{
      label: 'Sua instituição de ensino',
      data: allAnswers,
      fill: true,
      backgroundColor: 'rgba(135, 206, 250, 0.2)',
      borderColor: 'rgb(135, 206, 250)',
      pointBackgroundColor: 'rgb(135, 206, 250)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(135, 206, 250)'
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
  document.getElementById("heptagonGraphA").style.display = "none";
  document.getElementById("heptagonGraphDiv").style.display = "block";
  profileBtn();
}