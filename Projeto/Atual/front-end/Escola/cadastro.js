// FUNCTION CHANGE PAGE

//Registration page:
function cadastrarBtn(){
    document.getElementById("cadastroEscola").style.display = "none";
    document.getElementById("pagConfirmacao").style.display = "block";
  }
  
//Confirm page:
function yesBtn(){
    document.getElementById("cadastroEscola").style.display = "block";
    document.getElementById("pagConfirmacao").style.display = "none";
  }