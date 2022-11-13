
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


let maximoCategoria = 35

let maximoGeneral = 315;

let maximoPregunta = 7

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



