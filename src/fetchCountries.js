// функция

// export function fetchCountries(countries) {
//   return fetch(`https://restcountries.com/v3.1/name/${countries}`).then(response => {
//     if (!response.ok) {
//       throw Error(response.statusText);
//     }
//     return response.json();
//   });
// }

// тоже самое, но через класс

export default class NewCountries {
  constructor() {
    this.countries = '';
  }

  fetchCountries() {
    return fetch(`https://restcountries.com/v3.1/name/${this.countries}`).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    });
  }

  get query() {
    return this.countries;
  }

  set query(newQuery) {
    this.countries = newQuery;
  }
}
