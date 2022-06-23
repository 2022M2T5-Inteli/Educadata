//Funções de troca de tela

function profileBtn(){
  const profileBtn = document.getElementById("profileBtn")
  const editProfileBtn = document.getElementById("editProfileBtn")
  profileBtn.classList.add("disabled")
  editProfileBtn.classList.remove("disabled")

  document.getElementById("profile").style.display = "block";
  document.getElementById("surveyEdit").style.display = "none";
  document.getElementById("editProfile").style.display = "none";
}

function surveyEditBtn(){
  const profileBtn = document.getElementById("profileBtn")
  const editProfileBtn = document.getElementById("editProfileBtn")
  profileBtn.classList.remove("disabled")
  editProfileBtn.classList.remove("disabled")
  

  document.getElementById("profile").style.display = "none";
  document.getElementById("surveyEdit").style.display = "block";
  document.getElementById("editProfile").style.display = "none";
  getQuestions();
}

function editProfileBtn(){
  const profileBtn = document.getElementById("profileBtn")
  const editProfileBtn = document.getElementById("editProfileBtn")
  profileBtn.classList.remove("disabled")
  editProfileBtn.classList.add("disabled")

  document.getElementById("profile").style.display = "none";
  document.getElementById("surveyEdit").style.display = "none";
  document.getElementById("editProfile").style.display = "block";
}


var notLoaded = true;
var notLoadedAnswer = [];

function getQuestions(){
  if (notLoaded){
    var url = "http://127.0.0.1:3080/pergunta/users";
    var resposta;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
    resposta = JSON.parse(xhttp.responseText);
    var idPergunta;
    var pergunta;
    var peso;
    var idEixo;
    for(var i=0; i < resposta.length; i++){
      var questDiv = document.createElement("div");
      var btnShow = document.createElement("button");
      var btnEdit = document.createElement("button");
      var btnAdd = document.createElement("button");
      var btnSave = document.createElement("button");
      var questDelete = document.createElement("button");
      var questShow = document.createElement("p");
      var weightShow = document.createElement("label");
      var axleShow = document.createElement("label");
      idPergunta = resposta[i].idPergunta;
      pergunta = resposta[i].Pergunta;
      peso = resposta[i].Peso;
      idEixo = resposta[i].idEixo;
      questDiv.setAttribute("id", "questDiv" + idPergunta);
      questDiv.setAttribute("class", "addQuestion");
      btnShow.setAttribute("id", "buttonShowID" + idPergunta);
      btnShow.setAttribute("class", "buttonShow float-right bi bi-caret-down");
      btnShow.setAttribute("onclick", "editQuestion(" + idPergunta + ")");
      btnEdit.setAttribute("id", "buttonEditID" + idPergunta);
      btnEdit.setAttribute("class", "buttonShow float-right bi bi-pencil");
      btnEdit.setAttribute("onclick", "getEditable(" + idPergunta + ")");
      btnAdd.setAttribute("id", "buttonAddID" + idPergunta);
      btnAdd.setAttribute("class", "buttonShow float-right bi bi-plus-lg");
      btnAdd.setAttribute("onclick", "addAnswer(" + idPergunta + ")");
      btnSave.setAttribute("id", "buttonSaveID" + idPergunta);
      btnSave.setAttribute("class", "buttonShow float-right bi bi-clipboard-check");
      btnSave.setAttribute("onclick", "saveQuestion(" + idPergunta + ")");
      questDelete.setAttribute("id", "buttonDeleteID" + idPergunta);
      questDelete.setAttribute("onclick", "deleteQuestion(" + idPergunta + ")");
      questDelete.setAttribute("class", "buttonShow float-right bi bi-trash3");
      questShow.setAttribute("id", "questShowID" + idPergunta);
      questShow.setAttribute("class", "labels bold");
      weightShow.setAttribute("id", "weightShowID" + idPergunta);
      weightShow.setAttribute("class", "labels bold");
      axleShow.setAttribute("id", "axleShowID" + idPergunta);
      axleShow.setAttribute("class", "labels bold");
      questDiv.style.backgroundColor = "#FFFFFF";
      document.getElementById("surveyEdit").appendChild(questDiv);
      document.getElementById("questDiv" + idPergunta).appendChild(questShow);
      document.getElementById("questDiv" + idPergunta).appendChild(weightShow);
      document.getElementById("questDiv" + idPergunta).appendChild(axleShow);
      document.getElementById("questShowID" + idPergunta).innerHTML = pergunta;
      document.getElementById("weightShowID" + idPergunta).innerHTML = peso;
      document.getElementById("axleShowID" + idPergunta).innerHTML = idEixo;
      document.getElementById("questDiv" + idPergunta).appendChild(btnShow);
      document.getElementById("questDiv" + idPergunta).appendChild(btnEdit);
      document.getElementById("questDiv" + idPergunta).appendChild(btnAdd);
      document.getElementById("questDiv" + idPergunta).appendChild(btnSave);
      document.getElementById("questDiv" + idPergunta).appendChild(questDelete);
      // document.getElementById("buttonSaveID" + idPergunta).style.backgroundColor = "#00FF00"
      // document.getElementById("buttonEditID" + idPergunta).style.backgroundColor = "#FFFF00"
      // document.getElementById("buttonDeleteID" + idPergunta).style.backgroundColor = "#FF0000"
      // document.getElementById("buttonAddID" + idPergunta).style.backgroundColor = "#993399"
      notLoadedAnswer.push(1);
    }
    //console.log(xhttp.responseText);
    notLoaded = false;
  }
}

function editQuestion(quest){
  if (notLoadedAnswer[quest] == 1){
    var url = "http://127.0.0.1:3080/resposta/users";
    var resposta;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
    resposta = JSON.parse(xhttp.responseText);
    var idResposta;
    var respostaA;
    var maturidade;
    for(var i=0; i < resposta.length; i++){
      idResposta = resposta[i].idResposta;
      respostaA = resposta[i].Resposta;
      maturidade = resposta[i].Maturidade;
      idPergunta = resposta[i].idPergunta;
      if(idPergunta == quest){
        var answDiv = document.createElement("div");
        var btnDelete = document.createElement("button");
        var answShow = document.createElement("p");
        var matureShow = document.createElement("label");
        answDiv.setAttribute("id", "answDiv" + idResposta);
        answDiv.setAttribute("class", "addQuestion");
        btnDelete.setAttribute("id", "btnDelete" + idResposta);
        btnDelete.setAttribute("class", "buttonShow float-right bi bi-trash3");
        btnDelete.setAttribute("onclick", "answDelete(" + idResposta + "," + idPergunta + ")");
        answShow.setAttribute("id", "answShowID" + idResposta);
        answShow.setAttribute("class", "labels bold");
        matureShow.setAttribute("id", "matureShowID" + idResposta);
        matureShow.setAttribute("class", "labels bold");
        document.getElementById("questDiv" + quest).appendChild(answDiv);
        document.getElementById("answDiv" + idResposta).appendChild(answShow);
        document.getElementById("answDiv" + idResposta).appendChild(matureShow);
        document.getElementById("answShowID" + idResposta).innerHTML = respostaA;
        document.getElementById("matureShowID" + idResposta).innerHTML = maturidade;
        document.getElementById("answDiv" + idResposta).appendChild(btnDelete);
      }
      notLoadedAnswer[quest] = 0;
    }
  }
  else{
    var url = "http://127.0.0.1:3080/resposta/users";
    var resposta;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
    resposta = JSON.parse(xhttp.responseText);
    var idResposta;
    var respostaA;
    var maturidade;
    for(var i=0; i < resposta.length; i++){
      idResposta = resposta[i].idResposta;
      respostaA = resposta[i].Resposta;
      maturidade = resposta[i].Maturidade;
      idPergunta = resposta[i].idPergunta;
      if(idPergunta == quest){
        document.getElementById("questDiv" + idPergunta).removeChild(document.getElementById("answDiv" + idResposta));
      }
      notLoadedAnswer[quest] = 1;
    }
  }
}

function answDeleteFront(answ, quest){
  document.getElementById("questDiv" + quest).removeChild(document.getElementById("answDiv" + answ));
}

function deleteQuestion(quest){
  document.getElementById("surveyEdit").removeChild(document.getElementById("questDiv" + quest));
  questDelete(quest);
}

function getEditable(quest){
  document.getElementById("questShowID" + quest).setAttribute("contenteditable", "true");
  document.getElementById("weightShowID" + quest).setAttribute("contenteditable", "true");
  document.getElementById("axleShowID" + quest).setAttribute("contenteditable", "true");
  var url = "http://127.0.0.1:3080/resposta/users";
  var resposta;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
  resposta = JSON.parse(xhttp.responseText);
  var idResposta;
  var respostaA;
  var maturidade;
  for(var i=0; i < resposta.length; i++){
    idResposta = resposta[i].idResposta;
    respostaA = resposta[i].Resposta;
    maturidade = resposta[i].Maturidade;
    idPergunta = resposta[i].idPergunta;
    if(idPergunta == quest){
      document.getElementById("answShowID" + idResposta).setAttribute("contenteditable", "true");
      document.getElementById("matureShowID" + idResposta).setAttribute("contenteditable", "true");
    }
  }
}