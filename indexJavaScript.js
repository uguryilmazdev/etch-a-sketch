const slider = document.querySelector("#slider");
const sketchContainer = document.querySelector("#sketch-container");

let sketchSideLength = document.querySelector("#sketch-container").offsetWidth;

slider.addEventListener("input", () => {

    let child = sketchContainer.lastElementChild;

    while (child) {
        sketchContainer.removeChild(child);
        child = sketchContainer.lastElementChild;
    }

    document.querySelector("#sliderText").innerText = `${slider.value} x ${slider.value}`;

    let pixelRatio = sketchSideLength / slider.value;
    console.log(pixelRatio)
    
    for (let i = 0; i < (sketchSideLength / pixelRatio) ** 2; i++) {
        //NOT elementin const olması lazım!
        const divTag = document.createElement("div"); 
        divTag.classList.add("sketchBox");      
        divTag.innerText = `${i}`;
        divTag.style.width = `${pixelRatio}` + "px";
        divTag.style.height = `${pixelRatio}` + "px";
        /*divTag.style.border = "thick solid blue";*/
        sketchContainer.appendChild(divTag);
    }

    const tags = document.querySelectorAll(".sketchBox");

    for (let i = 0; i < tags.length; i++) {
        
        tags[i].addEventListener('mouseover', () => {
            tags[i].style.backgroundColor = "red";
        })
    }

    // slide yapılınca sıfırlamıyor, altına ekliyor
})

