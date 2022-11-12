let dataChart;
//let filter = "Estrategia"
let testAnswered
let mergedDepartment
let mergedAttribute
const formDepartment = document.querySelector("#filterChartByDepartment")
const filterDepartment = formDepartment.querySelectorAll(".hidebox")
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
const graphByArea = document.querySelector("#graphByArea")
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
const cardJerarquia =document.querySelector("#cardJerarquia")

const jerarquias =["Nivel superior","Nivel medio","Nivel operacional"]

//cardRadarChart.style.display="none"


console.log(completedCard)

let listAnswers



const cateogorias = ["Gobernanza", "Resultados", "Procesos", "Recursos", "Liderazgo", "Clima", "Estrategia", "Personas", "Colaboración"]

const rutasImagenes = ["Iconos/Iconos/gobernanza.png", "Iconos/Iconos/resultados.png", "Iconos/Iconos/procesos.png", "Iconos/Iconos/recursos.png", "Iconos/Iconos/liderazgo.png",
  "Iconos/Iconos/clima.png", "Iconos/Iconos/estrategia.png", "Iconos/Iconos/personas.png", "Iconos/Iconos/colaboracion.png"
]

let colorArrows = ["#EB0000", "#7022A8", "#0064EF", "#053AB8", "#0073A7", "#FF981A", "#D3016A", "#058C00", "#FF661A"]


let colorRadar = ['rgba(235,0,0,0.5)', 'rgba(112,34,168,0.5)', 'rgba(0,100,239,0.5)', 'rgba(5,58,184,0.5)', 'rgba(0,115,167,0.5)', 'rgba(255,152,26,0.5)', 'rgba(211,1,106,0.5)', 'rgba(5,140,0,0.5)', 'rgba(255, 102, 26,0.5)']



const proficiencyContainer = document.querySelector(".proficiencyContainer")

const complexChart = document.querySelector(".complexChart")

const flechaXd = complexChart.querySelectorAll("#pruebaFlecha")



let colorsDepartment = ["#721F5A", "#F73D79", "#761AC1", "#3FA39C", "#4F6946", "#AB2408"]


//let categorias = ["Estrategia", "Gobernanza", "Clima"]


//flechaXd.style.fill="#FF661A"
let currentTest
// por departamento

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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const testId = urlParams.get('testId')
console.log(testId)

let docRef
let answers = []

auth.onAuthStateChanged((user) => {


  if (user) {

    //currentUser=user
    console.log(user.uid)

    docRef = db.collection("surveys").where("userId", "==", user.uid).limit(1)

    if (testId) {

      docRef = db.collection("surveys").doc(testId)

    }
    docRef.get().then((docSnapshot) => {


      if (!docSnapshot.empty) {

        emptyDashboard.style.display = "none"
        dashboard.style.display = "flex"

        //console.log(docSnapshot.data())


        if (testId == null) {

          docSnapshot.forEach((doc) => {


            console.log(doc.data())
            currentTest = doc.data()



            db.collection("answers").where("testId", "==", doc.id).get().then(function (querySnapshot) {

              querySnapshot.forEach((doc) => {

                answers.push(doc.data())
              })

            }).then(() => {

              console.log(answers)

              listAnswers = answers
              loadBarChart(answers)
              loadBestAttributes(answers)
              loadRadarChart(answers)
              loadHighlights(currentTest, answers)
              //updateRadarChart(cateogorias[0])
              loadTeams()
              loadJerarquia()


            });
          })


        }

        else {

          currentTest = docSnapshot.data()
          db.collection("answers").where("testId", "==", docSnapshot.id).get().then(function (querySnapshot) {

            querySnapshot.forEach((doc) => {

              answers.push(doc.data())
            })

          }).then(() => {

            console.log(answers)
            listAnswers = answers
            atributoContainer.setAttribute("value", 0)
            updateCardAtributos()

            loadBarChart(answers)
            loadBestAttributes(answers)
            loadRadarChart(answers)
            loadHighlights(currentTest, answers)

            loadTeams()
            loadJerarquia()
            //updateRadarChart(cateogorias[0])


          });

        }

        //obtiene respuestas



        //?testId=8INIveodekK2Fj8ObEK7
      }
      else {

        emptyDashboard.style.display = flex

      }


    })

  }
})



btnGeneral.addEventListener("click", () => {

  loadRadarChart(listAnswers)

  btnGeneral.classList.add("gone")
  //cardRadarChart.style.display="none"
  radarChart.config.options.scales.r.max = maximoCategoria

  radarChart.config.data.datasets[0].backgroundColor = 'rgb(29, 29, 29,0.5)'
  radarChart.update()


})



cardEquipo.setAttribute("value", 0)

cardJerarquia.setAttribute("value", 0)

function loadTeams() {

  let arrows = cardEquipo.querySelectorAll("svg")

  //let
  console.log(currentTest)
  //cardEquipo


  console.log(arrows)
  let atributoTitle = cardEquipo.querySelector(".atributoTitle")
  let test = parseInt(cardEquipo.getAttribute("value"))



  arrows.forEach((btn) => {

    btn.addEventListener("click", () => {

      //alert("xdd")
      if (btn.classList.contains("add")) {


        if (test == currentTest.departments.length-1) {


          test = 0
        }

        else {

          test += 1
        }

      }

      if (btn.classList.contains("less")) {


        if (test == 0) { test = currentTest.departments.length-1 }

        else {

          test -= 1
        }
      }

      
      cardEquipo.setAttribute("value", test)
      atributoTitle.textContent = currentTest.departments[test]

      loadChartDepartment(currentTest.departments[test])

    })

  })

  atributoTitle.textContent = currentTest.departments[test]

  loadChartDepartment(currentTest.departments[test])


}



function loadJerarquia() {

  //let
  console.log(currentTest)
  let arrows = cardJerarquia.querySelectorAll("svg")

  //cardEquipo


  console.log(arrows)
  let atributoTitle = cardJerarquia.querySelector(".atributoTitle")
  let test = parseInt(cardJerarquia.getAttribute("value"))



  arrows.forEach((btn) => {

    btn.addEventListener("click", () => {

     
      if (btn.classList.contains("add")) {


        if (test == jerarquias.length-1) {


          test = 0
        }

        else {

          test += 1
        }

      }

      if (btn.classList.contains("less")) {


        if (test == 0) { test = jerarquias.length-1 }

        else {

          test -= 1
        }
      }

      
      cardJerarquia.setAttribute("value", test)
      atributoTitle.textContent = jerarquias[test]

      loadChartJerarquia(jerarquias[test])

    })

  })

  atributoTitle.textContent = jerarquias[test]

  loadChartJerarquia(jerarquias[test])


}



function loadChartDepartment(department){

    console.log(cateogorias)


    let filter = listAnswers.filter((a) => { return a.area==department })

    console.log(filter)
    let respuestasFilter = filter.map((respuesta) => { return respuesta.values })

    let respuestaOrdenada = sumAllCategories(respuestasFilter)

    respuestaOrdenada.map((e)=>{e.value = parseInt(e.value/filter.length) , e.background=getColor(e.name)})
    sortBarChart("0",respuestaOrdenada,vChartEquipoCompleto)

    let xd = respuestaOrdenada.sort(function(a, b) {
      return parseInt(b.value) - parseInt(a.value) ;
  });

  let slice = xd.slice(0,4)
  console.log(xd)
    sortBarChart("0",slice,vChartEquipo)

  //console.log()
    ///carga info en la card 

    let promedio = 0 
    
    filter.forEach((e)=>{


      promedio+=e.total
    })

    promedio = promedio/filter.length

    let valueEquipo = cardEquipo.querySelector(".atributoValue")

    valueEquipo.textContent = parseInt(promedio*100/maximoGeneral) +"%"

    let titleEquipo = document.querySelector("#titleEquipo")
    titleEquipo.textContent = department

    //Obtener descripción equipo

    
 
}



function loadChartJerarquia(jerarquia){

  console.log(cateogorias)


  let filter = listAnswers.filter((a) => { return a.jerarquia==jerarquia })

  console.log(filter)
  let respuestasFilter = filter.map((respuesta) => { return respuesta.values })

  let respuestaOrdenada = sumAllCategories(respuestasFilter)

  respuestaOrdenada.map((e)=>{e.value = parseInt(e.value/filter.length) , e.background=getColor(e.name)})
  sortBarChart("0",respuestaOrdenada,vChartJerarquiaCompleto)

  let xd = respuestaOrdenada.sort(function(a, b) {
    return parseInt(b.value) - parseInt(a.value) ;
});

let slice = xd.slice(0,4)
console.log(xd)
  sortBarChart("0",slice,vChartJerarquia)

//console.log()
  ///carga info en la card 

  let promedio = 0 
  
  filter.forEach((e)=>{


    promedio+=e.total
  })

  promedio = promedio/filter.length

  let valueEquipo = cardJerarquia.querySelector(".atributoValue")

  valueEquipo.textContent = parseInt(promedio*100/maximoGeneral) +"%"

  let titleEquipo = document.querySelector("#titleJerarquia")
  let titleEquipoCompleto = document.querySelector("#titleJerarquiaCompleto")

  titleEquipo.textContent = jerarquia
  titleEquipoCompleto.textContent = jerarquia


  //Obtener descripción equipo

  

}





console.log(getColor("Liderazgo"))
///cargar info 

graphByArea.setAttribute("value", 0)
let btnArea = graphByArea.querySelectorAll("svg")

//let title = graphByArea.querySelector(".complexChart__title")


btnArea.forEach((btn) => {

  btn.addEventListener("click", () => {

    let test = parseInt(graphByArea.getAttribute("value"))

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
    graphByArea.setAttribute("value", test)
    loadInfoGraphByArea()
  })

})

let title = graphByArea.querySelector(".complexChart__title")
let img = graphByArea.querySelector(".imgCard")

title.textContent = cateogorias[0]
img.src = rutasImagenes[0]

function loadInfoGraphByArea() {

  let title = graphByArea.querySelector(".complexChart__title")
  let prueba = graphByArea.getAttribute("value")
  title.textContent = cateogorias[prueba]

  let img = graphByArea.querySelector(".imgCard")
  img.src = rutasImagenes[prueba]

  let flechas = graphByArea.querySelectorAll("path")

  flechas.forEach((btn) => {

    btn.style.fill = colorArrows[prueba]
  })



  const names = answers.map((a) => {
    return a.area
  })

  const finalNames = [...new Set(names)];
  const getAllValuesByDataType = filterResponseByTag(finalNames, "values", answers);
  const getAllValuesByParameter = filterResponseByParameter(cateogorias[prueba], "values", getAllValuesByDataType);

  merged = getAllValuesByParameter.map((respuesta, i) => {

    respuesta.background = colorsDepartment[i]
    return respuesta
  })


  sortBarChart("0", merged, departmentChart)



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

  console.log(atributoTitle)
  img.src = rutasImagenes[test]

  flechasAtributos.forEach((flecha) => {


    flecha.style.fill = colorArrows[test]
  })

  atributoTitle.style.color = colorRadar[test]
  atributoTitle.textContent = cateogorias[test]

  btnDetalles.style.borderColor = colorArrows[test]

  console.log(listAnswers)
  let respuestasFilter = listAnswers.map((respuesta) => { return respuesta.values })

  let respuestaOrdenada = sumAllCategories(respuestasFilter)



  console.log(respuestaOrdenada)
  let respuestasDividas = respuestaOrdenada.map((respuesta) => {

    respuesta.value = parseInt(respuesta.value / listAnswers.length)
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


  //console.log(atributoTitle.style)

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

    e.value = parseInt(e.value / listAnswers.length)

    return e
  })

  console.log(respuestasDivididas)

  let names = respuestasDivididas.map((e) => {

    return "Pregunta " + e.numeroPregunta
  })

  let merged = respuestasDivididas.map((e) => {

    e.background = getColor(e.categoria)
    e.name = " Pregunta " + e.name

    return e
  })

  console.log(names)

  atributosChart.config.data.labels = names


  sortBarChart("0", merged, atributosChart)
}

const labels = [

];


const data = {
  labels: labels,
  datasets: [{
    //label: 'atributos por departamento',

    //borderColor: 'rgb(255, 99, 132)',
    data: dataChart,
    datalabels: {
      formatter: function (value, context) {

        console.log(value)
        // return value * 100 / 100 + '%';
        return value
      },
      color: "black",
      anchor: "end",
      align: "end",
      clamp: true,
      font: {

        weight: "bold"
      },
      padding: {

        top: 20
      }

    }
  }


  ]
};

const dataBar = {
  labels: labels,
  datasets: [{
    label: 'Mejores atributos',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: dataChart,
    borderRadius: 4,
    datalabels: {
      formatter: function (value, context) {

        console.log(value)
        // return value * 100 / 100 + '%';
        return value
      },
      color: "black",
      anchor: "end",
      align: "end",
      clamp: true,
      font: {

        weight: "bold"
      },
      padding: {

        right: 5
      }

    }
  }


  ]
};


const data2 = {
  labels: labels,
  datasets: [{
    label: '2021',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: dataChart,
    datalabels: {
      formatter: function (value, context) {

        console.log(value)
        return value * 100 / 100 + '%';
      },
      color: "red",
      anchor: "end",
      align: "end",
      clamp: true,
      font: {

        weight: "bold"
      },
      padding: {

        right: 5
      }

    }
  },
  {

    label: '2022',
    data: dataChart
  }


  ]
};


const config = {
  type: 'bar',
  data: dataBar,
  plugins: [ChartDataLabels],
  options: {
    barPercentage: 0.8,
    //barThickness : 73,
    layout: {
      padding: {

        right: 50
      }
    }
    ,
    plugins: {
      legend: {
        display: false
      }
    },
    parsing: {

      xAxisKey: 'name'
    },
    indexAxis: 'y',
    scales: {
      x: {

        display: false,
        drawBorder: false,
      },
      y: {

        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  }
};

const configdepartmentChart = {
  type: 'bar',
  data: data,
  plugins: [ChartDataLabels],
  options: {

    layout: {
      padding: {

        top: 30
      }
    }
    ,
    plugins: {
      legend: {
        display: false
      }
    },
    parsing: {

      xAxisKey: 'name'
    },
    indexAxis: 'x',
    scales: {
      x: {

        display: true,
        drawBorder: false,
      },
      y: {
        max: 21,
        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  }
};


const dataVerticalAtributos = {
  labels: labels,
  datasets: [{
    //label: 'atributos por departamento',

    //borderColor: 'rgb(255, 99, 132)',
    data: dataChart,
    borderRadius: 6,
    datalabels: {
      formatter: function (value, context) {

        console.log(value)
        //return parseInt(value * 100 / maximoCategoria) + '%';
        return value
      },
      color: "white",
      anchor: "center",
      align: "center",
      clamp: true,
      font: {

        weight: "bold"
      },
      padding: {

        top: 20
      }

    }
  }


  ]
};


const dataVerticalEquipos = {
  labels: labels,
  datasets: [{
    //label: 'atributos por departamento',

    //borderColor: 'rgb(255, 99, 132)',

    borderRadius: 6,

    data: dataChart,
    datalabels: {
      formatter: function (value, context) {

        console.log(value)
        //return parseInt(value * 100 / maximoCategoria) + '%';
        return value
      },
      color: "white",
      anchor: "center",
      align: "end",
      clamp: true,
      font: {

        weight: "bold"
      },
      padding: {

        top: 20
      }

    }
  }


  ]
};


const dataVerticalEquiposCompleto = {
  labels: labels,
  datasets: [{
    //label: 'atributos por departamento',

    //borderColor: 'rgb(255, 99, 132)',
    data: dataChart,
    borderRadius: 6,
    datalabels: {
      formatter: function (value, context) {

        console.log(value)
        //return parseInt(value * 100 / maximoCategoria) + '%';
        return value
      },
      color: "white",
      anchor: "center",
      align: "center",
      clamp: true,
      font: {

        weight: "bold"
      },
      padding: {

        top: 20
      }

    }
  }


  ]
};
const configVerticalAtributoChart = {
  type: 'bar',
  data: dataVerticalAtributos,
 
  plugins: [ChartDataLabels],
  options: {

    layout: {
      padding: {

        top: 30
      }
    }
    ,
    plugins: {
      legend: {
        display: false
      }
    },
    parsing: {

      xAxisKey: 'name'
    },
    indexAxis: 'x',
    scales: {
      x: {

        display: true,
        drawBorder: false,
      },
      y: {
        max: 35,
        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  }
};


const configVerticalEquipoChart = {
  type: 'bar',
  data: dataVerticalEquipos,
  plugins: [ChartDataLabels],
  options: {

    layout: {
      padding: {

        top: 30
      }
    }
    ,
    plugins: {
      legend: {
        display: false
      }
    },
    parsing: {

      xAxisKey: 'name'
    },
    indexAxis: 'x',
    scales: {
      x: {

        display: true,
        drawBorder: false,
      },
      y: {
        max: 35,
        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  }
};


const configVerticalJerarquiaChart = {
  type: 'bar',
  data: dataVerticalEquipos,
  plugins: [ChartDataLabels],
  options: {

    layout: {
      padding: {

        top: 30
      }
    }
    ,
    plugins: {
      legend: {
        display: false
      }
    },
    parsing: {

      xAxisKey: 'name'
    },
    indexAxis: 'x',
    scales: {
      x: {

        display: true,
        drawBorder: false,
      },
      y: {
        max: 35,
        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  }
};



const configVerticalEquipoChartCompleto = {
  type: 'bar',
  data: dataVerticalEquiposCompleto,
  plugins: [ChartDataLabels],
  options: {

    layout: {
      padding: {

        top: 30
      }
    }
    ,
    plugins: {
      legend: {
        display: false
      }
    },
    parsing: {

      xAxisKey: 'name'
    },
    indexAxis: 'x',
    scales: {
      x: {

        display: true,
        drawBorder: false,
      },
      y: {
        max: 35,
        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  }
};



const configVerticalJerarquiaChartCompleto = {
  type: 'bar',
  data: dataVerticalEquiposCompleto,
  plugins: [ChartDataLabels],
  options: {

    layout: {
      padding: {

        top: 30
      }
    }
    ,
    plugins: {
      legend: {
        display: false
      }
    },
    parsing: {

      xAxisKey: 'name'
    },
    indexAxis: 'x',
    scales: {
      x: {

        display: true,
        drawBorder: false,
      },
      y: {
        max: 35,
        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  }
};



const config2 = {
  type: 'line',
  data: data2,

  options: {

    // layout: {
    //   padding:{

    //     right:50
    //   }               
    // }          
    //   ,
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true
        }
      }
    },
    parsing: {

      xAxisKey: 'name'
    },
    indexAxis: 'x',
    scales: {


      x: {

        display: true,
        drawBorder: false,
      },
      y: {
        // beginAtZero: true ,

        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  }
};

const HorizontalChart = new Chart(
  document.getElementById('hChart'),
  config
);


const lineChart = new Chart(
  document.getElementById('lineChart'),
  config2
);

const departmentChart = new Chart(
  document.getElementById('barChartDepartments'),
  configdepartmentChart
);


const vChartAtributos = new Chart(
  document.getElementById('vChartAtributos'),
  configVerticalAtributoChart)



  const vChartEquipo = new Chart(
    document.getElementById('vChartEquipo'),
    configVerticalEquipoChart)


    const vChartJerarquia = new Chart(
      document.getElementById('vChartJerarquia'),
      configVerticalJerarquiaChart)


    const vChartEquipoCompleto = new Chart(
      document.getElementById('vChartEquipoCompleto'),
      configVerticalEquipoChartCompleto)

      const vChartJerarquiaCompleto = new Chart(
        document.getElementById('vChartJerarquiaCompleto'),
        configVerticalJerarquiaChartCompleto)
  



let dataAtributos = {

  labels: labels,
  datasets: [{
    label: 'Mejores atributos',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: dataChart,
    borderRadius: 6,
    datalabels: {
      formatter: function (value, context) {

        console.log(value)
        // return value * 100 / 100 + '%';
        return value
      },
      color: "black",
      anchor: "end",
      align: "end",
      clamp: true,
      font: {

        weight: "bold"
      },
      padding: {

        right: 5
      }

    }
  }


  ]
}




const configAtributos = {

  type: 'bar',
  data: dataAtributos,

  options: {

    // layout: {
    //   padding:{

    //     right:50
    //   }               
    // }          
    //   ,
    maintainAspectRatio: false,

    //maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true
        }
      }
    },
    parsing: {

      xAxisKey: 'name'
    },
    indexAxis: 'x',
    scales: {


      x: {

        display: true,
        drawBorder: false,
      },
      y: {
        beginAtZero: true,

        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  }

}
const atributosChart = new Chart(

  document.getElementById('chartAtributos'),
  configAtributos
)



const dataRadar = {

  labels: labels,
  datasets: [{


    label: 'Test overview',
    backgroundColor: 'rgb(29, 29, 29,0.5)',
    borderColor: '#DBDBDB',

    pointRadius: 6,
    pointHitRadius: 50,
    pointBorderWidth: 4,
    pointHoverRadius: 10,
    pointBackgroundColor: "#fff",
    pointBorderColor: "F4F4F4",

    data: dataChart,
    datalabels: {
      formatter: function (value, context) {

        console.log(value)
        return value * 100 / 100 + '%';
      },
      color: "red",
      anchor: "end",
      align: "end",
      clamp: true,
      font: {

        weight: "bold"
      },
      padding: {

        right: 5
      }

    }
  },


  ]


};
const configRadar = {
  type: 'radar',
  data: dataRadar,

  options: {
    //pointHitRadius:30,

    //maintainAspectRatio: false,
    onHover: ({ x, y }, activeHover, chart) => {

      console.log(chart.scales.r._pointLabelItems)
      const { canvas } = chart
      let index = getLabelIndex(x, y, chart.scales.r._pointLabelItems)

      console.log(index)
      if (index === -1) {

        canvas.style.cursor = 'default'
      }
      else {

        canvas.style.cursor = 'pointer'
      }
    },

    onClick: ({ x, y }, activeClick, chart) => {

      const { canvas } = chart

      let index = getLabelIndex(x, y, chart.scales.r._pointLabelItems)

      if (index === -1) {

        return
      }
      const selectedLabel = chart.scales.r._pointLabels[index]
      console.log(selectedLabel)

      updateRadarChart(selectedLabel)

    },
    scales: {
      
      //
      r: {

        suggestedMin: 0,
        //suggestedMax: 50,
        backgroundColor: "#F4F4F4",

        pointLabels: {
          font: {
            size: 15,
            weight: "bold"

          }
        }

      }
      //   ticks: {
      //     display:false,
      //     max:100, // Set it to your Max value
      //     min: 0, // You can also change the Min
      //     beginAtZero: true,
      //     stepSize: 1, // in case you change the Min
      //  }
    }
    ,

  }
};
const getLabelIndex = (x, y, pointLabels) => {

  let index = -1


  console.log(pointLabels.length)
  for (let i = 0; i < pointLabels.length; i++) {

    const { top, right, bottom, left } = pointLabels[i]

    console.log(pointLabels[i])

    if (x >= left && x <= right && y >= top && y <= bottom) {

      index = i;
      break
    }


  }
  return index
}

const radarChart = new Chart(

  document.querySelector("#chartRadar"),
  configRadar
);


loadInfoGraphByArea()


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

function sumAllQuestions(answers) {

  console.log(answers)

  const basket = answers.reduce((basket, fruit) => {

    for (const [number, respuesta] of Object.entries(fruit)) {
      console.log(respuesta)
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




function sumAllSubCategories(answers) {
  console.log(answers)


  const basket = answers.reduce((basket, fruit) => {

    for (const [number, respuesta] of Object.entries(fruit)) {
      // console.log(value)

      console.log(number)
      if (!basket[number]) {
        basket[number] = { categoria: respuesta.categoria, name: respuesta.name, value: 0 };
      }


      basket[number].value += respuesta.value;
      //console.log( basket[number].)

    }

    return basket;
  }, []);

  console.log(basket)
  return basket
}
function loadHighlights(test, respuestas) {

  let numeroRespuestas = respuestas.length

  console.log(respuestas)
  let respuestasFilter = respuestas.map((respuesta) => { return respuesta.values })

  let respuestaOrdenada = sumAllCategories(respuestasFilter)

  let respuestasDividas = respuestaOrdenada.map((respuesta) => {

    respuesta.value = parseInt(respuesta.value / respuestas.length)
    return respuesta
  })

  console.log(respuestasDividas)


  if (numeroRespuestas != test.numberEmployers) {

    completedCard.querySelector(".card__title").textContent = "En proceso"
  }
  completedCard.querySelector(".card__value").textContent = `${numeroRespuestas}/${test.numberEmployers}`

  let promedio = 0

  respuestas.forEach((respuesta) => {

    promedio += respuesta.total

  })

  promedio = promedio / respuestas.length

  cardAverageValue.textContent = Math.round(promedio * 100 / maximoGeneral) + "%"

  console.log(answers)



  let finalNames = respuestas[0].values.map((respuesta) => {

    return respuesta.name
  })

  console.log(respuestas)


  //Muestra valor mas bajo

  let min = respuestasDividas.reduce((previous, current) => {
    return current.value < previous.value ? current : previous;
  });

  let max = respuestasDividas.reduce((previous, current) => {
    return current.value > previous.value ? current : previous;
  });
  console.log(min)

  worstAttributeName.textContent = min.name
  worstAttributeValue.textContent = ((min.value / maximoCategoria) * 100).toFixed(1) + "%"

  //actualiza la card del radar con el mas bajo
  titleCardChart.textContent = min.name
  titleCardChart.style.color = getColor(min.name)
  levelCardChart.style.color = getColor(min.name)

  valueCardChart.textContent = parseInt((min.value / maximoCategoria) * 100) + "%"



  bestAttributeName.textContent = max.name

  bestAttributeValue.textContent = ((max.value / maximoCategoria) * 100).toFixed(1) + "%"


  //const getAllValuesByDataType = filterResponseByTag(finalNames, "values", respuestas);

  // const getAllValuesByParameter = filterResponseByParameter("Estrategia", "values", getAllValuesByDataType);

  ///


  // proficiency description
  const proficiencyAverage = document.querySelector(".proficiency__view")

  const proficiencyValue = proficiencyAverage.querySelector(".infoValue")
  const proficiencyDescription = proficiencyAverage.querySelector(".descriptionProfiency")

  console.log(proficiencyDescription)
  let proficiency = Math.round(promedio * 100 / maximoGeneral)
  proficiencyValue.textContent = proficiency + "%"

  const proficiencyGrade = proficiencyAverage.querySelector(".infoDescription")

  proficiencyGrade.textContent = getProficiencyName(proficiency)

  proficiencyDescription.textContent = getProficiencyDescription(proficiency)



  // carga tabla chafa

  respuestasDividas.forEach((xd) => {

    let proficiency
    console.log(xd)
    let percentage = Math.round(xd.value * 100 / maximoCategoria)
    console.log(percentage)
    let div = document.createElement("div")
    div.classList.add("proficiency")
    div.innerHTML = `<p class="proficiencyName">${xd.name}</p>
                    <p class="proficiencyPercentage">${percentage}%</p>
                    <p class="proficiencyGrade">${getProficiencyName(percentage)}</p>`

    proficiencyContainer.appendChild(div)
  })

}


function getProficiencyName(value) {


  let proficiencyName = ""


  if (value <= 60) proficiencyName = "Principiante"
  if (value > 60 && value <= 78) proficiencyName = "Competente"
  if (value > 78 && value <= 90) proficiencyName = "Proficiente"
  if (value > 90) proficiencyName = "Experto"

  return proficiencyName
}


function getProficiencyDescription(value) {

  console.log(value)
  let proficiencyDescription = ""
  if (value <= 60) proficiencyDescription = "Tus resultados muestran que tu compañía todavía tiene un largo viaje por delante, pero que esto no desmotive, ya que se darán los pasos necesarios para mejorar."
  if (value > 60 && value <= 78) proficiencyDescription = "Tus resultados muestran que tu compañía está avanzando bastante, están tratando de mejorar lo que ya tienen y están abiertos a hacer los cambios que sean necesarios."
  if (value > 78 && value <= 90) proficiencyDescription = "Tus resultados muestran que tu compañía es un lugar donde los trabajadores y la compañía están activamente aplicando nuevas ideas y buscamos formas nuevas de evitar obstáculos para progresar, recuerda siempre buscar ser mejor."
  if (value > 90) proficiencyDescription = "Tu compañía es un ejemplo sobre como mantenerse siempre actualizado en un mercado competitivo y hacer que todos se sientan parte del equipo desde la posición más pequeña a la más alta, sigue tus esfuerzos para que tu cultura sea siempre la mejor."
  return proficiencyDescription

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




  //console.log(arregloFinal)
  let prueba = sumAllSubCategories(filtrado)
  console.log(currentTest)
  prueba.forEach((prueba) => { prueba.value = parseInt(prueba.value / answers.length) })

  arregloFinal = prueba.filter((a) => a.categoria == category)

  console.log(arregloFinal)

  let promedioCategoria
  let sumaCategoria = 0
  arregloFinal.forEach((respuesta) => {

    console.log(respuesta.value)
    sumaCategoria += respuesta.value

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

  levelCardChart.textContent = getProficiencyName(promedioCategoria)


  let names = arregloFinal.map((x) => { return x.categoria })

  radarChart.config.data.labels = names

  radarChart.config.options.scales.r.max = maximoPregunta

  radarChart.config.data.datasets[0].data = arregloFinal

  let index = cateogorias.indexOf(category);

  arregloFinal.forEach((e) => { e.background = colorRadar[index] })

  //radarChart.config.data.datasets[0].backgroundColor = colorArrows[index]
  radarChart.update()

  sortBarChart("0", arregloFinal, radarChart)

}



function loadRadarChart(answers) {

  //let categorias = ["Estrategia", "Gobernanza", "Clima"]
  // cateogorias


  let totalEstrategia = 0, totalGobernanza = 0, totalClima = 0, totalPersonas = 0, totalLiderazgo = 0, totalColaboracion = 0, totalProcesos = 0, totalRecursos = 0, totalResultados = 0
  //let Estrategia = 0, Gobernanza = 0, Clima = 0, Personas = 0, Liderazgo = 0, Colaboracion = 0, Procesos = 0, Recursos = 0,Resultados=0
  let finalValues = []
  answers.forEach((respuesta) => {

    respuesta.values.forEach((a) => {

      console.log(a)
      switch (a.name) {


        case "Estrategia":

          console.log(a)
          totalEstrategia += a.value

          break;

        case "Gobernanza":

          console.log(a)
          totalGobernanza += a.value

          break;

        case "Clima":

          console.log(a)
          totalClima += a.value

          break;

        case "Personas":

          console.log(a)
          totalPersonas += a.value

          break;

        case "Liderazgo":

          console.log(a)
          totalLiderazgo += a.value

          break;

        case "Colaboración":

          console.log(a)
          totalColaboracion += a.value

          break;



        case "Procesos":

          console.log(a)
          totalProcesos += a.value

          break;



        case "Recursos":

          console.log(a)
          totalRecursos += a.value

          break;




        case "Resultados":

          console.log(a)
          totalResultados += a.value

          break;
      }



    })
  })

  finalValues.push(parseInt(totalEstrategia / answers.length))
  finalValues.push(parseInt(totalGobernanza / answers.length))
  finalValues.push(parseInt(totalClima / answers.length))
  finalValues.push(parseInt(totalPersonas / answers.length))
  finalValues.push(parseInt(totalLiderazgo / answers.length))
  finalValues.push(parseInt(totalRecursos / answers.length))
  finalValues.push(parseInt(totalResultados / answers.length))
  finalValues.push(parseInt(totalProcesos / answers.length))
  finalValues.push(parseInt(totalColaboracion / answers.length))






  merged = cateogorias.map((value, i) => {

    return { "name": value, "value": finalValues[i] }
  })

  console.log(merged)

  radarChart.config.data.labels = cateogorias

  radarChart.config.data.datasets[0].data = finalValues
  // radarChart.config.data.datasets[0].backgroundColor = color
  radarChart.update()
  //mergedAttribute = merged
  sortBarChart("0", merged, radarChart)
}

function loadBarChart() {

  let merged

  const names = answers.map((a) => {
    return a.area
  })

  const finalNames = [...new Set(names)];
  console.log(finalNames);

  const getAllValuesByDataType = filterResponseByTag(finalNames, "values", answers);

  console.log(getAllValuesByDataType);

  const getAllValuesByParameter = filterResponseByParameter("Gobernanza", "values", getAllValuesByDataType);

  console.log(getAllValuesByParameter)
  //este es el importante
  //console.log(getAllValuesByParameter);

  merged = getAllValuesByParameter.map((respuesta, i) => {

    respuesta.background = colorsDepartment[i]
    return respuesta
  })

  console.log(merged)



  // let pruebaValues = []

  // for (let i = 0; i < finalNames.length; i++) {


  //   pruebaValues[i] = answers.filter(a => {



  //     return a.area == finalNames[i]

  //   })
  // }


  // console.log(pruebaValues)




  let finalData = []
  // answers.forEach((respuesta) => {

  //   respuesta.values.forEach((respuesta) => {

  //     console.log(respuesta)

  //     if (respuesta.name == filter) {

  //       console.log(respuesta)
  //       finalData.push(respuesta.value)
  //     }

  //   }

  //   )
  // })


  mergedDepartment = merged
  departmentChart.config.data.labels = finalNames

  //departmentChart.config.data.datasets[0].data = finalData
  departmentChart.config.data.datasets[0].backgroundColor = colorsDepartment

  sortBarChart("0", getAllValuesByParameter, departmentChart)
}


function filterResponseByTag(areas, dataType = "", responses) {

  let areasName = areas;

  let objectArea = areasName.map(area => ({ area: area }));
  console.log(objectArea)

  //albergo toda la información que llega
  let responsesTest = responses;

  //sumar los valores que tengan la misma area
  objectArea.forEach(area => area[dataType] = responsesTest.filter(response => response.area === area.area));
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
    value: parseInt(info.value[0] / info.numberAnswer),
  }))

  return objectWithInfo;
}



function loadBestAttributes(answers) {

  let merged
  //let categorias = ["Estrategia", "Gobernanza", "Clima"]

  let res = []

  answers.forEach((respuesta) => {

    respuesta.respuestas.forEach((a) => {
      res.push(a.categoria)

    })
  })
  const finalNames = [...new Set(res)];


  console.log(res)

  let finalValues = []
  let totalEstrategia = 0, totalGobernanza = 0, totalClima = 0, totalPersonas = 0, totalLiderazgo = 0, totalColaboracion = 0, totalProcesos = 0, totalRecursos = 0, totalResultados = 0

  console.log(answers)
  answers.forEach((respuesta) => {

    respuesta.values.forEach((a) => {

      console.log(a)
      switch (a.name) {


        case "Estrategia":

          console.log(a)
          totalEstrategia += a.value

          break;

        case "Gobernanza":

          console.log(a)
          totalGobernanza += a.value

          break;

        case "Clima":

          console.log(a)
          totalClima += a.value

          break;

        case "Personas":

          console.log(a)
          totalPersonas += a.value

          break;

        case "Liderazgo":

          console.log(a)
          totalLiderazgo += a.value

          break;

        case "Colaboración":

          console.log(a)
          totalColaboracion += a.value

          break;



        case "Procesos":

          console.log(a)
          totalProcesos += a.value

          break;



        case "Recursos":

          console.log(a)
          totalRecursos += a.value

          break;




        case "Resultados":

          console.log(a)
          totalResultados += a.value

          break;
      }



      // }

    })

  })

  finalValues.push(parseInt(totalEstrategia / answers.length))
  finalValues.push(parseInt(totalGobernanza / answers.length))
  finalValues.push(parseInt(totalClima / answers.length))
  finalValues.push(parseInt(totalPersonas / answers.length))
  finalValues.push(parseInt(totalLiderazgo / answers.length))
  finalValues.push(parseInt(totalRecursos / answers.length))
  finalValues.push(parseInt(totalResultados / answers.length))
  finalValues.push(parseInt(totalProcesos / answers.length))
  finalValues.push(parseInt(totalColaboracion / answers.length))

  console.log(finalValues)





  merged = cateogorias.map((value, i) => {

    return { "name": value, "value": finalValues[i], background: colorArrows[i] }
  })

  console.log(merged)
  // const color = merged.map((a) => {

  //   console.log(a)
  //   switch (a.name) {

  //     case "Estrategia": return "rgba(255, 102, 26, 1)";

  //     case "Gobernanza": return "rgba(234, 11, 52, 1)"

  //     case "Clima": return "rgba(3, 140, 135, 1)"

  //   }

  // })
  console.log(merged)

  HorizontalChart.config.data.labels = finalNames

  HorizontalChart.config.data.datasets[0].data = finalValues
  //HorizontalChart.config.data.datasets[0].backgroundColor = color
  HorizontalChart.update()
  mergedAttribute = merged
  sortBarChart("0", merged, HorizontalChart)

  vChartAtributos.config.data.labels = finalNames
  vChartAtributos.config.data.datasets[0].data = finalValues
  vChartAtributos.update()

  sortBarChart("2", merged, vChartAtributos)

}

for (let i = 0; i < filterDepartment.length; i++) {

  filterDepartment[i].addEventListener("click", () => {

    console.log(filterDepartment[i].value)
    sortBarChart(filterDepartment[i].value, mergedDepartment, departmentChart)
  })

}





// 0 alfa 1 mayor 2 menor
function sortBarChart(order, data, chart) {

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

  //console.log(chart)

  chart.config.data.datasets[0].data = sValue
  chart.config.data.labels = sName
  chart.config.data.datasets[0].backgroundColor = Scolor
  chart.update()
}

