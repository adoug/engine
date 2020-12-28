/*
    Author:     Andrew Douglas
    Date:       19/10/2015

*/

const Input = (((canvas) => {
  function init() {
    const onClick = (callback) => {
      if (callback && typeof callback !== 'undefined') {
        canvas.addEventListener('mousedown', (event) => {
          callback(event);
        });
      }
    };

    const onKey = (callback, document) => {
      if (callback && typeof callback !== 'undefined') {
        document.addEventListener('keydown', (event) => {
          const key = String.fromCharCode(event.keyCode);
          callback(key);
        });
      }
    };

    return {
      onClick,
      onKey,
    };
  }
})());
