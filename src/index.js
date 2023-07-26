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

    const div1 = this.createSectionWithTitle('Recent scores   '); // Utilisation correcte de 'this'
    const btnRefresh = this.createRefreshButton(); // Créer le bouton "Refresh"
    div1.appendChild(btnRefresh); // Ajouter le bouton "Refresh" à côté de "Recent scores"
    left.appendChild(div1); // Ajouter le titre "Recent scores" avec le bouton "Refresh"

    // Utilisez une liste pour afficher les noms sous forme de liste
    const ul = document.createElement('ul');
    ul.classList.add('nameList'); // Ajouter une classe pour la bordure
    const names = ['Name: 100', 'Name: 50', 'Name: 20', 'Name: 40']; // Remplacez ces noms par vos données de score
    names.forEach((name, index) => {
      const li = document.createElement('li');
      li.textContent = name;
      li.style.backgroundColor = index % 2 === 0 ? 'white' : 'silver'; // Alterner les arrière-plans blanc et noir
      ul.appendChild(li);
    });
    left.appendChild(ul); // Ajouter la liste de noms sous "Recent scores"

    return left;
  }

  async getScores(gameId) {
    try {
      const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`);
      const data = await response.json();
      return data.result;
    } catch (error) {
      return [];
    }
  }

  // Modify the createRefreshButton method to call getScores and display the scores
  createRefreshButton(gameId) {
    const btnRefresh = document.createElement('button');
    btnRefresh.textContent = 'Refresh';
    btnRefresh.addEventListener('click', async () => {
      try {
        // Call the getScores method to retrieve game scores
        const scores = await this.getScores(gameId);

        // Now we can display the fetched scores on the page
      // for example, updating the list of names with the scores retrieved.
      // (Note that for now we are only displaying the names, you will also need to
      // display the scores in the list.)
      const nameList = document.querySelector('.nameList');
      nameList.innerHTML = '';
      scores.forEach((score, index) => {
        const li = document.createElement('li');
        li.textContent = `Name: ${score.user} - Score: ${score.score}`;
        li.style.backgroundColor = index % 2 === 0 ? 'white' : 'silver';
        nameList.appendChild(li);
      });
      } catch (error) {
        console.error('Error while creating the game :', error);
      }
    });
    return btnRefresh;
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
    table.classList.add('scoreTable'); // Ajouter la classe "scoreTable" pour la bordure
    const tr = document.createElement('tr');
    const th = this.createTableHeader('Name'); // Utilisation correcte de 'this'
    tr.appendChild(th);
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
    const input1 = this.createInput('text', 'name', 'Your Name'); // Utilisation correcte de 'this'
    const input2 = this.createInput('text', 'score', 'Your Score'); // Utilisation correcte de 'this'
    const btnSubmit = this.createInput('submit', '', 'Submit'); // Utilisation correcte de 'this'
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

const app = new LeaderboardApp();
window.addEventListener('DOMContentLoaded', () => {
  // Utilisation de l'instance déjà créée
  app.launcher();
});
