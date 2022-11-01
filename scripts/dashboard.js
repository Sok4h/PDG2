
//let currentUser

const dashboardBody = document.querySelector(".dashboard")
const emptyDashboard = document.querySelector(".emptyDashboard")
const dashboard = document.querySelector(".dashboard__content")
const completedCard = document.querySelector("#completedCard")
const cardAverage = document.querySelector("#cardAverage")
const cardAverageValue = cardAverage.querySelector(".card__value")
const bestAttribute = document.querySelector("#bestAttribute")
const worstAttribute = document.querySelector("#worstAttribute")

const proficiencyContainer= document.querySelector(".proficiencyContainer")
const bestAttributeValue = bestAttribute.querySelector(".card__value")
const bestAttributeName = bestAttribute.querySelector(".highlight__description")

const worstAttributeValue = worstAttribute.querySelector(".card__value")
const worstAttributeName = worstAttribute.querySelector(".highlight__description")
let currentTest
let testAnswered
let answers2=[]


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

                                answers2.push(doc.data())
                        })
                        testAnswered=querySnapshot.size
                    }).then(()=>{

                        //loadBarChart(answers)

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

                // //console.log(totalValue)
                // cardAverageValue.textContent= Math.round(totalValue *100/4500) +"%" 

                // bestAttributeValue.textContent= Math.round(dataSorted[0].value *100/500) +"%"
                // bestAttributeName.textContent=dataSorted[0].name

                // console.log(dataSorted[dataSorted.length-1])
                
                // worstAttributeValue.textContent= Math.round(dataSorted[dataSorted.length-1].value *100/500) +"%"
                // worstAttributeName.textContent=dataSorted[dataSorted.length-1].name


                // //console.log(dataSorted)
                // dataSorted.forEach((xd)=>{  

                //     let proficiency     
                //     console.log(xd)
                //     let percentage =Math.round(xd.value*100/500)
                //     console.log(percentage)
                //     if(percentage<=20) proficiency="principiante"

                //     if(percentage>20&&percentage<80) proficiency="competente"

                //     if(percentage>80) proficiency="proficiente"


                //     let div = document.createElement("div")
                //     div.classList.add("proficiency")
                //     div.innerHTML=`<p class="proficiencyName">${xd.name}</p>
                //     <p class="proficiencyPercentage">${percentage}%</p>
                //     <p class="proficiencyGrade">${proficiency}</p>`
                    
                //     proficiencyContainer.appendChild(div)
                // })

            }
            else{
        
               //emptyDashboard.style.display
        
            }
        
        
        })

    }

})





