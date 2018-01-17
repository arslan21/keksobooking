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

  function NeedHotelOffer() {
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

    this.type = typeValue;
    this.price = priceValue;
    this.rooms = roomsValue;
    this.guests = guestsValue;
    this.features = featuresNeed;
  }

  function insertSortedPins() {
    debounce(function () {
      window.filter.getFilterValues(window.backend.data);
      window.map.insertPins();
    }, 500);
  }

  function debounce(func, time) {
    var prevTimer;
    window.clearTimeout(prevTimer);
    prevTimer = window.setTimeout(func, time);
  }

  window.filter = {
    getSortedHotels: function () {
      window.filter.sortedHotels = [];
    },

    active: function () {
      for (var i = 0; i < mapFilters.length; i++) {
        mapFilters[i].addEventListener('change', insertSortedPins);
      }
      for (var j = 0; j < mapChekboxes.length; j++) {
        mapChekboxes[j].addEventListener('change', insertSortedPins);
      }
    },

    getFilterValues: function (hotelList) {
      var needHotelOffer = new NeedHotelOffer();
      var sortedHotels = hotelList.filter(function (hotel) {
        var hotelOffer = hotel.offer;
        return (needHotelOffer.type === 'any' || hotelOffer.type === needHotelOffer.type) &&
          (needHotelOffer.rooms === 'any' || hotelOffer.rooms === needHotelOffer.rooms) &&
          (needHotelOffer.guests === 'any' || hotelOffer.guests >= needHotelOffer.guests) &&
          (needHotelOffer.price === 'any' || (hotelOffer.price >= priceRank[needHotelOffer.price].min && hotelOffer.price <= priceRank[needHotelOffer.price].max)) &&
          (needHotelOffer.features.length === 0 || window.util.checkArray(hotelOffer.features, needHotelOffer.features));
      });
      window.filter.sortedHotels = sortedHotels;
    }

  };
})();
