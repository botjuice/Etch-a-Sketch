const artboard = document.querySelector('.artboard');
let resolution = Math.round(prompt("please enter a resolution bellow 100: ", 64));
let columns = [];
let pixels = [];
let pixelSize = (1/resolution)*700;

function ChangeResolution(){
    resolution = Math.round(prompt("please enter a resolution bellow 100: ", 64));
    while (resolution > 100 || isNaN(resolution)){
        resolution = Math.round(prompt("please enter a resolution bellow 100: ", 64));
    }
    pixelSize = (1/resolution)*700;
    RemoveArtboard();
    CreateArtboard();
}

function CreateArtboard() {
    for (i = 0; i < resolution; i++) { // create columns
        columns.push(document.createElement('div'));
        artboard.appendChild(columns[i]);
        columns[i].classList.add('column');
    }
    let pixelNumber = function (column, row) {
        if (column === 0) {
            return row;
        } else {
            return column * resolution + row
        }
    }
    
    for (column = 0; column < columns.length; column++) {
        for (i = 0; i < resolution; i++) {
            pixels.push(document.createElement('div'));
            columns[column].appendChild(pixels[pixelNumber(column, i)]);
            pixels[pixelNumber(column, i)].classList.add(`pixel`);
            pixels[pixelNumber(column, i)].style.width = pixelSize + "px";
            pixels[pixelNumber(column, i)].style.height = pixelSize + "px";
            pixels[pixelNumber(column, i)].style.transition = "0.3s"
        }
    }
    Draw();
}

function RemoveArtboard(){
    columns.forEach((column) => {artboard.removeChild(column)});
    columns = [];
    pixels = [];
}


function Draw() {
    let opacity = [];
    pixels.forEach((pixel) => {
        opacity.push(pixel.style.opacity);
        pixel.addEventListener('mouseover', () => {
            opacity[pixels.indexOf(pixel)] = 0.2 + Math.round(opacity[pixels.indexOf(pixel)] * 100) / 100;
            pixel.style.opacity = opacity[pixels.indexOf(pixel)];
            pixel.style.backgroundColor = "black";
        });
    });
}

CreateArtboard();

const changeResolution = document.querySelector('.resolution');
changeResolution.addEventListener('click' , () => ChangeResolution());