const testSelect = document.querySelector("#testList")
const arrow = document.querySelector(".arrow")
const valueArrow = document.querySelector("#valueArrow")
const desempenoValue = document.querySelector(".desempenoValue")
const desempenoDescription = document.querySelector(".desempenoDescription")
const desempenoName = document.querySelector(".desempenoName")
const desempenoValueName =document.querySelector(".desempenoValueName")

const atributosContainer = document.querySelector(".atributosContainer")

const atributos = atributosContainer.querySelectorAll(".atributo")
console.log(arrow)

let testArray = []
let answers = []
auth.onAuthStateChanged((user) => {

    if (user) {

        docRef = db.collection("surveys").where("userId", "==", user.uid)
        docRef.get().then((docSnapshot) => {

            if (!docSnapshot.empty) {

                docSnapshot.forEach((doc) => {

                    var opt = document.createElement('option');
                    let tempTest = doc.data()

                    console.log(doc.id)
                    tempTest.id = doc.id
                    testArray.push(tempTest)
                    opt.value = doc.data().name
                    opt.textContent = doc.data().name
                    console.log(opt)
                    testSelect.appendChild(opt)

                    //currentTest = doc.data()
                })

                console.log(testList.value)

                loadTest(testList.value)

                testList.addEventListener("change", () => {

                    //alert("xd")
                    loadTest(testList.value)

                })

            }
            else {



            }


        })

    }
})


function loadTest(nameTest) {

    currentTest = testArray.find((e) => { return e.name == nameTest })

    console.log(currentTest)
    console.log(nameTest)
    db.collection("answers").where("testId", "==", currentTest.id).get().then(function (querySnapshot) {


        if (querySnapshot.empty) {

            // alert("vacio")

            return

        }

        //alert("vacio")
        querySnapshot.forEach((doc) => {

            console.log(doc.data())
            answers.push(doc.data())
        })

    }).then(() => {

        console.log(answers)


        //listAnswers = answers

        loadInforme()

    });
}

atributos.forEach((btn)=>{


    btn.addEventListener("click",()=>{

        let name = btn.querySelector("p")

        atributos.forEach((e)=>{


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

    title.style.color = getColor(name)

    // -5% para que cuadre

    console.log(name)
    let respuestas = answers
    let respuestaCategoria = answers.map((e)=>{ return e.values})

    //console.log(respuestaCategoria)

    let respuestaSumado = sumAllCategories(respuestaCategoria)
    
    respuestaSumado.map((e)=>{
        e.value = parseInt(e.value / answers.length)
        
        return e
    })

    console.log(respuestaSumado)
    let filtrado = respuestaSumado.find(e=>{ return e.name === name})

    console.log(filtrado)
    let promedio = 0

    respuestas.forEach((respuesta) => {

        promedio += respuesta.total

    })

    promedio = promedio / respuestas.length

    //let value = Math.round(promedio * 100 / maximoCategoria)

    valueArrow.textContent = Math.round(promedio * 100 / maximoGeneral) + "%"

    arrow.style.top = 100 - Math.round(promedio * 100 / maximoGeneral) - 5 + "%"

    desempenoValue.textContent = parseInt(filtrado.value *100 /maximoCategoria) + "%"

    getInfoPuntaje(name)

    desempenoName.textContent = getInfoName(parseInt(filtrado.value *100 /maximoCategoria))

    desempenoValueName.style.color = getColor(name)

    desempenoDescription.textContent = getInfoDescription(parseInt(filtrado.value *100 /maximoCategoria))
    

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


function getInfoName(value){



    let proficiencyName = ""


  if (value <= 60) proficiencyName = "Principiante"
  if (value > 60 && value <= 78) proficiencyName = "Competente"
  if (value > 78 && value <= 90) proficiencyName = "Proficiente"
  if (value > 90) proficiencyName = "Experto"

  return proficiencyName
}





function getInfoDescription(value){



    let proficiencyName = ""


  if (value <= 60) proficiencyName = "Tus resultados muestran que estas iniciando el proceso de mejora, pero todavía tienes un largo camino por delante."
  if (value > 60 && value <= 78) proficiencyName = "Tus resultados muestran que tu compañía está en el proceso y todavía hay cambios que lograr pero que con dedicación y esfuerzo lo lograran."
  if (value > 78 && value <= 90) proficiencyName = "Tus resultados muestran que están en una situación favorable pero que todavía quedan unos pequeños detalles por mejorar."
  if (value > 90) proficiencyName = "Tus resultados muestran el ejemplo de excelencia y cambio que es tu compañía, recuerda seguir así."

  return proficiencyName
}