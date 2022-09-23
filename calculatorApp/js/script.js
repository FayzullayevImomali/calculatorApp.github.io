
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
let currentOperand = document.querySelector('.current-operand');
let historyOperand = document.querySelector('.previous-operand');
let dotBtn = document.querySelector('.dot');
let equal = document.querySelector('.equal');
let clearbtn = document.querySelector('#clear');

let historyNumber = '';
let currentNumber = '';
let stopCalculate = false;

const calculator = {
    firstValue: '',
    secondValue: '',
    operator: '',
    displayValue: '',
    result: ''
}


numbers.forEach((btns, items) => {
    if(stopCalculate === false) {
        btns.addEventListener('click', function () {
            calculator.displayValue += this.value;
            currentOperand.textContent = calculator.displayValue;
        });
    } else {
        return;
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
       }
    });
});


equal.addEventListener('click', function(){
    calculator.secondValue = Number(calculator.displayValue);
    calculator.displayValue.textContent = '';
    console.log(typeof(calculator.secondValue));
    stopCalculate = true;
    console.log(stopCalculate);
    if(calculator.operator === '-') {
        calculator.result = calculator.firstValue - calculator.secondValue;
        historyOperand.textContent = '';
        currentOperand.textContent = calculator.result
        console.log(calculator.result);
        calculator.operator = '';
        calculator.displayValue = '';
        
        
    } else if (calculator.operator === '+') {
        calculator.result = calculator.firstValue + calculator.secondValue;
        historyOperand.textContent = '';
        currentOperand.textContent = calculator.result
        console.log(calculator.result);
        calculator.operator = '';
        calculator.displayValue = '';
       
        
    } else if(calculator.operator === '/') {
        calculator.result = calculator.firstValue / calculator.secondValue;
        historyOperand.textContent = '';
        currentOperand.textContent = calculator.result
        console.log(calculator.result);
        calculator.operator = '';
        calculator.displayValue = '';
       
    } else if(calculator.operator === '*') {
        calculator.result = calculator.firstValue * calculator.secondValue;
        historyOperand.textContent = '';
        currentOperand.textContent = calculator.result
        console.log(calculator.result);
        calculator.operator = '';
        stopCalculate = true;
        calculator.displayValue = ''; 
    }
   
});

const clear = function () {
    calculator.displayValue = '';
    calculator.firstValue = '';
    calculator.secondValue = '';
    currentOperand.textContent = '';
    historyOperand.textContent = '';
    calculator.operator = '';
    calculator.result = '';
};

clearbtn.addEventListener('click', clear);














