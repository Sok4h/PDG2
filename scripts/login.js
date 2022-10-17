
const btnLogin = document.querySelector("#btnLogin")

const loginEmail = document.querySelector("#loginEmail")
const passwordLogin = document.querySelector("#passwordLogin")
// const loginUser = document.querySelector("#loginUser")


auth.onAuthStateChanged(

    (user) => {

        //hay un usuario logeado
        if (user) {


            window.location.href = "dashboard.html"
            // db.collection("users").doc(user.uid).get().then((doc) => {


            //     setLoggedUser(doc.data())
            //     getCart()
            //     userLoggedIn()



            // })
        }

    })

btnLogin.addEventListener("click", () => {



    if (checkInputs()) {

        auth.signInWithEmailAndPassword(loginEmail.value, passwordLogin.value).then(
            () => {
                window.location.href = "dashboard.html"

            }
        )
            .catch((error) => {


                alert(error.message)
            })



    }
})





function checkInputs() {


    if (loginEmail.value === "" || passwordLogin.value === "") {

        return false
    } else {
        return true
    }


}