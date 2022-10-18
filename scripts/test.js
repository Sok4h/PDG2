const departmentContainer = document.querySelector(".departmentContainer")
const departmentInputs = departmentContainer.querySelectorAll(".labelAdd")
const btnFinishTest = document.querySelector(".btnFinishTest")
const testForm = document.querySelector(".testForm")
const population = document.querySelector("#population")
const pyramidTop = document.querySelector("#pyramidTop")
const pyramidMid = document.querySelector("#pyramidMid")
const pyramidBottom = document.querySelector("#pyramidBottom")


console.log(testForm.companySize.value)
setupBtn()

console.log(currentUser)

 testForm.numberEmployers.addEventListener("input",()=>{

    population.textContent = numberEmployers.value

    if(numberEmployers.value==""){

        population.textContent="NA"
    }

    calculateTrustFactor()
 })

 function calculateTrustFactor(){




 }
function setupBtn() {

    btns = departmentContainer.querySelectorAll(".btn")
    console.log(btns.length)

    btns.forEach(btn => {


        btn.innerHTML = "-"
        btn.classList.remove("btn--addInput")
        btn.classList.add("btn--deleteInput")
        //btn--deleteInput



    })


    // btns.forEach(btn => {

       
    //     btn.addEventListener("click", (e) => {

    //         e.preventDefault()
    //         btnClick(btn)
    //     })
    // })


    let lastBtn = btns[btns.length - 1]
    lastBtn.classList.remove("btn--deleteInput")
    lastBtn.classList.add("btn--addInput")
    lastBtn.innerHTML = "+"

}



function btnClick(btn) {

    if (btn.classList.contains("btn--deleteInput")) {
       
        const element= btn.parentElement
        //element.parentNode.removeChild(element);
        //btn.parentNode.remove(element)
        btn.parentElement.remove
        console.log("borrado")
        element.remove()
        
        
    }
    
    if (btn.classList.contains("btn--addInput")) {

        const div = document.createElement('div')
        div.className = "labelAdd"
        div.innerHTML = `<input class="inputs inputs--form inputs--add" type="text" placeholder="Ingenieria, Diseño, etc.">
        <button type='button' class="btn btn--addInput">+</button>`
        departmentContainer.appendChild(div)
        console.log("añadido")

        
    }

    setupBtn()

    
}

btnFinishTest.addEventListener("click",()=>{

    let departments = []
    let highHierarchy = []
    let midHierarchy =[]
    let lowHierarchy=[]
    departmentInputs.forEach((container)=>{

        let input = container.querySelector(".inputs--form")
        console.log(container)
        departments.push(input.value)
    })

    pyramidTop.querySelectorAll(".labelAdd").forEach((container)=>{

        let pyramidInputs = container.querySelectorAll(".inputs--form")
        console.log(pyramidInputs)
        pyramidInputs.forEach((input)=>{

            highHierarchy.push(input.value)

        })
    })

    pyramidMid.querySelectorAll(".labelAdd").forEach((container)=>{

        let pyramidInputs = container.querySelectorAll(".inputs--form")

        pyramidInputs.forEach((input)=>{

            midHierarchy.push(input.value)

        })
    })

    pyramidBottom.querySelectorAll(".labelAdd").forEach((container)=>{

        let pyramidInputs = container.querySelectorAll(".inputs--form")

        pyramidInputs.forEach((input)=>{

            lowHierarchy.push(input.value)

        })
    })
    

    console.log(departments)
    let test = {
        userId: currentUser.uid,
        companyName : testForm.companyName.value,
        companyArea : testForm.companyArea.value,
        companySize : testForm.companySize.value,
        numberEmployers: testForm.numberEmployers.value,
        departments: departments,
        highHierarchy:highHierarchy,
        midHierarchy:midHierarchy,
        lowHierarchy:lowHierarchy
    }
    console.log(test)

    db.collection("surveys").add(test).then(()=>{

        alert("prueba")
    })
})






