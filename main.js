/////////////////////////////////////////////////////////////////////////////////////

// global variables at top with default values

// Size of grids
let size = 32;

// Mode of colorDiv
let mode = "normal"

// Color components
let red = 255;
let green = 255;
let blue = 255;

/////////////////////////////////////////////////////////////////////////////////////

function setSize() {

}

function colorDiv(e) {
    switch(mode) {
        case "normal":
            e.target.style.backgroundColor = "red";
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
    // console.log("clicked");
    divs.forEach(div => div.style.backgroundColor = "cornflowerblue");
}    

// Add a container to main 
// Add the grid to container
const main = document.querySelector('main');
const container = document.createElement('div');
container.setAttribute('id', 'container');
grid = document.createElement('div');
// grid.textContent = 'this is a grid';
grid.style.cssText = `display: grid;
                      grid-template: repeat(${size}, 1fr) / repeat(${size}, 1fr);
                      `;            
grid.setAttribute('id', 'grid'); 
container.appendChild(grid);
main.appendChild(container)

// add a div for each grid(and assign it to each grid area too)
for (let i = 0; i < size; i ++) {
    for (let j = 0; j < size; j ++) {
        let tmpDiv = document.createElement('div');
        tmpDiv.style.cssText = 'grid-area: i/ j/ i + 1/ j + 1;'
        tmpDiv.classList.add('divs');
        grid.appendChild(tmpDiv);
    }
}

const pens = document.querySelectorAll('#pens img');
pens.forEach(pen => {
    pen.addEventListener('click', setSize)
});
console.log(pens);

const divs = document.querySelectorAll('.divs');
divs.forEach( div => div.addEventListener('mouseover', colorDiv) );

let reset = document.querySelector('#reset');
reset.addEventListener('click', resetGrid);

let ludicrous = document.querySelector('#ludicrous');
ludicrous.addEventListener('click', () => {mode = "ludicrous"});

let darken = document.querySelector('#darken');
darken.addEventListener('click', () => {
    mode= "darken";
    red = 255;
    green = 255;
    blue = 255;
});

let lighten = document.querySelector('#lighten');
lighten.addEventListener('click', () => {
    mode= "lighten";
    red = 0;
    green = 0;
    blue = 0;
});

