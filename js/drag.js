'use strict';

(function () {
  var dragablePin = document.querySelector('.map__pin--main');
  var startCoords = {};
  var diff = {};

  function getCoords(evt) {
    startCoords = {
      x: evt.pageX,
      y: evt.pageY,
    };

    diff = {
      x: startCoords.x - dragablePin.offsetLeft,
      y: startCoords.y - dragablePin.offsetTop
    };
  }

  function onMouseMove(moveEvt) {
    if (moveEvt.pageX - diff.x > 0 && moveEvt.pageX - diff.x < 1200 && moveEvt.pageY - diff.y > 100 && moveEvt.pageY - diff.y < 500) {
      dragablePin.style.left = (moveEvt.pageX - diff.x) + 'px';
      dragablePin.style.top = (moveEvt.pageY - diff.y) + 'px';
    } else {
      document.addEventListener('mouseup', onMouseUp);
    }
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    window.form.setAddress();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    dragablePin.removeEventListener('mouseup', onMouseUp);
  }

  window.drag = {
    dragPin: function () {
      dragablePin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        getCoords(evt);

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        dragablePin.addEventListener('mouseup', onMouseUp);
      });
    }
  };
})();
