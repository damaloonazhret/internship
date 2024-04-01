window.addEventListener('load', function () {
    console.log(`
   ╔══════════════════════╗
   ║                      ║
   ║        Senla!        ║
   ║                      ║
   ╚══════════════════════╝
`);

    console.log(`
    __  __     ____         _       __           __    __
   / / / /__  / / /___     | |     / /___  _____/ /___/ /
  / /_/ / _ \\/ / / __ \\    | | /| / / __ \\/ ___/ / __  / 
 / __  /  __/ / / /_/ /    | |/ |/ / /_/ / /  / / /_/ /  
/_/ /_/\\___/_/_/\\____/     |__/|__/\\____/_/  /_/\\__,_/            
                                                                 `)

    // Arithmetic operations

    function arithmeticOperation() {
        console.clear();
        const arithmeticObj = {};

        let addition = 1 + 2;
        let subtraction = 3 - 4;

        arithmeticObj['addition'] = addition;
        arithmeticObj['subtraction'] = subtraction;
        arithmeticObj['multiplication'] = 5 * 6;
        arithmeticObj['exponentiation'] = 5 ** 6;
        arithmeticObj['square root'] = 16 ** (1 / 2);
        arithmeticObj['division'] = 7 / 8;
        arithmeticObj['remainder of the division'] = 9 % 3;
        arithmeticObj['post increment'] = addition++;
        arithmeticObj['pre increment'] = ++addition;
        arithmeticObj['post decrement'] = subtraction--;
        arithmeticObj['pre decrement'] = --subtraction;
        arithmeticObj['unary plus'] = +true;

        console.log(arithmeticObj)
    }

    const arithmeticOperationSpan = document.querySelector('#arithmeticOperation');
    arithmeticOperationSpan.addEventListener('click', function () {
        arithmeticOperation();
    })

    // Working with strings

    function workingWithStrings() {
        console.clear();
        const stringObj = {};

        const hello = 'Hello';
        const one = '1';
        const two = '2';

        stringObj['concat'] = 'And' + 'rey';
        stringObj['double single'] = 'Hello "world"';
        stringObj['double double'] = "Hello \"world\"";
        stringObj['template strings'] = `${hello} world`;
        stringObj['concat with const'] = hello + ' ' + 'world';
        stringObj['addition of number strings'] = one + two;
        stringObj['string conversion '] = +one + +two;

        console.log(stringObj);
    }

    const workingWithStringsSpan = document.querySelector('#workingWithStrings');
    workingWithStringsSpan.addEventListener('click', function () {
        workingWithStrings();
    })

    // Variable assignment

    function variableAssigment() {
        console.clear();
        const a = 1;
        let b;
        b = 2;
        var c = 3;

        console.log(`
const obj = {
  name: 'Alex',
  age: 16
}
console.log(obj);
obj.name = 'Denchik';
obj.age = 18
console.log(obj);
        `);
        const obj = {
            name: 'Alex',
            age: 16
        }
        console.log(obj);
        obj.name = 'Denchik';
        obj.age = 18
        console.log(obj);

        console.log(`
variableAssignment:
const a = 1;
let b;
b = 2;
var c = 3;
    `, a, b, c);

        b = 'Web';
        c = '3.0'

        console.log(`b = 'Web',  c = '3.0':\n`, b, c)

        const copyA = a;
        const copyB = b;
        const copyC = c;

        console.log('const copyA = a;\nconst copyB = b;\nconst copyC = c;\n',
            copyA, copyB, copyC);
    }

    const variableAssigmentSpan = document.querySelector('#variableAssigment');
    variableAssigmentSpan.addEventListener('click', function () {
        variableAssigment();
    })

    // Console

    function consoleLog() {
        console.clear();
        console.time('Execution time took')
        console.group('Group Title');
        console.log('Message 1');
        console.log('Message 2');
        console.groupEnd();
        console.info('Info');
        console.error('Error');
        console.warn('Warn');
        console.assert(1 === 2, '1 doesn\'t equal 2')
        console.timeEnd('Execution time took')
    }

    const consoleLogSpan = document.querySelector('#console');
    consoleLogSpan.addEventListener('click', function () {
        consoleLog();
    })

    // Logical operation

    function logicalOperation() {
        console.clear();
        let zero = 0;
        let uno = 1;
        const stringUno = '1';

        console.log(`
console.log(
    zero > uno, 
    zero < uno, 
    stringUno == uno, 
    stringUno === uno, 
    zero++ <= uno, 
    zero <= uno--
);
`)
        console.log(
            zero > uno,
            zero < uno,
            stringUno == uno,
            stringUno === uno,
            zero++ <= uno,
            zero <= uno--
        );

        const model = 0;
        const company = '';
        const name = 'Username';
        console.log(model || company || name || 'Unknown');
        console.log(name && 'Unknown' && model && true)
        console.log(!model)
        console.log(!!name)

        const isRegister = true;
        const orders = 3;

        if (isRegister === true && orders > 0) {
            console.log(`const isRegister = true;
const orders = 3;
if (isRegister === true && orders > 0) {
    console.log('Success');
}`);
            console.log('Success');
        }

        const html = true;
        const css = false;

        if (html || css) {
            console.log(`const html = true;
const css = false;
if (html || css) {
    console.log('JavaScript!')
}`)
            console.log('JavaScript!')
        }

        const programmer = true;

        if (programmer) console.log(`const programmer = true;
    if (programmer) console.log("You are programmer")`)
        console.log("You are programmer")
    }

    const logicalOperationSpan = document.querySelector('#logicalOperation');
    logicalOperationSpan.addEventListener('click', function () {
        logicalOperation();
    })

    // Try catch

    function tryCatch() {
        console.clear();

        function someFunction() {
            const randomNumber = Math.random();
            if (randomNumber < 0.5) {
                throw new Error("Error: random number is less than 0.5");
            }
            return randomNumber;
        }

        try {
            const result = someFunction();
            console.log("Result:", result);
        } catch (error) {
            console.error("An error has occurred:", error);
        } finally {
            console.log("Completing error processing");
        }
    }

    const tryCatchSpan = document.querySelector('#tryCatch');
    tryCatchSpan.addEventListener('click', function () {
        tryCatch();
    })

    // Arithmetics event

    const inputOperands = document.querySelectorAll('#arithmetics input');
    inputOperands.forEach(function (el) {
        el.addEventListener('input', function (e) {
            if (e.target.value.length > 4) {
                e.target.value = e.target.value.slice(0, 4);
            }
        })
    })

    const equal = document.querySelector('#equal');
    equal.addEventListener('click', function () {
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

    // Cycles

    function cycles () {
        let i = 5;
        while (i) {
            i--
            console.log(i)
        }

        let j = 0;
        do {
            j++
            if (j === 2) continue
            console.log(j)
        } while (j < 4)

        outer: for (let i = 6; i <= 18; i++) {
            for (let j = 25; j <= 30; j++) {
                if (i === 7) break outer
                console.log(`${i}:${j} AM`)
            }
        }
    }

    const cyclesSpan = document.querySelector('#cycles');
    cyclesSpan.addEventListener('click', function () {
        cycles();
    })
})