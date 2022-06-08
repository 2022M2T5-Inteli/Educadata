function homeBtn(){
  document.getElementById("home").style.display = "block";
  document.getElementById("knowMore").style.display = "none";
}

function knowMoreBtn(){
  document.getElementById("home").style.display = "none";
  document.getElementById("knowMore").style.display = "block";
}

var modal = document.getElementById("loginModal");

// Get the button that opens the modal
var btn = document.getElementById("btn_login");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}