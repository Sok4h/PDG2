const openModalHigh = document.querySelector("#btnInfoHigh")
const openModalLow = document.querySelector("#btnInfoLow")
const survey = document.querySelector(".survey")
const dialog = document.querySelector(".dialogSurvey")
const closeDialog = document.querySelector(".btnCloseModal")
const dialogTitle = dialog.querySelector(".dialogInfo")
const companyAreas = document.querySelector("#companyAreas")
const numberYears = document.querySelector("#numberYears")
const surveyBasicInfo = document.querySelector(".surveyBasicInfo")
const surveyTitle = document.querySelector(".survey__title")
const options = document.getElementsByName("optionSurvey")
const btnNextQuestion = document.querySelector("#btnNextQuestion")
const btnEmail = document.querySelector("#btnEmail")
const emailTest = document.querySelector("#emailTest")
const surveyEmail = document.querySelector("#surveyEmail")
let currentQuestion = 0
let preguntas = []
//const _ = require("lodash");


//cargar info




const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const testId = urlParams.get('testId')
console.log(testId)

let test
survey.style.display = "none"
surveyBasicInfo.style.display = "none"

let respuesta = {}
let testExists

verifyTest(testId)

function verifyTest(id) {


    db.collection("surveys").doc(id).get().then((doc) => {
        console.log(doc)
        if (doc.exists) {

            test = doc.data()
            testExists = true
        } else {

            testExists = false
        }
    }).then(() => {

        console.log(testExists)
        console.log(test)

        if (!testExists) {

            survey.style.display = "none"
            surveyBasicInfo.style.display = "none"

            //alert("enlace no valido")
            return
        }

        btnEmail.addEventListener("click", () => {
            
            let idValido=false

            test.emails.forEach((email)=>{

                if(emailTest.value == email){ 
                    
                    idValido=true
                    
                }

            })
            if (!idValido) {

                console.log("correo o id no valido")
                return
            }

            respuesta.email = emailTest.value
            console.log("niceee")

            startSurvey()


        })

    })


}


function startSurvey() {

    console.log(test)
    surveyEmail.style.display = "none"
    surveyBasicInfo.style.display = "flex"
    let pregunta = {

        categoria: "Estrategia",
        subcategoria: "Definición",
        pregunta: "En la organización existe una definición clara y aspiracional de qué es la innovación en la organización",
        hintHigh: "este es el maximo",
        hintLow: "este es el minimo"
    }

    let pregunta2 = {

        categoria: "Estrategia",
        subcategoria: "Entorno y Prospectiva",
        pregunta: "La organización analiza constantemente el entorno y las tendencias para definir las apuestas e iniciativas que se deban desarrollar a futuro.",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }

    let pregunta3 = {

        categoria: "Estrategia",
        subcategoria: "Visión",
        pregunta: "La organización analiza constantemente el entorno y las tendencias para definir las apuestas e iniciativas que se deban desarrollar a futuro.",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }



    let pregunta4 = {

        categoria: "Gobernanza",
        subcategoria: "Evaluación de ideas",
        pregunta: "La organización ofrece claridad y directrices sobre qué ideas se están buscando y sobre cómo se evaluarán y gestionarán para llevarlas a la realidad. Se tienen claras las reglas de juego para participar en las iniciativas de innovación.",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }

    let pregunta5 = {

        categoria: "Gobernanza",
        subcategoria: "Habilitadores",
        pregunta: "Las políticas y reglas de la institución en torno a la innovación permiten explorar nuevas ideas y habilitan a las personas para llevar esos proyectos a altos niveles de desarrollo e implementación.",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }

    let pregunta6 = {

        categoria: "Gobernanza",
        subcategoria: "Indicadores",
        pregunta: "Se cuenta con un sistema integral de métricas o indicadores que miden las entradas, el desarrollo y los resultados del sistema de innovación (Personas, Proyectos, Avances, Costos, Rentabilidad, etc). [→]",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }


    let pregunta7 = {

        categoria: "Clima",
        subcategoria: "Creatividad",
        pregunta: `El ambiente de la organización motiva a pensar creativamente y "por fuera de la caja" para generar ideas y propuestas novedosas y diferenciadas.`,
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }

    let pregunta8 = {

        categoria: "Clima",
        subcategoria: "Franqueza",
        pregunta: "Aquí podemos expresar de manera libre y sin miedos, nuestras opiniones, dudas, propuestas, críticas y sugerencias sobre situaciones, proyectos o iniciativas de innovación. [→]",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }

    let pregunta9 = {

        categoria: "Clima",
        subcategoria: "Toma de riesgos",
        pregunta: "La organización fomenta que persigamos libremente nuestra curiosidad y que tomemos riesgos para explorar nuevas oportunidades e ideas con un alto potencial de generar valor. [→]",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }
    preguntas.push(pregunta)
    preguntas.push(pregunta2)
    preguntas.push(pregunta3)
    preguntas.push(pregunta4)
    preguntas.push(pregunta5)
    preguntas.push(pregunta6)
    preguntas.push(pregunta7)
    preguntas.push(pregunta8)
    preguntas.push(pregunta9)

    console.log(preguntas)

    // let newPreguntas =_.shuffle(preguntas);
    //console.log(newPreguntas)


    setupQuestions(currentQuestion)

    function setupQuestions(currentQuestion) {

        if (currentQuestion == preguntas.length - 1) {

            btnNextQuestion.textContent = "Finalizar"
        }

        options[3].checked = true
        surveyTitle.textContent = preguntas[currentQuestion].pregunta

    }


    openModalHigh.onclick = () => {

        dialogTitle.textContent = pregunta.hintHigh
        dialog.showModal()
    }
    openModalLow.onclick = () => {
        dialogTitle.textContent = pregunta.hintLow
        dialog.showModal()
    }
    closeDialog.onclick = () => { dialog.close() }

    console.log(test.departments)
    test.departments.forEach((departament) => {

        var opt = document.createElement('option');
        opt.value = departament
        opt.innerHTML = departament
        companyAreas.appendChild(opt)
    })



    document.querySelector("#btnBasicInfo").addEventListener("click", () => {

        if (numberYears.value == "") {

            alert("complete todos los campos")
        } else {

            respuesta.testId = testId
            respuesta.numberYears = parseInt(numberYears.value)
            respuesta.area = companyAreas.value
            surveyBasicInfo.style.display = "none"
            survey.style.display = "flex"
        }
    })


    btnNextQuestion.addEventListener("click", () => {

        let value = checkRadio()
        let tempRespuesta = preguntas[currentQuestion]
        tempRespuesta.respuesta = value
        preguntas[currentQuestion] = tempRespuesta
        console.log(preguntas[currentQuestion])

        if (currentQuestion == preguntas.length - 1) {

            let Estrategia=0, Gobernanza=0, Clima =0
            for (let i = 0; i < preguntas.length; i++) {

                switch (preguntas[i].categoria) {


                    case "Estrategia":
                        Estrategia += parseInt(preguntas[i].respuesta)
                        

                        console.log("Estrategia "+Estrategia)
                        break

                    case "Gobernanza":

                        Gobernanza += parseInt(preguntas[i].respuesta)

                        console.log("Gobernanza "+Gobernanza)

                        break
                        
                    case "Clima":

                        Clima += parseInt(preguntas[i].respuesta)

                        console.log("Clima "+Clima)

                        break

                }
            }

            let values =[]
            let tempValue1 = {name:"Estrategia",value:Estrategia}
            let tempValue2 = {name:"Gobernanza",value:Gobernanza}
            let tempValue3 = {name:"Clima",value:Clima}
            
            values.push(tempValue1)
            values.push(tempValue2)
            values.push(tempValue3)

            respuesta.values=values
            console.log(respuesta)
            console.log(Gobernanza)
            console.log(Clima)


            respuesta.respuestas = preguntas

            db.collection("answers").add(respuesta).then(() => {

                dialogTitle.textContent = "prueba completada exitosamente,gracias por participar"
                closeDialog.textContent = "Finalizar"
                dialogTitle.style.textAlign = "center"
                dialog.showModal()
                closeDialog.addEventListener("click", () => {
                    window.location.href = "dashboard.html"
                })
            })

        }
        else {

            currentQuestion++
            // console.log(currentQuestion++)
            setupQuestions(currentQuestion)
        }

    })


    function checkRadio() {

        for (let i = 0; i < options.length; i++) {

            if (options[i].checked) {

                return options[i].value

            }
        }
    }

}