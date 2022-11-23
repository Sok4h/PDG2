const departmentContainer = document.querySelector(".departmentContainer")
let departmentInputs = departmentContainer.querySelectorAll(".labelAdd")
const btnFinishTest = document.querySelector(".btnFinishTest")
const testForm = document.querySelector(".testForm")
const population = document.querySelector("#population")
const pyramidTop = document.querySelector("#pyramidTop")
const pyramidMid = document.querySelector("#pyramidMid")
const pyramidBottom = document.querySelector("#pyramidBottom")
const containerSubdepartamentos = document.querySelector("#containerSubdepartamentos")
let subDepartamentoInput = document.querySelectorAll(".labelAdd")
const sampleSize = document.querySelector("#sampleSize")

let emailInput = document.querySelector("#emails")
let inputTestName = document.querySelector("#testName")
let btnsDeparment = departmentContainer.querySelectorAll(".btn")
let btnsSubDeparment = containerSubdepartamentos.querySelectorAll(".btn")
let btnsBottomPyramid = pyramidBottom.querySelectorAll(".btn")
let btnsMidPyramid = pyramidMid.querySelectorAll(".btn")
let btnsTopPyramid = pyramidTop.querySelectorAll(".btn")

console.log(btnsBottomPyramid)
setupBtnDepartment()
setupBtnSubDepartment()
setupBtnPyramidBottom()
setupBtnPyramidMid()
setupBtnPyramidTop()


let upload = document.querySelector("#upload")
let xd
let usersArray =[]
upload.addEventListener("change",()=>{

    let labelUpload = document.querySelector(".labelUpload")

    labelUpload.querySelector("p").textContent="Archivo cargado correctamente"
    labelUpload.querySelector("img").src="./Iconos/Iconos/upload-complete.svg"

    readXlsxFile(upload.files[0]).then((data)=>{

        console.log(data)
        xd= data.map((row)=>{

            console.log(row)
            
            
           return   {email : row[0],id:row[1] }
        })
        console.log(data)
    }).then(()=>{


        usersArray =xd.slice(1)
    })
    
})

console.log(testForm.testName)


testForm.numberEmployers.addEventListener("input", () => {

    population.textContent = numberEmployers.value

    if (numberEmployers.value == "") {

        population.textContent = "NA"
    }else{

        sampleSize.textContent = calculateTrustFactor(numberEmployers.value)

    }

    
})

////iMPORTANTE
function calculateTrustFactor(poblacion) {

    let z = 1.96
    let p = 0.5
    let q = 0.5
    let e = 0.05
    let n = poblacion
    let arriba = n * Math.pow(z, 2) * p * q


    let abajo = Math.pow(e, 2) * (n - 1) + Math.pow(z, 2) * p * q

    return Math.round(arriba/abajo)

}



function setupBtnDepartment() {

    btns = departmentContainer.querySelectorAll(".btn")

    btns.forEach(btn => {

        if (!btn.hasAttribute('listener')) {

            btn.setAttribute('listener', 'true');
            btn.addEventListener("click", (e) => {
                e.preventDefault()
                btnClick(e, departmentContainer)


            })

        }

        btn.textContent = "-"
        btn.classList.remove("btn--addInput")
        btn.classList.add("btn--deleteInput")
        //btn--deleteInput
        //console.log(btn.classList)
        console.log(btn.hasAttribute('listener'))

    })


    let lastBtn = btns[btns.length - 1]
    lastBtn.classList.remove("btn--deleteInput")
    lastBtn.classList.add("btn--addInput")
    lastBtn.innerHTML = "+"
    btns[btns.length - 1] = lastBtn

}


function setupBtnSubDepartment() {

    btnsSubDeparment = containerSubdepartamentos.querySelectorAll(".btn")

    btnsSubDeparment.forEach(btn => {

        if (!btn.hasAttribute('listener')) {

            btn.setAttribute('listener', 'true');
            btn.addEventListener("click", (e) => {
                e.preventDefault()
                btnClick(e, containerSubdepartamentos)


            })

        }

        btn.textContent = "-"
        btn.classList.remove("btn--addInput")
        btn.classList.add("btn--deleteInput")

        console.log(btn.hasAttribute('listener'))

    })


    let lastBtn = btnsSubDeparment[btnsSubDeparment.length - 1]
    lastBtn.classList.remove("btn--deleteInput")
    lastBtn.classList.add("btn--addInput")
    lastBtn.innerHTML = "+"
    //console.log(lastBtn)
    btnsSubDeparment[btnsSubDeparment.length - 1] = lastBtn
    // console.log(lastBtn.hasAttribute('listener'))

}

function setupBtnPyramidBottom() {

    btnsBottomPyramid = pyramidBottom.querySelectorAll(".btn")

    btnsBottomPyramid.forEach(btn => {

        if (!btn.hasAttribute('listener')) {

            btn.setAttribute('listener', 'true');
            btn.addEventListener("click", (e) => {
                e.preventDefault()
                btnClick(e, pyramidBottom)


            })

        }

        btn.textContent = "-"
        btn.classList.remove("btn--addInput")
        btn.classList.add("btn--deleteInput")
        //btn--deleteInput
        //console.log(btn.classList)
        console.log(btn.hasAttribute('listener'))

    })


    let lastBtn = btnsBottomPyramid[btnsBottomPyramid.length - 1]
    lastBtn.classList.remove("btn--deleteInput")
    lastBtn.classList.add("btn--addInput")
    lastBtn.innerHTML = "+"
    btnsBottomPyramid[btnsBottomPyramid.length - 1] = lastBtn

}

function setupBtnPyramidMid() {

    btnsMidPyramid = pyramidMid.querySelectorAll(".btn")

    btnsMidPyramid.forEach(btn => {

        if (!btn.hasAttribute('listener')) {

            btn.setAttribute('listener', 'true');
            btn.addEventListener("click", (e) => {
                e.preventDefault()
                btnClick(e, pyramidMid)


            })

        }

        btn.textContent = "-"
        btn.classList.remove("btn--addInput")
        btn.classList.add("btn--deleteInput")
        //btn--deleteInput
        //console.log(btn.classList)
        console.log(btn.hasAttribute('listener'))

    })


    let lastBtn = btnsMidPyramid[btnsMidPyramid.length - 1]
    lastBtn.classList.remove("btn--deleteInput")
    lastBtn.classList.add("btn--addInput")
    lastBtn.innerHTML = "+"
    btnsMidPyramid[btnsMidPyramid.length - 1] = lastBtn

}


function setupBtnPyramidTop() {

    btnsTopPyramid = pyramidTop.querySelectorAll(".btn")

    btnsTopPyramid.forEach(btn => {

        if (!btn.hasAttribute('listener')) {

            btn.setAttribute('listener', 'true');
            btn.addEventListener("click", (e) => {
                e.preventDefault()
                btnClick(e, pyramidTop)


            })

        }

        btn.textContent = "-"
        btn.classList.remove("btn--addInput")
        btn.classList.add("btn--deleteInput")
        //btn--deleteInput
        //console.log(btn.classList)
        console.log(btn.hasAttribute('listener'))

    })


    let lastBtn = btnsTopPyramid[btnsTopPyramid.length - 1]
    lastBtn.classList.remove("btn--deleteInput")
    lastBtn.classList.add("btn--addInput")
    lastBtn.innerHTML = "+"
    btnsTopPyramid[btnsTopPyramid.length - 1] = lastBtn

}



function btnClick(btn, parent) {

    //console.log(btn.target.classList.contains("btn--deleteInput")&&btn.target.classList.contains("btn--addInput"))

    console.log(parent == departmentContainer)
    console.log(btn.target.hasAttribute('listener'))

    if (btn.target.classList.contains("btn--addInput")) {

        // const element= btn.target.parentElement
        // console.log(element)
        // console.log("añadir")
        console.log("add")
        const div = document.createElement('div')
        div.className = "labelAdd"
        div.innerHTML = `<input class="inputs inputs--form inputs--add" type="text" >
        <button type='button' class="btn">-</button>`
        parent.appendChild(div)
        //console.log(departmentContainer.querySelectorAll(".btn"))


    }

    if (btn.target.classList.contains("btn--deleteInput")) {


        btn.target.classList.remove("btn--deleteInput")
        const element = btn.target.parentElement
        console.log(element)
        //element.parentNode.removeChild(element);
        //btn.parentNode.remove(element)

        console.log("delete")
        //console.log(element)


        //btn.parentElement.remove

        parent.removeChild(element)
        //btns=departmentContainer.querySelectorAll(".btn")
        //console.log(departmentContainer)

    }

    //btns=departmentContainer.querySelectorAll(".btn")


    setupBtnDepartment()
    setupBtnSubDepartment()
    setupBtnPyramidBottom()
    setupBtnPyramidMid()
    setupBtnPyramidTop()





}




btnFinishTest.addEventListener("click", () => {

    let departments = []
    let subDepartments = []
    let highHierarchy = []
    let midHierarchy = []
    let lowHierarchy = []
    departmentInputs = departmentContainer.querySelectorAll(".labelAdd")
    departmentInputs.forEach((container) => {

        let input = container.querySelector(".inputs--form")
        console.log(container)
        if (input.value != "") departments.push(input.value)
    })

    subDepartamentoInput = containerSubdepartamentos.querySelectorAll(".labelAdd")
    subDepartamentoInput.forEach((container) => {

        let input = container.querySelector(".inputs--form")
        if (input.value != "") subDepartments.push(input.value)


    })

    pyramidTop.querySelectorAll(".labelAdd").forEach((container) => {

        let pyramidInputs = container.querySelectorAll(".inputs--form")
        console.log(pyramidInputs)
        pyramidInputs.forEach((input) => {

            if (input.value != "") highHierarchy.push(input.value)


        })
    })

    pyramidMid.querySelectorAll(".labelAdd").forEach((container) => {

        let pyramidInputs = container.querySelectorAll(".inputs--form")

        pyramidInputs.forEach((input) => {

            if (input.value != "") midHierarchy.push(input.value)


        })
    })

    pyramidBottom.querySelectorAll(".labelAdd").forEach((container) => {

        let pyramidInputs = container.querySelectorAll(".inputs--form")

        pyramidInputs.forEach((input) => {

            if (input.value != "") lowHierarchy.push(input.value)

        })
    })


    console.log(departments)

    if (usersArray.length == 0) {

        alert("Por favor suba su base de datos")

        return
    }

    if (testForm.testName.value == "") {

        alert("ingrese un nombre a la prueba")
        return
    }
    //let emails = emailInput.value.split(",")


    if (departments.length === 0 || subDepartments.length == 0 || highHierarchy.length == 0 || midHierarchy.length == 0 || lowHierarchy.length == 0) {


        alert("Llene todos los campos")
        return

    }

    let test = {
        userId: currentUser.uid,
        testName: testForm.testName.value,
        companyName: testForm.companyName.value,
        companyArea: testForm.companyArea.value,
        companySize: testForm.companySize.value,
        numberEmployers: testForm.numberEmployers.value,
        departments: departments,
        subDepartments: subDepartments,
        highHierarchy: highHierarchy,
        midHierarchy: midHierarchy,
        lowHierarchy: lowHierarchy,
        emails: usersArray
    }
    console.log(test)





    db.collection("surveys").add(test).then(() => {

        alert("prueba subida con exito")
        window.location.href = "dashboard.html"
    })
})






