/////////////////////////////////////////////////////////////////////////////////////

// global variables at top with default values
const THICKNESS = {
  S: 128,
  M: 64,
  L: 32,
  XL: 16
}

// Size of grids
let size = 16;

// Mode of painting
let mode = "normal"

// Status flag for user activity
let currentAction = "idle";
let isCurrentActionPaused = true;

// grid default color
let gridDefaultColor = "aliceblue";

// Color components
let red = 255;
let green = 0;
let blue = 102;

/////////////////////////////////////////////////////////////////////////////////////
function rgbToHex(red, green, blue) {
  let r, g, b;
  r = red.toString(16);
  g = green.toString(16);
  b = blue.toString(16);

  r = r.length === 1 ? "0" + r : r;
  g = g.length === 1 ? "0" + g : g;
  b = b.length === 1 ? "0" + b : b;

  return '#' + r + g + b;
}

function changeColorPicker(red, green, blue) {
  colorPicker.value = rgbToHex(red, green, blue);
}

/*********************************************************************************************/
// Event handler functions for canvas
/*********************************************************************************************/
function paintOnCanvas(e) {
  if (currentAction === 'idle') return;
  if (isCurrentActionPaused) return;

  const cell = e.target;

  cell.classList.add('painted');

  if (currentAction === 'cleaning') {
    red = 240;
    green = 248;
    blue = 255;
    cell.classList.remove('painted');
  } else {
    switch (mode) {
      case "ludicrous":
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        break;
      case "darken":
        red = red - 1 > 0 ? red - 1 : 0;
        green = green - 1 > 0 ? green - 1 : 0;
        blue = blue - 1 > 0 ? blue - 1 : 0;
        break;
      case "lighten":
        red = red + 1 < 255 ? red + 1 : 255;
        green = green + 1 < 255 ? green + 1 : 255;
        blue = blue + 1 < 255 ? blue + 1 : 255;
        break;
    }
  }

  changeColorPicker(red, green, blue);
  cell.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

/*********************************************************************************************/
// Event handler functions for palette
/*********************************************************************************************/

function selectPaint(e) {
  const selectedColor = e.target.value;
  red = parseInt(selectedColor.slice(1, 3), 16);
  green = parseInt(selectedColor.slice(3, 5), 16);
  blue = parseInt(selectedColor.slice(5, 7), 16);
}

/*********************************************************************************************/
// Event handler functions for mode and brushes
/*********************************************************************************************/
function setMode(e) {
    if(currentAction === 'cleaning') return;
  let modeClass = e.currentTarget.classList[1];
  let regex = /mode--(.*)/g;
  let arr = regex.exec(modeClass);
  mode = arr[1];
  console.log(modeClass, mode);
}

function selectBrush(e) {
  const brush = e.target;
  const thickness = brush.getAttribute('data-thickness');
  if (THICKNESS[thickness] === size) return;
  size = THICKNESS[thickness];
  console.log(size);
  removeCanvasCells();
  drawCanvas(size);
}

/*********************************************************************************************/
// Event handler functions for actions
/*********************************************************************************************/
function setCurrentAction(e) {
  let actionClass = e.currentTarget.classList[1];
  let regex = /action--(.*)/g;
  let arr = regex.exec(actionClass);
  currentAction = arr[1];
  console.log(currentAction);
}

function toggleCurrentAction(e) {
    e.preventDefault();
    isCurrentActionPaused = !isCurrentActionPaused;
    if(!isCurrentActionPaused) {
        canvas.classList.add(currentAction);
    } else {
        canvas.classList.remove(currentAction);
    }
}

/*********************************************************************************************/
// Canvas related functions
/*********************************************************************************************/
function removeCanvasCells() {
  while (canvas.lastElementChild) {
    canvas.removeChild(canvas.lastElementChild);
  }
}

function clearCanvas() {
  // Clear the screen area to draw fresh
  const cells = canvas.querySelectorAll('.painted');
  cells.forEach(cell => {
    cell.classList.remove('painted');
    cell.style.backgroundColor = gridDefaultColor;
  })

  // defaultSelections();
}

function drawCanvas(size) {
  console.log('drawing canvas');

  canvas.style.cssText = `grid-template: repeat(${size}, 1fr) / repeat(${size}, 1fr);`;

  let cell;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      cell = document.createElement('div');
      cell.classList.add('cell');
      canvas.appendChild(cell);
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////////
// Code begins here
///////////////////////////////////////////////////////////////////////////////////////////
const canvas = document.querySelector('.canvas');
const clear = document.querySelector('.clear-canvas');
// Style canvas according to chosen size
drawCanvas(size);
// Add event listeners on canvas for painting and pausing
canvas.addEventListener('mouseover', paintOnCanvas);
canvas.addEventListener('contextmenu', toggleCurrentAction);
clear.addEventListener('click', clearCanvas)

// Add event listeners for modes
const modes = document.querySelectorAll('.mode');
modes.forEach(mode => mode.addEventListener('click', setMode));

// Event listeners for palette
const colorPicker = document.querySelector('.input__color-picker');
colorPicker.addEventListener('change', selectPaint);

// Event listeners for brushes
const brushes = document.querySelector('.brushes');
brushes.addEventListener('click', selectBrush);

// Event listeners for actions
const actions = document.querySelectorAll('.action');
actions.forEach(action => action.addEventListener('click', setCurrentAction));
