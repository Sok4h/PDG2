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
const form = document.querySelector(".options")
const btnNextQuestion = document.querySelector("#btnNextQuestion")
const btnEmail = document.querySelector("#btnEmail")
const emailTest = document.querySelector("#emailTest")
const surveyEmail = document.querySelector("#surveyEmail")
const surveyContainer = document.querySelector(".surveyContainer")
let currentQuestion = 0
let preguntas = []



//cargar info




const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const testId = urlParams.get('testId')
console.log(testId)

let test
surveyContainer.style.display = "none"
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

            surveyContainer.style.display = "none"
            surveyBasicInfo.style.display = "none"

            //alert("enlace no valido")
            return
        }

        btnEmail.addEventListener("click", () => {

            let idValido = false

            test.emails.forEach((email) => {

                if (emailTest.value == email) {

                    idValido = true

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
        hintHigh: "El termino innovacion tiene muchas definiciones y es diferente para todos los miembros del equipo, incluso los lideres no pueden llegar a un acuerdo para la definicion.",
        hintLow: "El termino innovacion tiene muchas definiciones y es diferente para todos los miembros del equipo, incluso los lideres no pueden llegar a un acuerdo para la definicion."
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


    let pregunta10 = {

        categoria: "Colaboración",
        subcategoria: "Fluidez",
        pregunta: "Hay una comunicación constante sobre los aspectos relacionados con innovación que fluye en diversas direcciones y en diversos canales. La información es clara, periódica y accesible",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }

    let pregunta11 = {

        categoria: "Colaboración",
        subcategoria: "Resultados",
        pregunta: "Los resultados de las iniciativas de innovación se hacen públicos y se reconocen los impactos positivos generados por individuos, grupos o la organización, dadas las métricas establecidas para medir el éxito.",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }

    let pregunta12 = {

        categoria: "Colaboración",
        subcategoria: "Transparencia",
        pregunta: "Las personas que participan con ideas o propuestas reciben una retroalimentación transparente, adecuada y oportuna para comprender las decisiones que se han tomado sobre estas",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }


    let pregunta13 = {

        categoria: "Personas",
        subcategoria: "Conocimiento",
        pregunta: "Tenemos un grupo humano capacitado y con las competencias para desarrollar proyectos de innovación con éxito.",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }


    let pregunta14 = {

        categoria: "Personas",
        subcategoria: "Diversidad",
        pregunta: "La organización promueve la diversidad de pensamiento, se respetan las diferencias y se potencian las particularidades de cada uno de los colaboradores.",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }

    let pregunta15 = {

        categoria: "Personas",
        subcategoria: "Eventos",
        pregunta: "La organización tiene eventos donde se estimula la creatividad y se convoca a la comunidad interesada sobre la innovación para fortalecer lazos y promover nuevas conexiones",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }

    let pregunta17 = {

        categoria: "Liderazgo",
        subcategoria: "Acción",
        pregunta: "Nuestros líderes nos convocan a actuar. Se promueve un sesgo hacia la acción. Nos invitan a evitar la parálisis por el análisis.",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }

    let pregunta16 = {

        categoria: "Liderazgo",
        subcategoria: "Modelo a seguir",
        pregunta: "Los líderes asumen un rol activo y predican lo que aplican. Son ejemplo de lo que promueven y con sus actos dan muestra de lo que esperan de innovación. Los líderes son ejemplos a seguir en términos de innovación. ",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }

    let pregunta18 = {

        categoria: "Liderazgo",
        subcategoria: "Narrativas",
        pregunta: "Los líderes nos inspiran constantemente con historias sobre colaboradores y equipos que demuestran altos valores y resultados positivos sobre innovación. ",
        hintHigh: "este es el maximo2",
        hintLow: "este es el minimo2"
    }

    // let pregunta19 = {

    //     categoria: "Personas",
    //     subcategoria: "Conocimiento",
    //     pregunta: "Tenemos un grupo humano capacitado y con las competencias para desarrollar proyectos de innovación con éxito.",
    //     hintHigh: "este es el maximo2",
    //     hintLow: "este es el minimo2"
    // }


    preguntas.push(pregunta)
    preguntas.push(pregunta2)
    preguntas.push(pregunta3)
    preguntas.push(pregunta4)
    preguntas.push(pregunta5)
    preguntas.push(pregunta6)
    preguntas.push(pregunta7)
    preguntas.push(pregunta8)
    preguntas.push(pregunta9)

    ///////////////////////////////////////

    preguntas.push(pregunta10)
    preguntas.push(pregunta11)
    preguntas.push(pregunta12)
    preguntas.push(pregunta13)
    preguntas.push(pregunta14)
    preguntas.push(pregunta15)
    preguntas.push(pregunta16)
    preguntas.push(pregunta17)
    preguntas.push(pregunta18)

    console.log(preguntas.length)


    setupQuestions(currentQuestion)

    function setupQuestions(currentQuestion) {

        const progress = document.querySelector(".progressDone")

        progress.style.width = (100 * currentQuestion) / preguntas.length + '%'

        console.log(progress.style.width)

        if (currentQuestion == preguntas.length - 1) {

            btnNextQuestion.textContent = "Finalizar"
        }

        btnNextQuestion.classList.remove("btn--surveyActive")
        btnNextQuestion.classList.add("btn--survey")

        options.forEach((option) => {

            option.checked = false
        })
        surveyTitle.textContent = preguntas[currentQuestion].pregunta

    }




    form.addEventListener('change', function () {

        let checked = form.querySelector('input[name=optionSurvey]:checked');
        if (checked) {

            btnNextQuestion.classList.remove("btn--survey")
            btnNextQuestion.classList.add("btn--surveyActive")

        }
    });



    // nueva forma mostrar hint

    tippy('#btnInfoLow', {

        content: pregunta.hintLow

    })


    tippy('#btnInfoHigh', {

        content: pregunta.hintHigh

    })
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
            surveyContainer.style.display = "flex"
        }
    })


    btnNextQuestion.addEventListener("click", () => {

        if (!btnNextQuestion.classList.contains("btn--surveyActive")) return
        let value = checkRadio()
        let tempRespuesta = preguntas[currentQuestion]
        tempRespuesta.respuesta = value
        preguntas[currentQuestion] = tempRespuesta
        console.log(preguntas[currentQuestion])


        if (currentQuestion == preguntas.length - 1) {

            let Estrategia = 0, Gobernanza = 0, Clima = 0, Personas = 0, Liderazgo = 0
            for (let i = 0; i < preguntas.length; i++) {

                switch (preguntas[i].categoria) {


                    case "Estrategia":
                        Estrategia += parseInt(preguntas[i].respuesta)


                        console.log("Estrategia " + Estrategia)
                        break

                    case "Gobernanza":

                        Gobernanza += parseInt(preguntas[i].respuesta)

                        console.log("Gobernanza " + Gobernanza)

                        break

                    case "Clima":

                        Clima += parseInt(preguntas[i].respuesta)

                        console.log("Clima " + Clima)

                        break

                    case "Personas":

                        Clima += parseInt(preguntas[i].respuesta)

                        console.log("Personas " + Personas)

                        break;

                    case "Liderazgo":

                        Liderazgo += parseInt(preguntas[i].respuesta)

                        console.log("Liderazgo " + Liderazgo)

                        break;
                    case "Colaboración":

                        Colaboración += parseInt(preguntas[i].respuesta)

                        console.log("Colaboración " + Personas)

                        break;

                }
            }

            let values = []
            let tempValue1 = { name: "Estrategia", value: parseInt(Estrategia / 3) }
            let tempValue2 = { name: "Gobernanza", value: parseInt(Gobernanza / 3) }
            let tempValue3 = { name: "Clima", value: parseInt(Clima / 3) }
            let total = Estrategia + Gobernanza + Clima
            values.push(tempValue1)
            values.push(tempValue2)
            values.push(tempValue3)

            respuesta.values = values
            respuesta.total = total
            // console.log(respuesta)
            // console.log(Gobernanza)
            // console.log(Clima)


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