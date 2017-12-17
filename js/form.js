'use strict';

(function () {
  var noticeBlock = document.querySelector('.notice');
  var noticeForm = noticeBlock.querySelector('.notice__form');
  var noticeFields = noticeForm.querySelectorAll('fieldset');

  var addressField = noticeForm.querySelector('#address');
  var titleField = noticeForm.querySelector('#title');
  var priceField = noticeForm.querySelector('#price');
  var typeField = noticeForm.querySelector('#type');
  var timeInField = noticeForm.querySelector('#timein');
  var timeOutField = noticeForm.querySelector('#timeout');
  var roomNumberField = noticeForm.querySelector('#room_number');
  var capacityField = noticeForm.querySelector('#capacity');

  var submitForm = noticeForm.querySelector('.form__submit');

    (function initFields() {
      addressField.required = true;
      addressField.disabled = true;
      titleField.required = true;
      priceField.required = true;

      for (var n = 0; n < noticeFields.length; n++) {
        noticeFields[n].disabled = true;
      }

      typeField.addEventListener('change', function () {
        var type = typeField.options[typeField.selectedIndex].value;
        window.form.setPriceRange(type);
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
        window.form.disabeledCapacityOptions();
      });
    })();

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

  //  отправка формы
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
      // alert('Заполните отмеченные поля');
    } else {
      noticeForm.submit();
    }
  }

  window.form = {
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

    setPriceRange: function (type) {
      var offerTypes = window.data.OFFER_TYPES;
      priceField.min = offerTypes[type].minPrice;
      priceField.max = offerTypes[type].maxPrice;
    }


  };
})();
