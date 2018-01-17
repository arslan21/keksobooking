'use strict';

(function () {
  var mapmap = document.querySelector('.map');
  console.log(mapmap);
  var mapPins = mapmap.querySelector('.map__pins');
  var mapFiltersContainer = mapmap.querySelector('.map__filters-container');
  var mapFilters = mapFiltersContainer.querySelectorAll('.map__filters');

  var typeFilter = mapmap.querySelector('#housing-type');
  var priceFilter = mapmap.querySelector('#housing-price');
  var roomsFilter = mapmap.querySelector('#housing-rooms');
  var guestsFilter = mapmap.querySelector('#housing-guests');
  var hotelList = window.data.hotelList;

  var priceRank = {
    'middle': {
      min: 10000,
      max: 50000
    },
    'low': {
      min: 10000,
      max: 50000
    },
    'high': {
      min: 50000,
      max: 1000000
    }
  };

  function priceSort() {
    debugger
    var value = priceFilter.options[priceFilter.selectedIndex].value;
    if (value !== 'any') {
      var sortedHotelList = hotelList.filter(function (List) {
        return List.offer.price < priceRank[value].max;
      }).
      filter(function (List) {
        return List.offer.price > priceRank[value].min
      })
    } else {
      var sortedHotelList = hotelList;
    }
    console.log(sortedHotelList);
  }

  function typeSort() {
    debugger
    var value = typeFilter.options[typeFilter.selectedIndex].value;
    if (value !== 'any') {
      var sortedHotelList = hotelList.filter(function (List) {
        return List.offer.type === value;
      })
    } else {
      var sortedHotelList = hotelList;
    }
    console.log(sortedHotelList);
  }

  function roomsSort() {
    debugger
    var value = roomsFilter.options[roomsFilter.selectedIndex].value;
    if (value !== 'any') {
      var sortedHotelList = hotelList.filter(function (List) {
        return List.offer.rooms === parseInt(value);
      })
    } else {
      var sortedHotelList = hotelList;
    }
    console.log(sortedHotelList);
  }

  function guestSort() {
    debugger
    var value = guestsFilter.options[guestsFilter.selectedIndex].value;
    if (value !== 'any') {
      var sortedHotelList = hotelList.filter(function (hotelList) {
        return hotelList.offer.guests === parseInt(value);
      })
    } else {
      var sortedHotelList = hotelList;
    }
    console.log(sortedHotelList);
  }



  window.filter = {
    filteredPins: function () {
      priceFilter.addEventListener('change', function () {
        priсeSort();
      });
      typeFilter.addEventListener('change', function () {
        typeSort();
      });
      roomsFilter.addEventListener('change', function () {
        roomsSort();
      });
      guestsFilter.addEventListener('change', function () {
        guestSort();
      });
    }
  }


})();
