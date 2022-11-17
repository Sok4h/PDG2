
function sumAllCategories(answers) {

  console.log(answers)

  const basket = answers.reduce((basket, fruit) => {

    for (const [number, respuesta] of Object.entries(fruit)) {
      console.log(respuesta)
      if (!basket[number]) {
        basket[number] = { name: respuesta.name, value: 0 };
      }


      basket[number].value += respuesta.value;
      //console.log( basket[number].)

    }

    return basket;
  }, []);

  console.log(basket)
  return basket
}


const maximoCategoria = 35

const maximoGeneral = 315;

const maximoPregunta = 7

let listTestFinal  =[]



function getAllTests() {


  auth.onAuthStateChanged((user) => {


    if (user) {
  
      //currentUser=user
      alert("entró")
      console.log(user.uid)
  
      docRef = db.collection("surveys").where("userId", "==", user.uid)
  
      // if (testId) {
  
      //   docRef = db.collection("surveys").doc(testId)
  
      // }
      docRef.get().then((docSnapshot) => {
  
        
  
        if (!docSnapshot.empty) {
  
         
  
          //console.log(docSnapshot.data())
  
  
          //if (testId == null) {
  
            docSnapshot.forEach((doc) => {
  
              let tempTest =  doc.data()
  
              console.log(doc.id)
              tempTest.id = doc.id
              listTestFinal.push(tempTest)
  
              //currentTest = doc.data()
            })
  

        }
        else {
  
          
  
        }
  
  
      }).then(()=>{


        return listTestFinal
      })
  
    }
  })

  
}





function getColor(category) {

  switch (category) {

    case "Liderazgo": return "#0073A7"
    case "Resultados": return "#7022A8"
    case "Procesos": return "#0064EF"
    case "Recursos": return "#053AB8"
    case "Gobernanza": return "#EB0000"
    case "Clima": return "#FF981A"
    case "Estrategia": return "#D3016A"
    case "Personas": return "#058C00"
    case "Colaboración": return "#FF661A"
  }

}


function getDescriptionCategoria(){}