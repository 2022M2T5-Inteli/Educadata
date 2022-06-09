



function TestGETDB(){
  var url = "http://127.0.0.1:3080/escola/users";
  var resposta;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
  resposta = JSON.parse(xhttp.responseText);
  var textotoo = "";
  for(var i=0; i < resposta.length; i++){
    textotoo += resposta[i].Instituicao;
    textotoo += "</br>";
  }
  document.getElementById("listaEscola").innerHTML = ("<h2>Lista de escolas</h2> </br> </br>" + textotoo);
  //console.log(xhttp.responseText);
}