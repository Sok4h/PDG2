
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


const jerarquias = ["Nivel administrativo", "Nivel estratégico", "Nivel conocimiento", "Nivel operacional"]

const maximoCategoria = 35

const maximoGeneral = 315;

const maximoPregunta = 7

let listTestFinal = []



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

            let tempTest = doc.data()

            console.log(doc.id)
            tempTest.id = doc.id
            listTestFinal.push(tempTest)

            //currentTest = doc.data()
          })


        }
        else {



        }


      }).then(() => {


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

  const infoAnswers = answers.map(ans => ans[0]);


  const dataTest = infoAnswers.reduce((acc, object) => {
    console.log(acc)
    if (acc.find(obj => obj.name === object.respuesta)) {
      return acc.map(obj => obj.name === object.respuesta ? { ...obj, value: obj.value += 1 } : obj)
    } else {

      acc.push({
        name: object.respuesta,
        value: 1,
        background: object.background
      })

    }
    return acc;
  }, []);

  return dataTest;
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


function getDescriptionCategoria() { }


function getDescriptionTeam(nivel) {

  switch (nivel) {


    case "Principiante": return "Este equipo tiene problemas en entender e implementar los valores que la compañía quiere que sean parte esencial para una mejor cultura organizacional, también puede que no entiendan la importancia de los cambios que se buscan hacer"
    case "Competente": return "Este equipo está implementando los valores que harán a su equipo ser un espacio de crecimiento que permitirá a la organización ser mejor, todavía se tienen que arreglar algunos detalles para ser excelentes."
    case "Proficiente" : return "Este equipo está efectivamente implementando los valores que harán crecer a la compañía, el equipo entiende la importancia de los valores que se buscan, como implementarlos y como transmitirlos a todos los miembros del equipo"  
    case "Experto" :return "El equipo es un ejemplo a seguir sobre como deberían ser los departamentos en las compañías, sobresalen por su interés y voluntad a trabajar y contribuir a un mejor espacio de trabajo."
    
  }

}



function getDescriptionJerarquia(nivel) {

  switch (nivel) {


    case "Principiante": return "Este sector de la compañía tiene problemas con los valores que la compañía quiere representar y como sus esfuerzos aportan a un mejor espacio de trabajo."
    case "Competente": return "Este sector de la compañía, entiende los valores que la compañía trata de transmitir a todos los niveles, pero sufre un poco en la ejecución."  
    case "Proficiente" : return "Este sector de la compañía, aplica de forma efectiva los valores que quiere ver en toda la compañía, los aplica cuando es posible, siempre trata de mejorar y ser flexibles cuando la situación lo requiere."  
    case "Experto" :return "El equipo es un ejemplo a seguir sobre como deberían ser los departamentos en las compañías, sobresalen por su interés y voluntad a trabajar y contribuir a un mejor espacio de trabajo."
    
  }

}


const canvasBackgroundColor={

  id:'canvasBackgroundColor',
  beforeDraw(chart,args,pluginOptions){

    const {ctx,chartArea:{top,bottom,left,right,width},scales:{x,y} } = chart


    bgColors(0,60,"#E6E6E6")
    bgColors(60,75,"#D9D9D9")
    bgColors(75,90,"#D1D1D1")
    bgColors(90,100,"#CACACA")



    function bgColors(bracketLow,bracketHigh,color){
      ctx.fillStyle =color;

      ctx.fillRect(left,y.getPixelForValue(bracketHigh),width,y.getPixelForValue(bracketLow)-y.getPixelForValue(bracketHigh))
    }
    

  }
}


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


function getJerarquiaName(jerarquia) {


  switch (jerarquia) {

    case "highHierarchy": return "Nivel administrativo"
    case "midHierarchy": return "Nivel estratégico"
    case "lowHierarchy": return "Nivel conocimiento"
    case "lowestHierarchy": return "Nivel operacional"

  }
}