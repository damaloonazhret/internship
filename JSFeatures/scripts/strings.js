// Working with strings

const workingWithStrings = () => {
    const stringObj = {};

    const hello = 'Hello';
    const one = '1';
    const two = '2';

    stringObj['concat'] = 'And' + 'rey';
    stringObj['doubleSingle'] = 'Hello "world"';
    stringObj['doubleDouble'] = "Hello \"world\"";
    stringObj['templateStrings'] = `${hello} world`;
    stringObj['concatWithConst'] = hello + ' ' + 'world';
    stringObj['additionOfNumberStrings'] = one + two;
    stringObj['stringConversion'] = +one + +two;

    const {
        concat,
        doubleSingle,
        doubleDouble,
        templateStrings,
        concatWithConst,
        additionOfNumberStrings,
        stringConversion
    } = stringObj;

    console.log('concat', concat);
    console.log('doubleSingle', doubleSingle);
    console.log('doubleDouble', doubleDouble);
    console.log('templateStrings', templateStrings);
    console.log('concatWithConst', concatWithConst);
    console.log('additionOfNumberStrings', additionOfNumberStrings);
    console.log('stringConversion', stringConversion);
}

const workingWithStringsSpan = document.querySelector('#workingWithStrings');
workingWithStringsSpan.addEventListener('click', () => {
    console.clear();
    console.log(`
const stringObj = {};

const hello = 'Hello';
const one = '1';
const two = '2';

stringObj['concat'] = 'And' + 'rey';
stringObj['doubleSingle'] = 'Hello "world"';
stringObj['doubleDouble'] = "Hello \\"world\\"";
stringObj['templateStrings'] = \`\${hello} world\`;
stringObj['concatWithConst'] = hello + ' ' + 'world';
stringObj['additionOfNumberStrings'] = one + two;
stringObj['stringConversion'] = +one + +two;

const {
    concat,
    doubleSingle,
    doubleDouble,
    templateStrings,
    concatWithConst,
    additionOfNumberStrings,
    stringConversion
} = stringObj;

console.log('concat', concat);
console.log('doubleSingle', doubleSingle);
console.log('doubleDouble', doubleDouble);
console.log('templateStrings', templateStrings);
console.log('concatWithConst', concatWithConst);
console.log('additionOfNumberStrings', additionOfNumberStrings);
console.log('stringConversion', stringConversion);
    `)
    workingWithStrings();
})