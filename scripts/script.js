let dataChart;

let filter = "Estrategia"

let mergedDepartment
let mergedAttribute
const formDepartment = document.querySelector("#filterChartByDepartment")
const filterDepartment = formDepartment.querySelectorAll(".hidebox")

const emptyDashboard = document.querySelector(".emptyDashboard")
const dashboard = document.querySelector(".dashboard__content")
dashboard.style.display = "none"

// por departamento


///cargar info 


const labels = [

];


const data = {
  labels: labels,
  datasets: [{
    label: 'atributos por departamento',

    borderColor: 'rgb(255, 99, 132)',
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

        right: 5
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
      // padding: {

      //   right: 50
      // }
    }
    ,
    plugins: {
      legend: {
        display: true
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

const myChart = new Chart(
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


const dataRadar = {

  labels: labels,
  datasets: [{
    label: 'Test overview',
    backgroundColor: 'rgb(255, 99, 132,0.3)',
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


  ]


};
const configRadar = {
  type: 'radar',
  data: dataRadar,

  options: {
    ticks: {
      beginAtZero: true,
      // max: 25,
      // min: 0,
      // stepSize: 1
    }

  }
};


const radarChart = new Chart(

  document.querySelector("#chartRadar"),
  configRadar
);



let answers = []

auth.onAuthStateChanged((user) => {


  if (user) {

    //currentUser=user
    console.log(user.uid)
    db.collection("surveys").where("userId", "==", user.uid).limit(1).get().then((docSnapshot) => {


      if (!docSnapshot.empty) {

        emptyDashboard.style.display = "none"
        dashboard.style.display = "flex"

        console.log(docSnapshot)

        docSnapshot.forEach((doc) => {



          db.collection("answers").where("testId", "==", doc.id).get().then(function (querySnapshot) {

            querySnapshot.forEach((doc) => {

              answers.push(doc.data())
            })

          }).then(() => {

            console.log(answers)
            loadBarChart(answers)
            loadBestAttributes(answers)
            loadRadarChart(answers)


          });
        })
        //obtiene respuestas



        //?testId=8INIveodekK2Fj8ObEK7
      }
      else {

        emptyDashboard.style.display = flex

      }


    })

  }
})


function loadRadarChart(answers) {



  let categorias = ["Estrategia", "Gobernanza", "Clima", "Personas", "Liderazgo"]


//   const data = categorias.map((element) => ({
//     categoria: element,
//     `total${element}`: 0
//   }))

// console.log(data);


let totalEstrategia = 0, totalGobernanza = 0, totalClima = 0, totalPersonas = 0, totalLiderazgo = 0

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
    }



  })
})

finalValues.push(parseInt(totalEstrategia / answers.length))
finalValues.push(parseInt(totalGobernanza / answers.length))
finalValues.push(parseInt(totalClima / answers.length))
finalValues.push(parseInt(totalPersonas / answers.length))
finalValues.push(parseInt(totalLiderazgo / answers.length))



merged = categorias.map((value, i) => {

  return { "name": value, "value": finalValues[i] }
})

console.log(merged)

radarChart.config.data.labels = categorias

radarChart.config.data.datasets[0].data = finalValues
// radarChart.config.data.datasets[0].backgroundColor = color
radarChart.update()
//mergedAttribute = merged
sortBarChart("0", merged, radarChart)
}

function loadBarChart(answers) {

  console.log(answers)
  let merged

  const names = answers.map((a) => {
    return a.area
  })

  const finalNames = [...new Set(names)];
  console.log(finalNames);
  
  const getAllValuesByDataType = filterResponseByTag(finalNames, "subcategorias", answers);

  console.log(getAllValuesByDataType);

  const getAllValuesByParameter = filterResponseByParameter("Diversidad", "subcategorias", getAllValuesByDataType);

  //este es el importante
  console.log(getAllValuesByParameter);



  let pruebaValues = []

  for (let i = 0; i < finalNames.length; i++) {


    pruebaValues[i] = answers.filter(a => {



      return a.area == finalNames[i]

    })
  }


  console.log(pruebaValues)




  let finalData = []
  answers.forEach((respuesta) => {

    respuesta.values.forEach((respuesta) => {

      console.log(respuesta)

      if (respuesta.name == filter) {

        console.log(respuesta)
        finalData.push(respuesta.value)
      }

    }

    )
  })

  console.log(finalData)

  console.log(answers)


  // const color = answers.map((a) => {

  //   switch (a.area) {

  //     case "Marketing": return "rgba(255, 102, 26, 1)";

  //     case "Ingenieria": return "rgba(234, 11, 52, 1)";

  //     case "Diseño": return "rgba(3, 140, 135, 1)"

  //   }
  // })



  console.log(merged)
  mergedDepartment = merged
  departmentChart.config.data.labels = finalNames

  departmentChart.config.data.datasets[0].data = finalData
  //departmentChart.config.data.datasets[0].backgroundColor = color

  sortBarChart("0", getAllValuesByParameter, departmentChart)
}


function filterResponseByTag(areas,dataType = "", responses) {

  let areasName = areas;

  let objectArea = areasName.map(area => ({ area: area }));

  //albergo toda la información que llega
  let responsesTest = responses;

  //sumar los valores que tengan la misma area
  objectArea.forEach(area => area[dataType] = responsesTest.filter(response => response.area === area.area));

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
  let categorias = ["Estrategia", "Gobernanza", "Clima"]

  let res = []

  answers.forEach((respuesta) => {

    respuesta.respuestas.forEach((a) => {
      res.push(a.categoria)

    })
  })
  const finalNames = [...new Set(res)];


  console.log(res)

  let finalValues = []
  let totalEstrategia = 0, totalGobernanza = 0, totalClima = 0
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
      }



      // }

    })

  })

  finalValues.push(totalEstrategia)
  finalValues.push(totalGobernanza)
  finalValues.push(totalClima)

  console.log(finalValues)





  merged = categorias.map((value, i) => {

    return { "name": value, "value": finalValues[i] }
  })

  console.log(merged)
  const color = merged.map((a) => {

    console.log(a)
    switch (a.name) {

      case "Estrategia": return "rgba(255, 102, 26, 1)";

      case "Gobernanza": return "rgba(234, 11, 52, 1)"

      case "Clima": return "rgba(3, 140, 135, 1)"

    }

  })
  console.log(merged)

  myChart.config.data.labels = finalNames

  myChart.config.data.datasets[0].data = finalValues
  myChart.config.data.datasets[0].backgroundColor = color
  myChart.update()
  mergedAttribute = merged
  sortBarChart("0", merged, myChart)
}

for (let i = 0; i < filterDepartment.length; i++) {

  filterDepartment[i].addEventListener("click", () => {

    console.log(filterDepartment[i].value)
    sortBarChart(filterDepartment[i].value, mergedDepartment, departmentChart)
  })

}



//Carga info primera grafica
// fetch("./data/data.json")
//   .then(res => res.json())
//   .then(data => {



//     //toma los tres valores mas altos, pero solo internos por cada categoria
//     // const dataModificada = data.children[1].children.slice().sort((a, b) => b.value - a.value).slice(0, 3)
//     // console.log(dataModificada)


//     // const names = dataModificada.map((a) => {
//     //   return a.name
//     // })


//     // const color = dataModificada.map((a) => {

//     //   console.log(a.name == "Enfoque")

//     //   switch (a.name) {

//     //     case "Organigrama": return "rgba(255, 102, 26, 1)";

//     //     case "Colaboracion": return "rgba(234, 11, 52, 1)"

//     //     case "Liderazgo": return "rgba(3, 140, 135, 1)"

//     //   }

//     //   console.log(a.name)

//     // })
//     // const dataName = data.children[0].name

//     // console.log(dataName)


//     // const values = dataModificada.map((a) => {

//     //   return a.value
//     // })



//     myChart.config.data.labels = names



//     myChart.config.data.datasets[0].data = values
//     //myChart.config.data.datasets[0].labels = dataName
//     myChart.config.data.datasets[0].backgroundColor = color


//     // console.log(dataName)
//     // console.log(myChart.config.data.datasets[0])
//     // console.log(values)
//     myChart.update()
//     lineChart.update()
//   });

// 0 alfa 1 mayor 2 menor
function sortBarChart(order, data, chart) {

  let dataSort = []

  console.log(data)

  let sValue = []
  let sName = []

  let Scolor = []

  // if(chart==departmentChart){

  //   color = data.map((a) => {

  //     switch (a.name) {

  //       case "Marketing": return "rgba(255, 102, 26, 1)";

  //       case "Ingenieria": return "rgba(234, 11, 52, 1)"

  //       case "Diseño": return "rgba(3, 140, 135, 1)"

  //     }



  //   })

  // }

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
    Scolor.push(dataSort[i].color)
    console.log(Scolor[i])
  }

  console.log(dataSort)



  //console.log(chart)

  chart.config.data.datasets[0].data = sValue
  chart.config.data.labels = sName
  chart.config.data.datasets[0].background = Scolor
  chart.update()
}

fetch("./data/data2.json")
  .then(res => res.json())
  .then(data2 => {

    const dataModificada2 = data2.children[1].children
    //.slice().sort((a, b) => b.value - a.value).slice(0, 3)

    console.log(dataModificada2)

    const values2 = dataModificada2.map((a) => {

      return a.value
    })

    const names = dataModificada2.map((a) => {
      return a.name
    })

    lineChart.config.data.datasets[1].data = values2
    lineChart.config.data.labels = names

    lineChart.update()

  }).then(dataa => {


    fetch("./data/data.json")
      .then(res => res.json())
      .then(data => {


        const dataModificada = data.children[1].children


        const values = dataModificada.map((a) => {

          return a.value
        })

        const names = dataModificada.map((a) => {
          return a.name
        })


        lineChart.config.data.datasets[0].data = values
        lineChart.config.data.labels = names
        lineChart.update()
      })


  })

