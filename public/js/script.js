import { saarock } from "https://cdn.jsdelivr.net/gh/saarock/saarock.js@main/dist/index.js";

/**
 * Api call function
 */

const API_KEY = "d674b341cda833f901146099f61a712a";
const searchInput = document.getElementById("search");
const searchButton = document.querySelector(".search_icon button");

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        updateWeatherUI(data);
        console.log(data.weather[0])
    } catch (error) {
        await saarock.error({ message: error.message });
    }
}

// Function to update UI with fetched weather data
function updateWeatherUI(data) {
    document.querySelector(".country_details h1").textContent = `${data.name}, ${data.sys.country}`;
    const currentDate = new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
    document.querySelector(".county_details p").textContent = currentDate;
    document.querySelector(".country_deg_details_one i").className = getWeatherIcon(data.weather[0].icon);
    document.querySelector(".deg").textContent = `${data.main.temp.toFixed(1)}°C`;
    document.querySelector(".system").textContent = data.weather[0].description;

    const weatherDetails = [
        { label: "Feels Like", value: `${data.main.feels_like.toFixed(1)}°C` },
        { label: "Wind Speed", value: `${data.wind.speed} m/s` },
        { label: "Humidity", value: `${data.main.humidity}%` },
        { label: "Condition", value: `${data.weather[0].main}` },
    ];

    document.querySelectorAll(".weather_child2_child").forEach((child, index) => {
        child.querySelector(".feels_like").textContent = weatherDetails[index].label;
        child.querySelector(".deg").textContent = weatherDetails[index].value;
    });
}



// Function to map OpenWeatherMap icons to Font Awesome classes
function getWeatherIcon(icon) {
    const iconMapping = {
        "01d": "fa fa-sun", // clear day
        "01n": "fa fa-moon", // clear night
        "02d": "fa fa-cloud-sun", // few clouds day
        "02n": "fa fa-cloud-moon", // few clouds night
        "03d": "fa fa-cloud", // scattered clouds
        "03n": "fa fa-cloud",
        "04d": "fa fa-cloud", // broken clouds
        "04n": "fa fa-cloud",
        "09d": "fa fa-cloud-showers-heavy", // shower rain
        "09n": "fa fa-cloud-showers-heavy",
        "10d": "fa fa-cloud-rain", // rain day
        "10n": "fa fa-cloud-rain",
        "11d": "fa fa-bolt", // thunderstorm
        "11n": "fa fa-bolt",
        "13d": "fa fa-snowflake", // snow
        "13n": "fa fa-snowflake",
        "50d": "fa fa-smog", // mist
        "50n": "fa fa-smog",
    };
    // alert(iconMapping[icon])
    return iconMapping[icon] || "fa fa-question";
}
/**
 * default city 
 */
fetchWeather("London")


// Event listener for search button
searchButton.addEventListener("click", () => {
    saarock.success({ message: "Searching..." });
    const city = searchInput.value.trim();
    if (city) fetchWeather(city);
});
