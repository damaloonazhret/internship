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

    const arithmeticObj = {};

    let addition = 1 + 2;
    let subtraction = 3 - 4;

    arithmeticObj['addition'] = addition;
    arithmeticObj['subtraction'] = subtraction;
    arithmeticObj['multiplication'] = 5 * 6;
    arithmeticObj['exponentiation'] = 5 ** 6;
    arithmeticObj['division'] = 7 / 8;
    arithmeticObj['remainder of the division'] = 9 % 3;
    arithmeticObj['increment'] = addition++;
    arithmeticObj['decrement'] = subtraction--;
    arithmeticObj['unary plus'] = +true;

    console.log(arithmeticObj)

    // Working with strings

    const stringObj = {};

    const hello = 'Hello'

    stringObj['concat'] = 'And' + 'rey'
    stringObj['double single'] = 'Hello "world"'
    stringObj['double double'] = "Hello \"world\""
    stringObj['concat with const'] = hello + ' ' + 'world'
    stringObj['template strings'] = `${hello} world`

    // Variable assignment

    const a = 1;
    let b = 2;
    var c = 3;

    console.log(`
variableAssignment:
const a = 1;
let b = 2;
var c = 3;
    `, a, b, c);

    b = 4;
    c = 6

    console.log(`b = 4,  c = 6:\n`, b, c)

    const assA = a;
    const assB = b;
    const assC = c;

    console.log('const assA = a;\nconst assB = b;\nconst assC = c;\n',
        assA, assB, assC);

    // Console

    console.group('Group Title');
    console.log('Message 1');
    console.log('Message 2');
    console.groupEnd();

    // Logical operation

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

    // try catch

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


})