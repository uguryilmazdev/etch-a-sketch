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
let penColorArr = ['#000000']; // #000000 is initial value
let isEraserMode = false;
//----------------------------------------------------------------

// opening container setting
window.addEventListener("load", 
addBoxToSketchContainer(slider, sketchContainer, sketchSideLength));

const childrenBox = sketchContainer.childNodes;

window.addEventListener("load", changeBoxColor); // 

// Slider events
slider.addEventListener("change", () => {

    resetSketchContainer(sketchContainer);
    addBoxToSketchContainer(slider, sketchContainer, sketchSideLength);
    
    // call changeBoxColor to prevent missing pen color value after using slider
    changeBoxColor();
})

slider.addEventListener("input", () => {
    document.querySelector("#sliderText").innerText = `${slider.value} x ${slider.value}`;
})

// pen and background events
// change event to improve search smoothness
penColor.addEventListener("change", () => {
    changeBoxColor();
    modifyPenColorArr();
} ); 

// input event for instant changing background but there is a smoothness problem
// if you want change it to change event (trade-off) 
backColor.addEventListener("input", changeBackGroundColor); 

// eraser event
eraserBtn.addEventListener("click", useEraserMode);


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

// ---------------------------------------------------------------
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
        
        // check if box is painted
        divTag.setAttribute('key', 'false');

        sketchContainer.appendChild(divTag);
    }

}

function changeBoxColor() {

        childrenBox.forEach((box) => {

            box.addEventListener("click", () => {
                box.style.backgroundColor = penColor.value;
                box.setAttribute('key', 'true');
            })
    
            box.addEventListener("mousemove", () => {
                if (isClicked) {
                    box.style.backgroundColor = penColor.value;
                    box.setAttribute('key', 'true');
                }       
            })
    
        })

    }

function changeBackGroundColor() {

    childrenBox.forEach(function(box) {
       // prevent to change drawing
        if (box.getAttribute('key') === 'false') {
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

function modifyPenColorArr() {

    penColorArr.push(penColor.value);

}

function useEraserMode() {

    // control whether is open
    if (isEraserMode === false) {

        isEraserMode = true;
        eraserBtn.style.backgroundColor = "rgb(185, 162, 131)";

        childrenBox.forEach((box) => {

            box.addEventListener("click", () => {
                box.style.backgroundColor = backColor.value;
                box.setAttribute('key', 'false');
            })
    
            box.addEventListener("mousemove", () => {
                if (isClicked) {
                    box.style.backgroundColor = backColor.value;
                    box.setAttribute('key', 'false');
                }       
            })
    
        })

    } else if (isEraserMode === true) {

        eraserBtn.style.backgroundColor = "antiquewhite";
        isEraserMode = false;
        changeBoxColor();
        
    }
}
