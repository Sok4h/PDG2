const openModalHigh = document.querySelector("#btnInfoHigh")
const openModalLow = document.querySelector("#btnInfoLow")
//const survey = document.querySelector(".survey")
const dialog = document.querySelector(".dialogSurvey")
const closeDialog = document.querySelector(".btnCloseModal")
const dialogTitle = dialog.querySelector(".dialogInfo")
const companyAreas = document.querySelector("#companyAreas")
const companyJerarchy = document.querySelector("#companyJerarquia")
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
const proficiencyContainer = document.querySelector(".proficiencyContainer")

const companyPosition = document.querySelector("#companyPosition")
const position = document.querySelector(".position")
let formularios = document.querySelectorAll(".options")

let btnBasicInfo = document.querySelector("#btnBasicInfo")
console.log(btnBasicInfo)
btnBasicInfo.style.display = "none"
let currentQuestion = 0
let preguntas = []

console.log(btnNextQuestion)
let multiplicador = 5
let counter = 1

let survey = document.querySelectorAll(".survey")


//cargar info



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const testId = urlParams.get('testId')
console.log(testId)

let test
surveyContainer.style.display = "none"
surveyBasicInfo.style.display = "none"
position.style.display = "none"


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



        companyJerarchy.addEventListener("change", () => {


            position.style.display = "flex"
            let value = companyJerarchy.value

            if (value == "") {
                position.style.display = "none"
                return
            }

            if (value === "lowestHierarchy") {

                position.style.display = "none"
                btnBasicInfo.style.display = "block"

            }

            else {

                loadPositions(test[value])




            }



        })




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


function loadPositions(positions) {

    btnBasicInfo.style.display = "block"


    positions.forEach((position) => {

        var opt = document.createElement('option');
        opt.value = position
        opt.innerHTML = position
        companyPosition.appendChild(opt)

    })

}


console.log(preguntasFinales[5])
function startSurvey() {

    console.log(test)
    surveyEmail.style.display = "none"
    surveyBasicInfo.style.display = "flex"



    setupQuestions(currentQuestion)

    function setupQuestions(currentQuestion) {


        console.log(currentQuestion)
        console.log(counter*multiplicador)
        let multiplicado = counter*multiplicador

        for(let i = 0; i < 5; i++) {
           
            if(currentQuestion!=0){

                formularios[i].querySelector('input[name=optionSurvey]:checked').checked = false;
            }
           let preguntaaa = preguntasFinales[currentQuestion+i]
           console.log(preguntaaa)

            

                //console.log(j)
                tippy(survey[i].querySelector('.btnInfoLow'), {

                    content: preguntasFinales[currentQuestion+i].hintLow
    
                })
    
                tippy(survey[i].querySelector('.btnInfoHigh'), {
    
                    content: preguntasFinales[currentQuestion+i].hintHigh
    
                })
                let surveyTitle = survey[i].querySelector(".survey__title")
                surveyTitle.textContent = preguntasFinales[currentQuestion+i].pregunta

            
            

        }

        // tippy('#btnInfoLow', {

        //     content: preguntasFinales[currentQuestion].hintLow

        // })




        const progress = document.querySelector(".progressDone")

        progress.style.width = (100 * currentQuestion) / preguntasFinales.length + '%'

        console.log(progress.style.width)

        if (currentQuestion == preguntasFinales.length - 5) {

            btnNextQuestion.textContent = "Finalizar"
        }

        // btnNextQuestion.classList.remove("btn--surveyActive")
        // btnNextQuestion.classList.add("btn--survey")

        // options.forEach((option) => {

        //     option.checked = false
        // })

        // console.log(preguntasFinales[currentQuestion])
        // surveyTitle.textContent = preguntasFinales[currentQuestion].pregunta

    }





    
    function checkInputs() {

        let seleccionado = true
        

        formularios.forEach((form) => {

            console.log(form.optionSurvey.value)
                let checked = form.querySelector('input[name=optionSurvey]:checked');

                console.log(checked)
                if (checked) {
                    //alert("seleccionado")
                    //seleccionado = true
                    btnNextQuestion.classList.remove("btn--survey")
                    btnNextQuestion.classList.add("btn--surveyActive")
                   
                } else {
                       
                    console.log("sin llenar")
                    seleccionado = false
                    return  seleccionado
                }
            

        })

        return seleccionado
    }


    // form.addEventListener('change', function () {

    //     let checked = form.querySelector('input[name=optionSurvey]:checked');
    //     if (checked) {

    //         btnNextQuestion.classList.remove("btn--survey")
    //         btnNextQuestion.classList.add("btn--surveyActive")

    //     }
    // });



    // nueva forma mostrar hint

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
            respuesta.position = companyPosition.value
            respuesta.jerarquia = getJerarquiaName(companyJerarchy.value)
            surveyBasicInfo.style.display = "none"
            surveyContainer.style.display = "flex"

            console.log(respuesta)
        }
    })


    btnNextQuestion.addEventListener("click", () => {

        console.log(checkInputs())
        if(!checkInputs()){ 

            alert("complete todas las preguntas")

            return
        }

        //alert("noooo")
       // if (!btnNextQuestion.classList.contains("btn--surveyActive")) return
        let value = checkRadio()

        for(let i = 0;i<5;i++){

            let tempRespuesta = preguntasFinales[i+currentQuestion]
            tempRespuesta.respuesta = formularios[i].optionSurvey.value

            console.log(tempRespuesta)
            preguntasFinales[i+currentQuestion] = tempRespuesta

            console.log(preguntasFinales[i])

        }

        // let tempRespuesta = preguntasFinales[currentQuestion]
        // tempRespuesta.respuesta = value
        // preguntasFinales[currentQuestion] = tempRespuesta
        // console.log(preguntasFinales[currentQuestion])


        if (currentQuestion == preguntasFinales.length - 5) {

            let Estrategia = 0, Gobernanza = 0, Clima = 0, Personas = 0, Liderazgo = 0, Colaboracion = 0, Procesos = 0, Recursos = 0, Resultados = 0


            for (let i = 0; i < preguntasFinales.length; i++) {

                switch (preguntasFinales[i].categoria) {


                    case "Estrategia":
                        Estrategia += parseInt(preguntasFinales[i].respuesta)
                        console.log("Estrategia " + Estrategia)
                        break

                    case "Gobernanza":

                        Gobernanza += parseInt(preguntasFinales[i].respuesta)

                        console.log("Gobernanza " + Gobernanza)

                        break

                    case "Clima":

                        Clima += parseInt(preguntasFinales[i].respuesta)

                        console.log("Clima " + Clima)

                        break

                    case "Personas":

                        Personas += parseInt(preguntasFinales[i].respuesta)

                        console.log("Personas " + Personas)

                        break;

                    case "Liderazgo":

                        Liderazgo += parseInt(preguntasFinales[i].respuesta)

                        console.log("Liderazgo " + Liderazgo)

                        break;
                    case "Colaboración":

                        Colaboracion += parseInt(preguntasFinales[i].respuesta)

                        console.log("Colaboración " + Colaboracion)

                        break;


                    case "Procesos":

                        Procesos += parseInt(preguntasFinales[i].respuesta)

                        console.log("Procesos " + Procesos)

                        break;



                    case "Recursos":

                        Recursos += parseInt(preguntasFinales[i].respuesta)

                        console.log("Recursos " + Recursos)

                        break;



                    case "Resultados":

                        Resultados += parseInt(preguntasFinales[i].respuesta)

                        console.log("Resultados " + Resultados)

                        break;

                }
            }


            let subCategorias = []

            for (let i = 0; i < preguntasFinales.length; i++) {
                console.log(preguntasFinales[i])
                let tempSubCategoria = { name: preguntasFinales[i].subcategoria, value: parseInt(preguntasFinales[i].respuesta), categoria: preguntasFinales[i].categoria }

                subCategorias.push(tempSubCategoria)
            }

            console.log(subCategorias)

            let values = []
            let tempValue1 = { name: "Estrategia", value: Estrategia }
            let tempValue2 = { name: "Gobernanza", value: Gobernanza }
            let tempValue3 = { name: "Clima", value: Clima }
            let tempValue4 = { name: "Colaboración", value: Colaboracion }
            let tempValue5 = { name: "Personas", value: Personas }
            let tempValue6 = { name: "Liderazgo", value: Liderazgo }
            let tempValue7 = { name: "Procesos", value: Procesos }
            let tempValue8 = { name: "Recursos", value: Recursos }
            let tempValue9 = { name: "Resultados", value: Resultados }


            let total = Estrategia + Gobernanza + Clima + Colaboracion + Personas + Liderazgo + Procesos + Recursos + Resultados
            values.push(tempValue1)
            values.push(tempValue2)
            values.push(tempValue3)
            values.push(tempValue4)
            values.push(tempValue5)
            values.push(tempValue6)
            values.push(tempValue7)
            values.push(tempValue8)
            values.push(tempValue9)


            respuesta.values = values
            respuesta.total = total
            console.log(subCategorias)
            respuesta.subCategorias = subCategorias



            respuesta.respuestas = preguntasFinales


            console.log(respuesta)
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

            currentQuestion+=5
            counter++
            

            console.log("counter" + counter)
            console.log("current question" + currentQuestion)

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