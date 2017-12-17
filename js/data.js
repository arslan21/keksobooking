'use strict';

(function () {
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var FEATURES_LIST = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var CHECK_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];

  function generationHotel() {
    var util = window.util;

    var hotel = {};
    hotel.author = {};
    hotel.author.avatar = 'img/avatars/user0' + util.getRandomCeil(8) + '.png';
    hotel.offer = {};
    hotel.location = {};
    hotel.location.x = util.getRandomFloor(300, 900);
    hotel.location.y = util.getRandomFloor(100, 500);
    hotel.offer.address = hotel.location.x + ', ' + hotel.location.y;
    hotel.offer.title = util.getRandomElem(TITLES);
    hotel.offer.price = util.getRandomFloor(10, 10000) * 100;
    var types = window.data.OFFER_TYPES;
    var typesForGeneration = Object.keys(types);
    hotel.offer.type = util.getRandomElem(typesForGeneration);
    hotel.offer.rooms = util.getRandomCeil(5);
    hotel.offer.guests = util.getRandomCeil(15);
    hotel.offer.checkin = util.getRandomElem(CHECK_TIMES);
    hotel.offer.checkout = util.getRandomElem(CHECK_TIMES);
    hotel.offer.feature = getFeaturesList();
    hotel.offer.description = '';
    hotel.offer.photos = [];
    return hotel;
  }

  function getFeaturesList() {
    var util = window.util;
    var featuresList = [];
    featuresList.length = util.getRandomCeil(FEATURES_LIST.length);
    var existedFeatures = {};
    for (var i = 0; i < featuresList.length; i++) {
      featuresList[i] = util.getRandomElem(FEATURES_LIST);
      if (existedFeatures[featuresList[i]] === true) {
        i--;
      } else {
        existedFeatures[featuresList[i]] = true;
      }
    }
    return featuresList;
  }

  window.data = {
    getHotelList: function () {
      var hotelList = [];
      var existedAvatars = {};
      for (var h = 0; h < 8; h++) {
        hotelList[h] = generationHotel();
        if (existedAvatars[hotelList[h].author.avatar] === true) {
          h--;
        } else {
          existedAvatars[hotelList[h].author.avatar] = true;
        }
      }
      return hotelList;
    },

    OFFER_TYPES: {
      flat: {
        name: 'Квартира',
        minPrice: 1000,
        maxPrice: 1000000
      },
      bungalo: {
        name: 'Бунгало',
        minPrice: 0,
        maxPrice: 1000000
      },
      house: {
        name: 'Дом',
        minPrice: 5000,
        maxPrice: 1000000
      },
      palace: {
        name: 'Дворец',
        minPrice: 10000,
        maxPrice: 1000000
      }
    }
  };
})();
