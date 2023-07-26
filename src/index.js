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

  // eslint-disable-next-line class-methods-use-this
  createHeader() {
    const header = document.createElement('div');
    header.classList.add('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Leaderboard';
    header.appendChild(h1);

    return header;
  }

  // eslint-disable-next-line class-methods-use-this
  async getScores(gameId) {
    try {
      const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`);
      const data = await response.json();
      return data.result;
    } catch (error) {
      return [];
    }
  }

  createLeftSection() {
    const left = document.createElement('div');
    left.classList.add('left');

    const div1 = this.createSectionWithTitle('Recent scores');
    const btnRefresh = this.createRefreshButton();
    div1.appendChild(btnRefresh);
    left.appendChild(div1);

    const ul = document.createElement('ul');
    ul.classList.add('nameList');

    const names = ['Name: 100', 'Name: 50', 'Name: 20', 'Name: 40'];

    if (names.length > 0) {
      names.forEach((name, index) => {
        const li = document.createElement('li');
        li.textContent = name;
        li.style.backgroundColor = index % 2 === 0 ? 'white' : 'silver';
        ul.appendChild(li);
      });
    } else {
      ul.style.border = 'none';
    }

    left.appendChild(ul);

    return left;
  }

  // eslint-disable-next-line class-methods-use-this
  async updateScores(gameId) {
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const ul = document.querySelector('.nameList');
      ul.innerHTML = '';

      if (data.result && data.result.length > 0) {
        data.result.forEach((score, index) => {
          const li = document.createElement('li');
          li.textContent = `Name: ${score.user}, Score: ${score.score}`;
          li.style.backgroundColor = index % 2 === 0 ? 'white' : 'silver';
          ul.appendChild(li);
        });
      }
    } catch (error) {
      throw new Error('Failed to update scores:', error);
    }
  }

  createRefreshButton() {
    const btnRefresh = document.createElement('button');
    btnRefresh.textContent = 'Refresh';
    btnRefresh.addEventListener('click', async () => {
      try {
        const gameId = 'YOUR_GAME_ID'; // Replace this with the actual game ID you received from the API when creating the game
        await this.updateScores(gameId);
      } catch (error) {
        throw new Error('Failed to fetch scores:', error);
      }
    });
    return btnRefresh;
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

  // eslint-disable-next-line class-methods-use-this
  createSectionWithTitle(titleText) {
    const div = document.createElement('div');
    div.classList.add('title');
    const h2 = document.createElement('h2');
    h2.textContent = titleText;
    div.appendChild(h2);
    return div;
  }

  createScoreForm() {
    const form = document.createElement('form');

    const input1 = this.createInput('text', 'name', 'Your Name');
    const input2 = this.createInput('text', 'score', 'Your Score');
    const btnSubmit = this.createInput('submit', '', 'Submit');

    form.appendChild(input1);
    form.appendChild(input2);
    form.appendChild(btnSubmit);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const userName = input1.value;
      const score = input2.value;

      try {
        const gameId = 'YOUR_GAME_ID'; // Replace this with the actual game ID you received from the API when creating the game
        await this.submitScore(gameId, userName, score);
        await this.updateScores(gameId);
      } catch (error) {
        throw new Error('Error submitting score:', error);
      }
    });

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

  // eslint-disable-next-line class-methods-use-this
  async submitScore(gameId, userName, score) {
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;

    const data = {
      user: userName,
      score: Number(score),
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit score.');
      }

      return response.json();
    } catch (error) {
      throw new Error('Error submitting score:', error);
    }
  }
}

const app = new LeaderboardApp();
window.addEventListener('DOMContentLoaded', () => {
  app.launcher();
});
