"use strict";


const waitFor = ms => { return new Promise(resolve => setTimeout(resolve, ms)); }

(async function() {

    // typewrite effect
    await waitFor(2800);
    
    let textToComment = document.querySelector(".title-container .type-writer")
    textToComment.classList.remove("type-writer");
    textToComment.classList.add("comment");
    document.querySelector("#double-slash").style.display = "initial";

    await waitFor(600);

    // slide container right
    let container = document.querySelector(".title-container");
    container.classList.add("slide-left");

    await waitFor(1500);

    // show fixed svg
    let { svg } = getFixedSVGParts();

    svg.classList.remove("hidden");
    svg.classList.add("unhiding");

    await waitFor(4000);
    svg.classList.remove("unhiding")
    svg.classList.add("first-state")
    fixedSVGHandlers();

})();





function fixedSVGHandlers() {
    let { outerCircle, centerCircle, hexagon, svg } = getFixedSVGParts();
    console.log(hexagon)
    function stopSpin() {
        centerCircle.classList.remove("enlarge-shrink");
        hexagon.classList.remove("spin");               
    }
    
    function startSpin() {
        if (Array.from(svg.classList).includes("first-transform")) return;
        hexagon.removeEventListener("animationiteration", stopSpin);
        centerCircle.classList.add("enlarge-shrink");
        hexagon.classList.add("spin");
    }

    svg.addEventListener("mouseover", startSpin);
    svg.addEventListener("mouseleave", () => { hexagon.addEventListener("animationiteration", stopSpin); });

    svg.addEventListener("click", () => {
        if (!Array.from(svg.classList).includes("first-state")) return;
        centerCircle.addEventListener("animationiteration", stopSpin, {once: true})
        svg.classList.remove("first-state");
        svg.classList.add("first-transform");
        outerCircle.addEventListener("animationiteration", () => {
            svg.classList.add("second-state");
            svg.classList.remove("first-transform");
        }, {once: true});
    });
}


function getFixedSVGParts() {
    let outerCircle = document.querySelector("#outerCircle");
    let centerCircle = document.querySelector("#centerCircle");
    let hexagon = document.querySelector("#hexagon");
    let svg = document.querySelector("#spinning-circle")
    return { outerCircle, centerCircle, hexagon, svg }
}