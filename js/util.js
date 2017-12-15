'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

function getRandomCeil(number) {
  return Math.ceil(Math.random() * number)
}

function getRandomFloor(minNumber, maxNumber) {
  return Math.floor(minNumber + Math.random() * (maxNumber + 1 - minNumber));
}

function getRandomElem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

window.isEnterEnter = function(evt, action) {
  if (evt.keyCode === ENTER_KEYCODE) {
    action();
  }
}

window.isEnterEsc = function(evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
}


window.util =
