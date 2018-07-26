import('https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll/dist/smooth-scroll.polyfills.min.js')
    .then(function () {
        var scl = new SmoothScroll();
    });

let schedule = document.querySelector(".schedule");

document.addEventListener("scroll", function (e) {
    if (window.scrollY >= schedule.offsetTop) {
        schedule.classList.add("scrolled");
        schedule.style.paddingTop = schedule.firstElementChild.offsetHeight
    } else {
        schedule.classList.remove("scrolled");
        schedule.style.paddingTop = 0;
    }
}, { passive: true });

function printDay(data) {
    let day = document.importNode(document.querySelector("template#day").content, true);
    day.querySelector(".day").id += data.index;

    //insert data
    day.querySelector(".day-caption").textContent = data.day + " - " + data.topic;
    data.programm.forEach(eventd => {
        //printEvent
        let event = document.importNode(document.querySelector("template#event").content, true);

        event.querySelector(".time").insertBefore(document.createTextNode(eventd.time[0]), event.querySelector(".time span"));

        //event.querySelector(".time").textContent = eventd.time[0];
        event.querySelector(".time span").textContent = eventd.time[1];
        event.querySelector(".content .title").textContent = eventd.title;
        event.querySelector(".content .meta .event-type").textContent = eventd.type;
        event.querySelector(".content .meta .who").textContent = eventd.who;

        day.querySelector(".day-schedule").appendChild(event);
    });

    //add node to tree
    document.querySelector("#day-wrapper").appendChild(day);
}

let url = '/schedule.json';

fetch(url)
    .then(res => res.json())
    .then((out) => {
        //create a wrapper
        var wrapper = document.createElement("div");
        wrapper.id = "day-wrapper";
        wrapper.style.display = "none";

        // add element to DOM 
        document.querySelector(".schedule").appendChild(wrapper);

        out.forEach(day => {
            printDay(day);
        });

        // make the schedule visible
        wrapper.style.display = "block";
        document.querySelector(".schedule").removeChild(document.querySelector("#loading"));

    })
    .catch(err => { throw err });

document.querySelectorAll("#tabbar a").forEach(e => {
    e.addEventListener("click", function (e) {
        console.log(this);
        e.preventDefault();
        scl.animateScroll(schedule.offsetTop - document.querySelector("#tabbar".offsetHeight));

    });
});