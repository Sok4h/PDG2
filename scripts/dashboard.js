
//let currentUser

const dashboardBody = document.querySelector(".dashboard")
const emptyDashboard = document.querySelector(".emptyDashboard")
const dashboard = document.querySelector(".dashboard__content")
const completedCard = document.querySelector("#completedCard")
console.log(auth)
let currentTest
let testAnswered
let answers=[]

dashboard.style.display="none"
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
                    currentTest=doc.data()
                    emptyDashboard.style.display="none"
                    dashboard.style.display="flex"
                     
                    
                    //obtiene respuestas

                    db.collection("answers").get().then(function(querySnapshot) {
                        console.log(querySnapshot.size);

                        querySnapshot.forEach((doc) => {

                                answers.push(doc.data())
                        })
                        testAnswered=querySnapshot.size
                    }).then(()=>{

                        loadBarChart(answers)

                        if(testAnswered!=currentTest.numberEmployers){

                            completedCard.querySelector(".card__title").textContent="En proceso"
                        }
                        completedCard.querySelector(".card__value").textContent=`${testAnswered}/${currentTest.numberEmployers}`
                    });

                    //load highlights

                    

                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                });

                //?testId=8INIveodekK2Fj8ObEK7
            }
            else{
        
               //emptyDashboard.style.display
        
            }
        
        
        })

    }

})





