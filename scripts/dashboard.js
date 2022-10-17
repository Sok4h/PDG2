
let currentUser 

const dashboardBody = document.querySelector(".dashboard")
console.log(auth)


auth.onAuthStateChanged((user)=>{

    
    if(user){

        currentUser=user
        console.log(user)
        db.collection("test").doc(user.uid).get().then((doc) => {

            if(doc.exists){
        
                //alert("existe")
            }
            else{
        
                //alert("no existe")

                const div = document.createElement('div');
                div.className="emptyDashboard"
                
                div.innerHTML= ` <h2>No hay ninguna prueba</h2>
                <img src="Iconos/Iconos/emptyDashboard.png" alt="">
                <a href="test.html"><button class="btn">Crear prueba</button></a>`
                dashboardBody.append(div)
        
            }
        
        
        })

    }

})


if(user){


}



