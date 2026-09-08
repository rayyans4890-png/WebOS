function updateTime() {
    var timeElement = document.querySelector("#timeElement");
    var dateElement = document.querySelector("#dateElement");
    var now = new Date();
    timeElement.textContent = now.toLocaleTimeString();
    dateElement.textContent = now.toLocaleDateString(undefined, {
        weekday: "short", month: "short", day: "numeric"
    });
}
updateTime();
setInterval(updateTime, 1000);

// window stuff
var biggestIndex = 10;

function bringToFront(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
}

function dragWindow(win) {
    var header = document.querySelector("#" + win.id + "header");
    var startX, startY;

    header.addEventListener("mousedown", function(e) {
        e.preventDefault();
        bringToFront(win);
        startX = e.clientX;
        startY = e.clientY;

        function onMove(e) {
            var dx = startX - e.clientX;
            var dy = startY - e.clientY;
            startX = e.clientX;
            startY = e.clientY;
            win.style.left = win.offsetLeft - dx + "px";
            win.style.top = win.offsetTop - dy + "px";
        }

        function onUp() {
            document.removeEventListener("mousemove", onMove);
        }

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp, { once: true });
    });
}

var allWindows = document.querySelectorAll(".window");
allWindows.forEach(function(win) {
    dragWindow(win);
    win.addEventListener("mousedown", function() {
        bringToFront(win);
    });
});

// welcome
var welcome = document.querySelector("#welcome");
document.querySelector("#welcomeopen").addEventListener("click", function() {
    welcome.style.display = "flex";
    bringToFront(welcome);
});
document.querySelector("#welcomeclose").addEventListener("click", function() {
    welcome.style.display = "none";
});

document.querySelector("#shutdownBtn").addEventListener("click", function() {
    document.querySelectorAll(".window").forEach(function(win) {
        win.style.display = "none";
    });
    document.querySelectorAll(".appicon").forEach(function(icon) {
        icon.classList.remove("selected");
    });
});

// notes
var notes = document.querySelector("#notes");
var notesIcon = document.querySelector("#notesIcon");
notesIcon.addEventListener("click", function() {
    notes.style.display = "flex";
    bringToFront(notes);
});
document.querySelector("#notesclose").addEventListener("click", function() {
    notes.style.display = "none";
});

// projects
var projects = document.querySelector("#projects");
var projectsIcon = document.querySelector("#projectsIcon");
projectsIcon.addEventListener("click", function() {
    projects.style.display = "flex";
    bringToFront(projects);
});
document.querySelector("#projectsclose").addEventListener("click", function() {
    projects.style.display = "none";
});

// calculator
var calculator = document.querySelector("#calculator");
var calculatorIcon = document.querySelector("#calculatorIcon");
calculatorIcon.addEventListener("click", function() {
    calculator.style.display = "flex";
    bringToFront(calculator);
});
document.querySelector("#calculatorclose").addEventListener("click", function() {
    calculator.style.display = "none";
});

// weather
var weather = document.querySelector("#weather");
var weatherIcon = document.querySelector("#weatherIcon");
weatherIcon.addEventListener("click", function() {
    weather.style.display = "flex";
    bringToFront(weather);
});
document.querySelector("#weatherclose").addEventListener("click", function() {
    weather.style.display = "none";
});

// about
var about = document.querySelector("#about");
var aboutIcon = document.querySelector("#aboutIcon");
aboutIcon.addEventListener("click", function() {
    about.style.display = "flex";
    bringToFront(about);
});
document.querySelector("#aboutclose").addEventListener("click", function() {
    about.style.display = "none";
});

bringToFront(welcome);

// notes data

var notesData = [
    {
        title: "Welcome",
        date: "09/05/2026",
        content: "<h1>Welcome to Study Notes</h1><p>This is the notes app inside RayyanOS. Use it for school notes, revision topics, ideas, and useful information.</p><blockquote>Keep your notes simple and easy to scan.</blockquote>"
    },
    {
        title: "Math",
        date: "09/05/2026",
        content: "<h1>Math Notes</h1><h2>Quadratic Formula</h2><p>For equations in the form:</p><p><strong>ax\u00b2 + bx + c = 0</strong></p><blockquote>x = (-b \u00b1 sqrt(b\u00b2 - 4ac)) / 2a</blockquote>"
    },
    {
        title: "Programming",
        date: "09/05/2026",
        content: "<h1>Programming Notes</h1><p>JavaScript basics to learn for building web stuff.</p><ul><li>Variables</li><li>Functions</li><li>Arrays</li><li>Objects</li><li>Event listeners</li><li>DOM manipulation</li></ul>"
    }
];

var sidebar = document.querySelector("#sidebar");
var notesContent = document.querySelector("#notesContent");

for (var i = 0; i < notesData.length; i++) {
    var note = notesData[i];
    var item = document.createElement("div");
    item.className = "note-item";
    item.innerHTML = '<p class="note-title">' + note.title + '</p><p class="note-date">' + note.date + '</p>';

    (function(index) {
        item.addEventListener("click", function() {
            showNote(index);
        });
    })(i);

    sidebar.appendChild(item);
}

function showNote(index) {
    notesContent.innerHTML = notesData[index].content;

    var items = document.querySelectorAll(".note-item");
    for (var j = 0; j < items.length; j++) {
        if (j === index) {
            items[j].classList.add("active");
        } else {
            items[j].classList.remove("active");
        }
    }
}

showNote(0);

// projects

var projectsData = [
    {
        name: "Study OS",
        status: "In Progress",
        description: "A student-focused Web OS for managing studying, tasks, time, and school projects.",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "PUT_GITHUB_LINK_HERE"
    },
    {
        name: "RayyanOS",
        status: "In Progress",
        description: "A browser-based operating system with draggable windows, desktop apps, and utilities.",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "PUT_GITHUB_LINK_HERE"
    },
    {
        name: "Slackbot",
        status: "Completed",
        description: "A Slack bot with commands for pinging, jokes, cat facts, and basic bot utilities.",
        technologies: ["Node.js", "Bolt", "JavaScript"],
        link: "PUT_GITHUB_LINK_HERE"
    },
    {
        name: "Web Experiments",
        status: "Exploring",
        description: "A collection of small websites and experiments made while learning new web development ideas.",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "PUT_GITHUB_LINK_HERE"
    }
];

var projectGrid = document.querySelector("#projectGrid");
var projectCount = document.querySelector("#projectCount");

for (var i = 0; i < projectsData.length; i++) {
    var p = projectsData[i];
    var card = document.createElement("div");
    card.className = "project-card";

    var techHTML = "";
    for (var t = 0; t < p.technologies.length; t++) {
        techHTML += '<span class="tech-tag">' + p.technologies[t] + '</span>';
    }

    card.innerHTML =
        '<span class="project-status">' + p.status + '</span>' +
        '<h2>' + p.name + '</h2>' +
        '<p>' + p.description + '</p>' +
        '<div class="project-tech">' + techHTML + '</div>' +
        '<a class="project-link" href="' + p.link + '" target="_blank" rel="noopener noreferrer">View project</a>';

    projectGrid.appendChild(card);
}

projectCount.textContent = projectsData.length;

// calculator

var calcDisplay = document.querySelector("#calcDisplay");
var current = "0";
var previous = "";
var operator = "";
var waitingForOperand = false;

function updateDisplay() {
    var val = current;
    if (val.length > 12) val = val.substring(0, 12);
    calcDisplay.textContent = val;
}

function inputNumber(num) {
    if (waitingForOperand) {
        current = num;
        waitingForOperand = false;
    } else {
        current = (current === "0") ? num : current + num;
    }
    updateDisplay();
}

function inputDecimal() {
    if (waitingForOperand) {
        current = "0.";
        waitingForOperand = false;
        updateDisplay();
        return;
    }
    if (current.indexOf(".") === -1) {
        current += ".";
    }
    updateDisplay();
}

function doMath(a, b, op) {
    var x = parseFloat(a);
    var y = parseFloat(b);
    if (op === "+") return x + y;
    if (op === "-") return x - y;
    if (op === "*") return x * y;
    if (op === "/") {
        if (y === 0) return "Error";
        return x / y;
    }
    return y;
}

function inputOperator(op) {
    var result = doMath(previous, current, operator);

    if (previous !== "" && !waitingForOperand) {
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
    operator = op;
    waitingForOperand = true;
    updateDisplay();
}

function calcEquals() {
    if (operator === "" || previous === "") return;

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
    if (waitingForOperand) return;
    if (current.length > 1) {
        current = current.substring(0, current.length - 1);
    } else {
        current = "0";
    }
    updateDisplay();
}

function calcPercent() {
    current = String(parseFloat(current) / 100);
    updateDisplay();
}

var calcButtons = document.querySelectorAll(".calc-btn");
calcButtons.forEach(function(btn) {
    btn.addEventListener("click", function() {
        var action = btn.getAttribute("data-action");
        var value = btn.getAttribute("data-value");

        if (action === "number") inputNumber(value);
        else if (action === "decimal") inputDecimal();
        else if (action === "operator") inputOperator(value);
        else if (action === "equals") calcEquals();
        else if (action === "clear") calcClear();
        else if (action === "backspace") calcBackspace();
        else if (action === "percent") calcPercent();
    });
});

// keyboard controls for calculator
document.addEventListener("keydown", function(e) {
    if (calculator.style.display === "none") return;

    if (e.key >= "0" && e.key <= "9") inputNumber(e.key);
    else if (e.key === ".") inputDecimal();
    else if (e.key === "+") inputOperator("+");
    else if (e.key === "-") inputOperator("-");
    else if (e.key === "*") inputOperator("*");
    else if (e.key === "/") { inputOperator("/"); e.preventDefault(); }
    else if (e.key === "Enter" || e.key === "=") calcEquals();
    else if (e.key === "Escape") calcClear();
    else if (e.key === "Backspace") calcBackspace();
});

// weather

var weatherResult = document.querySelector("#weatherResult");

function getWeatherDescription(code) {
    var descriptions = {
        0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
        45: "Fog", 48: "Rime fog",
        51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
        61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
        71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow",
        80: "Slight rain showers", 81: "Moderate rain showers", 82: "Violent rain showers",
        85: "Slight snow showers", 86: "Heavy snow showers",
        95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Severe thunderstorm"
    };
    return descriptions[code] || "Unknown";
}

function checkWeather() {
    var cityInput = document.querySelector("#cityInput");
    var city = cityInput.value.trim();

    if (!city) {
        weatherResult.innerHTML = '<span class="weather-error">Please enter a city name.</span>';
        return;
    }

    weatherResult.innerHTML = '<span class="weather-loading">Loading weather data...</span>';

    var geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(city) + "&count=1";

    fetch(geoUrl)
        .then(function(response) { return response.json(); })
        .then(function(geoData) {
            if (!geoData.results || geoData.results.length === 0) {
                weatherResult.innerHTML = '<span class="weather-error">City not found. Try a different name.</span>';
                return;
            }

            var place = geoData.results[0];
            var lat = place.latitude;
            var lon = place.longitude;
            var country = place.country || "";

            var weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon +
                "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius";

            return fetch(weatherUrl)
                .then(function(response) { return response.json(); })
                .then(function(data) {
                    var current = data.current;
                    var temp = Math.round(current.temperature_2m);
                    var humidity = current.relative_humidity_2m;
                    var wind = Math.round(current.wind_speed_10m);
                    var condition = getWeatherDescription(current.weather_code);

                    weatherResult.innerHTML =
                        '<div class="weather-city">' + city + '</div>' +
                        '<div class="weather-temp">' + temp + '&deg;C</div>' +
                        '<div class="weather-condition">' + condition + '</div>' +
                        '<div class="weather-details">Humidity: ' + humidity + '% | Wind: ' + wind + ' km/h | ' + country + '</div>';
                });
        })
        .catch(function() {
            weatherResult.innerHTML = '<span class="weather-error">Could not load weather. Check your internet connection.</span>';
        });
}

document.querySelector("#checkWeatherBtn").addEventListener("click", checkWeather);
document.querySelector("#cityInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") checkWeather();
});
