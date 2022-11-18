let dataChart;
const testSelect = document.querySelector("#testList")
const arrow = document.querySelector(".arrow")
const valueArrow = document.querySelector("#valueArrow")
const desempenoValue = document.querySelector(".desempenoValue")
const desempenoDescription = document.querySelector(".desempenoDescription")
const desempenoName = document.querySelector(".desempenoName")
const desempenoValueName = document.querySelector(".desempenoValueName")

const atributosContainer = document.querySelector(".atributosContainer")
const dashboardContainer = document.querySelector(".dashboardContainer")
const emptyAnswers = document.querySelector(".emptyResults")
const emptyDashboard = document.querySelector(".emptyDashboard")

const filterInforme = document.querySelector("#filterInforme")
const filterInformeEspecifico = document.querySelector("#filterEspecifico")
const cardCategoriaPregunta = document.querySelector("#cardCategoriaPregunta")

const graficasGenerales = document.querySelector("#graficasGenerales")
const graficasEspecificas = document.querySelector("#graficasEspecificas")

let datoPregunta, datoEquipo, datoJerarquia

let filterChartPregunta = document.querySelector("#filterChartPregunta")

let filterChartEquipo = document.querySelector("#filterChartDeparmentCompleto")

let filterChartJerarquia = document.querySelector("#filterChartJerarquia")

console.log(filterInforme.value)

let categoria

let currentTest

const atributos = atributosContainer.querySelectorAll(".atributo")
console.log(arrow)

emptyAnswers.style.display = "none"
emptyDashboard.style.display = "none"


filterInformeEspecifico.style.display = "none"

let testArray = []
let answers = []
auth.onAuthStateChanged((user) => {

    if (user) {

        docRef = db.collection("surveys").where("userId", "==", user.uid)
        docRef.get().then((docSnapshot) => {

            if (!docSnapshot.empty) {

                //emptyAnswers.style.display="none"
                emptyDashboard.style.display = "none"
                dashboardContainer.style.display = "flex"
                docSnapshot.forEach((doc) => {

                    console.log(doc.data())
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
                currentTest= testList.value
                loadTest(testList.value)

                testList.addEventListener("change", () => {

                    //alert("xd")
                    currentTest= testList.value
                    loadTest(testList.value)


                })

            }
            else {


                emptyDashboard.style.display = "flex"


                dashboardContainer.style.display = "none"
            }


        })

    }
})


let filterGeneral = filterInforme.querySelectorAll(".hidebox")


for (let i = 0; i < filterGeneral.length; i++) {

    filterGeneral[i].addEventListener("click", () => {

        console.log(filterGeneral[i].value)


        //let parentDiv = filterAtributos[i].closest("label") ;

        //console.log(parentDiv)
        filterGeneral[i].classList.add("seleccionado")
        //console.log(mergedAtributosCompletos)
        loadCharts(filterGeneral[i].value)
        //console.log(dataVerticalAtributos.datasets[0])
        // sortBarChart(filterGeneral[i].value, mergedAtributos, atributosChart)
    })

}


let filterEspecifico = filterInformeEspecifico.querySelectorAll(".hidebox")


for (let i = 0; i < filterEspecifico.length; i++) {

    filterEspecifico[i].addEventListener("click", () => {

        //alert(filterEspecifico[i].value)


        //let parentDiv = filterAtributos[i].closest("label") ;

        //console.log(parentDiv)
        // filterEspecifico[i].classList.add("seleccionado")
        //console.log(mergedAtributosCompletos)
        loadChartsEspecificas(filterEspecifico[i].value)
        //console.log(dataVerticalAtributos.datasets[0])
        // sortBarChart(filterGeneral[i].value, mergedAtributos, atributosChart)
    })

}


function loadChartsEspecificas(value) {
    // alert("hola")

    if (value == "todas") {

        loadAllChart()

    }




}

function loadAllChart() {


    let filter = answers.map((a) => { return a.respuestas })
    console.log(filter)

    console.log(categoria)

    //let filtradoCategoria = filter.filter((e)=>{ return e.categoria=="Clima"}) 




    let filtrado = filter.map((e) => {

        let filtradoFinal = e.filter((x) => {

            return x.categoria == "Estrategia" && x.numeroPregunta==1
        })
        return filtradoFinal

    })

    finalNames = ["1", "2", "3", "4", "5", "6", "7"]

    console.log(filtrado)

    let sumado = sumAllQuestionsF(filtrado)


    // sumado.map((e)=>{ e.value = e.value/filtrado.length

    // return e
    // })

    console.log(sumado)
    //const getAllValuesByDataType = filterResponseByTag(finalNames, "respuestas", filtrado,"name");

    //console.log(getAllValuesByDataType);

    //const getAllValuesByParameter = filterResponseByParameter(finalNames, "values", sumado);
    //console.log(getAllValuesByParameter)

    
    sumado.map((e,index)=>{

        e.background = getColor("Estrategia")
        return e
    })

    console.log(sumado)
    sortBarChart("0",sumado,vChartPregunta1)

    vChartPregunta1.options.scales.y.max= parseInt(currentTest.numberEmployers)
    // vChartPregunta1.config.data.labels= finalNames
    vChartPregunta1.update()
    
    console.log(filtrado)
}

function loadTest(nameTest) {

    console.log(nameTest)

    currentTest = testArray.find((e) => { return e.testName == nameTest })

    console.log(currentTest)
    console.log(nameTest)
    db.collection("answers").where("testId", "==", currentTest.id).get().then(function (querySnapshot) {


        if (querySnapshot.empty) {

            // alert("vacio")

            emptyAnswers.style.display = "flex"

            dashboardContainer.style.display = "none"

            return

        }

        //alert("vacio")
        querySnapshot.forEach((doc) => {

            emptyAnswers.style.display = "none"
            dashboardContainer.style.display = "flex"

            console.log(doc.data())
            answers.push(doc.data())
        })

    }).then(() => {

        console.log(answers)


        //listAnswers = answers

        loadInforme()

    });
}

atributos.forEach((btn) => {


    btn.addEventListener("click", () => {

        let name = btn.querySelector("p")

        atributos.forEach((e) => {


            let name = e.querySelector("p")
            name.style.color = "black"
            e.classList.remove("selected")

        })


        btn.classList.add("selected")

        loadInforme()
    })
})


function loadInforme() {


    let selected = atributosContainer.querySelector(".selected")
    let title = selected.querySelector("p")
    let name = selected.querySelector("p").textContent
    categoria = name
    title.style.color = getColor(name)

    // -5% para que cuadre

    console.log(name)
    let respuestas = answers
    let respuestaCategoria = answers.map((e) => { return e.values })

    //console.log(respuestaCategoria)

    let respuestaSumado = sumAllCategories(respuestaCategoria)

    respuestaSumado.map((e) => {
        e.value = parseInt(e.value / answers.length)

        return e
    })

    console.log(respuestaSumado)
    let filtrado = respuestaSumado.find(e => { return e.name === name })

    console.log(filtrado)
    let promedio = 0

    respuestas.forEach((respuesta) => {

        promedio += respuesta.total

    })

    promedio = promedio / respuestas.length

    //let value = Math.round(promedio * 100 / maximoCategoria)

    valueArrow.textContent = parseInt(promedio * 100 / maximoGeneral) + "%"

    arrow.style.top = 100 - parseInt(promedio * 100 / maximoGeneral) - 5 + "%"

    desempenoValue.textContent = parseInt(filtrado.value * 100 / maximoCategoria) + "%"

    getInfoPuntaje(name)

    desempenoName.textContent = getInfoName(parseInt(filtrado.value * 100 / maximoCategoria))

    desempenoValueName.style.color = getColor(name)

    desempenoDescription.textContent = getInfoDescription(parseInt(filtrado.value * 100 / maximoCategoria))

    loadCharts("general")
}



function getInfoPuntaje(categoria) {

    console.log(categoria)

    let alta = document.querySelector("#descripcionAlta")
    let baja = document.querySelector("#descripcionBaja")

    let name = document.querySelectorAll(".puntaje__name")

    name.forEach((e) => {

        e.style.color = getColor(categoria)
    })
    switch (categoria) {


        case "Estrategia": {

            alta.textContent = "La compañía tiene un plan que permite vigilar los trabajos y que los esfuerzos estén apoyando la dirección a la que se quiere ir, todos los procesos giran en torno a un plan final sobre lo que tiene que ser la organización."

            baja.textContent = "La compañía no tiene un plan que le permita a los trabajadores observar que tan efectivos son sus esfuerzos por innovar, ya que no tienen una meta establecida o un modelo que seguir."

            break

        }

        case "Gobernanza": {

            alta.textContent = "La compañía permite y evitar obstaculizar a los trabajadores que quieran intentar nuevas ideas y siempre está disponible a cambiar según lo que se requiera, probar, además dan métricas con las cuales los trabajadores pueden observar la viabilidad de sus ideas."

            baja.textContent = "La compañía es rígida, sigue la estructura organizacional antigua sin falta, limita que tanto se permite experimentar, además se sigue las órdenes de los que están en altas posiciones dentro de la organización sin importar que tan poco viables sean las ideas."

            break

        }

        case "Colaboración": {

            alta.textContent = "La compañía promueve y garantiza la comunicación entre personas dentro y fuera de la organización, hace que diferentes departamentos interactúen entre ellos y tiene canales o espacios para garantizar una comunicación clara."

            baja.textContent = "La compañía separa mucho a los trabajadores y sus departamentos, cuando trabajan en grupo su productividad se ve afectada por la falta de entendimiento mutuo y rara vez diferentes departamentos se comunican de forma constante y clara con los demás."

            break

        }

        case "Clima": {

            alta.textContent = "La compañía es un espacio que le permite a los trabajadores compartir sus ideas de forma positiva, tiene una cultura que no le teme a fallar y siempre están abiertos a recibir nuevas formas de actuar que permitan el cambio."

            baja.textContent = "La compañía es un espacio abrumador para los trabajadores, no se les permite compartir ideas o sugerencias que cambien como actúa la organización, además los trabajadores le temen al fallo por las consecuencias que puede traer."

            break

        }


        case "Personas": {

            alta.textContent = "La compañía tiene equipos diversos, llenos de personas que les gusta formar parte de proyectos, buscan nuevas formas de resolver obstáculos, además de dar espacios de crecimiento y siempre buscan reclutar gente que contribuirá a la cultura que busca la compañía."

            baja.textContent = "La compañía tiene equipos que no les gusta explorar nuevas alternativas, tienen ideas que son muy parecidas y rara vez buscan arriesgarse, además la organización no hace esfuerzos para formar o contratar gente que cambie la cultura organizacional actual"

            break

        }


        case "Liderazgo": {

            alta.textContent = "Nuestros líderes nos convocan a actuar. Se promueve un sesgo hacia la acción. Nos invitan a evitar la parálisis por el análisis y reflejan los valores que significa tener una compañía buena cultura organizacional."

            baja.textContent = "Nuestros jefes no nos exigen o incitan a actuar, están contentos con solo hacer el trabajo requerido para el funcionamiento de la organización."

            break

        }


        case "Procesos": {

            alta.textContent = "La compañía tiene métricas y monitorea las actividades y cambios que se llevan a cabo, ayuda a los trabajadores con sus propias propuestas a través de modelos base a seguir y evalúa que tan posibles y beneficiosas son las ideas que se proponen."

            baja.textContent = "La compañía no vigila como se llega a las metas, las propuestas se rechazan sin aviso alguno y no se comunica bien que sería una propuesta prometedora o una mal planteada para la organización."

            break

        }

        case "Recursos": {

            alta.textContent = "La compañía tiene presupuesto para las nuevas propuestas y la experimentación que requieren, los espacios requeridos tienen las herramientas y equipo necesario, además de que se cuenta con expertos si es necesario consultar con ellos."

            baja.textContent = "La compañía no tiene presupuesto para la innovación, los espacios y equipos que se tienen dejan mucho que desear o son inadecuados para los cambios que se buscan lograr."

            break

        }

        case "Resultados": {

            alta.textContent = "La compañía tiene recompensas por los esfuerzos en la forma de más ventas, más fama, trabajadores más fieles y felices, además de saber cuando algo es financieramente viable para saber si debería continuar o cortar iniciativas que lastiman a la compañía."

            baja.textContent = "La compañía le cuesta mostrar los resultados de sus cambios, las recompensas no se pueden ver o cuantificar y sienten que todos los esfuerzos no han rendido frutos, la compañía no sabe terminar proyectos que consumen demasiados recursos para ser viables."

            break

        }
    }
}


function getInfoName(value) {



    let proficiencyName = ""


    if (value <= 60) proficiencyName = "Principiante"
    if (value > 60 && value <= 78) proficiencyName = "Competente"
    if (value > 78 && value <= 90) proficiencyName = "Proficiente"
    if (value > 90) proficiencyName = "Experto"

    return proficiencyName
}





function getInfoDescription(value) {



    let proficiencyName = ""


    if (value <= 60) proficiencyName = "Tus resultados muestran que estas iniciando el proceso de mejora, pero todavía tienes un largo camino por delante."
    if (value > 60 && value <= 78) proficiencyName = "Tus resultados muestran que tu compañía está en el proceso y todavía hay cambios que lograr pero que con dedicación y esfuerzo lo lograran."
    if (value > 78 && value <= 90) proficiencyName = "Tus resultados muestran que están en una situación favorable pero que todavía quedan unos pequeños detalles por mejorar."
    if (value > 90) proficiencyName = "Tus resultados muestran el ejemplo de excelencia y cambio que es tu compañía, recuerda seguir así."

    return proficiencyName
}






function loadCharts(nivel) {

    console.log(categoria)

    let titulos = document.querySelectorAll(".titleChart")

    titulos.forEach((e) => {

        e.textContent = categoria
        e.style.color = getColor(categoria)

    })
    if (nivel === "general") {

        graficasGenerales.style.display = "flex"
        filterInformeEspecifico.style.display = "none"
        graficasEspecificas.style.display = "none"
        loadChartPregunta()

        loadChartEquipo()
        loadChartJerarquia()

    }

    else {

        //alert(xd)
        filterInformeEspecifico.style.display = "flex"
        graficasGenerales.style.display = "none"
        graficasEspecificas.style.display = "flex"

    }


}


function loadChartPregunta() {



    let title = cardCategoriaPregunta.querySelector(".titleChart")
    title.textContent = categoria
    title.style.color = getColor(categoria)
    let filter = answers.map((a) => { return a.respuestas })

    console.log(filter)
    //let prueba = sumAllSubCategories(filter)

    //console.log(prueba)

    let filtrado = filter.map((e) => {

        let filtradoFinal = e.filter((x) => {

            return x.categoria == categoria
        })
        return filtradoFinal

    }

    )

    console.log(filtrado)

    let sumados = sumAllQuestions(filtrado)
    console.log(sumAllQuestions(filtrado))

    let respuestasDivididas = sumados.map((e) => {

        e.value = e.value / answers.length

        return e
    })

    console.log(respuestasDivididas)

    let names = respuestasDivididas.map((e) => {

        return "Pregunta " + e.numeroPregunta
    })

    let merged = respuestasDivididas.map((e) => {

        e.background = getColor(e.categoria)
        e.name = " Pregunta " + e.name
        e.value = parseInt(e.value * 100 / maximoPregunta)

        return e
    })

    console.log(merged)

    datoPregunta = merged
    //atributosChart.config.data.labels = names


    sortBarChart("0", merged, vChartAtributosPregunta)
}


function loadChartEquipo() {



    const names = answers.map((a) => {
        return a.area
    })

    const finalNames = [...new Set(names)];
    //let filter = listAnswers.filter((a) => { return a.area == department })
    console.log(finalNames)



    const getAllValuesByDataType = filterResponseByTag(finalNames, "values", answers, "area");

    console.log(getAllValuesByDataType);

    const getAllValuesByParameter = filterResponseByParameter(categoria, "values", getAllValuesByDataType);
    console.log(getAllValuesByParameter)


    getAllValuesByParameter.map((e) => {
        e.value = parseInt(e.value * 100 / maximoCategoria, e.background = randomRGB())
        return e
    })

    datoEquipo = getAllValuesByParameter


    sortBarChart("0", getAllValuesByParameter, vChartAtributosEquipo)

    //   let respuestasFilter = answers.map((respuesta) => { return respuesta.values })
    //   console.log(respuestasFilter)
    //   let respuestaOrdenada = sumAllCategories(respuestasFilter)

    //   console.log(respuestaOrdenada)

    //   respuestaOrdenada.map((e) => { e.value = parseInt((e.value / filter.length)*100/maximoCategoria), e.background = getColor(e.name)
    //   return e})
    //   console.log(respuestaOrdenada)
}



function loadChartJerarquia() {


    console.log(answers)
    const names = answers.map((a) => {
        return a.jerarquia
    })

    const finalNames = [...new Set(names)];
    //let filter = listAnswers.filter((a) => { return a.area == department })
    console.log(finalNames)



    const getAllValuesByDataType = filterResponseByTag(finalNames, "values", answers, "jerarquia");

    console.log(getAllValuesByDataType);

    const getAllValuesByParameter = filterResponseByParameter(categoria, "values", getAllValuesByDataType);
    console.log(getAllValuesByParameter)


    getAllValuesByParameter.map((e) => {
        e.value = parseInt(e.value * 100 / maximoCategoria, e.background = randomRGB())
        return e
    })

    datoJerarquia = getAllValuesByParameter


    sortBarChart("0", getAllValuesByParameter, vChartAtributosJerarquia)

    //   let respuestasFilter = answers.map((respuesta) => { return respuesta.values })
    //   console.log(respuestasFilter)
    //   let respuestaOrdenada = sumAllCategories(respuestasFilter)

    //   console.log(respuestaOrdenada)

    //   respuestaOrdenada.map((e) => { e.value = parseInt((e.value / filter.length)*100/maximoCategoria), e.background = getColor(e.name)
    //   return e})
    //   console.log(respuestaOrdenada)
}


/////////////////////////////////////////////////     Filtrar//////////////
let filterPregunta = filterChartPregunta.querySelectorAll(".hidebox")
console.log(filterPregunta)

for (let i = 0; i < filterPregunta.length; i++) {

    filterPregunta[i].addEventListener("click", () => {

        console.log(filterPregunta[i].value)

        //alert("entró")

        //let parentDiv = filterAtributos[i].closest("label") ;

        console.log(datoPregunta)
        filterPregunta[i].classList.add("seleccionado")
        // console.log(mergedAtributosCompletos)

        console.log(dataVerticalAtributos.datasets[0])
        sortBarChart(filterPregunta[i].value, datoPregunta, vChartAtributosPregunta)
    })

}




let filterEquipo = filterChartEquipo.querySelectorAll(".hidebox")
console.log(filterPregunta)

for (let i = 0; i < filterEquipo.length; i++) {

    filterEquipo[i].addEventListener("click", () => {

        console.log(filterEquipo[i].value)

        //alert("entró")

        //let parentDiv = filterAtributos[i].closest("label") ;

        console.log(datoEquipo)
        filterEquipo[i].classList.add("seleccionado")
        // console.log(mergedAtributosCompletos)

        //console.log(dataVerticalAtributos.datasets[0])
        sortBarChart(filterEquipo[i].value, datoEquipo, vChartAtributosEquipo)
    })

}




let filterJerarquia = filterChartJerarquia.querySelectorAll(".hidebox")
//console.log(filterPregunta)

for (let i = 0; i < filterJerarquia.length; i++) {

    filterJerarquia[i].addEventListener("click", () => {

        console.log(filterJerarquia[i].value)

        //alert("entró")

        //let parentDiv = filterAtributos[i].closest("label") ;

        console.log(datoEquipo)
        filterJerarquia[i].classList.add("seleccionado")
        // console.log(mergedAtributosCompletos)

        //console.log(dataVerticalAtributos.datasets[0])
        sortBarChart(filterJerarquia[i].value, datoJerarquia, vChartAtributosJerarquia)
    })

}

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
                max: 100,
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


// const vChartPregunta2 = new Chart(
//     document.getElementById('vChartCategoriaJerarquia'),
//     configVerticalAtributoJerarquiaChart)

// const vChartPregunta3 = new Chart(
//     document.getElementById('vChartCategoriaJerarquia'),
//     configVerticalAtributoJerarquiaChart)



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
    console.log(dataSort)
    console.log(Scolor)
    console.log(sName)


    //console.log(chart)

    chart.config.data.datasets[0].data = sValue
    chart.config.data.labels = sName
    chart.config.data.datasets[0].backgroundColor = Scolor
    chart.update()
}





