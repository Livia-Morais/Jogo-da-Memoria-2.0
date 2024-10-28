const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'papagaio',
  'cao',
  'coruja',
  'galinha',
  'galo',
  'gato',
  'hipopotamo',
  'ourico',
  'peixe',
  'rato',
];





const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';
let seconds = 0; // Adicionando a variável de segundos
let minutes = 0; // Adicionando a variável de minutos

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop); //VAI PARAR  O LOOP
    
    // Exibir mensagem no modal
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.innerHTML = `Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${minutes} minutos e ${seconds} segundos`;

    // Exibir o modal
    const modal = document.getElementById('endGameModal');
    modal.style.display = 'flex'; // O modal só é exibido aqui
  }
}




const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}



const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}




const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}


//DUPLICA CADA CARTA
const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}


//CRONOMETRO
const startTimer = () => {
  this.loop = setInterval(() => {
    seconds++; // Incrementa os segundos
    if (seconds === 60) { // Se os segundos chegarem a 60
      seconds = 0; // Reseta os segundos
      minutes++; // Incrementa os minutos
    }
    // Atualiza o timer no formato mm:ss
    timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}


const restartGame = () => {
  // Limpa o grid
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  // Reseta o temporizador
  clearInterval(this.loop);
  seconds = 0; // Reseta os segundos
  minutes = 0; // Reseta os minutos
  timer.innerHTML = '00:00'; // Reseta a exibição do timer
  startTimer(); // Reinicia o cronômetro

  // Carrega o jogo novamente
  loadGame();
}

// Evento de carregamento da página
window.onload = () => {
  const modal = document.getElementById('endGameModal');
  modal.style.display = 'none';

  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();

  // Evento para reiniciar o jogo
  document.getElementById('restart-btn').addEventListener('click', restartGame);

  // Evento para reiniciar o jogo a partir do modal
  document.getElementById('restart-btn-modal').addEventListener('click', () => {
    modal.style.display = 'none'; // Esconder o modal
    restartGame(); // Reiniciar o jogo
  })

  // Evento para fechar o modal ao clicar no "X"
  document.getElementById('closeModal').addEventListener('click', () => {
    modal.style.display = 'none';
  })

  // Evento para voltar à página inicial
  document.getElementById('home-btn').addEventListener('click', () => {
    window.location.href = '../index.html'; // Redireciona para index.html
  });
}

