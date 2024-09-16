// Classes

const workers = document.querySelectorAll('.name');
function updateWorkers(n, worker) {
    workers[n].innerText = `${worker.name} - ${worker.currentKnowledge} Kn, ${worker.currentExperience} Xp`;
}

class Junior {
    #superPower;
    #booster = false;

    constructor(name) {
        this.name = name;
        this.experience = 0;
        this.knowledge = 10;
    }

    work(n) {
        while (n) {
            n--
            this.#booster
                ? this.experience += 2
                : this.experience++
        }
    }

    study() {
        this.#booster
            ? this.knowledge += 4
            : this.knowledge += 2;
    }

    boost() {
        this.#superPower = 'touch typing';
        this.#booster = true;
    }

    get currentExperience() {
        return this.experience;
    }

    get currentKnowledge() {
        return this.knowledge;
    }
}

const brian = new Junior('Brian');
const property1 = document.querySelectorAll('.property-1 div');
property1[0].addEventListener('click', () => {
    brian.work(1);
    updateWorkers(0, brian);
})
property1[1].addEventListener('click', () => {
    brian.study();
    updateWorkers(0, brian);
})
property1[2].addEventListener('click', () => {
    brian.boost();
})

class Middle extends Junior {
    constructor(name, knowledge, experience) {
        super(name);
        this.experience = knowledge;
        this.knowledge = experience;
    }

    work(n) {
        super.work(n);
        this.experience += 5;
    }
}

const larry = new Middle('Larry', 24, 30);
larry.work(15);
const property2 = document.querySelectorAll('.property-2 div');
property2[0].addEventListener('click', () => {
    larry.work(1);
    updateWorkers(1, larry);
})
property2[1].addEventListener('click', () => {
    larry.study();
    updateWorkers(1, larry);
})

class Senior extends Middle {
    static coffeeBreak = false;

    constructor(name, knowledge, experience) {
        super(name);
        this.experience = experience;
        this.knowledge = knowledge;
    }

    relaxation() {
        Senior.coffeeBreak
            ? this.experience += 10
            : this.experience += 5;
    }

    work(n) {
        super.work(n);
        this.experience += 5;
    }

    set knowledgeUp(value) {
        this.knowledge += value;
    }

    set experienceUp(value) {
        this.experience = value;
    }
}

const arnold = new Senior('Arnold', 100, 100);
arnold.knowledgeUp = 15;
arnold.experienceUp = 150;
arnold.work(40);
const property3 = document.querySelectorAll('.property-3 div');
property3[0].addEventListener('click', () => {
    arnold.work(1);
    updateWorkers(2, arnold);
})
property3[1].addEventListener('click', () => {
    arnold.study();
    updateWorkers(2, arnold);
})
property3[2].addEventListener('click', () => {
    arnold.relaxation();
    updateWorkers(2, arnold);
})
property3[3].addEventListener('click', () => {
    Senior.coffeeBreak = !Senior.coffeeBreak;
})
