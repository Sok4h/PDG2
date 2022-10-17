const departmentContainer = document.querySelector(".departmentContainer")

const departmentInputs = departmentContainer.querySelectorAll(".labelAdd")

console.log(departmentInputs)


departmentInputs.forEach(container=>{

    const btn = container.querySelector(".btn")
    
    btn.innerHTML="-"
    btn.classList.remove("btn--addInput")
    btn.classList.add("btn--deleteInput")

 

    //btn--deleteInput
})

const lastBtn= departmentInputs[departmentInputs.length-1].querySelector(".btn")

console.log(lastBtn)
lastBtn.classList.add("btn--addInput")
lastBtn.classList.remove("btn--deleteInput")
lastBtn.innerHTML="+"
console.log(lastBtn)
