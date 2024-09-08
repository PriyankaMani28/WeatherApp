// API Key and URL
const apiKey = "a8279047b51cf8ef8e49211ba046f26c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

//Selecting items from HTML
const inputCity = document.querySelector("#inputCity");
const searchBtn = document.querySelector("#searchBtn");
const cityName = document.querySelector("#cityName");
const day = document.querySelector(".day");
const time = document.querySelector(".time");
const weather = document.querySelector("#weather");
const tempFeel = document.querySelector("#tempFeel");
const humdity = document.querySelector("#humdity");
const wind = document.querySelector("#wind");
const temp = document.querySelector("#temp");
const tempMax = document.querySelector("#tempMax");
const tempMin = document.querySelector("#tempMin");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

// Adding click event to the search button
searchBtn.addEventListener("click", function () {
    // Storing the value of input city
    const city = inputCity.value;

    checkWeather(city);
});

//
async function checkWeather(city) {
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
    let data = await response.json();

    console.log(data);

    //Changing the details acc to city entered
    cityName.innerHTML = city;
    temp.innerHTML = Math.round(data.main.temp);
    weather.innerHTML = data.weather[0].main;
    tempMax.innerHTML = Math.round(data.main.temp_max);
    tempMin.innerHTML = Math.round(data.main.temp_min);
    sunrise.innerHTML = unixToTime(Math.round(data.sys.sunrise));
    sunset.innerHTML = unixToTime(Math.round(data.sys.sunset));
    tempFeel.innerHTML = Math.round(data.main.feels_like);
    humdity.innerHTML = Math.round(data.main.humidity);
    wind.innerHTML = Math.round(data.wind.speed);

    //Changing the bachground-image acc to weather
    var body = document.getElementsByTagName("body")[0];

    if (data.weather[0].main == "Clear") {
        body.style.backgroundImage = 'url("/dist/assets/clear.jpg")';
    } else if (data.weather[0].main == "Clouds") {
        body.style.backgroundImage = 'url("/dist/assets/cloud.jpg")';
    } else if (data.weather[0].main == "Drizzle" || data.weather[0].main == "Rain" || data.weather[0].main == "Humidity") {
        body.style.backgroundImage = 'url("/dist/assets/rain.jpg")';
    } else if (data.weather[0].main == "Mist") {
        body.style.backgroundImage = 'url("/dist/assets/mist.jpg")';
    } else if (data.weather[0].main == "Snow") {
        body.style.backgroundImage = 'url("/dist/assets/snow.jpg")';
    } else if (data.weather[0].main == "Fog" || data.weather[0].main == "Haze") {
        body.style.backgroundImage = 'url("/dist/assets/fog.jpg")';
    } else {
        body.style.backgroundImage = 'url("/dist/assets/wind.jpg")';
    }
}

//for default

checkWeather("Delhi");

//Displaying day and date
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const now = new Date();

const dayName = weekday[now.getDay()];
day.innerHTML = dayName;

// get the current hour (from 0 to 23)
const hour = now.getHours();

// get the current minute (from 0 to 59)
const minute = now.getMinutes();

const currentTime = now.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
time.innerHTML = currentTime;

// Function to convert temperature from UNIX to Local time
function unixToTime(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000;
    const date = new Date(milliseconds);
    return date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}