import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import fetchCountries from '../helpers/fetchCountries';
import { DEBOUNCE_DELAY } from '../config';

import './css/styles.css';

const refs = {
  searchbox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

function showError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  clearUI();
}

function showManyCountries() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  clearUI();
}

function showCountries(countriesData) {
  if (countriesData.length > 10) {
    showManyCountries();
    return;
  }

  if (countriesData.length >= 2) {
    refs.countryList.innerHTML = countriesData.reduce((html, country) => {
      return `
        ${html}
        <li class='conteiner-item'>
          <img
            src='${country.flags.svg}'
            class='country__flag-img'
            alt='countries flag'
            width='30'
            height='20'
          />
          <p class='country__name'>${country.name.official}</p>
        </li>
      `;
    }, '');
    clearCountryInfo();
    return;
  }

  refs.countryInfo.innerHTML = countriesData.reduce((html, country) => {
    return `
      <div class='country-info__title'>
        <img
          src='${country.flags.svg}'
          class='country-info__flag-img'
          alt='countries flag'
          width='40'
          height='30'
        />
        <h1 class='country-info__name'>${country.name.official}</h1>
      </div>
      <div class='content'>
      <ul class='content__stats'>
          <li class='content__item'>Capital: <span>${country.capital}</span></li>
          <li class='content__item'>Population: <span>${country.population}</span></li>
          <li class='content__item'>Languages: <span>${Object.values(country.languages).join(', ')}</span></li>
      </ul>
    `;
  }, '');
  clearCountriesList();
}

function clearUI() {
  clearCountryInfo();
  clearCountriesList();
}

function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
}

function clearCountriesList() {
  refs.countryList.innerHTML = '';
}

function handleSearch() {
  const query = refs.searchbox.value.trim();

  if (query === '') {
    clearUI();
    return;
  }

  fetchCountries(query).then(showCountries).catch(showError);
}

export default () => {
  refs.searchbox.addEventListener(
    'input',
    debounce(handleSearch, DEBOUNCE_DELAY),
  );
}
