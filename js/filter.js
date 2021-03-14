import { removeMarkers, setMarkers, reCreateMarkers } from './map.js';
import { debounce } from './util.js';

const MAX_ADS_COUNT = 10;
const INTERVAL = 500;
const DEFAULT_SELECT_VALUE = 'any';
const priceFilter = {
  'middle': (value) => (value >= 10000 && value < 50000),
  'low': (value) => value < 10000,
  'high': (value) => value >= 50000,
  [DEFAULT_SELECT_VALUE]: () => true,
};

const mapFilters = document.querySelector('.map__filters');
const mapFeatures = document.querySelector('.map__features');
const propertyTypeFilter = mapFilters.querySelector('#housing-type');
const selectFilters = mapFilters.querySelectorAll('select');

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

const isSelectMatched = (select, selectType, offer) => {
  const value = select.value;
  const offerValue = offer[selectType];
  const isDefault = value === DEFAULT_SELECT_VALUE;

  if (!isDefault) {
    return selectType === 'price' ? priceFilter[value] : value === offerValue.toString();
  }
  return isDefault;
};

const isFeaturesMatched = (selectedFeatures, offerFeatures) => {
  return selectedFeatures.every((selectedFeature) => {
    return offerFeatures.includes(selectedFeature.value);
  })
}

const isOfferMatched = (offer) => {
  const isSelectsMatched = Array.from(selectFilters).every((select) => {
    const selectType = select.name.split('-')[1];
    return isSelectMatched(select, selectType, offer);
  })

  const selectedFeatures = Array.from(mapFilters.querySelectorAll('input:checked'));
  return isSelectsMatched && isFeaturesMatched(selectedFeatures, offer.features);
}

const filterOffers = (offers) => {
  const filteredAds = [];
  let ad;
  for (let i = 0; i < offers.length; i++) {
    ad = offers[i];
    if (isOfferMatched(ad.offer)) {
      filteredAds.push(ad);
    }
    if (filteredAds.length === MAX_ADS_COUNT) {
      return filteredAds;
    }
  }
  return filteredAds;
}

const filterMarkers = (offers) => {
  const filteredAds = filterOffers(offers);
  reCreateMarkers(filteredAds);
}

const onFilterChange = (offers) => debounce(() => filterMarkers(offers), INTERVAL);

const setFilterListener = (offers) => {
  mapFilters.addEventListener('change', onFilterChange(offers));
};

export { deactivateFilterForm, activateFilterForm, setFilteredMarkers, resetFilters, mapFilters, setFilterListener };
