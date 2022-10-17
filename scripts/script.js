let dataChart;


//Carga info primera grafica
fetch("./data/data.json")
  .then(res => res.json())
  .then(data => {



    //toma los tres valores mas altos, pero solo internos por cada categoria
    const dataModificada = data.children[1].children.slice().sort((a, b) => b.value - a.value).slice(0,3)
    console.log(dataModificada)


    const names = dataModificada.map((a) => {
      return a.name
    })


    const color = dataModificada.map((a) => {

      console.log(a.name == "Enfoque")

      switch (a.name) {

        case "Organigrama": return "rgba(255, 102, 26, 1)";

        case "Colaboracion": return "rgba(234, 11, 52, 1)"

        case "Liderazgo": return "rgba(3, 140, 135, 1)"

      }

      console.log(a.name)

    })
    const dataName = data.children[0].name

    console.log(dataName)


    const values = dataModificada.map((a) => {

      return a.value
    })



    myChart.config.data.labels = names

    

    myChart.config.data.datasets[0].data = values
    //myChart.config.data.datasets[0].labels = dataName
    myChart.config.data.datasets[0].backgroundColor = color


    // console.log(dataName)
    // console.log(myChart.config.data.datasets[0])
    // console.log(values)
    myChart.update()
    lineChart.update()
  });



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

  }).then(dataa=>{


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

const labels = [

];


const data = {
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
  data: data,
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
        labels:{
          usePointStyle:true
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

