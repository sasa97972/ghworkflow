import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import fetchCountries from '../../helpers/fetchCountries';
import { renderCountryListItem, renderSingleCountryInfo } from './countriesUI';
import { DEBOUNCE_DELAY } from '../../config';

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
        ${renderCountryListItem(country)}
      `;
    }, '');
    clearCountryInfo();
    return;
  }

  refs.countryInfo.innerHTML = renderSingleCountryInfo(countriesData[0]);
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
