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

var OFFER_TYPES = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
// var mapPin = mapPins.querySelectorAll('.map__pin');
// var mapPinActive = mapPins.querySelector('.map__pin--active');
var mapPinMain = mapPins.querySelector('.map__pin--main');

var template = document.querySelector('template').content;
var templatePinButton = template.querySelector('.map__pin');
var buttonImage = templatePinButton.querySelector('img');

var mapCard = template.querySelector('.map__card');
var mapFiltersContainer = map.querySelector('.map__filters-container');

var noticeBlock = document.querySelector('.notice');
var noticeForm = noticeBlock.querySelector('.notice__form');

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

function getHotelList() {
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

function renderPin(hotel) {
  var mapPin = templatePinButton.cloneNode(true);
  mapPin.setAttribute('style', 'left: ' + (hotel.location.x - 3) + 'px;' + 'top: ' + (hotel.location.y - buttonImage.height) + 'px;');
  mapPin.querySelector('img').setAttribute('src', hotel.author.avatar);

  mapPin.addEventListener('click', openPopup);
  mapPin.addEventListener('keydown', enterOpenPopup);
  mapPin.addEventListener('click', function () {
    getMapCard(hotel);
  });

  return mapPin;
}

function openPopup() {
  var mapPinActive = map.querySelector('.map__pin--active');
  if (mapPinActive !== null) {
    mapPinActive.classList.remove('map__pin--active');
  }
  if (map.querySelector('.popup') !== null) {
    map.querySelector('.popup').remove();
  }
  this.classList.add('map__pin--active');
}

function enterOpenPopup(evt) {
  if (evt.keyCode === 13) {
    openPopup();
  }
}

function escClosePopup(evt) {
  if (evt.keyCode === 27) {
    closePopup();
  }
}

function enterClosePopup(evt) {
  if (evt.keyCode === 13) {
    closePopup();
  }
}

function closePopup() {
  map.querySelector('.popup').remove();
  var mapPinActive = mapPins.querySelector('.map__pin--active');
  mapPinActive.classList.remove('map__pin--active');
  document.removeEventListener('keydown', closePopup);
}

//  формирование списка пиктограмм для карточки отеля
function featuresListForPopup(hotel) {
  var featuresListPopup = mapCard.querySelector('.popup__features').cloneNode(true);
  var featuresListAll = featuresListPopup.querySelectorAll('.feature');
  for (var k = 0; k < featuresListAll.length; k++) {
    featuresListAll[k].classList = '';
    if (k < hotel.offer.feature.length) {
      featuresListAll[k].classList = 'feature feature--' + hotel.offer.feature[k];
    } else {
      featuresListPopup.removeChild(featuresListAll[k]);
    }
  }
  return featuresListPopup;
}

function getMapCard(hotel) {
  var mapCardForShow = mapCard.cloneNode(true);

  mapCardForShow.querySelector('h3').textContent = hotel.offer.title;
  mapCardForShow.querySelector('small').textContent = hotel.offer.address;
  mapCardForShow.querySelector('.popup__price').textContent = hotel.offer.price + ' \u20BD/ночь';

  var hotelTypeText = OFFER_TYPES[hotel.offer.type] ? OFFER_TYPES[hotel.offer.type] : 'Иное';
  mapCardForShow.querySelector('h4').textContent = hotelTypeText;
  mapCardForShow.querySelector('p:nth-of-type(3)').textContent = hotel.offer.rooms + ' комнаты для ' + hotel.offer.guests + ' гостей';
  mapCardForShow.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;

  var featuresListPopup = featuresListForPopup(hotel);
  mapCardForShow.appendChild(featuresListPopup);

  mapCardForShow.querySelector('p:nth-of-type(5)').textContent = hotel.offer.description;
  mapCardForShow.querySelector('.popup__avatar').setAttribute('src', hotel.author.avatar);

  var popupCloseButton = mapCardForShow.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', closePopup);
  popupCloseButton.addEventListener('keydown', enterClosePopup);
  document.addEventListener('keydown', escClosePopup);

  map.insertBefore(mapCardForShow, mapFiltersContainer);
}

function insertPins() {
  var mapPinsLength = mapPins.children.length;
  for (var i = mapPinsLength; i > 0; i--) {
    if (mapPins.children[mapPinsLength - 1].classList === 'map__pin' || mapPins.children[mapPinsLength - 1].classList === 'map__pin map__pin--active') {
      mapPins.children[mapPinsLength - 1].remove();
      mapPinsLength--;
    }
  }

  var fragment = document.createDocumentFragment();
  for (var l = 0; l < hotelList.length; l++) {
    fragment.appendChild(renderPin(hotelList[l]));
  }
  mapPins.appendChild(fragment);
}


var hotelList = getHotelList();

mapPinMain.addEventListener('mouseup', function () {
  noticeForm.classList.remove('notice__form--disabled');
  map.classList.remove('map--faded');
  insertPins();
});
