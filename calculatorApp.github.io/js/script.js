// browser.runtime.onMessage.addListener(message => {
//     console.log("background: onMessage", message);
  
//     // Add this line:
//     return Promise.resolve("Dummy response to keep the console quiet");
//   });

const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
let currentOperand = document.querySelector('.current-operand');
let historyOperand = document.querySelector('.previous-operand');

let historyNumber = '';
let currentNumber = '';
const numberArray = [0,0]



numbers.forEach((btns,item) => {
    btns.addEventListener('click', function() {
        currentNumber += this.id;
        currentOperand.textContent = Math.trunc(currentNumber);
        if(this.id === '.')  {
            currentNumber+= this.value;
        }
    })
});

operators.forEach((btns) => {
    btns.addEventListener('click', function(event){
        if(currentNumber != '') {
            historyNumber = currentNumber;
            historyOperand.textContent = Math.trunc(historyNumber);
            currentNumber = '';
            currentOperand.textContent = '';
            if(this.id === '-' ) {
                console.log('event minus');
            }
        }
    })
});


// const calculator = {
//     displayValue: '',
//     operators: null,
//     firstOperand: null,
//     operators: null,
//     secondOperand: false,  
// };

// numbers.forEach((btns,item) => {
//     btns.addEventListener('click', function (){
//        calculator.displayValue += this.id
//        console.log(this.id)
//     })
// });

// const showDisplay = function (){
//     currentOperand.textContent = calculator.displayValue
// };

// showDisplay();
// console.log(typeof calculator.displayValue)






