let size = 64;

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


function colorDiv(e) {
    // console.log('working');
    if(mode === "normal") {
        e.target.style.backgroundColor = "red";
    } else {
        red = Math.floor(Math.random() * 256)
        green = Math.floor(Math.random() * 256)
        blue = Math.floor(Math.random() * 256)
        console.log(red, green, blue);
        e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
    }
}

mode = "normal"
const divs = document.querySelectorAll('.divs');
divs.forEach( div => div.addEventListener('mouseover', colorDiv, mode) );

function resetGrid() {
    // console.log("clicked");
    divs.forEach(div => div.style.backgroundColor = "cornflowerblue");
}

let reset = document.querySelector('#reset');
reset.addEventListener('click', resetGrid);

let ludicrous = document.querySelector('#ludicrous');
ludicrous.addEventListener('click', () => {mode = "ludicrous"});

