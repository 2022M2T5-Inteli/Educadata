



function getEscola(){
  var url = "http://127.0.0.1:3080/escola/users";
  var resposta;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
  resposta = JSON.parse(xhttp.responseText);
  var instituicao = "";
  var endereco = "";
  var nFuncionario = "";
  var nAluno = "";
  for(var i=0; i < resposta.length; i++){
    instituicao += i+1;
    instituicao += ". ";
    instituicao += resposta[i].Instituicao;
    instituicao += "</br>";
    endereco += resposta[i].idEndereco;
    endereco += "</br>";
    nFuncionario += resposta[i].nFuncionario;
    nAluno += resposta[i].nAluno;
    nAluno += "</br>";
  }
  document.getElementById("listaEscola").innerHTML = ("<center>" + instituicao + "</center>");
  document.getElementById("listaEnderecoEscola").innerHTML = ("<center>" + endereco + "</center>");
  document.getElementById("listanFuncAlun").innerHTML = ("<center>" + nFuncionario + "  " + nAluno + "</center>");
  //console.log(xhttp.responseText);
}

function updateEscola(){
  
}