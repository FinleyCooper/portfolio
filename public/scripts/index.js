document.addEventListener("DOMContentLoaded", () => {
    spinningCircle();
})
function spinningCircle() {
    function stopSpin() {
        centerCircle.classList.remove("enlarge-shrink");
        hexagon.classList.remove("spin");               
    }
    function startSpin() {
        hexagon.removeEventListener("animationiteration", stopSpin);
        centerCircle.classList.add("enlarge-shrink");
        hexagon.classList.add("spin");
    }
    let outerCircle = document.querySelector("#outerCircle");
    let centerCircle = document.querySelector("#centerCircle");
    let hexagon = document.querySelector("#hexagon");
    let group = document.querySelector("#spinningCircle")

    group.addEventListener("mouseover", startSpin);
    group.addEventListener("mouseleave", () => {
        hexagon.addEventListener("animationiteration", stopSpin);
    });

    group.addEventListener("click", () => {
        if (!group.classList.includes("idle")) return;
        centerCircle.addEventListener("animationiteration", stopSpin, {once: true})
        group.classList.remove("idle");
        group.classList.add("connecting");
        outerCircle.addEventListener("animationiteration", () => {
            group.classList.add("connected");
            group.classList.remove("connecting");
        }, {once: true})
    });
}