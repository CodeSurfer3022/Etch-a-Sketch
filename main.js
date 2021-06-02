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

// Mode of colorDiv
let mode = "normal"

// Mode of painting
let isPainting = false;

// grid default color
let gridDefaultColor = "aliceblue";

// Color components
let red = 255;
let green = 0;
let blue = 102;

/////////////////////////////////////////////////////////////////////////////////////
function rgbToHex(red, green, blue) {
    r = red.toString(16);
    g = green.toString(16);
    b = blue.toString(16);

    r = r.length == 1 ? "0" + r : r;
    g = g.length == 1 ? "0" + g : g;
    b = b.length == 1 ? "0" + b : b;

    return '#' + r + g + b;
}


function changeColor(e) {
    const selectedColor = e.target.value;
    red = parseInt(selectedColor.slice(1,3), 16);
    green = parseInt(selectedColor.slice(3,5), 16);
    blue = parseInt(selectedColor.slice(5,7), 16);
}

function changeColorPicker(red, green, blue) {
    let hexColor = rgbToHex(red, green, blue);
    console.log(hexColor);
    colorPicker.value = hexColor;
}

function changeSize(e) {
    size= e.toElement.id;
    let oldGrid = document.querySelector('#grid');
    container.removeChild(oldGrid);
    drawGrid(size);
    defaultSelections();
    addEventListeners();
}

function defaultSelections() {
    const btn = document.querySelector(`#${mode}`);
    btn.classList.add('selected-button');

    const brushes = document.querySelectorAll('#brushes img');
    brushes.forEach(brush => {
        if (brush.getAttribute('class') === 'selected-pen') {
            brush.removeAttribute('class');
        }
    })

    const selectedPen = document.querySelector(`#pens img[id = '${size}']`);
    selectedPen.classList.add('selected-pen');

    const key = paintMode === 'selection' ? 's' : 'd';
    const otherKey = key === 's' ? 'd' : 's';
    const info = document.querySelector(`#${key}`);
    const disableInfo = document.querySelector(`#${otherKey}`);

    info.classList.add('selected-info');
    const exists = disableInfo.getAttribute('class');
    if (exists)
        disableInfo.classList.remove('selected-info');
}

function togglePainting(e) {
    let key = e.key;
    if(key != 's' && key != 'd')
        return

    const otherKey = key === 's' ? 'd' : 's';

    const divs = document.querySelectorAll('.divs');
    const info = document.querySelector(`#${key}`);
    const disableInfo = document.querySelector(`#${otherKey}`);

    info.classList.add('selected-info');
    const exists = disableInfo.getAttribute('class');
    if (exists)
        disableInfo.classList.remove('selected-info');

    if (key === 's') {
        paintMode = "selection";
        divs.forEach( div => div.removeEventListener('mouseover', colorDiv) );

    } else if (key === 'd') {
        paintMode = "draw";
        divs.forEach( div => div.addEventListener('mouseover', colorDiv) );
    }
}
/*********************************************************************************************/
// Event handler functions for mode and brushes
/*********************************************************************************************/
function paintOnCanvas(e) {
    if(!isPainting) return;

    const cell = e.target;

    cell.classList.add('painted');
    switch(mode) {
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
    changeColorPicker(red, green, blue);
    cell.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function togglePaintMode(e) {
    e.preventDefault();
    isPainting = !isPainting;
}

/*********************************************************************************************/
// Event handler functions for mode and brushes
/*********************************************************************************************/
function changeMode(e) {

    console.log(e);

    // mode = e.toElement.id;
    // const btns = document.querySelectorAll('button');
    // btns.forEach(btn => {
    //     if (btn.getAttribute('class') === 'selected-button') {
    //         btn.removeAttribute('class');
    //     }
    // });
    //
    // const btn = document.querySelector(`#${mode}`);
    // btn.classList.add('selected-button');
}

function selectBrush(e) {
    const brush = e.target;
    const thickness = brush.getAttribute('data-thickness');
    if(THICKNESS[thickness] === size) return;
    size = THICKNESS[thickness];
    console.log(size);
    removeCanvasCells();
    drawCanvas(size);
}

/*********************************************************************************************/
// Event handler functions for palette
/*********************************************************************************************/

function dipInPaint(e) {
    const selectedColor = e.target.value;
    red = parseInt(selectedColor.slice(1,3), 16);
    green = parseInt(selectedColor.slice(3,5), 16);
    blue = parseInt(selectedColor.slice(5,7), 16);
}

function dipInWater(e) {
    mode = "lighten";
}

function dipInBlack(e) {
    mode = "darken";
}

/*********************************************************************************************/
// Canvas related functions
/*********************************************************************************************/
function removeCanvasCells() {
    while(canvas.lastElementChild) {
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
    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size; j ++) {
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
canvas.addEventListener('contextmenu', togglePaintMode);
clear.addEventListener('click', clearCanvas)

// Add event listeners
const modes = document.querySelector('.modes');
const brushes = document.querySelector('.brushes');
modes.addEventListener('click', changeMode);
brushes.addEventListener('click', selectBrush);

// Event listeners for palette
const colorPicker = document.querySelector('.input__color-picker');
const water = document.querySelector('.palette__color__white');
const black = document.querySelector('.palette__color__black');

colorPicker.addEventListener('change', dipInPaint);
water.addEventListener('click', dipInWater);
black.addEventListener('click', dipInBlack);

// defaultSelections();


