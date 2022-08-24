// sketch area
const sketchContainer = document.querySelector("#sketch-container");

// control buttons
const penColor = document.querySelector("#penColor");
const backColor = document.querySelector("#backgroundColor");
const colorModeBtn = document.querySelector("#colorModeBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const clearBtn = document.querySelector("#clearBtn");
const slider = document.querySelector("#slider");
const toggleGridBtn = document.querySelector("#toggleGridBtn");

// global variables
let toggleGrid = true;
let sketchSideLength = document.querySelector("#sketch-container").offsetWidth;
//----------------------------------------------------------------

// opening container setting
window.addEventListener("load", 
addBoxToSketchContainer(slider, sketchContainer, sketchSideLength));

const childrenBox = sketchContainer.childNodes;

window.addEventListener("load", changeBoxColor()); // 

slider.addEventListener("input", () => {

    document.querySelector("#sliderText").innerText = `${slider.value} x ${slider.value}`;

    resetSketchContainer(sketchContainer);
    addBoxToSketchContainer(slider, sketchContainer, sketchSideLength);
    
    // call changeBoxColor to prevent missing pen color value after using slider
    changeBoxColor();
})

// change event to improve search smoothness
penColor.addEventListener("change", changeBoxColor); 
// input event for instant changing background but there is a smoothness problem
// if you want change it to change event (trade-off) 
backColor.addEventListener("input", changeBackGroundColor); 


/*
toggleGridBtn.addEventListener("click", () => {

    if (gridBtn === true) {
        gridBtn = false;


        boxes.forEach((box) => {
            box.style.border = "1px solid backgroundColor.value";
        })
    } else {
        gridBtn = true;
        boxes.forEach((box) => {
            box.style.border = "1px solid rgba(0,0,255,0.25)";
        })
    }
})
*/

/*
eraserBtn.addEventListener("click", () => {
    childrenBox.forEach(function(box) {
        console.log(box.style.backgroundColor);
        
    })
}) 
*/

 // catch if mousedown-mouseup on boxes
 let isClicked = false;

 window.addEventListener("mousedown", () => {
     isClicked = true;
 })

 window.addEventListener("mouseup", () => {
     isClicked = false;
 })

// functions
function resetSketchContainer(sketchContainer) {

    let child = sketchContainer.lastElementChild;

    while (child) {
        sketchContainer.removeChild(child);
        child = sketchContainer.lastElementChild;
    }
}

function addBoxToSketchContainer(slider, sketchContainer, sketchSideLength) {

    let pixelRatio = sketchSideLength / slider.value;

    for (let i = 0; i < (sketchSideLength / pixelRatio) ** 2; i++) {

        const divTag = document.createElement("div");

        // box properties
        // '-2' px for <border width * 2>
        divTag.style.width = `${pixelRatio - 2}` + "px";
        divTag.style.height = `${pixelRatio - 2}` + "px";
        divTag.style.border = "1px solid rgba(0,0,255,0.25)";
        divTag.style.backgroundColor = backColor.value;
        
        sketchContainer.appendChild(divTag);
    }

}

function changeBoxColor() {

    childrenBox.forEach((box) => {

        box.addEventListener("click", () => {
            box.style.backgroundColor = penColor.value;
        })

        box.addEventListener("mousemove", () => {
            if (isClicked) {
                box.style.backgroundColor = penColor.value;
            }       
        })

    })

}

function changeBackGroundColor() {

    childrenBox.forEach(function(box) {
       // avoid to change drawing
        if (box.style.backgroundColor !== convertHexToRGB(penColor.value)) {
            box.style.backgroundColor = backColor.value;
        }     
    })
    
}

function convertHexToRGB(hexValue) {

    // clear #
    hexValue = hexValue.slice(1,7);

    if(hexValue.length !== 6) {
        throw "Only six-digit hex color are allowed!"
    }

    let colorHex = hexValue.match(/.{1,2}/g);
    let colorRGB = [
        parseInt(colorHex[0],16),
        parseInt(colorHex[1],16),
        parseInt(colorHex[2],16)
    ]; 

    // format: [a,b,c] to rgb(a,b,c)
    colorRGB = 'rgb(' + colorRGB.join(', ') + ')';

    return colorRGB;

}
