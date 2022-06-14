



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
    instituicao += "</br>";
    endereco += resposta[i].idEndereco;
    endereco += "</br>";
    nFuncAluno += resposta[i].nFuncionario;
    nFuncAluno += "  ";
    nFuncAluno += resposta[i].nAluno;
    nFuncAluno += "</br>";
  }
  document.getElementById("listaEscola").innerHTML = ("<center>" + instituicao + "</center>");
  document.getElementById("listaEnderecoEscola").innerHTML = ("<center>" + endereco + "</center>");
  document.getElementById("listanFuncAlun").innerHTML = ("<center>" + nFuncAluno + "</center>");
  //console.log(xhttp.responseText);
}

<<<<<<< Updated upstream
function getFalconi(){
  var url = "http://127.0.0.1:3080/falconi/users";
  var resposta;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
  resposta = JSON.parse(xhttp.responseText);
  var idFalconi = "";
  var nomeFalconi = "";
  var emailFalconi = "";
  var cargoFalconi = "";
  document.getElementById("nomeFalconiAppear").innerHTML = "<h4>NOME</h4>"
  document.getElementById("emailFalconiAppear").innerHTML = "<h4>EMAIL</h4>"
  document.getElementById("cargoFalconiAppear").innerHTML = "<h4>CARGO</h4>"
  for(var i=0; i < resposta.length; i++){
    idFalconi = resposta[i].idFalconi + ".  ";
    nomeFalconi = resposta[i].nome + "</br>";
    emailFalconi = resposta[i].email + "</br>";
    cargoFalconi = resposta[i].cargo + "</br>";
    document.getElementById("nomeFalconi").innerHTML += (idFalconi + nomeFalconi);
    document.getElementById("emailFalconi").innerHTML += (emailFalconi);
    document.getElementById("cargoFalconi").innerHTML += (cargoFalconi);
  }
  //console.log(xhttp.responseText);
}

function addFalconi(){
  var db = openDatabase("questionario", "1.0")
  var nomeFalconi = document.getElementById("nomeFalconi").value;
  var emailFalconi = document.getElementById("emailFalconi").value;
  var cargoFalconi = document.getElementById("cargoFalconi").value;

  db.transaction(function(tx){
    tx.executeSql('INSERT INTO falconi (nome, email, cargo) VALUES(?,?,?)',[nomeFalconi,emailFalconi,cargoFalconi]);
  });
}

// Guarda as informações de cadastro no banco de dados
$(document).ready(() => {
  contaFalconi.create();
})
var contaFalconi = {
  create(nome, email, cargo) {
      $.ajax({
          type: "POST",
          url: "http://127.0.0.1:3080/falconi/users'",
          data: {nome: nome, email: email, cargo: cargo},
          success: function (resultado) {
              console.log(123)
          },
      });
  },
};
function addFalconi() {
  var nome = document.getElementById("nomeFalconi").value;
  var email = document.getElementById("emailFalconi").value;
  var cargo = document.getElementById("cargoFalconi").value;
  contaFalconi.create(nome, email, cargo);
}

=======
function updateEscola(){
  
}

function insertEscola(){
  var url = "http://127.0.0.1:3080/escola/usersinsert";
  var resposta;
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, false);
  xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
  resposta = JSON.parse(xhttp.responseText);
  resposta.Instituicao = document.getElementById("instituicao");
  resposta.idRede = document.getElementById("idRede");
  resposta.Email = document.getElementById("email");
  resposta.nFuncionarios = document.getElementById("nFuncionarios");
  resposta.nAluno = document.getElementById("nAluno");
  resposta.idEndereco = document.getElementById("pais");
  // var estado = document.getElementById("estado");
  // var cidade = document.getElementById("cidade");
  // var bairro = document.getElementById("bairro");
  // var rua = document.getElementById("rua");
  // var numero = document.getElementById("numero");
  // var complemento = document.getElementById("complemento");

  // for(var i=0; i < resposta.length; i++){
  //   instituicao += i+1;
  //   instituicao += ". ";
  //   instituicao += resposta[i].Instituicao;
  //   instituicao += "</br>";
  //   endereco += resposta[i].idEndereco;
  //   endereco += "</br>";
  //   nFuncionario += resposta[i].nFuncionario;
  //   nAluno += resposta[i].nAluno;
  //   nAluno += "</br>";
  // }
  // document.getElementById("listaEscola").innerHTML = ("<center>" + instituicao + "</center>");
  // document.getElementById("listaEnderecoEscola").innerHTML = ("<center>" + endereco + "</center>");
  // document.getElementById("listanFuncAlun").innerHTML = ("<center>" + nFuncionario + "  " + nAluno + "</center>");
  //console.log(xhttp.responseText);
  }

  $(document).ready(function(){
    $('#cadastrar').click(function(){
      var instituicao = $('#instituicao')
      var idRede = $('#idRede').val();
      var email = $('#email').val();
      var nFuncionaraio = $('#nFuncionario').val();
      var nAluno = $('#nAluno').val();
      var document
    });
  });
>>>>>>> Stashed changes
