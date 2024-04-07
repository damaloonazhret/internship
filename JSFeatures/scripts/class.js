// Classes

const classes = () => {
    console.clear();

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
                this.experience++;
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

    brian.boost();
    brian.work(9);
    brian.study();
    console.log('Brian knowledge - ', `${brian.currentKnowledge} Kn`);
    console.log('Brian experience - ', `${brian.currentExperience} Xp`);

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
    console.log('Larry knowledge - ', `${larry.currentKnowledge} Kn`);
    console.log('Larry experience - ', `${larry.currentExperience} Xp`);

    class Senior extends Middle {
        static coffeeBreak = true;

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
    arnold.relaxation();
    arnold.work(40);
    console.log('Arnold knowledge - ', `${arnold.currentKnowledge} Kn`);
    console.log('Arnold experience - ', `${arnold.currentExperience} Xp`);
}

const classesSpan = document.querySelector('#classes');
classesSpan.addEventListener('click', () => {
    classes();
})