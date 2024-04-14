export class PageCreator {
    constructor({title, about, input, inputTextColorInfo, inputBGColorInfo}) {
        this.title = title;
        this.about = about;
        this.input = input;
        this.inputTextColorInfo = inputTextColorInfo;
        this.inputBGColorInfo = inputBGColorInfo;
    }

    create() {
        const article = document.createElement('article');
        if (this.input === 'color') {
            article.innerHTML = `<h2>${this.title}</h2>
                                <div class="setting">
                                    <label for="text">
                                    ${this.inputTextColorInfo}
                                    </label>
                                    <input id="text" type='color' name="text-color">
                                    <button id="resetText" type="button">Reset</button>
                                </div>
                                <div class="setting">
                                    <label for="BG">
                                    ${this.inputBGColorInfo}
                                    </label>
                                    <input id="BG" type='color' name="background-color">
                                    <button id="resetBG" type="button">Reset</button>
                                </div>
                                <p>${this.about}</p>`
            ;
        } else {
            article.innerHTML = `<h2>${this.title}</h2><p>${this.about}</p>`;

        }
        return article;
    }

    render() {
        return this.create()
    }
}