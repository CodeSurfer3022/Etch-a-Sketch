/////////////////////////////////////////////////////////////////////////////////////

// global variables at top with default values

// Size of grids
let size = 16;

// Mode of colorDiv
let mode = "normal"

// grid default color
let gridDefaultColor = "cornflowerblue";

// Color components
let red = 255;
let green = 255;
let blue = 255;

/////////////////////////////////////////////////////////////////////////////////////
function changeColor(e) {
    const selectedColor = e.target.value;
    red = parseInt(selectedColor.slice(1,3), 16);
    green = parseInt(selectedColor.slice(3,5), 16);
    blue = parseInt(selectedColor.slice(5,7), 16);
    console.log(red, green, blue);
}

function changeSize(e) {
    size= e.toElement.id;
    console.log(size);
    let oldGrid = document.querySelector('#grid');
    container.removeChild(oldGrid);
    drawGrid(size);
    addEventListeners();
}

function drawGrid(size) {
    const grid = document.createElement('div');
    // grid.textContent = 'this is a grid';
    grid.style.cssText = `display: grid;
                      grid-template: repeat(${size}, 1fr) / repeat(${size}, 1fr);`;            
    grid.setAttribute('id', 'grid'); 
    console.log("drawing grid");
    // add a div for each grid(and assign it to each grid area too)
    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size; j ++) {
            let tmpDiv = document.createElement('div');
            tmpDiv.style.cssText = 'grid-area: i/ j/ i + 1/ j + 1;'
            tmpDiv.classList.add('divs');
            grid.appendChild(tmpDiv);
        }
    }
    container.appendChild(grid);
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
            console.log(red, green, blue);
            e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
            break;
        
        case "darken":
            console.log("entered here");
            red --;
            green --;
            blue --;
            e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            break;

        case "lighten":
            red ++;
            green ++;
            blue ++;
            e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            break;
    }
}
    
function resetGrid() {
    // Reset the screen area to default color
    const divs = document.querySelectorAll('.divs');
    divs.forEach(div => div.style.backgroundColor = gridDefaultColor);

    // Reset all global values to default
    size = 16;

    // Mode of colorDiv
    mode = "normal"

    // Color components
    red = 255;
    green = 255;
    blue = 255;

    const colorPicker = document.querySelector('#penColor');
    colorPicker.value = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}    

function addEventListeners() {
    const colorPicker = document.querySelector('#penColor');
    console.log(colorPicker.value);
    colorPicker.addEventListener('change', changeColor);

    const pens = document.querySelectorAll('#pens img');
    pens.forEach(pen => {
        pen.addEventListener('click', changeSize)
    });

    const divs = document.querySelectorAll('.divs');
    divs.forEach( div => div.addEventListener('mouseover', colorDiv) );

    const reset = document.querySelector('#reset');
    reset.addEventListener('click', resetGrid);

    const ludicrous = document.querySelector('#ludicrous');
    ludicrous.addEventListener('click', () => {mode = "ludicrous"});

    const darken = document.querySelector('#darken');
    darken.addEventListener('click', () => mode= "darken");

    const lighten = document.querySelector('#lighten');
    lighten.addEventListener('click', () => mode= "lighten");
}
///////////////////////////////////////////////////////////////////////////////////////////
// Code begins here
///////////////////////////////////////////////////////////////////////////////////////////
const main = document.querySelector('main');

// Add a container to main 
const container = document.createElement('div');
container.setAttribute('id', 'container');
main.appendChild(container);

// Draw the initial grid
drawGrid(size);

addEventListeners();




