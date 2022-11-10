
const contentHistory = document.querySelector(".contentHistory")

auth.onAuthStateChanged((user) => {


    if (user) {
        db.collection("surveys").where("userId", "==", user.uid).get().then((docSnapshot) => {


            if (!docSnapshot.empty) {

                //alert("existe")

                docSnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    let tempDoc = doc.data()
                    console.log(doc.id)
                    let numberUser 
                    let respuestas =[]
                    db.collection("answers").where("testId","==",doc.id).get().then((docSnapshot)=>{
                            
                        docSnapshot.forEach((doc)=>{

                            respuestas.push(doc.data())
                        })
                        
                        numberUser =docSnapshot.size
                    }).then(()=>{

                        let estado = "En progreso*"
                        let porcentaje = getAverage(respuestas)

                        if(numberUser==tempDoc.numberEmployers) estado="Completada"
                        const div = document.createElement('div');
                        div.classList.add("card")
                        div.classList.add("test")
                        div.innerHTML = `<h2 class="">Prueba 2021</h2>
        
                        <div class="infoContainer">
                
                            <h3 class="status">${estado}</h3>
                            <h3 class="participants">${numberUser}/${tempDoc.numberEmployers}</h3>
                            <p>Participantes</p>
                        </div>
                        <h3>Porcentaje General</h3>
                        <h1 class="percentage">${porcentaje}</h1>
            
                        <button class="btn btnDetails">Ver detalles</button>
                        <div class="copyContainer">
                            <div class="linkContainer cursor">
                            <p class="link">${doc.id}</p>
                                  
                        </div>
                        <img class="cursor btnCopy" src="Iconos/Iconos/copy.svg"></img>  
                        </div>`
    
                        let btnCopy = div.querySelector(".btnCopy")
                        let btnCopy2 = div.querySelector(".linkContainer")
                        let btnDetails = div.querySelector(".btnDetails")

                        btnDetails.addEventListener("click",()=>{


                            window.location.href = `dashboard.html?testId=${doc.id}`
                        })

    
                        let copy = `?testId=${doc.id}`
                        btnCopy.addEventListener("click", () => {
    
                            navigator.clipboard.writeText(copy)


                            Toastify({
                                text: "la url ha sido copiada",
                                duration: 3000,
                                close: true,
                                gravity: "bottom", // `top` or `bottom`
                                position: "center", // `left`, `center` or `right`
                                stopOnFocus: true, // Prevents dismissing of toast on hover
                                style: {
                                  background: "#F3F3F3",
                                  color :"black",
                                 
                                },
                                onClick: function(){} // Callback after click
                              }).showToast();
                        })

                        btnCopy2.addEventListener("click", () => {
    
                            navigator.clipboard.writeText(copy)

                            Toastify({
                                text: "la url ha sido copiada",
                                duration: 3000,
                                close: true,
                                gravity: "bottom", // `top` or `bottom`
                                position: "center", // `left`, `center` or `right`
                                stopOnFocus: true, // Prevents dismissing of toast on hover
                                style: {
                                  background: "#F3F3F3",
                                  color :"black",
                                 
                                },
                                onClick: function(){} // Callback after click
                              }).showToast();
                        })
                        contentHistory.appendChild(div)


                    })


                    
                });


            }
            else {

                //alert("no existe")

                const div = document.createElement('div');
                div.className = "emptyDashboard"

                div.innerHTML = ` <h2>No hay ninguna prueba</h2>
        <img src="Iconos/Iconos/emptyDashboard.png" alt="">
        <a href="test.html"><button class="btn">Crear prueba</button></a>`
        contentHistory.append(div)

            }
        })
    }
}
)

function getAverage(respuestas) {

    let numeroRespuestas = respuestas.length
  
    console.log(respuestas)
    let respuestasFilter = respuestas.map((respuesta) => { return respuesta.values })
  
    let respuestaOrdenada = sumAllCategories(respuestasFilter)
  
    let respuestasDividas = respuestaOrdenada.map((respuesta) => {
  
      respuesta.value = parseInt(respuesta.value / respuestas.length)
      return respuesta
    })
  
    console.log(respuestasDividas)
  
  
    let promedio = 0
  
    respuestas.forEach((respuesta) => {
  
      promedio += respuesta.total
  
    })
  
    promedio = promedio / respuestas.length
  
    return Math.round(promedio * 100 / 63) + "%"

}