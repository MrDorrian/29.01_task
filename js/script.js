'use stcrict';
const randomText = [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur excepturi ab, nostrum qui mollitia et, repudiandae voluptatibus veniam aliquid placeat quas delectus fuga blanditiis, libero eius velit quaerat nulla quis officia. Nam voluptatum deserunt vitae!',
];
const cardContainer = document.getElementById('root'); // ul

const newCards = responseData.map((cards) => createCardsElement(cards));
cardContainer.append(...newCards);

/**
 *
 * @param {object} place
 * @returns {HTMLLIElement}
 */
function createCardsElement(cards) {
  const { firstName, lastName } = cards;

  const p = createElement('p', { classNames: ['cardDescription'] }, [
    document.createTextNode(randomText),
  ]);
  const h2FirstName = createElement('h2', { classNames: ['cardName'] }, [
    document.createTextNode(firstName),
  ]);
  const h2LastName = createElement('h2', { classNames: ['cardName'] }, [
    document.createTextNode(lastName),
  ]);
  const img = createCardImage(cards);
  const divNames = createElement('div', { classNames: ['nameWarapper'] }, [
    h2FirstName,
    h2LastName,
  ]);
  const [icons] = responseData.map((user) => createIcon(user.contacts));
document.body.append(...icons);
  const article = createElement('article', { classNames: ['cardContainer'] }, [
    img,
    divNames,
    p,
  ]);

  const wrapper = createElement('li', { classNames: ['cardWrapper'] }, [
    article,
  ]);
  return wrapper;
}

function createCardImage(cards) {
  const { id, firstName } = cards;

  const imageWrapper = document.createElement('div');
  imageWrapper.setAttribute('id', `wrapper${id}`); // устанавливаем  id для контейнер картинки
  imageWrapper.classList.add('imageWrapper');
  imageWrapper.style.backgroundColor = stringToColour(firstName);

  const initials = document.createElement('div');
  initials.classList.add('imagePlaceholder', 'imagePlacement');
  initials.append(document.createTextNode(firstName[0] || ''));

  createImage(cards);

  imageWrapper.append(initials);
  return imageWrapper;
}


function createImage({ profilePicture, firstName, id }) {
  const img = document.createElement('img'); // = new Image();
  img.setAttribute('src', profilePicture);
  img.setAttribute('alt', firstName);
  img.dataset.id = id; // даём картинки её id
  img.classList.add('cardImage', 'imagePlacement');
  img.addEventListener('error', imageErrorHandler);
  img.addEventListener('load', imageLoadHandler);
}

// /*
//   EVENT LISTENERS
// */
function imageErrorHandler({ target }) {
  target.remove();
}

function imageLoadHandler({
  target: {
    dataset: { id },
  },
  target,
}) {
  document.getElementById(`wrapper${id}`).append(target);
}

// /*
//   UTILS
// */
// DONT TRUST THIS CODE. TAKEN FROM STACKOVERFLOW
function stringToColour(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}