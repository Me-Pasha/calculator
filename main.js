var firstOperand = '';
var lastOperand = '';
var Operatorselected = null;
var shouldClearScreen = false;

var numberButtons = document.querySelectorAll('[data-number]');
var operatorButtons = document.querySelectorAll('[data-operator]');
var pointButton = document.querySelector('#decimal');
var equalToButton = document.querySelector('#equalto');
var clearButton = document.querySelector('#clear');
var deleteButton = document.querySelector('#delete');
var lastScreenSelected = document.querySelector(".row-00");
var currentScreenSelected = document.querySelector(".row-0");

numberButtons.forEach((button)=>{
    button.addEventListener("click", () => appendNumber(button.textContent))
})

operatorButtons.forEach((button)=>{
    button.addEventListener("click", () => setOperation(button.textContent))
})

pointButton.addEventListener("click", appendPoint);

equalToButton.addEventListener("click", evaluate);

clearButton.addEventListener("click", clear);

deleteButton.addEventListener("click", deleteNum);



function appendNumber(number){
    if(currentScreenSelected.textContent == "0" || shouldClearScreen){
        resetScreen();
    }

    currentScreenSelected.textContent+= number;
}

function resetScreen(){
    currentScreenSelected.textContent = "";
    shouldClearScreen = false;
}

function clear(){
    lastScreenSelected.textContent = '';
    currentScreenSelected.textContent ='0'
    firstOperand = '';
    lastOperand = '';
}

function deleteNum(){
    currentScreenSelected.textContent = currentScreenSelected.textContent.toString().slice(0, -1);
}

function appendPoint(){
    if(shouldClearScreen) resetScreen();
    if(currentScreenSelected.textContent === ''){
        currentScreenSelected.textContent = "0"
    }
    if(currentScreenSelected.textContent.includes('.')){
        return;
    }
    currentScreenSelected.textContent +=".";
    
}
function evaluate(){
    if(Operatorselected === null || shouldClearScreen) return;
    if(Operatorselected === "÷" && currentScreenSelected.textContent=== "0"){
        alert("Can't divide by 0");
        return;
    }
    lastOperand = currentScreenSelected.textContent;
    currentScreenSelected.textContent = roundResult(operate(Operatorselected, firstOperand, lastOperand)); //need to work on it
    lastScreenSelected.textContent = `${firstOperand} ${Operatorselected} ${lastOperand} =`;
    Operatorselected = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }

function setOperation(operation){
    if(Operatorselected !==null) evaluate();
    firstOperand = currentScreenSelected.textContent;
    Operatorselected = operation;
    lastScreenSelected.textContent = `${firstOperand} ${Operatorselected}`;
    shouldClearScreen = true; //allows to select number again
}

function adivide(a, b){
    return a + b
}

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    switch(operator){
        case "+": return a + b;
        case "x": return a * b;
        case "-": return a - b;
        case "÷": 
            if (b === 0) return null;
             else return a/b
        default: return null;

    }
}


