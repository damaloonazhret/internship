// Arithmetic operations

const arithmeticOperation = () => {
    console.clear();
    const arithmeticObj = {};

    let additionType = 1 + 2;
    let subtractionType = 3 - 4;

    arithmeticObj['addition'] = additionType;
    arithmeticObj['subtraction'] = subtractionType;
    arithmeticObj['multiplication'] = 5 * 6;
    arithmeticObj['exponentiation'] = 5 ** 6;
    arithmeticObj['squareRoot'] = 16 ** (1 / 2);
    arithmeticObj['division'] = 7 / 8;
    arithmeticObj['remainderOfTheDivision'] = 9 % 3;
    arithmeticObj['postIncrement'] = additionType++;
    arithmeticObj['preIncrement'] = ++additionType;
    arithmeticObj['postDecrement'] = subtractionType--;
    arithmeticObj['preDecrement'] = --subtractionType;
    arithmeticObj['unaryPlus'] = +true;

    // for (const key in arithmeticObj) {
    //     console.log(key, arithmeticObj[key]);
    // }

    for (const [key, value] of Object.entries(arithmeticObj)) {
        console.log(key, value);
    }
}

const arithmeticOperationSpan = document.querySelector('#arithmeticOperation');
arithmeticOperationSpan.addEventListener('click', () => {
    arithmeticOperation();
})