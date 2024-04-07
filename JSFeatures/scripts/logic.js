// Logical operation

const logicalOperation = () => {
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
logicalOperationSpan.addEventListener('click', () => {
    logicalOperation();
})