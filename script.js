//USE lifeserver to test


//alert (" Hello world: cliff learns from eben ") //dialog: to alert something 
//alert is also used to request for access from the user to enable notification or to allow ads 

//now we want to create a calculator 

/** 1. ARRAYS and objects */
/* OBJECTS: These are just dictionaries in python  */
// //two methods of accessing an object
// const nn = new Object()
// nn["cliff"] = "has money"
// //1. 
// console.log(nn["cliff"])
// //2.
// console.log(nn.cliff)

const btnsArray = [
    {//object that's the first element of the array  btnsarray, there's no need for name 
        label:"AC",
        class: ["btn_ac", "action"]
    }, 
    {label:"1", class: ["btn_1", "num"]}, 
    {label:"2", class: ["btn_2", "num"]}, 
    {label:"3", class: ["btn_3", "num"]}, 
    {label:"4", class: ["btn_4", "num"]}, 
    {label:"5", class: ["btn_5", "num"]}, 
    {label:"+", class: ["btn_plus", "operator"]},
    {label:"-", class: ["btn_minus", "operator"]},
    {label:"=", class: ["btn_equal", "action"]}     
];
// console.log(btnsArray[0].label)


/* 2. FUNCTIONS and IIFE: Functions needs to be called, IIFE gets called as soon as the page finishes loading  */

//IIFE: immediately invoked function expressions 
//on loading of script fully, run the function 
//first () does two things, enables the function to be run immediately and its also a scope limitation operation, limits the scope of variables to that function 
(function() {
    const btnsParent = document.querySelector(".btn_row")
    // let is limited to the block in which it is declared while variable declared with var has the global scope. So we can say that var is rather a keyword which defines a variable globally regardless of block scope.

    //var has a global scope 
    var bt = 0
    //let has a local scope or block scope 

    for (let btn of btnsArray){
        const btnDiv = document.createElement("div")
        
        btnDiv.classList.add(btn.class[0],btn.class[1]) 
        btnDiv.textContent = btn.label
        
        btnsParent.appendChild(btnDiv)
        //dom: document object model, like a logical tree , the root element is the window
    }
})();


let state = {}
const outputNode = document.querySelector(".output_screen")

state["outputValue"] = "0"
state["operation"] = ""
state["lastevent"] = 0
state["result"] = 0
outputNode.textContent = state["outputValue"]
// console.log(state[outputValue])
// console.log(outputValue)
// console.log(Object.keys(state).length) //obect is a static/global inbuilt class 

const numberKeys = document.querySelectorAll(".num")//numberKeys is a node list 
// for (let i of numberKeys){
//     console.log(i)
// }
// console.log(numberKeys)
numberKeys.forEach(node => {
    // console.log(node)

    node.addEventListener("click", (e) => { 
        if (state["lastevent"] == 0) {
            state["outputValue"] = ""
        }
        else if (state["lastevent"] == 2) {
            state["outputValue"]+= state["operation"]    
        }

        state["outputValue"] += node.textContent
        outputNode.textContent = state["outputValue"]

        
        state["lastevent"] = 1
    })
})

const operatorKeys = document.querySelectorAll(".operator")
operatorKeys.forEach(node => {
    node.addEventListener("click", (e) => { 
        state["operation"] = node.textContent
        outputNode.textContent = state["outputValue"] + state["operation"]

        state["lastevent"] = 2
    })
})

const actionKeys = document.querySelectorAll(".action")
actionKeys.forEach(node => {
    node.addEventListener("click", (e) => { 
        console.log(node.textContent)
        if (node.classList.contains("btn_ac"))
        {
            state["outputValue"] = "0"
            outputNode.textContent = state["outputValue"]
        }
        else if (node.classList.contains("btn_equal"))
        {
            state["result"] = parseFloat(eval(state["outputValue"]))
            // state["outputValue"] += "="
            outputNode.textContent = state["result"]
        }

        state["lastevent"] = 0
    })
})




//3. EVENTS: 
//event delegation: delegates an event listened by a parent to all its child elements 
//Event capture: the flow of event from the outer most elemnt (document) to the target element, from outermost to innermost 
//Event bubbling: same as above but from innermost to outermost
