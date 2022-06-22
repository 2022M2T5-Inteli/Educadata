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

