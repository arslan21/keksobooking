
'use strict';

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

var TYPES = [
  'flat',
  'house',
  'bungalo'
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

function getFeaturesList() {
  var featuresList = [];
  featuresList.length = Math.ceil(Math.random() * FEATURES_LIST.length);
  var existedFeatures = {};
  for (var i = 0; i < featuresList.length; i++) {
    featuresList[i] = FEATURES_LIST[Math.floor(Math.random() * FEATURES_LIST.length)];
    if (existedFeatures[featuresList[i]] === true) {
      i--;
    } else {
      existedFeatures[featuresList[i]] = true;
    }
  }
  return featuresList;
}

function generationHotel() {
  var hotel = {};
  hotel.author = {};
  hotel.author.avatar = 'img/avatars/user0' + Math.ceil(Math.random() * 8) + '.png';
  hotel.offer = {};
  hotel.location = {};
  hotel.location.x = Math.floor(300 + Math.random() * (900 + 1 - 300));
  hotel.location.y = Math.floor(100 + Math.random() * (500 + 1 - 100));
  hotel.offer.title = TITLES[Math.floor(Math.random() * TITLES.length)];
  hotel.offer.address = hotel.location.x + ', ' + hotel.location.y;
  hotel.offer.price = (Math.floor(10 + Math.random() * (10000 + 1 - 10))) * 100;
  hotel.offer.type = TYPES[Math.floor(Math.random() * TYPES.length)];
  hotel.offer.rooms = Math.ceil(Math.random() * 5);
  hotel.offer.guests = Math.ceil(Math.random() * 15);
  hotel.offer.checkin = CHECK_TIMES[Math.floor(Math.random() * CHECK_TIMES.length)];
  hotel.offer.checkout = CHECK_TIMES[Math.floor(Math.random() * CHECK_TIMES.length)];
  hotel.offer.feature = getFeaturesList();
  hotel.offer.description = '';
  hotel.offer.photos = [];
  return hotel;
}

function renderHotelList() {
  var hotelList = [];
  var existedAvatars = {};
  for (var i = 0; i < 8; i++) {
    hotelList[i] = generationHotel();
    if (existedAvatars[hotelList[i].author.avatar] === true) {
      i--;
    } else {
      existedAvatars[hotelList[i].author.avatar] = true;
    }
  }
  return hotelList;
}

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
map.classList.remove('map--faded');

var template = document.querySelector('template').content;
var templatePinButton = template.querySelector('.map__pin');
var buttonImage = templatePinButton.querySelector('img');

var hotelList = renderHotelList();

function renderPin(hotel) {
  var hotelPin = templatePinButton.cloneNode(true);
  hotelPin.setAttribute('style', 'left: ' + (hotel.location.x - 3)  + 'px;' + 'top: ' + (hotel.location.y - buttonImage.height) + 'px;');
  hotelPin.querySelector('img').setAttribute('src', hotel.author.avatar);
  return hotelPin;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < hotelList.length; i++) {
  fragment.appendChild(renderPin(hotelList[i]));
}

mapPins.appendChild(fragment);

var mapCard = template.querySelector('.map__card');
var mapFiltersContainer = map.querySelector('.map__filters-container');

function showMapCard(hotel) {
  var mapCardForShow = mapCard.cloneNode(true);

  mapCardForShow.querySelector('h3').textContent = hotel.offer.title;
  mapCardForShow.querySelector('small').textContent = hotel.offer.address;
  mapCardForShow.querySelector('.popup__price').textContent = hotel.offer.price + ' \u20BD/ночь';

  var offerTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };
  var hotelTypeText = offerTypes[hotel.offer.type] ? offerTypes[hotel.offer.type] : 'Иное';

  mapCardForShow.querySelector('h4').textContent = hotelTypeText;
  mapCardForShow.querySelector('p:nth-of-type(3)').textContent = hotel.offer.rooms + ' комнаты для ' + hotel.offer.guests + ' гостей';
  mapCardForShow.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;

  var featuresListPopup = mapCardForShow.querySelector('.popup__features');
  var featuresListAll = featuresListPopup.querySelectorAll('.feature');
  for (var k = 0; k < featuresListAll.length; k++) {
    featuresListAll[k].classList = '';
    if (k < hotel.offer.feature.length) {
      featuresListAll[k].classList = 'feature feature--' + hotel.offer.feature[k];
    } else {
      featuresListPopup.removeChild(featuresListAll[k]);
    }
    mapCardForShow.querySelector('p:nth-of-type(5)').textContent = hotel.offer.description;
    mapCardForShow.querySelector('.popup__avatar').setAttribute('src', hotel.author.avatar);
  }
  return mapCardForShow;
}

var mapCardForShow = showMapCard(hotelList[0]);
map.insertBefore(mapCardForShow, mapFiltersContainer);
