const restSpread = () => {
    const sum = (name, age, ...numbers) => {
        let sum = 0;
        for (let param of numbers) sum += param;
        return ` Name: ${name},\n age: ${age},\n number sum = ${sum}. `;
    }

    console.log(sum('Webster', '20', 8, 4, 5, 2, 5, 3, 9, 3, 7));

    const arr = [1, 3, 5, 6, 8, 23, 456, 123, 12, 34];
    const arrCopy = [...arr];
    const arrUnUnique = [...arrCopy, 11, 13, 11, 13];
    const arrUnique = [...new Set(arrUnUnique)];

    const set = new Set(arrUnUnique);
    console.log('set', ...set);

    console.log(arr === arrCopy);
    console.log(arrUnUnique);
    console.log(arrUnique);

    console.log(`${Math.max(...arr)} is max number of array`);

    const merge = [123, 567, ...arr];
    console.log(merge);

    const str = 'Hello';
    console.log([...str]);

    const mix = (x, y, z, ...rest) => {
        console.log(`${x} ${y} ${z} - ${rest[0]} ${rest[1]}`);
    }

    const cords = [53.777, 52.656, 53.432, 'secret', 'coordinates'];

    mix(...cords);

    const obj1 = {
        color: 'violet',
    }

    const obj2 = {
        speed: '260km/h',
    }

    const obj3 = {...obj1, ...obj2, fuel: '80 liters'};

    console.log(obj3);
}

const restSpreadSpan = document.querySelector('#restSpread');
restSpreadSpan.addEventListener('click', () => {
    console.clear();
    console.log(`
const sum = (name, age, ...numbers) => {
    let sum = 0;
    for (let param of numbers) sum += param;
    return \` Name: £{name},\\n age: £{age},\\n number sum = £{sum}. \`;
}

console.log(sum('Webster', '20', 8, 4, 5, 2, 5, 3, 9, 3, 7));

const arr = [1, 3, 5, 6, 8, 23, 456, 123, 12, 34];
const arrCopy = [...arr];
const arrUnUnique = [...arrCopy, 11, 13, 11, 13];
const arrUnique = [...new Set(arrUnUnique)];

const set = new Set(arrUnUnique);
console.log('set', ...set);

console.log(arr === arrCopy);
console.log(arrUnUnique);
console.log(arrUnique);

console.log(\`£{Math.max(...arr)} is max number of array\`);

const merge = [123, 567, ...arr];
console.log(merge);

const str = 'Hello';
console.log([...str]);

const mix = (x, y, z, ...rest) => {
    console.log('£{x} £{y} £{z} - £{rest[0]} £{rest[1]}');
}

const cords = [53.777, 52.656, 53.432, 'secret', 'coordinates'];

mix(...cords);

const obj1 = {
    color: 'violet',
}

const obj2 = {
    speed: '260km/h',
}

const obj3 = {...obj1, ...obj2, fuel: '80 liters'};

console.log(obj3);
    `)
    restSpread();
})
