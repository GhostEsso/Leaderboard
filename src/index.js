import './style.css';

class LeaderboardApp {
  constructor() {
    this.body = document.querySelector('body');
    this.launcher();
  }

  launcher() {
    const main = document.createElement('main');
    main.classList.add('main');

    const header = this.createHeader(); // Utilisation correcte de 'this'
    const left = this.createLeftSection(); // Utilisation correcte de 'this'
    const right = this.createRightSection(); // Utilisation correcte de 'this'

    main.appendChild(header);
    main.appendChild(left);
    main.appendChild(right);

    this.body.innerHTML = '';
    this.body.appendChild(main);
  }

  // eslint-disable-next-line class-methods-use-this
  createHeader() {
    const header = document.createElement('div');
    header.classList.add('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Leaderboard';
    header.appendChild(h1);
    return header;
  }

  createLeftSection() {
    const left = document.createElement('div');
    left.classList.add('left');

    const div1 = this.createSectionWithTitle('Recent scores'); // Utilisation correcte de 'this'
    const table = this.createScoreTable();
    div1.appendChild(table);

    left.appendChild(div1);
    return left;
  }

  createRightSection() {
    const right = document.createElement('div');
    right.classList.add('right');

    const div2 = this.createSectionWithTitle('Add your score'); // Utilisation correcte de 'this'
    const form = this.createScoreForm();
    div2.appendChild(form);

    right.appendChild(div2);
    return right;
  }

  // eslint-disable-next-line class-methods-use-this
  createSectionWithTitle(titleText) {
    const div = document.createElement('div');
    div.classList.add('title');
    const h2 = document.createElement('h2');
    h2.textContent = titleText;
    div.appendChild(h2);
    return div;
  }

  createScoreTable() {
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const td1 = this.createTableHeader('Libellé: 100'); // Utilisation correcte de 'this'
    const td2 = this.createTableHeader('Libellé: 50'); // Utilisation correcte de 'this'
    const td3 = this.createTableHeader('Libellé: 20'); // Utilisation correcte de 'this'
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);
    return table;
  }

  // eslint-disable-next-line class-methods-use-this
  createTableHeader(text) {
    const th = document.createElement('th');
    th.textContent = text;
    return th;
  }

  createScoreForm() {
    const form = document.createElement('form');
    const input1 = this.createInput('text', 'name', 'Your Name'); // Utilisation correcte de 'this'
    const input2 = this.createInput('text', 'score', 'Your Score'); // Utilisation correcte de 'this'
    const btnSubmit = this.createInput('submit', '', 'Submit'); // Utilisation correcte de 'this'
    form.appendChild(input1);
    form.appendChild(input2);
    form.appendChild(btnSubmit);
    return form;
  }

  // eslint-disable-next-line class-methods-use-this
  createInput(type, name, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    if (name) input.name = name;
    if (placeholder) input.placeholder = placeholder;
    return input;
  }
}

const app = new LeaderboardApp();
window.addEventListener('DOMContentLoaded', () => {
  // Utilisation de l'instance déjà créée
  app.launcher();
});
