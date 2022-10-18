
//let currentUser

const dashboardBody = document.querySelector(".dashboard")
console.log(auth)


auth.onAuthStateChanged((user)=>{

    
    if(user){

        //currentUser=user
        console.log(user.uid)
        db.collection("surveys").where("userId","==",user.uid).get().then((docSnapshot) => {

            console.log(docSnapshot.empty)
            
            
            
            if(!docSnapshot.empty){
        
                //alert("existe")

                docSnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });

                
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



