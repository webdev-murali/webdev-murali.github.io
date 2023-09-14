// window.addEventListener("contextmenu", function(event) {
//   event.preventDefault();
// });

window.addEventListener("keydown", function(event) {
  if (event.keyCode == 123) { // F12 key code
    event.preventDefault();
  }
  if (event.ctrlKey && (event.key == 'u' ||event.key == 'U' )){ // Ctrl+U key code
    event.preventDefault();
  }
  if (event.ctrlKey && (event.key == 's' ||event.key == 'S' )) { // Ctrl+S
    event.preventDefault();
  }
  if (event.ctrlKey &&  event.shiftKey && (event.key == 'i' ||event.key == 'I' )) { // Ctrl+Shift+i
    event.preventDefault();
  }
  if (event.ctrlKey &&  event.shiftKey && (event.key == 'c' ||event.key == 'C' )) { // Ctrl+Shift+c
    event.preventDefault();
  }
  if (event.ctrlKey &&  event.shiftKey && (event.key == 'j' ||event.key == 'J' )) { // Ctrl+Shift+j
    event.preventDefault();
  }
});


