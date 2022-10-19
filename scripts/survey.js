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
let currentQuestion=0
let preguntas =[]


options[3].checked=true
survey.style.display="none"
let pregunta = {

    categoria: "Estrategia",
    subcategoria: "Definición",
    pregunta: "En la organización existe una definición clara y aspiracional de qué es la innovación en la organización",
    hintHigh: "este es el maximo",
    hintLow: "este es el minimo"
}

let pregunta2 = {

    categoria: "Estrategia",
    subcategoria: "Definición",
    pregunta: "La organización analiza constantemente el entorno y las tendencias para definir las apuestas e iniciativas que se deban desarrollar a futuro.",
    hintHigh: "este es el maximo2",
    hintLow: "este es el minimo2"
}

preguntas.push(pregunta)
preguntas.push(pregunta2)

setupQuestions(currentQuestion)

function setupQuestions(currentQuestion){

        if(currentQuestion==preguntas.length-1){
        
            btnNextQuestion.textContent="Finalizar"
        }

        options[3].checked=true
    surveyTitle.textContent=preguntas[currentQuestion].pregunta

}


let encuesta ={

    departamentos:["Ingenieria","Diseño","Marketing"]

}

let respuesta={}

openModalHigh.onclick = () => {

    dialogTitle.textContent = pregunta.hintHigh
    dialog.showModal()
}
openModalLow.onclick = () => {
    dialogTitle.textContent = pregunta.hintLow
    dialog.showModal()
}
closeDialog.onclick = () => { dialog.close() }

encuesta.departamentos.forEach((departament)=>{
    
    var opt = document.createElement('option');
    opt.value = departament
    opt.innerHTML=departament
    companyAreas.appendChild(opt)
})



document.querySelector("#btnBasicInfo").addEventListener("click",()=>{

    if(numberYears.value==""){

        alert("complete todos los campos")
    }else{


        respuesta.numberYears=numberYears.value
        respuesta.area=companyAreas.value
        surveyBasicInfo.style.display="none"
        survey.style.display="flex"
    }
})


btnNextQuestion.addEventListener("click",()=>{

    let value = checkRadio()
    let tempRespuesta = preguntas[currentQuestion]
    tempRespuesta.respuesta=value
    preguntas[currentQuestion]=tempRespuesta
    console.log(preguntas[currentQuestion])

    if(currentQuestion==preguntas.length-1){
       
       respuesta.respuestas = preguntas

       dialogTitle.textContent="prueba completada exitosamente,gracias por participar"
       closeDialog.textContent="Finalizar"
       dialogTitle.style.textAlign="center"
       dialog.showModal()
       closeDialog.addEventListener("click",()=>{
        window.location.href = "dashboard.html"
       })
    }
    else{
         
        currentQuestion++
        // console.log(currentQuestion++)
        setupQuestions(currentQuestion )
    }

})


function checkRadio(){

    for(let i=0; i<options.length;i++){

        if(options[i].checked){

            return options[i].value

        }
    }
}