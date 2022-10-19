const logOut = document.querySelector(".nav__item--logout")


logOut.addEventListener("click",()=>{


    auth.signOut().then(()=>{

        window.location.href = "login.html"
    })
})