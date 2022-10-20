const departmentContainer = document.querySelector(".departmentContainer")
let departmentInputs = departmentContainer.querySelectorAll(".labelAdd")
const btnFinishTest = document.querySelector(".btnFinishTest")
const testForm = document.querySelector(".testForm")
const population = document.querySelector("#population")
const pyramidTop = document.querySelector("#pyramidTop")
const pyramidMid = document.querySelector("#pyramidMid")
const pyramidBottom = document.querySelector("#pyramidBottom")
const containerSubdepartamentos=document.querySelector("#containerSubdepartamentos")
let subDepartamentoInput = document.querySelectorAll(".labelAdd")

let emailInput = document.querySelector("#emails")

let btns

let btns2


console.log(containerSubdepartamentos)
//console.log(testForm.companySize.value)
setupBtn()
setupBtn2()

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
    
    btns.forEach(btn => {


        btn.textContent = "-"
        btn.classList.remove("btn--addInput")
        btn.classList.add("btn--deleteInput")
        //btn--deleteInput
        //console.log(btn.classList)
        btn.addEventListener("click", (e) => {
           
                e.preventDefault()
            btnClick(e)
            
            
        })

        

    })

    
    let lastBtn = btns[btns.length-1]
    lastBtn.classList.remove("btn--deleteInput")
    lastBtn.classList.add("btn--addInput")
    lastBtn.innerHTML = "+"
    //console.log(lastBtn)
    btns[btns.length - 1]=lastBtn
    //console.log(btns)

}


function setupBtn2() {

    btns2 = containerSubdepartamentos.querySelectorAll(".btn")
    
    btns2.forEach(btn => {

        btn.textContent = "-"
        btn.classList.remove("btn--addInput")
        btn.classList.add("btn--deleteInput")
        //btn--deleteInput
        //console.log(btn.classList)
        btn.addEventListener("click", (e) => {
           
                e.preventDefault()
            btnClick2(e)
            
            
        })

        

    })

    
    let lastBtn2 = btns2[btns2.length-1]
    lastBtn2.classList.remove("btn--deleteInput")
    lastBtn2.classList.add("btn--addInput")
    lastBtn2.textContent = "+"
    //console.log(lastBtn)
    btns2[btns2.length - 1]=lastBtn2
    //console.log(btns)

}



function btnClick(btn) {

    console.log(btn.target.classList.contains("btn--deleteInput")&&btn.target.classList.contains("btn--addInput"))
   
    
     if (btn.target.classList.contains("btn--addInput")) {

       // const element= btn.target.parentElement
        // console.log(element)
        // console.log("añadir")
        console.log("add")
        const div = document.createElement('div')
        div.className = "labelAdd"
        div.innerHTML = `<input class="inputs inputs--form inputs--add" type="text" placeholder="Ingenieria, Diseño, etc.">
        <button type='button' class="btn">-</button>`
        departmentContainer.appendChild(div)
        //console.log(departmentContainer.querySelectorAll(".btn"))

        
    }

    else if (btn.target.classList.contains("btn--deleteInput")) {


        btn.target.classList.remove("btn--deleteInput")
        const element= btn.target.parentElement
        console.log(element)
        //element.parentNode.removeChild(element);
        //btn.parentNode.remove(element)
        
        console.log("delete")
        //console.log(element)

        
        //btn.parentElement.remove
        
        departmentContainer.removeChild(element)
        btns=departmentContainer.querySelectorAll(".btn")
        //console.log(departmentContainer)
        setupBtn()
    }
    
    //btns=departmentContainer.querySelectorAll(".btn")
    setupBtn()
    //console.log(btns)
    

    
}


function btnClick2(btn) {

    console.log(btn.target.classList.contains("btn--deleteInput")&&btn.target.classList.contains("btn--addInput"))
   
    
     if (btn.target.classList.contains("btn--addInput")) {

       // const element= btn.target.parentElement
        // console.log(element)
        // console.log("añadir")
        console.log("add")
        const div = document.createElement('div')
        div.className = "labelAdd"
        div.innerHTML = `<input class="inputs inputs--form inputs--add" type="text" placeholder="Sub departamento.">
        <button type='button' class="btn">+</button>`
        containerSubdepartamentos.appendChild(div)
        //console.log(departmentContainer.querySelectorAll(".btn"))

        
    }

    else if (btn.target.classList.contains("btn--deleteInput")) {


        btn.target.classList.remove("btn--deleteInput")
        const element= btn.target.parentElement
        console.log(element)
        //element.parentNode.removeChild(element);
        //btn.parentNode.remove(element)
        
        console.log("delete")
        //console.log(element)

        
        //btn.parentElement.remove
        
        containerSubdepartamentos.removeChild(element)
        btns2=containerSubdepartamentos.querySelectorAll(".btn")
        //console.log(departmentContainer)
    }
    
    //btns=departmentContainer.querySelectorAll(".btn")
    setupBtn2()
    //console.log(btns)
    

    
}

btnFinishTest.addEventListener("click",()=>{

    let departments = []
    let subDepartments=[]
    let highHierarchy = []
    let midHierarchy =[]
    let lowHierarchy=[]
    departmentInputs=departmentContainer.querySelectorAll(".labelAdd")
    departmentInputs.forEach((container)=>{

        let input = container.querySelector(".inputs--form")
        console.log(container)
        departments.push(input.value)
    })

    subDepartamentoInput=departmentContainer.querySelectorAll(".labelAdd")
    subDepartamentoInput.forEach((container)=>{

        let input = container.querySelector(".inputs--form")
        console.log(container)
        subDepartments.push(input.value)
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

    if(emailInput.value==""){


        alert("coloque los correos")

        return
    }

    let emails = emailInput.value.split(",")
    
    console.log(emails)
    let test = {
        userId: currentUser.uid,
        companyName : testForm.companyName.value,
        companyArea : testForm.companyArea.value,
        companySize : testForm.companySize.value,
        numberEmployers: testForm.numberEmployers.value,
        departments: departments,
        subDepartments:subDepartments,
        highHierarchy:highHierarchy,
        midHierarchy:midHierarchy,
        lowHierarchy:lowHierarchy,
        emails:emails
    }
    console.log(test)

   


    
    db.collection("surveys").add(test).then(()=>{

        alert("prueba")
    })
})






