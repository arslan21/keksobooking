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

var OFFER_TYPES = {
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
};

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

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
// var mapPin = mapPins.querySelectorAll('.map__pin');
// var mapPinActive = mapPins.querySelector('.map__pin--active');
var mapPinMain = mapPins.querySelector('.map__pin--main');

var template = document.querySelector('template').content;
var templatePinButton = template.querySelector('.map__pin');
var buttonImage = templatePinButton.querySelector('img');
var templateCloseButton = template.querySelector('.popup__close');

var mapCard = template.querySelector('.map__card');
var mapFiltersContainer = map.querySelector('.map__filters-container');

var noticeBlock = document.querySelector('.notice');
var noticeForm = noticeBlock.querySelector('.notice__form');
var noticeFields = noticeForm.querySelectorAll('fieldset');

//  работа с полями формы объявления
for (var n = 0; n < noticeFields.length; n++) {
  noticeFields[n].disabled = true;
}

// console.log(noticeFields);

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
  var typesForGeneration = Object.keys(OFFER_TYPES)
  hotel.offer.type = typesForGeneration[Math.floor(Math.random() * typesForGeneration.length)];
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
  for (var h = 0; h < 8; h++) {
    hotelList[h] = generationHotel();
    if (existedAvatars[hotelList[h].author.avatar] === true) {
      h--;
    } else {
      existedAvatars[hotelList[h].author.avatar] = true;
    }
  }
  return hotelList;
}

function renderPin(hotel) {
  var mapPin = templatePinButton.cloneNode(true);
  mapPin.setAttribute('style', 'left: ' + (hotel.location.x - 3) + 'px;' + 'top: ' + (hotel.location.y - buttonImage.height) + 'px;');
  mapPin.querySelector('img').setAttribute('src', hotel.author.avatar);

  mapPin.addEventListener('click', function (evt) {
    activatePin(evt);
    getMapCard(hotel);
  });
  mapPin.addEventListener('keydown', function (evt) {
    if (evt === ENTER_KEYCODE) {
      activatePin(evt);
    }
  });
  return mapPin;
}

function activatePin(evt) {
  var mapPinActive = map.querySelector('.map__pin--active');
  if (mapPinActive !== null) {
    mapPinActive.classList.remove('map__pin--active');
  }
  if (map.querySelector('.popup') !== null) {
    map.querySelector('.popup').remove();
  }

  evt.currentTarget.classList.add('map__pin--active');
}

function escClosePopup(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}

function enterClosePopup(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup(evt);
  }
}

function closePopup() {
  templateCloseButton.removeEventListener('keydown', enterClosePopup);
  templateCloseButton.removeEventListener('click', closePopup);
  map.querySelector('.popup').remove();
  var mapPinActive = mapPins.querySelector('.map__pin--active');
  mapPinActive.classList.remove('map__pin--active');
  document.removeEventListener('keydown', escClosePopup);
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

  mapCardForShow.querySelector('h4').textContent = OFFER_TYPES[hotel.offer.type].name;
  mapCardForShow.querySelector('p:nth-of-type(3)').textContent = hotel.offer.rooms + ' комнаты для ' + hotel.offer.guests + ' гостей';
  mapCardForShow.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;

  var featuresListPopup = featuresListForPopup(hotel);
  mapCardForShow.replaceChild(featuresListPopup, mapCardForShow.querySelector('.popup__features'));

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
  for (var p = mapPinsLength; p > 0; p--) {
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

function activateNotice() {
  noticeForm.classList.remove('notice__form--disabled');
  for (var f = 0; f < noticeFields.length; f++) {
    noticeFields[f].disabled = false;
  }
  map.classList.remove('map--faded');
}


var hotelList = getHotelList();

mapPinMain.addEventListener('mouseup', function () {
  activateNotice();
  insertPins();
  disabeledCapacityOptions();
  setPriceRange(typeSelectedValue);
});

var addressField = noticeForm.querySelector('#address');
addressField.required = true;
addressField.disabled = true;

var titleField = noticeForm.querySelector('#title');
titleField.required = true;

var priceField = noticeForm.querySelector('#price');
priceField.required = true;

var typeField = noticeForm.querySelector('#type');
var typeSelectedValue = typeField.options[typeField.selectedIndex].value;

var timeInField = noticeForm.querySelector('#timein');
var timeOutField = noticeForm.querySelector('#timeout');

var roomNumberField = noticeForm.querySelector('#room_number');
var capacityField = noticeForm.querySelector('#capacity');

function setPriceRange(type) {
  priceField.min = OFFER_TYPES[type].minPrice;
  priceField.max = OFFER_TYPES[type].maxPrice;
}

function disabeledCapacityOptions() {
  var roomSelectedValue = roomNumberField.options[roomNumberField.selectedIndex].value;
  var capacityOptions = capacityField.options;
  for (var c = 0; c < capacityOptions.length; c++) {
    capacityOptions[c].disabled = false;
    for (var j = 0; j < capacityOptions.length; j++) {
      if (roomSelectedValue !== '100') {
        if (roomSelectedValue < capacityOptions[j].value) {
          capacityOptions[j].disabled = true;
        }
        if (capacityOptions[j].value === '0') {
          capacityOptions[j].disabled = true;
        }
      } else {
        if (capacityOptions[j].value > '0') {
          capacityOptions[j].disabled = true;
        }
      }
    }
  }
}

typeField.addEventListener('change', function () {
  var type = typeField.options[typeField.selectedIndex].value;
  setPriceRange(type);
});

timeInField.addEventListener('change', function () {
  var index = timeInField.selectedIndex;
  timeOutField.selectedIndex = index;
});
timeOutField.addEventListener('change', function () {
  var index = timeOutField.selectedIndex;
  timeInField.selectedIndex = index;
});

roomNumberField.addEventListener('change', function () {
  disabeledCapacityOptions();
});


// Валидация полей
function titleFieldValidation() {
  debugger;
  if (titleField.validity.tooShort) {
    titleField.setCustomValidity('Опишите подробнее Ваше жильё');
    return true;
  }

  if (titleField.validity.tooLong) {
    titleField.setCustomValidity('На сервере заканчивается свободное место, попробуйте описать Ваше жильё покороче');
    return true;
  }

  if (titleField.validity.valueMissing) {
    titleField.setCustomValidity('Клиенты хотят знать подробности о Вашем жилье');
    return true;
  }
  return false;
  // titleField.setCustomValidity(' ');
}

function priceFieldValidation() {
  // var type = typeField.options[typeField.selectedIndex].value;

  if (priceField.validity.rangeUnderflow) {
    // priceField.setCustomValidity(OFFER_TYPES[type].name + ' обычно стоит дороже');
    return true;
  }

  if (priceField.validity.rangeOverflow) {
    // priceField.setCustomValidity(OFFER_TYPES[type].name + ' обычно стоит дешевле');
    return true;
  }

  if (priceField.validity.valueMissing) {
    // priceField.setCustomValidity(OFFER_TYPES[type].name + ' обычно сколько-нибудь стоит');
    return true;
  }
  return false;

  // priceField.setCustomValidity(' ');
}

function addressFieldValidation() {
  if (addressField.value === '') {
    return true;
  }
  return false;
}

function capacityFieldValidation() {
  if (capacityField.options[capacityField.selectedIndex].disabled) {
    return true;
  }
  return false;
}


//  Маркировка незаполненных полей
function invalidFieldBordering(validationState, field) {
  if (validationState) {
    field.setAttribute('style', 'border-color: red');
  } else {
    field.removeAttribute('style');
  }
}

function invalidFieldsMarking() {
  var titleFieldValidityState = titleFieldValidation();
  invalidFieldBordering(titleFieldValidityState, titleField);

  var priceFieldValidityState = priceFieldValidation();
  invalidFieldBordering(priceFieldValidityState, priceField);

  var addressFieldValidityState = addressFieldValidation();
  invalidFieldBordering(addressFieldValidityState, addressField);

  var capacityFieldValidityState = capacityFieldValidation();
  invalidFieldBordering(capacityFieldValidityState, capacityField);
}

//  отправка формы
var submitForm = noticeForm.querySelector('.form__submit');
function submitingForm(evt) {
  if (titleFieldValidation() || priceFieldValidation() || addressFieldValidation() || capacityFieldValidation()) {
    evt.preventDefault();
    invalidFieldsMarking();
    alert('Заполните отмеченные поля');
  } else {
    noticeForm.submit();
  }
}

submitForm.addEventListener('click', function (evt) {
  submitingForm(evt);
});
submitForm.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    submitingForm(evt);
  }
});
