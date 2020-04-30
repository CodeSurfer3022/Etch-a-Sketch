const main = document.querySelector('main');

const container = document.createElement('div');
container.setAttribute('id', 'container');
grid = document.createElement('div');
// grid.textContent = 'this is a grid';
grid.style.cssText = 'display: grid;\
                      grid-template: repeat(64, 1fr) / repeat(64, 1fr)\
                      ';            
grid.setAttribute('id', 'grid'); 
container.appendChild(grid);

main.appendChild(container)

// add a div for each grid(and assign it to each grid area too)
for (let i = 0; i < 64; i ++) {
    for (let j = 0; j < 64; j ++) {
        let tmpDiv = document.createElement('div');
        tmpDiv.style.cssText = 'grid-area: i/ j/ i + 1/ j + 1;'
        tmpDiv.setAttribute('class', 'divs');
        grid.appendChild(tmpDiv);
    }
}

function colorDiv(e) {
    console.log('working');
    const d = e.fromElement;
    // d.setAttribute('class', 'blacken');
    e.target.style.backgroundColor = "red";
}

const divs = document.querySelectorAll('.divs');
divs.forEach( div => div.addEventListener('mouseover', colorDiv) );



