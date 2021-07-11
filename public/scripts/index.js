document.addEventListener("DOMContentLoaded", main);

function main() {
    spinningCircle();
    commentAfterTyped();
}

function commentAfterTyped() {
    let textToComment = document.querySelector("#title-Finley .type-writer")
    textToComment.addEventListener("animationend", () => {
        setTimeout(() => {
            textToComment.classList.remove("type-writer");
            textToComment.classList.add("comment");
            document.querySelector("#double-slash").style.display = "initial";
        }, 600)
    }, {once: true})
}

function spinningCircle() {
    function stopSpin() {
        centerCircle.classList.remove("enlarge-shrink");
        hexagon.classList.remove("spin");               
    }
    function startSpin() {
        if (Array.from(svg.classList).includes("connecting")) return;
        hexagon.removeEventListener("animationiteration", stopSpin);
        centerCircle.classList.add("enlarge-shrink");
        hexagon.classList.add("spin");
    }
    let outerCircle = document.querySelector("#outerCircle");
    let centerCircle = document.querySelector("#centerCircle");
    let hexagon = document.querySelector("#hexagon");
    let svg = document.querySelector("#spinning-circle")

    svg.addEventListener("mouseover", startSpin);
    svg.addEventListener("mouseleave", () => { hexagon.addEventListener("animationiteration", stopSpin); });

    svg.addEventListener("click", () => {
        if (!Array.from(svg.classList).includes("idle")) return;
        centerCircle.addEventListener("animationiteration", stopSpin, {once: true})
        svg.classList.remove("idle");
        svg.classList.add("connecting");
        outerCircle.addEventListener("animationiteration", () => {
            svg.classList.add("connected");
            svg.classList.remove("connecting");
        }, {once: true})
    });
}