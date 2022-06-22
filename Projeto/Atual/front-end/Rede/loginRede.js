var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");
var body = document.querySelector("body");


//FUNCTION FOR OPTION TO THE MANAGER CAN ENTER
btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

//FUNCTION TO REGISTER MANAGER
btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})


//FUNCTION TO THE MANAGER ENTER
function getRede(){
  var url = "http://127.0.0.1:3080/rede/users";
  var resposta;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();//A execução do script para aqui até a requisição retornar do servidor
  resposta = JSON.parse(xhttp.responseText);
  var Email = "";
  var Rede = "";
  for(var i=0; i < resposta.length; i++){
    if(resposta[i].Email == document.getElementById("email").innerHTML && resposta[i].Rede == document.getElementById("nome").innerHTML){
      
    }
    else{
        alert("Você ainda não possui cadastro. Cadastre-se antes de entrar!")
    }
}}
