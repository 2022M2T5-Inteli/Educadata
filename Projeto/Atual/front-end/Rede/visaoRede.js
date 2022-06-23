//FUNCTION TO CHANGE PAGE

//Profile:
function profileBtn(){
  const profileBtn = document.getElementById("profileBtn")
  const editProfileBtn = document.getElementById("editProfileBtn")
  profileBtn.classList.add("disabled")
  editProfileBtn.classList.remove("disabled")

  document.getElementById("profile").style.display = "block";
  document.getElementById("editProfile").style.display = "none";
}

// Edit profile:
function editProfileBtn(){
  const profileBtn = document.getElementById("profileBtn")
  const editProfileBtn = document.getElementById("editProfileBtn")
  profileBtn.classList.remove("disabled")
  editProfileBtn.classList.add("disabled")

  document.getElementById("profile").style.display = "none";
  document.getElementById("editProfile").style.display = "block";
  getEscola()
}

function getEscola(){
  var url = "http://127.0.0.1:3080/escola/users";
  var resposta;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
  resposta = JSON.parse(xhttp.responseText);
  var instituicao = "";
  var endereco = "";
  var nFuncAluno = "";
  var nAluno = "";
  for(var i=0; i < resposta.length; i++){
    instituicao += resposta[i].idEscola;
    instituicao += ". ";
    instituicao += resposta[i].Instituicao;
    instituicao += "<hr class='solid'>"
    instituicao += "</br>";
    nAluno += resposta[i].nAluno;
    nAluno += "<hr class='solid'>"
    nAluno += "</br>";
  }
  document.getElementById("schoolList").innerHTML += ("<center>" + instituicao + "</center>");
  document.getElementById("nAlunoList").innerHTML += ("<center>" + nAluno + "</center>");
  //console.log(xhttp.responseText);
}




