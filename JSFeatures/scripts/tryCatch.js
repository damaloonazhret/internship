// Try catch

const tryCatch = () => {
    const someFunction = () => {
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
tryCatchSpan.addEventListener('click', () => {
    console.clear();
    tryCatch();
})