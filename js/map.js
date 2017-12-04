
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

var FEATUES_LIST = [
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
  featuresList.length = Math.ceil(Math.random() * FEATUES_LIST.length);
  for (var i = 0; i < featuresList.length; i++) {
    featuresList[i] = FEATUES_LIST[Math.floor(Math.random() * FEATUES_LIST.length)];
    var existedFeatures = {};
    if (existedFeatures[featuresList[i].FEATUES_LIST] === true) {
      existedFeatures[featuresList[i].FEATUES_LIST] = true;
    }
  }
  return featuresList;
}

function renderHotel() {
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
  for (var i = 0; i < 8; i++) {
    hotelList[i] = renderHotel();
    var existedAvatars = {};
    if (existedAvatars[hotelList[i].author.avatar] === true) {
      i--;
    } else {
      existedAvatars[hotelList[i].author.avatar] = true;
    }
    console.log(hotelList[i].author.avatar);
  }
  return hotelList;
}

var map = document.querySelector('.map');
map.classList.remove('.map--fadded');

var mapPins = map.querySelector('.map__pins');
var mapPinButton = document.querySelector('.map__pin');

function getPins(hotel) {
  var similarHotel = mapPinButton.cloneNode(true);
  similarHotel.classList.remove('.map__pin--main');

  mapPinButton.setAttribute('style', 'left: ' + hotel.location.x + 'px;' + 'top: ' + hotel.location.y + 'px;');
  mapPinButton.querySelector('img').setAttribute('src', hotel.author.avatar);

  return similarHotel;
}


var hotelList = renderHotelList();

var fragment = document.createDocumentFragment();
for (var i = 0; i < hotelList.length; i++) {
  fragment.appendChild(getPins(hotelList[i]));
}

mapPins.appendChild(fragment);


var template = document.querySelector('template').content;
var mapCard = template.querySelector('.map__card');
var mapFiltersContainer = map.querySelector('.map__filters-container');

mapCard.querySelector('h3').textContent = hotelList[0].offer.title;
mapCard.querySelector('p:first-of-type').textContent = hotelList[0].offer.address;
mapCard.querySelector('p.popup__price').textContent = hotelList[0].offer.price + '&#x20bd;' + '/ночь';

switch (hotelList[0].offer.type) {
  case 'flat':
    var hotelTypeText = 'Квартира';
    break;
  case 'bungalo':
    hotelTypeText = 'Бунгало';
    break;
  case 'house':
    hotelTypeText = 'Дом';
    break;
  default:
    hotelTypeText = 'Иное';
}
mapCard.querySelector('h4').textContent = hotelTypeText;
mapCard.querySelector('p:nth-of-type(3)').textContent = hotelList[0].offer.rooms + ' комнаты для ' + hotelList[0].offer.guests + ' гостей';
mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + hotelList[0].offer.checkin + ', выезд до ' + hotelList[0].offer.checkout;

var featuresListPopup = mapCard.querySelector('.popup__features');
var featuresListAll = featuresListPopup.querySelectorAll('.feature');
for (var k = 0; k < featuresListAll.length; k++) {
  featuresListAll[k].classList = '';
  if (k < hotelList[0].offer.feature.length) {
    featuresListAll[k].classList = 'feature feature--' + hotelList[0].offer.feature[k];
  } else {
    featuresListPopup.removeChild(featuresListAll[k]);
  }
}

// console.log(hotelList[0].offer.feature);

mapCard.querySelector('p:nth-of-type(5)').textContent = hotelList[0].offer.description;
mapCard.querySelector('.popup__avatar').setAttribute('src', hotelList[0].author.avatar);

map.insertBefore(mapCard, mapFiltersContainer);
