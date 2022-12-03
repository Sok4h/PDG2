let testAnswered
let mergedDepartment
let mergedAttribute
const emptyDashboard = document.querySelector(".emptyDashboard")
const dashboard = document.querySelector(".dashboard__content")
dashboard.style.display = "none"
const completedCard = document.querySelector("#completedCard")
const cardAverage = document.querySelector("#cardAverage")
const cardAverageValue = cardAverage.querySelector(".card__value")
const bestAttributeValue = bestAttribute.querySelector(".card__value")
const bestAttributeName = bestAttribute.querySelector(".highlight__description")
const worstAttributeValue = worstAttribute.querySelector(".card__value")
const worstAttributeName = worstAttribute.querySelector(".highlight__description")
const btnGeneral = document.querySelector(".btnGeneral")
const cardRadarChart = document.querySelector(".sunbust__info")
const titleCardChart = cardRadarChart.querySelector(".infoTitle")
const valueCardChart = cardRadarChart.querySelector(".infoValue")
const descriptionCardChart = cardRadarChart.querySelector(".suggestion")
const levelCardChart = cardRadarChart.querySelector(".infoDescription")
const atributoContainer = document.querySelector(".atributoContainer")
const flechasAtributos = atributoContainer.querySelectorAll("path")
const graphAtributosContainer = document.querySelector(".graphAtributosContainer")
const cardEquipo = document.querySelector("#cardEquipo")
const cardJerarquia = document.querySelector("#cardJerarquia")
const testSelect = document.querySelector("#testList")
const filterchartAtributosCompletos = document.querySelector("#filterVerticalChartAtributos")
const filterChartDeparmentCompleto = document.querySelector("#filterChartDeparmentCompleto")
const filterChartAtributos =document.querySelector("#filterchartAtributos")
const filterVerticalChartDeparment = document.querySelector("#filterVerticalChartDeparment")
const filterVerticalChartJerarquia  = document.querySelector("#filterVerticalChartJerarquia")
const filterChartJerarquiaC = document.querySelector("#filterChartJerarquiaC")
const emptyResults = document.querySelector(".emptyResults")
let filterDepartamento = filterVerticalChartDeparment.querySelectorAll(".hidebox")

let filterDepartamentoC = filterChartDeparmentCompleto.querySelectorAll(".hidebox")

let filterJerarquia = filterVerticalChartJerarquia.querySelectorAll(".hidebox")
let filterJerarquiaC = filterChartJerarquiaC.querySelectorAll(".hidebox")
let dashboardContainer =  document.querySelector(".dashboardContainer")

let mergedAtributosCompletos
let mergedAtributos
let mergedDepartamentos
console.log(testSelect)

Chart.defaults.font.weight = 'bold';
console.log(completedCard)

let listAnswers
let minValue,maxValue


const cateogorias = ["Gobernanza", "Resultados", "Procesos", "Recursos", "Liderazgo", "Clima", "Estrategia", "Personas", "Colaboración"]

const rutasImagenes = ["Iconos/Iconos/gobernanza.png", "Iconos/Iconos/resultados.png", "Iconos/Iconos/procesos.png", "Iconos/Iconos/recursos.png", "Iconos/Iconos/liderazgo.png",
  "Iconos/Iconos/clima.png", "Iconos/Iconos/estrategia.png", "Iconos/Iconos/personas.png", "Iconos/Iconos/colaboracion.png"
]

let colorArrows = ["#EB0000", "#7022A8", "#0064EF", "#053AB8", "#0073A7", "#FF981A", "#D3016A", "#058C00", "#FF661A"]


let colorRadar = ['rgba(235,0,0,0.5)', 'rgba(112,34,168,0.5)', 'rgba(0,100,239,0.5)', 'rgba(5,58,184,0.5)', 'rgba(0,115,167,0.5)', 'rgba(255,152,26,0.5)', 'rgba(211,1,106,0.5)', 'rgba(5,140,0,0.5)', 'rgba(255, 102, 26,0.5)']

const proficiencyContainer = document.querySelector(".proficiencyContainer")

const complexChart = document.querySelector(".complexChart")
let colorsDepartment = ["#721F5A", "#F73D79", "#761AC1", "#3FA39C", "#4F6946", "#AB2408"]

let currentTest
// por departamento




let testArray = []
let docRef
let answers = []

auth.onAuthStateChanged((user) => {


  if (user) {

    //currentUser=user
    console.log(user.uid)

    docRef = db.collection("surveys").where("userId", "==", user.uid)

  
    docRef.get().then((docSnapshot) => {



      if (!docSnapshot.empty) {

        emptyDashboard.style.display = "none"
        dashboard.style.display = "flex"

        docSnapshot.forEach((doc) => {

          var opt = document.createElement('option');
          let tempTest = doc.data()

          console.log(doc.id)
          tempTest.id = doc.id
          testArray.push(tempTest)
          opt.value = doc.data().testName
          opt.textContent = doc.data().testName
          console.log(opt)
          testSelect.appendChild(opt)

          //currentTest = doc.data()
        })

        console.log(testList.value)

        loadTest(testList.value)

        testList.addEventListener("change", () => {

          loadTest(testList.value)

        })

      }
      else {

        emptyDashboard.style.display = flex

      }


    })

  }
})

// carga el test seleccionado cuando se actualiza el valor del selector
function loadTest(nameTest) {

  console.log(nameTest)
  currentTest = testArray.find((e) => { return e.testName == nameTest })

  console.log(currentTest)
  console.log(nameTest)
  db.collection("answers").where("testId", "==", currentTest.id).get().then(function (querySnapshot) {


    if(querySnapshot.empty){
      emptyResults.style.display = "flex"
      dashboardContainer.style.display ="none"
      return
    }

    dashboardContainer.style.display ="flex"
    emptyResults.style.display = "none"
    querySnapshot.forEach((doc) => {

      console.log(doc.data())
      answers.push(doc.data())
    })

  }).then(() => {

    ///Carga principal de toda la info
    console.log(answers)

    listAnswers = answers
    atributoContainer.setAttribute("value", 0)
    updateCardAtributos()
    loadRadarChart(answers)
 

    

    setTimeout(() => {
      cardEquipo.setAttribute("value", 0)
      loadTeams()
    }, 1)
    
    cardJerarquia.setAttribute("value", 0)

    setTimeout(() => {
      console.log("Delayed for 1 second.");
      loadJerarquia()
    }, 1)
  


  });
}


//Boton que regresa a general en el radar chart
btnGeneral.addEventListener("click", () => {

  loadRadarChart(listAnswers)

  btnGeneral.classList.add("gone")
  radarChart.config.data.datasets[0].backgroundColor = 'rgb(29, 29, 29,0.5)'
  radarChart.update()


})




function loadTeams() {

  let arrows = cardEquipo.querySelectorAll("svg")

  console.log(currentTest)
  
  let atributoTitle = cardEquipo.querySelector(".atributoTitle")
  let valueEquipo = parseInt(cardEquipo.getAttribute("value"))
  
  console.log(valueEquipo)


  

  arrows.forEach((btn) => {

    btn.addEventListener("click", () => {

      console.log(valueEquipo)
      if (btn.classList.contains("add")) {


        if (valueEquipo == currentTest.departments.length - 1) {


          valueEquipo = 0
        }

        else {

          valueEquipo += 1
        }

      }

      if (btn.classList.contains("less")) {


        if (valueEquipo == 0) { valueEquipo = currentTest.departments.length - 1 }

        else {

          valueEquipo -= 1
        }
      }

      console.log(valueEquipo)
      cardEquipo.setAttribute("value", valueEquipo)
      atributoTitle.textContent = currentTest.departments[valueEquipo]

      setTimeout(() => {
        loadChartDepartment(currentTest.departments[valueEquipo])
      }, 1)
      
      

      

    })
    
  })

 // cardEquipo.setAttribute("value", test)
  console.log(valueEquipo)
   atributoTitle.textContent = currentTest.departments[valueEquipo]
 
   //cardEquipo.setAttribute("value", test)

   setTimeout(() => {
    loadChartDepartment(currentTest.departments[valueEquipo])
  }, 1)
  

}




function loadJerarquia() {

  //let
  console.log(currentTest)
  let arrows = cardJerarquia.querySelectorAll("svg")

  //cardEquipo


  console.log(arrows)
  let atributoTitle = cardJerarquia.querySelector(".atributoTitle")
  let valueJerarquia = parseInt(cardJerarquia.getAttribute("value"))

  arrows.forEach((btn) => {

    btn.addEventListener("click", () => {


      if (btn.classList.contains("add")) {


        if (valueJerarquia == jerarquias.length - 1) {


          valueJerarquia = 0
        }

        else {

          valueJerarquia += 1
        }

      }

      if (btn.classList.contains("less")) {


        if (valueJerarquia == 0) { valueJerarquia = jerarquias.length - 1 }

        else {

          valueJerarquia -= 1
        }
      }


      cardJerarquia.setAttribute("value", valueJerarquia)
      atributoTitle.textContent = jerarquias[valueJerarquia]

      //console.log(jerarquias[test])
      loadChartJerarquia(jerarquias[valueJerarquia])

    })

  })

  atributoTitle.textContent = jerarquias[valueJerarquia]

  loadChartJerarquia(jerarquias[valueJerarquia])


}



function loadChartDepartment(department) {

  console.log(department)

  let value = parseInt(cardEquipo.getAttribute("value"))

  console.log(value)

  let filter = listAnswers.filter((a) => { return a.area == department })

  console.log(filter)
  let respuestasFilter = filter.map((respuesta) => { return respuesta.values })

  let respuestaOrdenada = sumAllCategories(respuestasFilter)

  console.log(respuestaOrdenada)

  respuestaOrdenada.map((e) => { e.value = parseInt((e.value / filter.length)*100/maximoCategoria), e.background = getColor(e.name)
  return e})
  console.log(respuestaOrdenada)

  //sortBarChart("0", respuestaOrdenada, vChartEquipoCompleto)

  let xd = respuestaOrdenada.sort(function (a, b) {
    return parseInt(b.value) - parseInt(a.value);
  });
  console.log(xd)
  console.log(respuestaOrdenada)
  let mergedDepartamentos = xd.slice(0, 4)

  sortBarChart("0", mergedDepartamentos, vChartEquipo) 
  sortBarChart("0", xd, vChartEquipoCompleto)


  vChartEquipoCompleto.update()
  vChartEquipo.update()

  console.log(filterDepartamento)
  filterChart(filterDepartamento,mergedDepartamentos,vChartEquipo)
  
   filterChart(filterDepartamentoC,xd,vChartEquipoCompleto)

  let promedio = 0

  filter.forEach((e) => {


    promedio += e.total
  })

  promedio = promedio / filter.length

  let valueEquipo = cardEquipo.querySelector(".atributoValue")
  let valueName = cardEquipo.querySelector(".atributoProficiency")
  let description = cardEquipo.querySelector(".atributoDescription")

  valueName.textContent = getProficiencyName(parseInt(promedio * 100 / maximoGeneral))
  valueEquipo.textContent = parseInt(promedio * 100 / maximoGeneral) + "%"
  description.textContent = getDescriptionTeam(getProficiencyName(parseInt(promedio * 100 / maximoGeneral)))

  let titleEquipo = document.querySelector("#titleEquipo")
  titleEquipo.textContent = department



}


function getJerarquia(jerarquia){

  
  switch(jerarquia){

    case "Nivel superior": return "highHierarchy"
    case "Nivel medio": return "midHierarchy"
    case "Nivel operacional": return "lowHierarchy"

  }
}

function loadChartJerarquia(jerarquia) {


  let filter = listAnswers.filter((a) => { return a.jerarquia == jerarquia })

  console.log(filter)
  let respuestasFilter = filter.map((respuesta) => { return respuesta.values })

  let respuestaOrdenada = sumAllCategories(respuestasFilter)

  respuestaOrdenada.map((e) => { e.value = parseInt(((e.value / filter.length)*100)/maximoCategoria), e.background = getColor(e.name) })
  sortBarChart("0", respuestaOrdenada, vChartJerarquiaCompleto)

  let ordenado = respuestaOrdenada.sort(function (a, b) {
    return parseInt(b.value) - parseInt(a.value);
  });

  let slice = ordenado.slice(0, 4)


  filterChart(filterJerarquia, slice,vChartJerarquia)
  filterChart(filterJerarquiaC,ordenado,vChartJerarquiaCompleto)


  sortBarChart("0", slice, vChartJerarquia)


  let promedio = 0

  filter.forEach((e) => {


    promedio += e.total
  })

  promedio = promedio / filter.length

  let valueEquipo = cardJerarquia.querySelector(".atributoValue")
  let proficiencyName = cardJerarquia.querySelector(".atributoProficiency")
  console.log(promedio)
  valueEquipo.textContent = parseInt(promedio * 100 / maximoGeneral) + "%"

  proficiencyName.textContent = getProficiencyName(parseInt(promedio * 100 / maximoGeneral))


  let titleEquipo = document.querySelector("#titleJerarquia")
  let titleEquipoCompleto = document.querySelector("#titleJerarquiaCompleto")
  let description = cardJerarquia.querySelector(".atributoDescription")

  titleEquipo.textContent = jerarquia
  titleEquipoCompleto.textContent = jerarquia

  description.textContent = getDescriptionJerarquia(getProficiencyName(parseInt(promedio * 100 / maximoGeneral)))



}












//maneja clicks card atributos 

console.log(flechasAtributos)
let btnAtributos = atributoContainer.querySelectorAll("svg")


btnAtributos.forEach((btn) => {

  btn.addEventListener("click", () => {

    let test = parseInt(atributoContainer.getAttribute("value"))

    console.log(test)
    if (btn.classList.contains("add")) {

      if (test == 8) {


        test = 0
      }

      else {

        test += 1
      }

    }

    if (btn.classList.contains("less")) {


      if (test == 0) { test = 8 }

      else {

        test -= 1
      }
    }
    atributoContainer.setAttribute("value", test)
    updateCardAtributos()
  })
})


function updateCardAtributos() {

  let test = parseInt(atributoContainer.getAttribute("value"))

  let img = atributoContainer.querySelector("img")

  let atributoTitle = atributoContainer.querySelector(".atributoTitle")

  let btnDetalles = atributoContainer.querySelector("button")

  let atributoValue = atributoContainer.querySelector(".atributoValue")

  let atributoProficiency = atributoContainer.querySelector(".atributoProficiency")



  console.log(atributoTitle)
  img.src = rutasImagenes[test]

  flechasAtributos.forEach((flecha) => {


    flecha.style.fill = colorArrows[test]
  })

  atributoTitle.style.color = colorRadar[test]
  atributoTitle.textContent = cateogorias[test]

 // btnDetalles.style.borderColor = colorArrows[test]

  console.log(listAnswers)
  let respuestasFilter = listAnswers.map((respuesta) => { return respuesta.values })
console.log(respuestasFilter)
  let respuestaOrdenada = sumAllCategories(respuestasFilter)



  console.log(respuestaOrdenada)
  let respuestasDividas = respuestaOrdenada.map((respuesta) => {

    respuesta.value = respuesta.value / listAnswers.length
    return respuesta
  })

  console.log(cateogorias[test])

  console.log(respuestasDividas)

  respuestasDividas.forEach((a) => {

    console.log(a.name)
    console.log(cateogorias[test])
    console.log(a.name == cateogorias[test])
  })
  let filter = respuestasDividas.filter((e) => { return e.name == cateogorias[test] })
  console.log(filter)
  //console.log(respuestasDividas)

  let percentage = filter[0].value
  atributoValue.textContent = parseInt((percentage * 100) / maximoCategoria) + "%"

  atributoProficiency.textContent=getProficiencyName(parseInt((percentage * 100) / maximoCategoria))
  loadChartAtributos(cateogorias[test])
}

function loadChartAtributos(atributo) {

  console.log(atributo)
  console.log(listAnswers)

  let title = graphAtributosContainer.querySelector(".title")
  console.log(title)
  let index = cateogorias.indexOf(atributo)
  title.textContent = atributo
  title.style.color = colorRadar[index]

  let filter = listAnswers.map((a) => { return a.respuestas })

  console.log(filter)
  //let prueba = sumAllSubCategories(filter)

  //console.log(prueba)

  let filtrado = filter.map((e) => {

    let filtradoFinal = e.filter((x) => {

      return x.categoria == atributo
    })
    return filtradoFinal

  }

  )

  console.log(filtrado)

  let sumados = sumAllQuestions(filtrado)
  console.log(sumAllQuestions(filtrado))

  let respuestasDivididas = sumados.map((e) => {

    e.value = e.value / listAnswers.length

    return e
  })

  console.log(respuestasDivididas)

  let names = respuestasDivididas.map((e) => {

    return "Pregunta " + e.numeroPregunta
  })

  let merged = respuestasDivididas.map((e) => {

    e.background = getColor(e.categoria)
    e.name = " Pregunta " + e.name
    e.value = parseInt(e.value*100/maximoPregunta)

    return e
  })

  console.log(names)

  mergedAtributos = merged
  //atributosChart.config.data.labels = names


  sortBarChart("0", merged, atributosChart)
}








function loadHighlights(test, respuestas) {

  let numeroRespuestas = answers.length

  console.log(numeroRespuestas)


  if (numeroRespuestas != test.numberEmployers) {

    completedCard.querySelector(".card__title").textContent = "En proceso"
  }
  completedCard.querySelector(".card__value").textContent = `${numeroRespuestas}/${test.numberEmployers}`

  let promedio = 0

  respuestas.forEach((respuesta) => {

    promedio += respuesta.value

  })

  promedio = promedio / 9

  cardAverageValue.textContent = parseInt(promedio) + "%"

 

  //Muestra valor mas bajo

  worstAttributeName.textContent = minValue.name
  worstAttributeValue.textContent = minValue.value + "%"

  //actualiza la card del radar con el mas bajo
  titleCardChart.textContent = minValue.name
  titleCardChart.style.color = getColor(minValue.name)
  levelCardChart.style.color = getColor(minValue.name)
  levelCardChart.textContent = getProficiencyName(minValue.value)

  valueCardChart.textContent = minValue.value  + "%"



  bestAttributeName.textContent = maxValue.name

  bestAttributeValue.textContent = maxValue.value  + "%"

  const proficiencyAverage = document.querySelector(".proficiency__view")

  const proficiencyValue = proficiencyAverage.querySelector(".infoValue")
  const proficiencyDescription = proficiencyAverage.querySelector(".descriptionProfiency")

  console.log(proficiencyDescription)
  let proficiency = parseInt(promedio)
  proficiencyValue.textContent = proficiency + "%"

  const proficiencyGrade = proficiencyAverage.querySelector(".infoDescription")

  proficiencyGrade.textContent = getProficiencyName(proficiency)

  proficiencyDescription.textContent = getProficiencyDescription(proficiency)



  // carga tabla 

  proficiencyContainer.innerHTML=""
  respuestas.forEach((respuesta) => {

 
    let div = document.createElement("div")
    div.classList.add("proficiency")
    div.innerHTML = `<p class="proficiencyName">${respuesta.name}</p>
                    <p class="proficiencyPercentage">${respuesta.value}%</p>
                    <p class="proficiencyGrade">${getProficiencyName(respuesta.value)}</p>`

    proficiencyContainer.appendChild(div)
  })

}






//updateRadarChart("Estrategias")
function updateRadarChart(category) {


  if (!cateogorias.includes(category)) return
  let filtrado = []

  btnGeneral.classList.remove("gone")
  cardRadarChart.style.display = "flex"

  filtrado = answers.map((respuesta) => { return respuesta.subCategorias })

  console.log(filtrado)
  
  let arregloFinal = []

  console.log(arregloFinal.length)

  //descriptionCardChart
  //valueCardChart
  let filtrado2 = filtrado.filter((a)=> a.name == category)

  console.log(filtrado2)



  //console.log(filtrado)
  let prueba = sumAllSubCategories(filtrado)  
  console.log(prueba)
  prueba.forEach((prueba) => { prueba.value = (prueba.value / answers.length) })

  console.log(prueba)

  arregloFinal = prueba.filter((a) => a.categoria == category)
  
  console.log(arregloFinal)

  let promedioCategoria
  let sumaCategoria = 0
  arregloFinal.forEach((respuesta) => {

    console.log(respuesta.value)
    console.log(respuesta.value*100/7)
    
    sumaCategoria += respuesta.value
    respuesta.name = splitString(respuesta.name,1)
     respuesta.value =respuesta.value*100/7

  })



  console.log(sumaCategoria)

  promedioCategoria = parseInt((sumaCategoria * 100) / maximoCategoria)

  console.log(promedioCategoria)

  valueCardChart.textContent = promedioCategoria + "%"

  //actualiza card radarChart
  titleCardChart.textContent = category

  let colorText = getColor(category)
  titleCardChart.style.color = colorText
  levelCardChart.style.color = colorText

  console.log(promedioCategoria)

  levelCardChart.textContent = getProficiencyName(promedioCategoria)


  let names = arregloFinal.map((x) => { return x.name })
  radarChart.config.data.datasets[0].label = category


  console.log(names)
  //radarChart.config.data.labels = names

  //radarChart.config.options.scales.r.max = maximoPregunta

  radarChart.config.data.datasets[0].data = arregloFinal

  let index = cateogorias.indexOf(category);

  arregloFinal.forEach((e) => { e.background = colorRadar[index], e.value = parseInt(e.value) })

  //radarChart.config.data.datasets[0].backgroundColor = colorArrows[index]
  radarChart.update()
  console.log(arregloFinal)

  sortBarChart("0", arregloFinal, radarChart)

}

//funcion que añade un salto de linea a los titulos largos en el radar chart
const splitString = (text, chunkSize) => {
  const arr = text.split(" ")
  const output = []

  for (let i = 0, length = arr.length; i < length; i += chunkSize) {
      output.push(arr.slice(i, i + chunkSize))
  }

  return output
}

function loadRadarChart(answers) {


    console.log(answers.length)

  let valores = answers.map((e)=> {return e.values})

  let sumado = sumAllCategories(valores)

  
  
  let mapeado =sumado.map((a)=>{

    console.log(a)
    a.value = parseInt((a.value/answers.length) *100 / maximoCategoria)
    return a
  })

  console.log(mapeado)


 minValue = mapeado.reduce((previous, current) => {
  return current.value < previous.value ? current : previous;
});

 maxValue = mapeado.reduce((previous, current) => {
  return current.value > previous.value ? current : previous;
});

  bestAttributeValue.textContent = maxValue.value +"%"
  bestAttributeName.textContent = maxValue.name

  worstAttributeName.textContent= minValue.name 
  worstAttributeValue.textContent = minValue.value +"%"

  radarChart.config.data.labels = cateogorias
  radarChart.config.data.datasets[0].label = "Puntaje General"

  sortBarChart("0", mapeado, radarChart)

  let hdata = mapeado.map((e)=> {e.background= getColor(e.name) 
  
    return e
  })
  sortBarChart("0",hdata,HorizontalChart)

  mergedAtributosCompletos = hdata
 
  sortBarChart("0", hdata , vChartAtributos)

 

  loadHighlights(currentTest, hdata)

  updateCardAtributos(hdata)
}



let filterAtributosCompletos = filterchartAtributosCompletos.querySelectorAll(".hidebox")


for (let i = 0; i < filterAtributosCompletos.length; i++) {

  filterAtributosCompletos[i].addEventListener("click", () => {

    filterAtributosCompletos[i].classList.add("seleccionado")
    console.log(mergedAtributosCompletos)

    console.log(dataVerticalAtributos.datasets[0])
    sortBarChart(filterAtributosCompletos[i].value, mergedAtributosCompletos, vChartAtributos)
  })

}


let filterAtributos = filterChartAtributos.querySelectorAll(".hidebox")


for (let i = 0; i < filterAtributos.length; i++) {

  filterAtributos[i].addEventListener("click", () => {

    console.log(filterAtributos[i].value)

    filterAtributos[i].classList.add("seleccionado")
    console.log(mergedAtributosCompletos)

    console.log(dataVerticalAtributos.datasets[0])
    sortBarChart(filterAtributos[i].value, mergedAtributos, atributosChart)
  })

}


function filterChart(arreglo,data,chart) {


  console.log(data)
  console.log(chart)
  for (let i = 0; i < arreglo.length; i++) {

    arreglo[i].addEventListener("click", () => {
  
      arreglo[i].classList.add("seleccionado")
      console.log(mergedAtributosCompletos)
  
      console.log(dataVerticalAtributos.datasets[0])
      sortBarChart(arreglo[i].value, data, chart)
    })
  
  }


}



// 0 descente 1 ascendente 2 alfabetico
function sortBarChart(order, data, chart) {

  console.log(chart)
  let dataSort = []

  console.log(data)

  let sValue = []
  let sName = []
  let Scolor = []

  //console.log(color)
  switch (order) {


    case "0": {

      dataSort = data.sort(function (a, b) {

        console.log(a)
        return b.value - a.value
      })

      break;

    }

    case "1": {

      dataSort = data.sort(function (a, b) {

        console.log(a)
        return a.value - b.value
      })
      break;


    }


    case "2": {

      dataSort = data.sort(function (a, b) {

        console.log(a)
        return a.name.localeCompare(b.name)
      })
      break;


    }
  }

  for (let i = 0; i < dataSort.length; i++) {

    sValue.push(dataSort[i].value)
    sName.push(dataSort[i].name)
    Scolor.push(dataSort[i].background)
    console.log(Scolor[i])
    
  }

  console.log(dataSort)
  console.log(colorsDepartment)
  console.log(dataSort)
  console.log(Scolor)
  console.log(sName)


  //console.log(chart)

  chart.config.data.datasets[0].data = sValue
  chart.config.data.labels = sName
  chart.config.data.datasets[0].backgroundColor = Scolor
  chart.update()
}



