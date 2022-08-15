const slider = document.querySelector("#slider");
const sketchContainer = document.querySelector("#sketch-container");

let sketchSideLength = document.querySelector("#sketch-container").offsetWidth;

slider.addEventListener("input", () => {

    resetSketchContainer(sketchContainer);

    document.querySelector("#sliderText").innerText = `${slider.value} x ${slider.value}`;

    addBoxToSketchContainer(slider, sketchContainer);

    // catch if mousedown-mouseup on boxes
    let isClicked = false;

    window.addEventListener("mousedown", () => {
        isClicked = true;
    })

    window.addEventListener("mouseup", () => {
        isClicked = false;
    })

    // set mouse events to paint boxes
    const boxes = document.querySelectorAll(".sketchBox");

    for (let i = 0; i < boxes.length; i++) {

        boxes[i].addEventListener("click", () => {
            boxes[i].style.backgroundColor = "red";
        })

        boxes[i].addEventListener('mousemove', () => {
            if (isClicked) {
                boxes[i].style.backgroundColor = "red";
            }
        })
    }
})

// functions
function resetSketchContainer(sketchContainer) {

    let child = sketchContainer.lastElementChild;

    while (child) {
        sketchContainer.removeChild(child);
        child = sketchContainer.lastElementChild;
    }
}

function addBoxToSketchContainer(slider, sketchContainer) {

    let pixelRatio = sketchSideLength / slider.value;

    for (let i = 0; i < (sketchSideLength / pixelRatio) ** 2; i++) {

        const divTag = document.createElement("div");
        divTag.classList.add("sketchBox");
        divTag.style.width = `${pixelRatio}` + "px";
        divTag.style.height = `${pixelRatio}` + "px";
        /*divTag.style.border = "thick solid blue";*/
        sketchContainer.appendChild(divTag);

    }

}
