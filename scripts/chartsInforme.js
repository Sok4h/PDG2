let dataChart;


const labels = [

];

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

const dataVerticalAtributosEquipo = {
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

const dataVerticalAtributosJerarquia = {
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

const dataPregunta1 = {
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
                return value + " Personas"
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


const dataPreguntaPromedio = {
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
                return value + " Personas"
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

const dataPregunta2 = {
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
                return value + " Personas"
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

const dataPregunta3 = {
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
                return value + " Personas"
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

const dataPregunta4 = {
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
                return value + " Personas"
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

const dataPregunta5 = {
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
                return value + " Personas"
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

    plugins: [ChartDataLabels,canvasBackgroundColor],
    options: {
        // maintainAspectRatio: false,
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

const configVerticalAtributoJerarquiaChart = {
    type: 'bar',
    data: dataVerticalAtributosJerarquia,
    maintainAspectRatio: false,

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





const configVerticalChart1 = {
    type: 'bar',
    data: dataPregunta1,

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
                //max: 100,
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        }
    }
};

const configVerticalChartPromedio = {
    type: 'bar',
    data: dataPreguntaPromedio,

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
                //max: 100,
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        }
    }
};

const configVerticalChart2 = {
    type: 'bar',
    data: dataPregunta2,

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
                //max: 100,
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        }
    }
};

const configVerticalChart3 = {
    type: 'bar',
    data: dataPregunta3,

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
                //max: 100,
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        }
    }
};

const configVerticalChart4 = {
    type: 'bar',
    data: dataPregunta4,

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
                //max: 100,
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        }
    }
};

const configVerticalChart5 = {
    type: 'bar',
    data: dataPregunta5,

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
                //max: 100,
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        }
    }
};


const configVerticalAtributoEquipoChart = {
    type: 'bar',
    data: dataVerticalAtributosEquipo,

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

const vChartAtributosPregunta = new Chart(
    document.getElementById('vChartCategoriaPregunta'),
    configVerticalAtributoChart)



const vChartAtributosEquipo = new Chart(
    document.getElementById('vChartCategoriaEquipo'),
    configVerticalAtributoEquipoChart)




const vChartAtributosJerarquia = new Chart(
    document.getElementById('vChartCategoriaJerarquia'),
    configVerticalAtributoJerarquiaChart)



const vChartPregunta1 = new Chart(
    document.getElementById('vChartPregunta1'),
    configVerticalChart1)



const vChartPregunta2 = new Chart(
    document.getElementById('vChartPregunta2'),
    configVerticalChart2)

const vChartPregunta3 = new Chart(
    document.getElementById('vChartPregunta3'),
    configVerticalChart3)
const vChartPregunta4 = new Chart(
    document.getElementById('vChartPregunta4'),
    configVerticalChart4)
const vChartPregunta5 = new Chart(
    document.getElementById('vChartPregunta5'),
    configVerticalChart5)

const vChartPreguntaPromedio = new Chart(
    document.getElementById('vChartPreguntaPromedio'),
    configVerticalChartPromedio)

const vChartPreguntaEquipo = new Chart(
    document.getElementById('vChartPreguntaEquipo'),
    configVerticalChart1)

    const vChartPreguntaJerarquia = new Chart(
        document.getElementById('vChartPreguntaJerarquia'),
        configVerticalChart1)




