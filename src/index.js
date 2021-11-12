import PixabayApiService from './js/apiService';
import photoTemplate from './templates/photo';
import getRefs from './js/getRefs';

// ================pnotify=======================//
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
// lightbox
import { openLightbox } from './js/lightbox';

const { cardContainer, searchForm, button } = getRefs();

const pixabayApiService = new PixabayApiService();

searchForm.addEventListener('submit', onSearch);
button.addEventListener('click', onClickButton);
cardContainer.addEventListener('click', openLightbox);

function onClickButton(event) {
  fetchPhotos();
}

function onSearch(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.query.value;
  if (searchQuery.trim() === '') {
    addIsHiddenBtn();
    tooManyMatches();
    return;
  }

  pixabayApiService.query = searchQuery;
  pixabayApiService.resetPage();
  clearCardContainer();
  addIsHiddenBtn();
  fetchPhotos();
}
async function fetchPhotos() {
  try {
    const hits = await pixabayApiService.fetchPhotos();
    if (hits.length === 0) {
      return alert('No more images');
    } else {
      appendPhotosMarkup(hits);
      removeIsHiddenBtn();
    }
  } catch (error) {
    console.log(error);
  }
}

function appendPhotosMarkup(photos) {
  cardContainer.insertAdjacentHTML('beforeend', photoTemplate(photos));
}

function clearCardContainer() {
  cardContainer.innerHTML = '';
}

function tooManyMatches() {
  error({
    text: 'Enter at least some text!',
    animation: 'fade',

    delay: 2000,
  });
  clearCardContainer();
}

function notFound() {
  error({
    text: 'Incorrect input!',
    delay: 2000,
  });
  clearCardContainer();
}

function removeIsHiddenBtn() {
  button.classList.remove('is-hidden');
}

function addIsHiddenBtn() {
  button.classList.add('is-hidden');
}
