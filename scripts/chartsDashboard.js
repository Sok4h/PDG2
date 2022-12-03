const labels = [

];

let dataChart;

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
        return value +"%"
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
        return value +" %"
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
        max: 100,
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
        return value + "%"
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
        return value +"%"
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
        return value +"%"
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

  plugins: [canvasBackgroundColor,ChartDataLabels],
 
  options: {

    maintainAspectRatio: false,

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
        max: 100,
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
  plugins: [ChartDataLabels,canvasBackgroundColor],
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
        max: 100,
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
  plugins: [ChartDataLabels,canvasBackgroundColor],
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
        max: 100,
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
  plugins: [ChartDataLabels,canvasBackgroundColor],
  options: {
    maintainAspectRatio: false,
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
        max: 100,
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
  plugins: [ChartDataLabels,canvasBackgroundColor],
  options: {

    maintainAspectRatio: false,
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
        max: 100,
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
        return value +" %"
      },
      color: "white",
      anchor: "center",
      align: "center",
      clamp: true,
      font: {

        weight: "bold"
      },
      padding: {

       // right: 5
      }

    }
  }


  ]
}



const configAtributos = {

  type: 'bar',
  data: dataAtributos,
  plugins: [ChartDataLabels,canvasBackgroundColor],


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
        display: false,
        labels: {
          usePointStyle: true
        }
      },

      

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
        max: 100,
        beginAtZero: true,

        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  },


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
    responsive:true,
    maintainAspectRatio: false,
    onHover: ({ x, y }, activeHover, chart) => {

      console.log(chart.scales)
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
        suggestedMax: 100,
        backgroundColor: "#F4F4F4",

        pointLabels: {
          align:"center",
          font: {
            size: 12,
            weight: "bold"

          }
        }
        ,
       
    }
      },

  },
  plugins: [{
    beforeInit: function(chart) {
       chart.data.labels.forEach(function(e, i, a) {
          if (/\n/.test(e)) {
             a[i] = e.split(/\n/);
          }
       });
    }
 }],

  
};


// funcion que verifica si la posicion del click fue dentro de algun label del radar chart
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
  configRadar,
);



//función que detecta si se le dio click al label del radar chart
function clickHandler(click){


  const point = radarChart.getElementsAtEventForMode(click,'nearest',{

    intersect:true},true)

    if(point[0]){


      const selectedLabel = radarChart.scales.r._pointLabels[point[0].index]
      console.log(selectedLabel)

      updateRadarChart(selectedLabel)
    }
  
}


radarChart.canvas.onclick = clickHandler

