const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('#buttons button');

let currentInput = '';
let currentOperator = '';
let operand1 = null;


const power = () => {
    if (currentInput !== '') {
        operand1 = parseFloat(currentInput);
        currentOperator = '^';
        currentInput = '';
    }
};


const pi = () => {
    currentInput = Math.PI.toString();
    screen.value = currentInput;
};


const sqrt = () => {
    const num = parseFloat(currentInput);
    if (!isNaN(num)) {
        const result = Math.sqrt(num);
        currentInput = result.toString();
        screen.value = currentInput;
    } else {
        screen.value = 'Error';
    }
};

const clear = () => {
    currentInput = '';
    currentOperator = '';
    operand1 = null;
    screen.value = '';
};

const input = value => {
    currentInput += value;
    screen.value = currentInput;
};

const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const product = (a, b) => a * b;
const division = (a, b) => b !== 0 ? a / b : 'Error';
const percentage = (a, b) => (a / 100) * b;

const calculate = () => {
    if (operand1 !== null && currentInput !== '' && currentOperator !== '') {
        const operand2 = parseFloat(currentInput);
        let result;

        switch (currentOperator) {
            case '+':
                result = add(operand1, operand2);
                break;
            case '-':
                result = substract(operand1, operand2);
                break;
            case '*':
                result = product(operand1, operand2);
                break;
            case '/':
                result = division(operand1, operand2);
                break;
            case '^':
                result = Math.pow(operand1, operand2);
                break;
            default:
                result = 'Error';
        }

        currentInput = result.toString();
        screen.value = currentInput;
        operand1 = null;
        currentOperator = '';
    }
};


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === '=') {
            calculate();
        } else if (value === 'C') {
            clear();
        } else if (value === '√') {
            sqrt();
        } else if (value === 'π') {
            pi();
        } else if (value === '^') {
            power();
        } else if (['+', '-', '*', '/'].includes(value)) {
            operand1 = parseFloat(currentInput);
            currentOperator = value;
            currentInput = '';
        } else {
            input(value);
        }
    });
});

const themeSelector = document.getElementById('theme');
themeSelector.addEventListener('change', () => {
    document.querySelector('.calculator').className = `calculator ${themeSelector.value}`;
});