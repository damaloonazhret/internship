// Arithmetics event

const inputOperands = document.querySelectorAll('#arithmetics input');
inputOperands.forEach((el) => {
    el.addEventListener('input', (e) => {
        if (e.target.value.length > 4) {
            e.target.value = e.target.value.slice(0, 4);
        }
    })
})

const equal = document.querySelector('#equal');
equal.addEventListener('click', () => {
    const operator = document.querySelector('#operators').value;
    const solution = document.querySelector('#solution');
    const inputOperands = document.querySelectorAll('#arithmetics input');

    const firstOperand = +inputOperands[0].value;
    const secondOperand = +inputOperands[1].value;

    let result;

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break
        case '-':
            result = firstOperand - secondOperand;
            break
        case '*':
            result = firstOperand * secondOperand;
            break
        case '/':
            if (secondOperand === 0) {
                result = 'You can\'t divide by zero';
            } else {
                result = firstOperand / secondOperand;
            }
            break
        default:
            result = 'unknown operation';
            break
    }

    if (Number.isInteger(result)) {
        result = result.toString();
    } else {
        result = result.toFixed(2);
    }

    solution.innerText = result;
})