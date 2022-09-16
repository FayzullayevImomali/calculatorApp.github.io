// browser.runtime.onMessage.addListener(message => {
//     console.log("background: onMessage", message);
  
//     // Add this line:
//     return Promise.resolve("Dummy response to keep the console quiet");
//   });

const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
let currentOperand = document.querySelector('.current-operand');
let historyOperand = document.querySelector('.previous-operand');
let dotBtn = document.querySelector('.dot');
let equal = document.querySelector('.equal');

let historyNumber = '';
let currentNumber = '';
let stopCalculate = true;

const calculator = {
    firstValue: '',
    secondValue: '',
    operator: '',
    displayValue: '',
    result: ''
}


numbers.forEach((btns, items) => {
    if(stopCalculate === true) {
        btns.addEventListener('click', function () {
            calculator.displayValue += this.value
            // console.log(calculator.firstValue)
            currentOperand.textContent = calculator.displayValue
        });
    }
});

dotBtn.addEventListener('click', function(event) {
    if(!calculator.displayValue.includes('.')) {
        currentOperand.textContent += '.'
        calculator.displayValue += '.'
    }
    
});



operators.forEach((operator, item) => {
    operator.addEventListener('click', function(btns, items) {
       if(calculator.operator === '' && calculator.displayValue !== '') {
        calculator.firstValue = Number(calculator.displayValue);
        historyOperand.textContent = `${calculator.firstValue} ${this.value}`;
        currentOperand.textContent = '';
        calculator.displayValue = '';
        calculator.operator += this.value;
        console.log(calculator.operator);
        console.log( typeof(calculator.operator));
       }
    })
});


equal.addEventListener('click', function(){
    calculator.secondValue = Number(calculator.displayValue);
    console.log(typeof(calculator.secondValue))
    if(calculator.operator === '-') {
        calculator.result = calculator.firstValue - calculator.secondValue;
        historyOperand.textContent = '';
        currentOperand.textContent = calculator.result
        console.log(calculator.result);
        calculator.operator = '';
        
    } else if (calculator.operator === '+') {
        calculator.result = calculator.firstValue + calculator.secondValue;
        historyOperand.textContent = '';
        currentOperand.textContent = calculator.result
        console.log(calculator.result);
        calculator.operator = '';
        
    } else if(calculator.operator === '/') {
        calculator.result = calculator.firstValue / calculator.secondValue;
        historyOperand.textContent = '';
        currentOperand.textContent = calculator.result
        console.log(calculator.result);
        calculator.operator = '';
       
    } else if(calculator.operator === '*') {
        calculator.result = calculator.firstValue * calculator.secondValue;
        historyOperand.textContent = '';
        currentOperand.textContent = calculator.result
        console.log(calculator.result);
        calculator.operator = '';
       
    }
   
});












