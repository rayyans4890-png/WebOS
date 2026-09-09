/* =========================
   CLOCK
   ========================= */

function updateTime() {
    var now = new Date();

    document.querySelector("#timeElement").textContent =
        now.toLocaleTimeString();

    document.querySelector("#dateElement").textContent =
        now.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric"
        });
}

updateTime();
setInterval(updateTime, 1000);


/* =========================
   WINDOWS
   ========================= */

var biggestIndex = 10;

function bringToFront(windowElement) {
    biggestIndex++;
    windowElement.style.zIndex = biggestIndex;
}

function openApp(windowElement, iconElement) {
    windowElement.style.display = "flex";
    bringToFront(windowElement);

    if (iconElement) {
        iconElement.classList.add("selected");
    }
}

function closeApp(windowElement, iconElement) {
    windowElement.style.display = "none";

    if (iconElement) {
        iconElement.classList.remove("selected");
    }
}


/* =========================
   DRAGGING
   ========================= */

function dragWindow(windowElement) {
    var header = document.querySelector("#" + windowElement.id + "header");

    var mouseX = 0;
    var mouseY = 0;

    header.addEventListener("mousedown", function(event) {

        if (event.target.classList.contains("closebutton")) {
            return;
        }

        event.preventDefault();

        bringToFront(windowElement);

        mouseX = event.clientX;
        mouseY = event.clientY;

        function moveWindow(event) {
            var changeX = event.clientX - mouseX;
            var changeY = event.clientY - mouseY;

            mouseX = event.clientX;
            mouseY = event.clientY;

            windowElement.style.left =
                windowElement.offsetLeft + changeX + "px";

            windowElement.style.top =
                windowElement.offsetTop + changeY + "px";
        }

        function stopMoving() {
            document.removeEventListener("mousemove", moveWindow);
        }

        document.addEventListener("mousemove", moveWindow);
        document.addEventListener("mouseup", stopMoving, {
            once: true
        });
    });
}

var windows = document.querySelectorAll(".window");

windows.forEach(function(windowElement) {

    dragWindow(windowElement);

    windowElement.addEventListener("mousedown", function() {
        bringToFront(windowElement);
    });

});


/* =========================
   APP REFERENCES
   ========================= */

var welcome = document.querySelector("#welcome");
var notes = document.querySelector("#notes");
var projects = document.querySelector("#projects");
var calculator = document.querySelector("#calculator");
var weather = document.querySelector("#weather");
var about = document.querySelector("#about");

var welcomeIcon = document.querySelector("#welcomeopen");
var notesIcon = document.querySelector("#notesIcon");
var projectsIcon = document.querySelector("#projectsIcon");
var calculatorIcon = document.querySelector("#calculatorIcon");
var weatherIcon = document.querySelector("#weatherIcon");
var aboutIcon = document.querySelector("#aboutIcon");


/* =========================
   OPENING AND CLOSING APPS
   ========================= */

welcomeIcon.addEventListener("click", function() {
    openApp(welcome);
});

document.querySelector("#welcomeclose").addEventListener("click", function() {
    closeApp(welcome);
});


notesIcon.addEventListener("click", function() {
    openApp(notes, notesIcon);

    var savedNote = localStorage.getItem("rayyanos-last-note");

    if (savedNote !== null) {
        showNote(parseInt(savedNote, 10));
    }
});

document.querySelector("#notesclose").addEventListener("click", function() {
    closeApp(notes, notesIcon);
});


projectsIcon.addEventListener("click", function() {
    openApp(projects, projectsIcon);
});

document.querySelector("#projectsclose").addEventListener("click", function() {
    closeApp(projects, projectsIcon);
});


calculatorIcon.addEventListener("click", function() {
    openApp(calculator, calculatorIcon);
});

document.querySelector("#calculatorclose").addEventListener("click", function() {
    closeApp(calculator, calculatorIcon);
});


weatherIcon.addEventListener("click", function() {
    openApp(weather, weatherIcon);

    var savedCity = localStorage.getItem("rayyanos-city");

    if (savedCity) {
        document.querySelector("#cityInput").value = savedCity;
    }
});

document.querySelector("#weatherclose").addEventListener("click", function() {
    closeApp(weather, weatherIcon);
});


aboutIcon.addEventListener("click", function() {
    openApp(about, aboutIcon);
});

document.querySelector("#aboutclose").addEventListener("click", function() {
    closeApp(about, aboutIcon);
});


/* =========================
   SHUTDOWN
   ========================= */

document.querySelector("#shutdownBtn").addEventListener("click", function() {

    var everyWindow = document.querySelectorAll(".window");
    var everyIcon = document.querySelectorAll(".appicon");

    everyWindow.forEach(function(windowElement) {
        windowElement.style.display = "none";
    });

    everyIcon.forEach(function(icon) {
        icon.classList.remove("selected");
    });

});


/* =========================
   STARTUP
   ========================= */

openApp(welcome);


/* =========================
   NOTES
   ========================= */

var notesData = [
    {
        title: "Welcome",
        date: "09/05/2026",
        content:
            "<h1>Welcome to Study Notes</h1>" +
            "<p>This is the little notes section I made for RayyanOS.</p>" +
            "<p>I wanted somewhere simple to put school notes, ideas and random things I want to remember.</p>" +
            "<blockquote>Keep things simple and easy to find.</blockquote>"
    },

    {
        title: "Math",
        date: "09/05/2026",
        content:
            "<h1>Math Notes</h1>" +
            "<h2>Quadratic Formula</h2>" +
            "<p>For an equation in the form:</p>" +
            "<p><strong>ax² + bx + c = 0</strong></p>" +
            "<blockquote>x = (-b ± √(b² - 4ac)) / 2a</blockquote>"
    },

    {
        title: "Programming",
        date: "09/05/2026",
        content:
            "<h1>Programming Notes</h1>" +
            "<p>Some JavaScript things I have been learning:</p>" +
            "<ul>" +
            "<li>Variables</li>" +
            "<li>Functions</li>" +
            "<li>Arrays</li>" +
            "<li>Objects</li>" +
            "<li>Event listeners</li>" +
            "<li>Changing the DOM</li>" +
            "</ul>"
    }
];

var sidebar = document.querySelector("#sidebar");
var notesContent = document.querySelector("#notesContent");

for (var i = 0; i < notesData.length; i++) {

    var note = notesData[i];

    var item = document.createElement("div");

    item.className = "note-item";

    item.innerHTML =
        '<p class="note-title">' + note.title + "</p>" +
        '<p class="note-date">' + note.date + "</p>";

    (function(index) {

        item.addEventListener("click", function() {
            showNote(index);
        });

    })(i);

    sidebar.appendChild(item);
}


function showNote(index) {

    if (!notesData[index]) {
        index = 0;
    }

    notesContent.innerHTML = notesData[index].content;

    localStorage.setItem("rayyanos-last-note", index);

    var noteItems = document.querySelectorAll(".note-item");

    for (var j = 0; j < noteItems.length; j++) {

        if (j === index) {
            noteItems[j].classList.add("active");
        } else {
            noteItems[j].classList.remove("active");
        }

    }
}

showNote(0);


/* =========================
   PROJECTS
   ========================= */

var projectsData = [
    {
        name: "Study OS",
        status: "In Progress",
        description: "My study-planning website that I have been building and changing over time.",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "https://rayyans4890-png.github.io/Study-OS/"
    },

    {
        name: "RayyanOS",
        status: "In Progress",
        description: "This WebOS project. I made it to experiment with windows, desktop apps and JavaScript.",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/rayyans4890-png/WebOS"
    },

    {
        name: "Slackbot",
        status: "Completed",
        description: "A small Slack bot with commands such as ping, jokes, cat facts and other utilities.",
        technologies: ["Node.js", "Bolt", "JavaScript"],
        link: "https://github.com/rayyans4890-png/Slack-bot-rayyans4890"
    },

    {
        name: "Web Experiments",
        status: "Exploring",
        description: "Smaller web projects I make when I am trying something new.",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "#"
    }
];

var projectGrid = document.querySelector("#projectGrid");
var projectCount = document.querySelector("#projectCount");

for (var p = 0; p < projectsData.length; p++) {

    var project = projectsData[p];

    var card = document.createElement("div");

    card.className = "project-card";

    var techHTML = "";

    for (var t = 0; t < project.technologies.length; t++) {
        techHTML +=
            '<span class="tech-tag">' +
            project.technologies[t] +
            "</span>";
    }

    card.innerHTML =
        '<span class="project-status">' +
        project.status +
        "</span>" +

        "<h2>" +
        project.name +
        "</h2>" +

        "<p>" +
        project.description +
        "</p>" +

        '<div class="project-tech">' +
        techHTML +
        "</div>" +

        '<a class="project-link" href="' +
        project.link +
        '" target="_blank" rel="noopener noreferrer">View project</a>';

    projectGrid.appendChild(card);
}

projectCount.textContent = projectsData.length;


/* =========================
   CALCULATOR
   ========================= */

var calcDisplay = document.querySelector("#calcDisplay");

var current = "0";
var previous = "";
var operator = "";
var waitingForOperand = false;


function updateDisplay() {

    var shownValue = current;

    if (shownValue.length > 12) {
        shownValue = shownValue.substring(0, 12);
    }

    calcDisplay.textContent = shownValue;
}


function inputNumber(number) {

    if (current === "Error") {
        calcClear();
    }

    if (waitingForOperand) {
        current = number;
        waitingForOperand = false;
    } else {
        if (current === "0") {
            current = number;
        } else {
            current += number;
        }
    }

    updateDisplay();
}


function inputDecimal() {

    if (current === "Error") {
        calcClear();
    }

    if (waitingForOperand) {
        current = "0.";
        waitingForOperand = false;
    } else if (current.indexOf(".") === -1) {
        current += ".";
    }

    updateDisplay();
}


function doMath(first, second, mathOperator) {

    var firstNumber = parseFloat(first);
    var secondNumber = parseFloat(second);

    if (mathOperator === "+") {
        return firstNumber + secondNumber;
    }

    if (mathOperator === "-") {
        return firstNumber - secondNumber;
    }

    if (mathOperator === "*") {
        return firstNumber * secondNumber;
    }

    if (mathOperator === "/") {

        if (secondNumber === 0) {
            return "Error";
        }

        return firstNumber / secondNumber;
    }

    return secondNumber;
}


function inputOperator(newOperator) {

    if (current === "Error") {
        return;
    }

    if (previous !== "" && !waitingForOperand) {

        var result = doMath(previous, current, operator);

        if (result === "Error") {
            current = "Error";
            previous = "";
            operator = "";
            waitingForOperand = true;

            updateDisplay();
            return;
        }

        current = String(result);
    }

    previous = current;
    operator = newOperator;
    waitingForOperand = true;

    updateDisplay();
}


function calcEquals() {

    if (operator === "" || previous === "") {
        return;
    }

    var result = doMath(previous, current, operator);

    if (result === "Error") {
        current = "Error";
    } else {
        current = String(result);
    }

    previous = "";
    operator = "";
    waitingForOperand = true;

    updateDisplay();
}


function calcClear() {

    current = "0";
    previous = "";
    operator = "";
    waitingForOperand = false;

    updateDisplay();
}


function calcBackspace() {

    if (waitingForOperand || current === "Error") {
        return;
    }

    if (current.length > 1) {
        current = current.substring(0, current.length - 1);
    } else {
        current = "0";
    }

    updateDisplay();
}


function calcPercent() {

    if (current === "Error") {
        return;
    }

    current = String(parseFloat(current) / 100);

    updateDisplay();
}


/* calculator buttons */

var calcButtons = document.querySelectorAll(".calc-btn");

calcButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        var action = button.getAttribute("data-action");
        var value = button.getAttribute("data-value");

        if (action === "number") {
            inputNumber(value);
        } else if (action === "decimal") {
            inputDecimal();
        } else if (action === "operator") {
            inputOperator(value);
        } else if (action === "equals") {
            calcEquals();
        } else if (action === "clear") {
            calcClear();
        } else if (action === "backspace") {
            calcBackspace();
        } else if (action === "percent") {
            calcPercent();
        }

    });

});


/* calculator keyboard */

document.addEventListener("keydown", function(event) {

    if (calculator.style.display === "none") {
        return;
    }

    if (event.key >= "0" && event.key <= "9") {
        inputNumber(event.key);
        return;
    }

    if (event.key === ".") {
        inputDecimal();
        return;
    }

    if (event.key === "+") {
        inputOperator("+");
        return;
    }

    if (event.key === "-") {
        inputOperator("-");
        return;
    }

    if (event.key === "*") {
        inputOperator("*");
        return;
    }

    if (event.key === "/") {
        inputOperator("/");
        event.preventDefault();
        return;
    }

    if (event.key === "Enter" || event.key === "=") {
        calcEquals();
        return;
    }

    if (event.key === "Escape") {
        calcClear();
        return;
    }

    if (event.key === "Backspace") {
        calcBackspace();
    }

});


/* =========================
   WEATHER
   ========================= */

var weatherResult = document.querySelector("#weatherResult");
var cityInput = document.querySelector("#cityInput");


function getWeatherDescription(code) {

    var descriptions = {
        0: "Clear sky",
        1: "Mostly clear",
        2: "Partly cloudy",
        3: "Overcast",

        45: "Fog",
        48: "Rime fog",

        51: "Light drizzle",
        53: "Drizzle",
        55: "Heavy drizzle",

        61: "Light rain",
        63: "Rain",
        65: "Heavy rain",

        71: "Light snow",
        73: "Snow",
        75: "Heavy snow",

        80: "Light rain showers",
        81: "Rain showers",
        82: "Heavy rain showers",

        85: "Light snow showers",
        86: "Heavy snow showers",

        95: "Thunderstorm",
        96: "Thunderstorm with hail",
        99: "Severe thunderstorm"
    };

    return descriptions[code] || "Unknown weather";
}


function showWeatherMessage(message, className) {

    weatherResult.innerHTML =
        '<span class="' +
        className +
        '">' +
        message +
        "</span>";
}


function checkWeather() {

    var city = cityInput.value.trim();

    if (!city) {
        showWeatherMessage(
            "Please enter a city name.",
            "weather-error"
        );
        return;
    }

    localStorage.setItem("rayyanos-city", city);

    showWeatherMessage(
        "Loading weather...",
        "weather-loading"
    );

    var geoUrl =
        "https://geocoding-api.open-meteo.com/v1/search" +
        "?name=" +
        encodeURIComponent(city) +
        "&count=1";

    fetch(geoUrl)
        .then(function(response) {
            return response.json();
        })

        .then(function(geoData) {

            if (!geoData.results || geoData.results.length === 0) {
                showWeatherMessage(
                    "I couldn't find that city. Try another name.",
                    "weather-error"
                );

                return;
            }

            var place = geoData.results[0];

            var latitude = place.latitude;
            var longitude = place.longitude;
            var country = place.country || "";

            var weatherUrl =
                "https://api.open-meteo.com/v1/forecast" +
                "?latitude=" + latitude +
                "&longitude=" + longitude +
                "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m" +
                "&temperature_unit=celsius";

            return fetch(weatherUrl)
                .then(function(response) {
                    return response.json();
                })

                .then(function(data) {

                    var currentWeather = data.current;

                    var temperature =
                        Math.round(currentWeather.temperature_2m);

                    var humidity =
                        currentWeather.relative_humidity_2m;

                    var wind =
                        Math.round(currentWeather.wind_speed_10m);

                    var condition =
                        getWeatherDescription(
                            currentWeather.weather_code
                        );

                    weatherResult.innerHTML =
                        '<div class="weather-city">' +
                        city +
                        "</div>" +

                        '<div class="weather-temp">' +
                        temperature +
                        "&deg;C</div>" +

                        '<div class="weather-condition">' +
                        condition +
                        "</div>" +

                        '<div class="weather-details">' +
                        "Humidity: " +
                        humidity +
                        "% | Wind: " +
                        wind +
                        " km/h | " +
                        country +
                        "</div>";
                });
        })

        .catch(function() {

            showWeatherMessage(
                "Weather could not be loaded. Check your connection and try again.",
                "weather-error"
            );

        });
}


document.querySelector("#checkWeatherBtn")
    .addEventListener("click", checkWeather);


cityInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        checkWeather();
    }

});
