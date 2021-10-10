"use strict";


const waitFor = ms => { return new Promise(resolve => setTimeout(resolve, ms)); }

// skills graph
(function () {
    const data = [{ skill: "React", level: 1 }, { skill: "SQL", level: 2 }, { skill: "Git", level: 3 }, { skill: "Python", level: 4 }, { skill: "CSS", level: 5 }, { skill: "HTML", level: 5 }, { skill: "Javascript", level: 6 }];
    const margin = { top: 50, right: 25, bottom: 15, left: 100 };
    
    const width = 1200 - margin.left - margin.right;
    const height = 500  - margin.top - margin.bottom;
    
    const svg = d3.select(".chart-container").append("svg")
    .attr("viewBox", `0 0 1800 600`)
    .attr("class", "skills-chart")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    const x = d3.scale.linear()
    .range([0, width])
    .domain([0, 10]);
    
    const y = d3.scale.ordinal()
    .rangeRoundBands([height, 0], 0.1)
    .domain(data.map(d => {
        return d.skill;
    }));
    
    const yAxis = d3.svg.axis()
    .scale(y)
    .tickSize(0)
    .orient("left");
    
    const gy = svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis)
    
    const bars = svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("g")
    
    bars.append("rect")
    .attr("class", "bar")
    .attr("y", d => {
        return y(d.skill);
    })
    .attr("height", y.rangeBand())
    .attr("x", 0)
    .attr("width", d => {
        return x(d.level);
    });
    
    bars.append("text")
    .attr("class", "label")
    .attr("y", d => {
        return y(d.skill) + y.rangeBand() / 2 + 4;
    })
    .attr("x", d => {
        return x(d.level) + 3;
    })
    .text(d => {
        return d.level;
    });

    const chartContainer = document.querySelector(".chart-container")

    const chartObserver = new IntersectionObserver(entries => {
        if (entries[0].intersectionRatio > 0) {
            document.querySelectorAll(".bar").forEach(bar => {
                const barWidth = bar.width.baseVal.value;
                const extendBar = setInterval(frame, 15);

                bar.setAttribute("width", 0)
                const labels = document.querySelectorAll(".label")
                labels.forEach(label => label.style.display = "none")

                function frame() {
                    if (bar.width.baseVal.value >= barWidth) {
                        labels.forEach(label => label.style.display = "initial")
                        clearInterval(extendBar);
                    }
                    else bar.setAttribute("width", bar.width.baseVal.value + barWidth/50 * Math.sin(Math.acos(bar.width.baseVal.value/barWidth)));
                }
            })
        }
      });
      
    chartObserver.observe(chartContainer);
})();

// contact page
(function () {
    document.querySelector(".submit").addEventListener("click", e => {
        e.preventDefault();
        
        let name = document.querySelector(".name");
        let email = document.querySelector(".email");
        let message = document.querySelector(".message");

        fetch("/api/contact", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                message: message.value,
            }),
            method: "POST"
        });

        [name, email, message].forEach(input => input.value = "" );
    });
})();


// animation
(async function () {
    
    // typewrite effect
    await waitFor(2800);
    
    let textToComment = document.querySelector(".title-container .type-writer")
    textToComment.classList.replace("type-writer", "comment")
    document.querySelector("#double-slash").style.display = "initial";
    
    await waitFor(600);
    
    // slide container right
    let container = document.querySelector(".title-container");
    container.classList.add("slide-left");
    
    await waitFor(1500);

    // show fixed svg
    let { svg } = getFixedSVGParts();
    
    svg.classList.replace("hidden", "unhiding");
    
    await waitFor(4000);

    svg.classList.replace("unhiding", "first-state");
    
    fixedSVGHandlers();
})();

function fixedSVGHandlers() {
    let { outerCircle, centerCircle, hexagon, svg } = getFixedSVGParts();
    function stopSpin() {
        centerCircle.classList.remove("enlarge-shrink");
        hexagon.classList.remove("spin");               
    }
    
    function startSpin() {
        if (svg.classList.contains("first-transform")) return;
        hexagon.removeEventListener("animationiteration", stopSpin);
        centerCircle.classList.add("enlarge-shrink");
        hexagon.classList.add("spin");
    }
    
    svg.addEventListener("mouseover", startSpin);
    svg.addEventListener("mouseleave", () => { hexagon.addEventListener("animationiteration", stopSpin); });
    
    svg.addEventListener("click", () => {
        if (!svg.classList.contains("first-state")) return;
        centerCircle.addEventListener("animationiteration", stopSpin, {once: true})
        svg.classList.replace("first-state", "first-transform")

        outerCircle.addEventListener("animationiteration", () => {
            svg.classList.replace("first-transform", "second-state");
            svg.addEventListener("click", () => document.body.className = "light", {once: true});
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

document.querySelectorAll("#age").forEach(elem => elem.innerText = Math.floor((new Date() - new Date(1149289200000)) / (1000 * 60 * 60 * 24 * 365.25)).toString());