const arrowFunction = () => {
    const arrow = a => a + 3;
    console.log(arrow(3));

    const arrow2 = (a, b) => a + b;
    console.log(arrow2(3, 4));

    const arrow3 = (a, b, c, ...rest) => {
        let sum = 0;
        sum += a;
        sum += b;
        sum += c;
        for (const arg of rest) {
            sum += arg;
        }
        return sum;
    }

    console.log(arrow3(1, 2, 3, 4, 5, 6, 7, 8, 9));

    const arrowFunction = () => {
        return this;
    }
    console.log(arrowFunction() === window);

    function functionDeclaration() {
        this.num = 1;
        return (() => {
            return this.num;
        })();
    }

    console.log(functionDeclaration());
}

const arrowFunctionSpan = document.querySelector('#arrowFunction');
arrowFunctionSpan.addEventListener('click', () => {
    console.clear();
    console.log(`
const arrow = a => a + 3;
console.log(arrow(3));

const arrow2 = (a, b) => a + b;
console.log(arrow2(3, 4));

const arrow3 = (a, b, c, ...rest) => {
    let sum = 0;
    sum += a;
    sum += b;
    sum += c;
    for (const arg of rest) {
        sum += arg;
    }
    return sum;
}

console.log(arrow3(1, 2, 3, 4, 5, 6, 7, 8, 9));

const arrowFunction = () => {
    return this;
}
console.log(arrowFunction() === window);

function functionDeclaration() {
    this.num = 1;
    return (() => {
        return this.num;
    })();
}

console.log(functionDeclaration());
    `)
    arrowFunction();
})
