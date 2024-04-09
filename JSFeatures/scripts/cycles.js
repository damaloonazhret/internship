// Cycles

const cycles = () => {
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
cyclesSpan.addEventListener('click', () => {
    console.clear();
    cycles();
})
