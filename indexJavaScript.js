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
let sketchSideLength = document.querySelector("#sketch-container").offsetWidth;
let penColorArr = ['#000000']; // #000000 is initial value
let isColorMode = false;
let isEraserMode = true;
let isGridMode = false;
let isClicked = false;
//------------------------------------------------------------------------

// opening container setting
window.addEventListener("load", () => {

    addBoxToSketchContainer(slider, sketchContainer, sketchSideLength);
    useColorMode();
    useClearMode();
    toggleGridMode();

});

const childrenBox = sketchContainer.childNodes; // pixel box

window.addEventListener("load", changeBoxColor); // initial color black

//------------------------------------------------------------------------
// Slider events
slider.addEventListener("change", () => {

    resetSketchContainer(sketchContainer);
    addBoxToSketchContainer(slider, sketchContainer, sketchSideLength);

    // call changeBoxColor to prevent missing pen color value after using slider
    changeBoxColor();

    // call to toggleGridMode to prevent changing grid mode after using slider
    isGridMode = !isGridMode;
    toggleGridMode();

})

slider.addEventListener("input", () => {

    document.querySelector("#sliderText").innerText = `${slider.value} x ${slider.value}`;

})

// pen and background events
// "change event" to improve search smoothness
penColor.addEventListener("change", () => {

    changeBoxColor();
    modifyPenColorArr();

});

// "input event" for instant changing background but smoothness problem
// reveals with high number of boxes
// if you want, change it to "change event" (trade-off) 
backColor.addEventListener("input", changeBackGroundColor);

//------------------------------------------------------------------------
// color mode event
colorModeBtn.addEventListener("click", useColorMode);

// eraser event
eraserBtn.addEventListener("click", useEraserMode);

// clear event
clearBtn.addEventListener("click", useClearMode);

// grid event
toggleGridBtn.addEventListener("click", toggleGridMode)

//------------------------------------------------------------------------
// catch if mousedown-mouseup on boxes
window.addEventListener("mousedown", () => {
    isClicked = true;
})

window.addEventListener("mouseup", () => {
    isClicked = false;
})

//------------------------------------------------------------------------
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

        const box = document.createElement("div");

        // box properties
        // '-2' px for <border width * 2>
        box.style.width = `${pixelRatio - 2}` + "px";
        box.style.height = `${pixelRatio - 2}` + "px";
        box.style.border = "1px solid rgba(0,0,255,0.05)";
        box.style.backgroundColor = backColor.value;

        // check if box is painted
        box.setAttribute('isClicked', 'false');

        sketchContainer.appendChild(box);

    }

}

function changeBoxColor() {

    if (isColorMode === true) {

        childrenBox.forEach((box) => {

            box.addEventListener("click", () => {
                box.style.backgroundColor = penColor.value;
                box.setAttribute('isClicked', 'true');
            })
    
            box.addEventListener("mousemove", () => {
                if (isClicked) {
                    box.style.backgroundColor = penColor.value;
                    box.setAttribute('isClicked', 'true');
                }
            })
    
        })

    }
    
}

function changeBackGroundColor() {

    childrenBox.forEach(function (box) {
        // prevent to change drawing
        if (box.getAttribute('isClicked') === 'false') {
            box.style.backgroundColor = backColor.value;
        }
    })

}

function convertHexToRGB(hexValue) {

    // clear "#""
    hexValue = hexValue.slice(1, 7);

    if (hexValue.length !== 6) {
        throw "Only six-digit hex color are allowed!"
    }

    let colorHex = hexValue.match(/.{1,2}/g);
    let colorRGB = [
        parseInt(colorHex[0], 16),
        parseInt(colorHex[1], 16),
        parseInt(colorHex[2], 16)
    ];

    // format: [a,b,c] to rgb(a,b,c)
    colorRGB = 'rgb(' + colorRGB.join(', ') + ')';

    return colorRGB;

}

function modifyPenColorArr() {

    penColorArr.push(penColor.value);

}

function useColorMode() {

    if (isColorMode === false) {

        isColorMode = true;
        colorModeBtn.style.backgroundColor = "rgb(185, 162, 131)";

        useEraserMode(); // reset eraser

    } else if (isColorMode === true) {

        isColorMode = false;
        colorModeBtn.style.backgroundColor = "antiquewhite";

    }

}

function useEraserMode() {

    // control whether is open
    if (isEraserMode === false) {

        isEraserMode = true;
        eraserBtn.style.backgroundColor = "rgb(185, 162, 131)";

        useColorMode(); // reset color mode

        childrenBox.forEach((box) => {

            box.addEventListener("click", () => {
                box.style.backgroundColor = backColor.value;
                box.setAttribute('isClicked', 'false');
            })

            box.addEventListener("mousemove", () => {
                if (isClicked) {
                    box.style.backgroundColor = backColor.value;
                    box.setAttribute('isClicked', 'false');
                }
            })

        })

    } else if (isEraserMode === true) {

        eraserBtn.style.backgroundColor = "antiquewhite";
        isEraserMode = false;
        changeBoxColor(); // use pen color without a new selection

    }

}

function useClearMode() {

    childrenBox.forEach((box) => {

        box.style.backgroundColor = backColor.value;
        box.setAttribute('isClicked', 'false');

    })

}

function toggleGridMode() {

    let pixelRatio = sketchSideLength / slider.value;

    if (isGridMode === false) {

        isGridMode = true;
        toggleGridBtn.style.backgroundColor = "rgb(185, 162, 131)";

        childrenBox.forEach((box) => {
            box.style.width = `${pixelRatio - 2}` + "px";
            box.style.height = `${pixelRatio - 2}` + "px";
            box.style.border = "1px solid rgba(0,0,255,0.05)";
        })

    } else if (isGridMode === true) {

        isGridMode = false;
        toggleGridBtn.style.backgroundColor = "antiquewhite";

        childrenBox.forEach((box) => {
            box.style.width = `${pixelRatio}` + "px";
            box.style.height = `${pixelRatio}` + "px";
            box.style.border = "none";
        })

    }

}
