document.addEventListener("DOMContentLoaded", () => {
    spinningCircle(document.querySelector("#central-container svg"));
})
function spinningCircle(svg) {
    function stopSpin() {
        centerCircle.classList.remove("enlarge-shrink");
        hexagon.classList.remove("spin");               
    }
    function startSpin() {
        if (Array.from(group.classList).includes("connecting")) return;
        hexagon.removeEventListener("animationiteration", stopSpin);
        centerCircle.classList.add("enlarge-shrink");
        hexagon.classList.add("spin");
    }
    let outerCircle = document.querySelector("#outerCircle");
    let centerCircle = document.querySelector("#centerCircle");
    let hexagon = document.querySelector("#hexagon");
    let group = document.querySelector("#spinningCircle")

    svg.addEventListener("mouseover", startSpin);
    svg.addEventListener("mouseleave", () => {
        hexagon.addEventListener("animationiteration", stopSpin);
    });

    svg.addEventListener("click", () => {
        if (!Array.from(group.classList).includes("idle")) return;
        centerCircle.addEventListener("animationiteration", stopSpin, {once: true})
        group.classList.remove("idle");
        group.classList.add("connecting");
        outerCircle.addEventListener("animationiteration", () => {
            group.classList.add("connected");
            group.classList.remove("connecting");
        }, {once: true})
    });
}