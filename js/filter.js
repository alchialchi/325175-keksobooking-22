import { removeMarkers, setMarkers } from './map.js';

const mapFilters = document.querySelector('.map__filters');
const mapFeatures = document.querySelector('.map__features');
const propertyTypeFilter = mapFilters.querySelector('#housing-type')

const deactivateFilterForm = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFilters.querySelectorAll('.map__filter').forEach((filter) => {
    filter.setAttribute('disabled', '');
  })
  mapFeatures.setAttribute('disabled', 'disabled');
};

const activateFilterForm = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFilters.querySelectorAll('.map__filter').forEach((filter) => {
    filter.removeAttribute('disabled');
  })
  mapFeatures.removeAttribute('disabled');
};

const setFilteredMarkers = (offers) => {
  propertyTypeFilter.addEventListener('change', (evt) => {
    if (evt.target.value !== 'any') {
      removeMarkers();
      setMarkers(offers
        .filter((offer) => offer.offer.type === evt.target.value));
    } else {
      setMarkers(offers);
    }
  });
};

const resetFilters = (offers) => {
  const resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    mapFilters.reset();
    removeMarkers();
    setMarkers(offers);
  });
};

export { deactivateFilterForm, activateFilterForm, setFilteredMarkers, resetFilters, mapFilters };
