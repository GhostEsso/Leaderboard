import './style.css';

class LeaderboardApp {
  constructor() {
    this.body = document.querySelector('body');
    this.launcher();
  }

  launcher() {
    const main = document.createElement('main');
    main.classList.add('main');

    const header = this.createHeader();
    const left = this.createLeftSection();
    const right = this.createRightSection();

    main.appendChild(header);
    main.appendChild(left);
    main.appendChild(right);

    this.body.innerHTML = '';
    this.body.appendChild(main);
  }

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

    const div1 = this.createSectionWithTitle('Recent scores');
    const table = this.createScoreTable();
    div1.appendChild(table);

    left.appendChild(div1);
    return left;
  }

  createRightSection() {
    const right = document.createElement('div');
    right.classList.add('right');

    const div2 = this.createSectionWithTitle('Add your score');
    const form = this.createScoreForm();
    div2.appendChild(form);

    right.appendChild(div2);
    return right;
  }

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
    const td1 = this.createTableHeader('Libellé: 100');
    const td2 = this.createTableHeader('Libellé: 50');
    const td3 = this.createTableHeader('Libellé: 20');
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);
    return table;
  }

  createTableHeader(text) {
    const th = document.createElement('th');
    th.textContent = text;
    return th;
  }

  createScoreForm() {
    const form = document.createElement('form');
    const input1 = this.createInput('text', 'name', 'Your Name');
    const input2 = this.createInput('text', 'score', 'Your Score');
    const btnSubmit = this.createInput('submit', '', 'Submit');
    form.appendChild(input1);
    form.appendChild(input2);
    form.appendChild(btnSubmit);
    return form;
  }

  createInput(type, name, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    if (name) input.name = name;
    if (placeholder) input.placeholder = placeholder;
    return input;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new LeaderboardApp();
});
