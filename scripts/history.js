
const contentHistory= document.querySelector(".contentHistory")
auth.onAuthStateChanged((user) => {


    if (user) {
        db.collection("surveys").where("userId", "==", user.uid).get().then((docSnapshot) => {


            if (!docSnapshot.empty) {

                //alert("existe")

                docSnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    let tempDoc = doc.data()
                    console.log(doc.data())
                    const div = document.createElement('div');
                    div.classList.add("card")
                    div.classList.add("test")
                    div.innerHTML = `<h2 class="">Prueba 2021</h2>
    
            <div class="infoContainer">
    
                <h3 class="status">Completada</h3>
                <h3 class="participants">130/${tempDoc.numberEmployers}</h3>
                <p>Participantes</p>
            </div>
            <h2 class="percentage">57%</h2>
            <button class="btn bntDetails">Ver detalles </button>`

            contentHistory.appendChild(div)
                });

               
            }
            else {

                //alert("no existe")

                const div = document.createElement('div');
                div.className = "emptyDashboard"

                div.innerHTML = ` <h2>No hay ninguna prueba</h2>
        <img src="Iconos/Iconos/emptyDashboard.png" alt="">
        <a href="test.html"><button class="btn">Crear prueba</button></a>`
                dashboardBody.append(div)

            }
        })
    }
}
)