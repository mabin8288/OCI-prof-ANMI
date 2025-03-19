// script.js
const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your OpenWeather API Key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = async () => {
    const cityInput = document.getElementById('cityInput').value;
    const weatherResult = document.getElementById('weather-result');
    const errorMessage = document.getElementById('error-message');

    if (!cityInput) {
        errorMessage.textContent = 'Please enter a city name';
        errorMessage.classList.remove('hidden');
        weatherResult.classList.add('hidden');
        return;
    }

    try {
        const response = await fetch(`${API_URL}?q=${cityInput}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        if (response.ok) {
            document.getElementById('city-name').textContent = data.name;
            document.getElementById('temperature').textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
            document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById('description').textContent = data.weather[0].description;
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            weatherResult.classList.remove('hidden');
            errorMessage.classList.add('hidden');
        } else {
            errorMessage.textContent = data.message;
            errorMessage.classList.remove('hidden');
            weatherResult.classList.add('hidden');
        }
    } catch (error) {
        errorMessage.textContent = 'Error fetching data. Please try again.';
        errorMessage.classList.remove('hidden');
        weatherResult.classList.add('hidden');
    }
};
