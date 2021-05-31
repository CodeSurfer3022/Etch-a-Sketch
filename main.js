/////////////////////////////////////////////////////////////////////////////////////

// global variables at top with default values

// Size of grids
let size = 16;

// Mode of colorDiv
let mode = "normal"

// Mode of painting
let paintMode = "selection"

// grid default color
let gridDefaultColor = "aliceblue";

// Color components
let red = 19;
let green = 34;
let blue = 255;

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
    hexColor = rgbToHex(red, green, blue);
    const colorPicker = document.querySelector('#penColor');
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

    const pens = document.querySelectorAll('#pens img');
    pens.forEach(pen => {
        if (pen.getAttribute('class') === 'selected-pen') {
            pen.removeAttribute('class');
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


function colorDiv(e) {
    switch(mode) {
        case "normal":
            e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
            break;

        case "ludicrous":
            red = Math.floor(Math.random() * 256);
            green = Math.floor(Math.random() * 256);
            blue = Math.floor(Math.random() * 256);
            e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;

            changeColorPicker(red, green, blue);
            break;

        case "darken":
            red = red - 1 > 0 ? red - 1 : 0;
            green = green - 1 > 0 ? green - 1 : 0;
            blue = blue - 1 > 0 ? blue - 1 : 0;
            e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

            changeColorPicker(red, green, blue);
            break;

        case "lighten":
            red = red + 1 < 255 ? red + 1 : 255;
            green = green + 1 < 255 ? green + 1 : 255;
            blue = blue + 1 < 255 ? blue + 1 : 255;
            e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

            changeColorPicker(red, green, blue);
            break;
    }
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
    console.log(e);
}

/*********************************************************************************************/
// Event handler functions for palette
/*********************************************************************************************/

function dipInPaint(e) {
    console.log(e);
}

function dipInWater(e) {
    console.log(e);
}

function dipInBlack(e) {
    console.log(e);
}

/*********************************************************************************************/
// Canvas related functions
/*********************************************************************************************/
function clearCanvas() {
    // Clear the screen area to draw fresh
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.style.backgroundColor = gridDefaultColor);

    defaultSelections();
}

function styleCanvas(canvas, size) {
    canvas.style.cssText = `grid-template: repeat(${size}, 1fr) / repeat(${size}, 1fr);`;
    console.log("drawing grid");
}

function addCellsToCanvas() {
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
// Add cells to canvas
addCellsToCanvas(canvas);
// Style canvas according to chosen size
styleCanvas(canvas,size);

// Add event listeners
const modes = document.querySelector('.modes');
const brushes = document.querySelector('.brushes');
modes.addEventListener('click', changeMode);
brushes.addEventListener('click', selectBrush);

// Event listeners for palette
const colorPicker = document.querySelector('.input__color-picker');
const water = document.querySelector('.palette__water');
const black = document.querySelector('.palette__black');

colorPicker.addEventListener('change', dipInPaint);
water.addEventListener('click', dipInWater);
black.addEventListener('click', dipInBlack);

// defaultSelections();


