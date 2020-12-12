/*Global Variables*/
let isDrawing = false;
let color = 'rgb(0,0,0)';
let bgColor = 'rgb(255,255,255)';
let selection = 'btnColor';

createGrid(20);
assignGridEvents();


function createGrid(n) {
    //Modifico el contenedor para hacerlo adaptable
    let container = document.querySelector('#container');
    container.innerHTML = '';
    let side = 400;
    container.style.cssText = `
    border:solid 0.0001px grey; 
    border-right:none; 
    border-bottom:none; 
    display:flex; 
    flex-direction:column; 
    width:${side}px; 
    height:${side}px; 
    flex-wrap:nowrap;
    `;

    //Creo las filas
    let row = document.createElement('div');
    row.style.cssText = `display:flex`;

    for (i = 1; i <= n; i++) {
        let pixel = document.createElement('div');
        pixel.style.cssText = `
        background-color:${bgColor};
        height:${side/n}px; 
        width: ${side/n}px; 
        border-right:solid 0.0001px grey; 
        border-bottom:solid 0.0001px grey; 
        box-sizing:border-box`;

        pixel.classList.add('pixel')
        row.appendChild(pixel);
    }
    for (j = 1; j <= n; j++) {
        container.appendChild(row);
        row = row.cloneNode(true);
    }
}

function removeSelected() {
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    })
}


let colorSelector = document.getElementById('colorSelec');
colorSelector.addEventListener('change', function(e) {
    color = colorSelector.value;
})

let buttons = document.querySelectorAll('.btnOption')
buttons.forEach(btn => {
    btn.addEventListener('click', function() {
        removeSelected();
        btn.classList.add('selected');
        selection = btn.id;
    })
})


function assignGridEvents() {
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.addEventListener('mousedown', function(e) {
            isDrawing = true;
            pintarPixel(e.target)
        })
        pixel.addEventListener('mouseover', function(e) {
            if (isDrawing) {
                pintarPixel(e.target)
            }
        })
        pixel.addEventListener('mouseup', function(e) {
            isDrawing = false;
        })
    })

    document.querySelector('#btnReset').addEventListener('click', function() {
        pixels.forEach(pixel => {
            pixel.style.backgroundColor = bgColor;
        })
    })

    document.querySelector('#backgroundColor').addEventListener('change', function() {
        let prevBgColor = bgColor;
        bgColor = document.querySelector('#backgroundColor').value;
        pixels.forEach(pixel => {
            if (pixel.style.backgroundColor != prevBgColor) {
                pixel.style.backgroundColor = bgColor;
            }
        })
    })

}


function pintarPixel(elem) {
    if (selection == 'btnColor') {
        elem.style.backgroundColor = color;
    }
    if (selection == 'btnRainbow') {
        elem.style.backgroundColor = getRandomColor();
    }
    if (selection == 'btnHighLight') {
        elem.style.backgroundColor = 'white';
    }
    if (selection == 'btnEraser') {
        elem.style.backgroundColor = document.querySelector('#backgroundColor').value;
    }
    if (selection == 'btnGreyScale') {
        let currentValue = elem.style.backgroundColor;
        elem.style.backgroundColor = greyScaleColor(currentValue);
    }
}

document.querySelector('#myRange').addEventListener('change', function() {
    let length = document.querySelector('#myRange').value;
    document.querySelector('#gridLength').textContent = length;
    createGrid(length);
    assignGridEvents();
})


function getRandomColor() {
    //Random Color
    let color = 'rgb(0, 0, 0)'
    let a = getRandomInt(0, 255);
    let b = getRandomInt(0, 255);
    let c = getRandomInt(0, 255);
    color = `rgb(${a},${b},${c})`

    return color;
}

function greyScaleColor(prevValue) {
    prevValue = prevValue.replace('rgb(', '').replace(')', '');
    let [r, g, b] = prevValue.split(',');
    r -= 25;
    g -= 25;
    b -= 25;
    if (r < 0) {
        r = 0;
    }
    if (g < 0) {
        g = 0;
    }
    if (b < 0) {
        b = 0;
    }

    return `rgb(${r},${g},${b})`
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}