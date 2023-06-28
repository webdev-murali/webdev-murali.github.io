
window.addEventListener("contextmenu", function(event) {
    event.preventDefault();
  });

  window.addEventListener("keydown", function(event) {
    if (event.keyCode == 123) { // F12 key code
      event.preventDefault();
    }
  });
  

  window.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.keyCode == 85) { // Ctrl+U key code
      event.preventDefault();
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.keyCode === 83) { // Ctrl+S
        event.preventDefault();
    }
});

  