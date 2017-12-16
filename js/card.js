'use strict';

(function () {
  var util = window.util;
  var list = window.list;

  var template = document.querySelector('template').content;
  var mapCard = template.querySelector('.map__card');
  var templateCloseButton = mapCard.querySelector('.popup__close');

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapFiltersContainer = map.querySelector('.map__filters-container');


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

  function escClosePopup(evt) {
    util.isEscEvent(evt, closePopup);
  }

  function enterClosePopup(evt) {
    util.isEnterEvent(evt, closePopup);
  }

  function closePopup() {
    templateCloseButton.removeEventListener('keydown', enterClosePopup);
    templateCloseButton.removeEventListener('click', closePopup);
    map.querySelector('.popup').remove();
    var mapPinActive = mapPins.querySelector('.map__pin--active');
    mapPinActive.classList.remove('map__pin--active');
    document.removeEventListener('keydown', escClosePopup);
  }

  window.card = {
    getMapCard: function (hotel) {
      var mapCardForShow = mapCard.cloneNode(true);

      mapCardForShow.querySelector('h3').textContent = hotel.offer.title;
      mapCardForShow.querySelector('small').textContent = hotel.offer.address;
      mapCardForShow.querySelector('.popup__price').textContent = hotel.offer.price + ' \u20BD/ночь';

      var offerTypes = list.OFFER_TYPES;
      mapCardForShow.querySelector('h4').textContent = offerTypes[hotel.offer.type].name;
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
  };
})();
