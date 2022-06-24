var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");
var body = document.querySelector("body");

//FUNCTION FOR THE MANAGER TO ENTER
btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

//FUNCTION TO REGISTER MANAGER
btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})

//FUNCTION AJAX - INSERT
function insertEscola(){

    $.ajax({
        url: "http://127.0.0.1:3080/endereco/userinsert",
        type: 'POST',
        async: false,
        data: {
            idCEP: $("#cepCadastro").val(),
            Pais: $("#pais").val(),
            Estado: $("#estado").val(),
            Cidade: $("#cidade").val(),
            Bairro: $("#bairro").val(),
            Rua: $("#rua").val(),
            Numero: $("#numero").val(),
            Complemento: $("#complemento").val(),
        }
    })

    $.ajax({
        url: "http://127.0.0.1:3080/escola/userinsert",
        type: 'POST',
        async: false,
        data: {
            Instituicao: $("#nomeEscolaCadastro").val(),
            nAluno: $("#nAlunoCadastro").val(),
            nFuncionario: $("#nFuncionarioCadastro").val(),
            idRede: $("#redeID").val(),
            idCEP: $("#cepCadastro").val(),
            Email: $("#emailInstitucionalCadastro").val(),
        }
    }) 
};