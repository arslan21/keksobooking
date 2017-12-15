'use strict'

var hotelList = getHotelList();

mapPinMain.addEventListener('mouseup', function () {
  activateNotice();
  insertPins();
  disabeledCapacityOptions();
  setPriceRange(typeSelectedValue);
});
