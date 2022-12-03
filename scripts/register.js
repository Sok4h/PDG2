

const registerEmail = document.querySelector("#registerEmail")
const registerName = document.querySelector("#registerName")

const btnRegister = document.querySelector("#btnRegister")
const registerPassword = document.querySelector("#registerPassword")


btnRegister.addEventListener("click", () => {



  if (checkInputs()) {


    auth.createUserWithEmailAndPassword(registerEmail.value, registerPassword.value).then((data) => {


      let user = {
        uid: data.user.uid,
        name: registerName.value,
        email: registerEmail.value
      }

      db.collection("users").doc(user.uid).set(user).then(() => {

        window.location.href = "dashboard.html"
      })

    }).catch((error) => {


      console.log(error.message)
    })
  }
  else {

    alert("llene todos los campos")
  }

})

function checkInputs() {


  if (registerEmail.value === "" || registerName.value === "" || registerPassword.value === "") {

    return false
  } else {
    return true
  }


}