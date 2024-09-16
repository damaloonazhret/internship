const generators = () => {
    console.clear();
    console.time();
    function* fibonacciGen() {
        let prev = 1;
        let curr = 1;

        while (true) {
            yield curr;
            [prev, curr] = [curr, prev + curr]
        }
    }

    const gen = fibonacciGen();

    for (let i = 0; i < 10; i++) {
        console.log(String(`Fibonacci generator ${gen.next().value}`))
    }

    const fibonacciGen2 = {
        [Symbol.iterator]() {
            let i = 10;
            let prev = 1;
            let curr = 1;

            return {
                next() {
                    if (i > 0) {
                        i--;
                        const value = curr;
                        [prev, curr] = [curr, prev + curr];
                        return { value, done: false };
                    } else {
                        return { done: true };
                    }
                }
            };
        }
    }

    for (let fib of fibonacciGen2) {
        console.log(`Manual Fibonacci generator ${String(fib)}`)
    }

    console.timeEnd()
}

const generatorsSpan = document.querySelector('#generators');
generatorsSpan.addEventListener('click', () => {
    generators();
})