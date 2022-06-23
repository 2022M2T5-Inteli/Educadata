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
}



//FUNCTION TO DISABLED THE RESULT BUTTON (HARD-CODE)

function resultsDisable(){
  const btn = document.getElementById("resultsBtn")
  var survey = 1;
  if(survey == 0){
    btn.classList.add("disabled")
  }else{
    btn.classList.remove("disabled")
  };
}




