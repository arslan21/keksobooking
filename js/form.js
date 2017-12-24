'use strict';

(function () {
  var noticeBlock = document.querySelector('.notice');
  var noticeForm = noticeBlock.querySelector('.notice__form');
  var noticeFields = noticeForm.querySelectorAll('fieldset');

  var addressField = noticeForm.querySelector('#address');
  var titleField = noticeForm.querySelector('#title');
  var priceField = noticeForm.querySelector('#price');
  var typeField = noticeForm.querySelector('#type');
  var checkInField = noticeForm.querySelector('#timein');
  var checkOutField = noticeForm.querySelector('#timeout');
  var roomNumberField = noticeForm.querySelector('#room_number');
  var capacityField = noticeForm.querySelector('#capacity');

  var submitForm = noticeForm.querySelector('.form__submit');

  function deactivateNotice() {
    noticeForm.classList.remove('notice__form--disabled');
    for (var f = 0; f < noticeFields.length; f++) {
      noticeFields[f].disabled = true;
    }
  }

  // Валидация полей
  function titleFieldValidation() {
    if (titleField.validity.tooShort) {
      return true;
    }

    if (titleField.validity.tooLong) {
      return true;
    }

    if (titleField.validity.valueMissing) {
      return true;
    }
    return false;
  }

  function priceFieldValidation() {
    if (priceField.validity.rangeUnderflow) {
      return true;
    }

    if (priceField.validity.rangeOverflow) {
      return true;
    }

    if (priceField.validity.valueMissing) {
      return true;
    }
    return false;
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

  function allFieldValidation() {
    if (titleFieldValidation() || priceFieldValidation() || addressFieldValidation() || capacityFieldValidation()) {
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

  //  проверка отправки формы
  submitForm.addEventListener('click', function (evt) {
    submitingForm(evt);
  });
  submitForm.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, submitingForm);
  });

  function submitingForm(evt) {
    if (allFieldValidation()) {
      evt.preventDefault();
      invalidFieldsMarking();
    }
  }
  // отправка формы
  noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeForm), resetNotice, window.errorMessage);
    evt.preventDefault();
  });

  function resetNotice() {
    noticeForm.reset();
    noticeForm.classList.add('notice__form--disabled');
    deactivateNotice();
    window.card.closePopup();
    window.map.removePins();
    window.map.mapFaded();
  }

  window.form = {
    activateNotice: function () {
      noticeForm.classList.remove('notice__form--disabled');
      for (var f = 0; f < noticeFields.length; f++) {
        noticeFields[f].disabled = false;
      }
    },

    disabeledCapacityOptions: function () {
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
    },

    initFields: function () {
      addressField.required = true;
      addressField.disabled = true;
      titleField.required = true;
      priceField.required = true;

      for (var n = 0; n < noticeFields.length; n++) {
        noticeFields[n].disabled = true;
      }

      var typeValues = [];
      var minPrices = [];
      var offerTypes = window.data.OFFER_TYPES;
      for (var i = 0; i < typeField.options.length; i++) {
        typeValues[i] = typeField.options[i].value;
        minPrices[i] = offerTypes[typeValues[i]].minPrice;
      }
      window.synchronizeFields(typeField, priceField, typeValues, minPrices, window.syncValuesMin);

      var checkInValues = window.util.getValuesFromOptions(checkInField);
      var checkOutValues = window.util.getValuesFromOptions(checkOutField);
      window.synchronizeFields(checkInField, checkOutField, checkInValues, checkOutValues, window.syncValues);
      window.synchronizeFields(checkOutField, checkInField, checkOutValues, checkInValues, window.syncValues);

      roomNumberField.addEventListener('change', function () {
        window.form.disabeledCapacityOptions();
      });
    },

    setAddress: function (address) {
      addressField.value = address;

      addressField.disabled = false;
      addressField.readOnly = true;
    },

    noticeHotel: function () {
      var myHotel = {};

      myHotel.offer = {};
      myHotel.offer.price = priceField.value;
      myHotel.offer.type = typeField.options[capacityField.selectedIndex].value;
      myHotel.offer.rooms = roomNumberField.options[capacityField.selectedIndex].value;
      myHotel.offer.guests = capacityField.options[capacityField.selectedIndex].value;
      return myHotel;
    }

  };
})();
