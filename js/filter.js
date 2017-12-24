'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapFilters = mapFiltersContainer.querySelectorAll('.map__filters');
  var mapChekboxes = mapFiltersContainer.querySelectorAll('input');

  var typeFilter = map.querySelector('#housing-type');
  var priceFilter = map.querySelector('#housing-price');
  var roomsFilter = map.querySelector('#housing-rooms');
  var guestsFilter = map.querySelector('#housing-guests');
  var FeaturesFilterSet = map.querySelector('.map__filter-set');


  var priceRank = {
    'middle': {
      min: 10000,
      max: 50000
    },
    'low': {
      min: 0,
      max: 10000
    },
    'high': {
      min: 50000,
      max: 1000000
    },

    'any': {
      min: 0,
      max: 10000000
    }
  };

  function getNeedHotel() {
    var guestsValue = guestsFilter.options[guestsFilter.selectedIndex].value;
    if (guestsValue !== 'any') {
      guestsValue = parseInt(guestsValue, 10);
    }
    var roomsValue = roomsFilter.options[roomsFilter.selectedIndex].value;
    if (roomsValue !== 'any') {
      roomsValue = parseInt(roomsValue, 10);
    }
    var typeValue = typeFilter.options[typeFilter.selectedIndex].value;
    var priceValue = priceFilter.options[priceFilter.selectedIndex].value;

    var checkboxes = FeaturesFilterSet.querySelectorAll('input');

    var inputsNeed = Array.from(checkboxes).filter(function (input) {
      return input.checked === true;
    });

    var featuresNeed = inputsNeed.map(function (input) {
      return input.value;
    });

    return {
      'offer': {
        'type': typeValue,
        'price': priceValue,
        'rooms': roomsValue,
        'guests': guestsValue,
        'features': featuresNeed
      }
    };
  }

  function debounce() {
    var prevTimer;
    window.clearTimeout(prevTimer);
    prevTimer = window.setTimeout(function () {
      window.filter.sorting(window.backend.data);
      window.map.insertPins();
    }, 500);
  }

  window.filter = {
    sortHotels: function () {
      window.filter.sortedHotels = [];
    },

    active: function () {
      for (var i = 0; i < mapFilters.length; i++) {
        mapFilters[i].addEventListener('change', debounce);
      }
      for (var j = 0; j < mapChekboxes.length; j++) {
        mapChekboxes[j].addEventListener('change', debounce);
      }
    },

    sorting: function (hotelList) {
      var needHotel = getNeedHotel();
      var needHotelOffer = needHotel.offer;
      var sortedHotels = [];
      out:
      for (var i = 0; i < hotelList.length; i++) {

        var hotelOffer = hotelList[i].offer;
        if (hotelOffer.type !== needHotelOffer.type && needHotelOffer.type !== 'any') {
          continue;
        }
        if (hotelOffer.rooms !== needHotelOffer.rooms && needHotelOffer.rooms !== 'any') {
          continue;
        }
        if (hotelOffer.guests !== needHotelOffer.guests && needHotelOffer.guests !== 'any') {
          continue;
        }

        if (needHotelOffer.pice !== 'any') {
          if (hotelOffer.price < priceRank[needHotelOffer.price].min || hotelOffer.price > priceRank[needHotelOffer.price].max) {
            continue;
          }
        }

        if (hotelOffer.features.length < needHotelOffer.features.length) {
          continue;
        }
        for (var j = 0; j < needHotelOffer.features.length; j++) {
          var feature = needHotelOffer.features[j];
          var hotelFeatures = hotelOffer.features;
          if (hotelFeatures.indexOf(feature) === -1) {
            continue out;
          }
        }
        sortedHotels.push(hotelList[i]);
      }

      window.filter.sortedHotels = sortedHotels;
    }

  };
})();
