var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})

// FUNCTION AJAX INSERT
function insertFalconi(){
    $.ajax({
        url: "http://127.0.0.1:3080/falconi/userinsert",
        type: 'POST',
        async: false,
        data: {
            Nome: $("#nome").val(),
            Email: $("#email").val(),
            Cargo: $("#cargo").val()
        }
    }) };