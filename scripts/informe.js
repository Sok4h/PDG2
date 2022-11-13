

const testSelect = document.querySelector("#testList")

const arrow = document.querySelector(".arrow")
const valueArrow = document.querySelector("#valueArrow")

console.log(arrow)

let testArray =[]
let answers =[]
auth.onAuthStateChanged((user) => {

    if (user) {
  
      docRef = db.collection("surveys").where("userId", "==", user.uid)
      docRef.get().then((docSnapshot) => {
  
        if (!docSnapshot.empty) {

            docSnapshot.forEach((doc) => {
  
              var opt = document.createElement('option');
              let tempTest =  doc.data()
  
              console.log(doc.id)
              tempTest.id = doc.id
              testArray.push(tempTest)
              opt.value = doc.data().name
              opt.textContent = doc.data().name
              console.log(opt)
              testSelect.appendChild(opt)
  
              //currentTest = doc.data()
            })
  
            console.log(testList.value)
  
            loadTest(testList.value)
  
            testList.addEventListener("change",()=>{
  
              loadTest(testList.value)
  
            })

        }
        else {
  
        
  
        }
  
  
      })
  
    }
  })


  function loadTest (nameTest){

    currentTest = testArray.find((e)=>{ return e.name ==nameTest})
  
    console.log(currentTest)
    console.log(nameTest)
    db.collection("answers").where("testId", "==", currentTest.id).get().then(function (querySnapshot) {
        
      
        if(querySnapshot.empty){

           // alert("vacio")
        }
      querySnapshot.forEach((doc) => {
  
        console.log(doc.data())
        answers.push(doc.data())
      })
  
    }).then(() => {
  
      console.log(answers)

  
      //listAnswers = answers

      loadInforme()
  
    });
  }

  function loadInforme(){


    // -5% para que cuadre

    let respuestas = answers

    // let respuestasFilter = answers.map((respuesta) => { return respuesta.values })

    // console.log(answers)

    // let respuestaOrdenada = sumAllCategories(respuestasFilter)
  
    // let respuestasDividas = respuestaOrdenada.map((respuesta) => {
  
    //   respuesta.value = parseInt(respuesta.value / answers.length)
    //   return respuesta
    // })

    // console.log(respuestasDividas)


    let promedio = 0

    respuestas.forEach((respuesta) => {
  
      promedio += respuesta.total
  
    })

    console.log(respuestas)
  
    promedio = promedio / respuestas.length
  
    valueArrow.textContent = Math.round(promedio * 100 / maximoGeneral) + "%"

    arrow.style.top = 100 - Math.round(promedio * 100 / maximoGeneral) - 5 +"%"




  }
  

