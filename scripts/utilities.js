
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


function sumAllQuestions(answers) {

  console.log(answers)

  const basket = answers.reduce((basket, fruit) => {

    for (const [number, respuesta] of Object.entries(fruit)) {
      console.log(fruit)
      if (!basket[number]) {
        basket[number] = { categoria: respuesta.categoria, value: 0, name: respuesta.numeroPregunta, subcategoria: respuesta.subcategoria };
      }


      basket[number].value += parseInt(respuesta.respuesta);
      //console.log( basket[number].)

    }

    return basket;
  }, []);

  console.log(basket)
  return basket
}



function sumAllQuestionsF(answers) {

  console.log(answers)

  const basket = answers.reduce((basket, fruit) => {

    for (const [number, respuesta] of Object.entries(fruit)) {
      console.log(number)
      console.log(respuesta)

      if (!basket[respuesta.numeroPregunta]) {
        basket[number] = { categoria: respuesta.categoria, value: 1, name: respuesta.respuesta, subcategoria: respuesta.subcategoria };
      }


      basket[number].value +=1
      //console.log( basket[number].)

    }

    return basket;
  }, []);

  console.log(basket)
  return basket
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





function filterResponseByTag(areas, dataType = "", responses, tagName) {

  let areasName = areas;

  let objectArea = areasName.map(area => ({ area: area }));
  console.log(objectArea)

  //albergo toda la información que llega
  let responsesTest = responses;
  console.log(responsesTest);
  //sumar los valores que tengan la misma area
  objectArea.forEach(area => area[dataType] = responsesTest.filter(response => response[tagName] === area.area));
  console.log(objectArea)
  //filtrar los valores para tener solo los values - Ej/ hay 3 panaderos y se suman sus respuestas en un arreglo que tiene 3 arreglos internos
  objectArea.forEach(area => area[dataType] = area[dataType].map(a => a[dataType]));

  //crear un objeto con el total de respuestas
  objectArea = objectArea.map(area => ({ ...area, numberAnswer: area[dataType].length }));

  //crear un solo arreglo de values - Ej/ el arreglo anterior elimina los arreglos y sumo todos sus objetos en uno sólo, quito un nivel de profundidad
  objectArea = objectArea.map(area => ({ ...area, [dataType]: area[dataType].reduce((acc, curr) => acc.concat(curr)) }));

  //sumar los que tengan elementos repetidos dentro de arreglo de values Ej/ si es el caso, sumo los que esten repetidos y dejo un arreglo con los elementos sumdos
  objectArea = objectArea.map(area => ({
    ...area, [dataType]: Array.from(area[dataType].reduce(
      (m, { name, value }) => m.set(name, (m.get(name) || 0) + value), new Map
    ), ([name, value]) => ({ name, value }))
  }));

  console.log(objectArea);

  return objectArea;

}





function filterResponseByArea(nameArea = "", allValuesAreas = []) {
  console.log(allValuesAreas);
  let objectWithInfo = allValuesAreas.filter((value) => value.area === nameArea);
  objectWithInfo = objectWithInfo.map(info => info.values); console.log(nameArea);


  return objectWithInfo;
}

function filterResponseByParameter(nameResponse = "", dataType = "", allValuesAreas = []) {


  let objectWithInfo = allValuesAreas.map(info => ({
    area: info.area,
    value: info[dataType].filter(i => {
      return nameResponse === i.name ? i.value : "";
    }).map(d => d.value),
    numberAnswer: info.numberAnswer
  }

  ));


  objectWithInfo = objectWithInfo.map(info => ({
    name: info.area,
    value: info.value[0] / info.numberAnswer,
  }))

  return objectWithInfo;
}






const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

//console.log(randomRGB());


function getJerarquiaName(jerarquia){

  
  switch(jerarquia){

    case  "highHierarchy" : return  "Nivel superior"
    case  "midHierarchy" : return "Nivel medio"
    case  "lowHierarchy" : return  "Nivel operacional"

  }
}