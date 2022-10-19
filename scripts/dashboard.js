
//let currentUser

const dashboardBody = document.querySelector(".dashboard")
console.log(auth)
let currentTest

auth.onAuthStateChanged((user)=>{

    
    if(user){

        //currentUser=user
        console.log(user.uid)
        db.collection("surveys").where("userId","==",user.uid).limit(1).get().then((docSnapshot) => {

            //console.log(docSnapshot[0].data())
            
            
            
            if(!docSnapshot.empty){
        
                //alert("existe")
                    // currentTest= docSnapshot[0].data()
                    // console.log(currentTest)
                docSnapshot.forEach((doc) => {
                    console.log(doc.data())
                    console.log(doc.id)

                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                });

                //?testId=8INIveodekK2Fj8ObEK7
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



