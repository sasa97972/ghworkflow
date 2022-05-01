import { API_HOST } from '../config';

export default function fetchCountries(query) {
  return fetch(`${API_HOST}/name/${query}`).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}
