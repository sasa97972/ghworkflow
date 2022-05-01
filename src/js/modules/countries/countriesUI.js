export const renderCountryListItem = ({flags: { svg }, name: { official: officialName }}) => (`
  <li class='conteiner-item'>
      <img
        src='${svg}'
        class='country__flag-img'
        alt='countries flag'
        width='30'
        height='20'
      />
      <p class='country__name'>${officialName}</p>
    </li>
`);

export const renderSingleCountryInfo = ({
  capital,
  flags: { svg },
  languages,
  name: { official: officialName },
  population,
}) => (`
  <div class='country-info__title'>
    <img
      src='${svg}'
      class='country-info__flag-img'
      alt='countries flag'
      width='40'
      height='30'
    />
    <h1 class='country-info__name'>${officialName}</h1>
  </div>
  <div class='content'>
    <ul class='content__stats'>
        <li class='content__item'>Capital: <span>${capital}</span></li>
        <li class='content__item'>Population: <span>${population}</span></li>
        <li class='content__item'>Languages: <span>${Object.values(languages).join(', ')}</span></li>
    </ul>
  </div>
`);
