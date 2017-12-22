'use strict';

(function () {
  function renderMessage(ctx, message) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 2000, 50);
    ctx.fillStyle = 'white';
    ctx.fillText(message, 10, 10);
  }

  function closeMessage() {
    document.querySelector('.canvas').remove();
  }

  window.errorMessage = function (message) {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('style', 'position: absolute; z-index: 100; width: 100%; height: 20px; left: 0; top: 100px;');
    canvas.width = window.innerWidth;
    canvas.height = 20;

    canvas.classList.add('canvas');
    var ctx = canvas.getContext('2d');

    renderMessage(ctx, message);

    var header = document.querySelector('.header');
    document.body.insertBefore(canvas, header);
    setTimeout(closeMessage, 4000);
  };

})();
