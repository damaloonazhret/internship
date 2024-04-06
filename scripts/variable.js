// Variable assignment

const variableAssigment = function () {
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
variableAssigmentSpan.addEventListener('click', () => {
    variableAssigment();
})