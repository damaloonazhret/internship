// Способ реализации функции конструктора до появления классов
const inputFields = [
    {content: 'Name:', type: 'text', id: 'name', name: 'name'},
    {content: 'Password:', type: 'password', id: 'password', name: 'password'},
    {content: 'Email:', type: 'email', id: 'email', name: 'email'},
    {content: 'Telephone:', type: 'tel', id: 'tel', name: 'tel'},
    {content: 'Prevent Default!!!!!!', type: 'time', id: 'time', name: 'time'}
];

const tableCell = document.querySelector('.data__form-table-cell');

const ElementsGenerator = function (
    div = 'div',
    label = 'label',
    input = 'input'
) {
    this.div = div;
    this.label = label;
    this.input = input;
}

ElementsGenerator.prototype.generateFieldElement = function (field) {
    const div = ElementsGenerator.prototype.generateElement(this.div, {
        className: 'tr'
    });

    const label = ElementsGenerator.prototype.generateElement(this.label, {
        innerText: field.content,
        htmlFor: field.id
    });

    const input = ElementsGenerator.prototype.generateElement(this.input, {
        type: field.type,
        id: field.id,
        name: field.name,
        placeholder: 'focus me'
    });

    div.appendChild(label);
    div.appendChild(input);
    tableCell.appendChild(div);
}

ElementsGenerator.prototype.generateElement = function (tag, attributes) {
    const element = document.createElement(tag);
    for (const key in attributes) {
        element[key] = attributes[key];
    }
    return element;
}

const generator = new ElementsGenerator();

inputFields.forEach((field) => {
    generator.generateFieldElement(field);
});

const h2 = generator.generateElement('h2', {
    innerText: 'Focus Info'
});

tableCell.prepend(h2);