let currentInput = '0';

function updateDisplay() {
    document.getElementById('display').innerText = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperation(operator) {
    currentInput += ` ${operator} `;
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function calculate() {
    try {
        currentInput = eval(currentInput).toString();
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
    }
    
}

function resetCalculator() {
    currentInput = '0';
    updateDisplay();
}

function clearCalculator() {
    currentInput = currentInput.replace(/(?:\d*\.\d+|\d+|\*\*|[-+*/])$/, '');
    if (currentInput === '') {
        currentInput = '0';
    }
    updateDisplay();
}
