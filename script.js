// Function to fetch data from an API using Fetch and Promises
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display dog image
async function displayDogImage() {
    const dogImageDiv = document.getElementById('dog-image-container');
    const data = await fetchData('https://dog.ceo/api/breeds/image/random');
    if (data && data.status === 'success') {
        const imageUrl = data.message;
        dogImageDiv.innerHTML = `<img src="${imageUrl}">`;
    }
}

// Function to display weather information
async function displayWeatherInfo() {
    const weatherInfoDiv = document.getElementById('weather-info');
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const city = 'New York'; // Change city as needed
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const data = await fetchData(url);
    if (data) {
        const { main, weather } = data;
        weatherInfoDiv.innerHTML = `<div>Temperature: ${main.temp}°C, Description: ${weather[0].description}</div>`;
    }
}

// Function to display Breaking Bad quote
async function displayBreakingBadQuote() {
    const quoteDiv = document.getElementById('breaking-bad-quote');
    const data = await fetchData('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
    if (data && data.length > 0) {
        const { quote, author } = data[0];
        quoteDiv.innerHTML = `<div>"${quote}" - ${author}</div>`;
    }
}

// Function to handle button click event
document.getElementById('change-dog-button').addEventListener('click', displayDogImage);

// Call functions to display data initially
displayDogImage();
displayWeatherInfo();
displayBreakingBadQuote();
