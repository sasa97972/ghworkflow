import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// import { fetchCountries } from './fetchCountries';
import NewCountries from './fetchCountries';
import './css/styles.css';

const refs = {
  searchbox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;
const newsApiService = new NewCountries();

refs.searchbox.addEventListener(
  'input',
  debounce(() => {
    newsApiService.query = refs.searchbox.value;

    if (newsApiService.query === '') {
      refs.countryInfo.innerHTML = '';
      refs.countryList.innerHTML = '';
      return;
    }

    newsApiService.fetchCountries(newsApiService.query.trim()).then(showCountries).catch(showError);
  }, DEBOUNCE_DELAY),
);

function showError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
function showManyCountries() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

function showCountries(countriesData) {
  if (countriesData.length > 10) {
    showManyCountries();
    return;
  } else if (countriesData.length >= 2 && countriesData.length <= 10) {
    refs.countryList.innerHTML = countriesData
      .map(con => {
        return `
        <li class="conteiner-item">
          <img
            src="${con.flags.svg}"
            class="country__flag-img"
            alt="countries flag"
            width="30"
            height="20"
          />
          <p class="country__name">${con.name.official}</p>
        </li>
        `;
      })
      .join('');
    refs.countryInfo.innerHTML = '';
    return;
  }

  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = countriesData
    .map(con => {
      return `
        <div class="country-info__title">
        <img src="${
          con.flags.svg
        }" class="country-info__flag-img" alt="countries flag" width="40" height="30" />
          <h1 class="country-info__name">${con.name.official}</h1>
          </div>
          <div class="content">
          <ul class="content__stats">
              <li class="content__item">Capital: <span>${con.capital}</span></li>
              <li class="content__item">Population: <span>${con.population}</span></li>
              <li class="content__item">Languages: <span>${Object.values(con.languages)}</span></li>
          </ul>
          `;
    })
    .join('');
}
