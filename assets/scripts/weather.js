// Select DOM elements
const weatherSection = document.querySelector(".weather-wrapper");

// Weather API address
const weatherAPI =
  "https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403&lang=fa&theme=light";

// Receiving data from the API and pass them to DOM
const fetchWeather = async () => {
  try {
    const response = await fetch(weatherAPI);
    const data = await response.json();
    renderWeather(data);
  } catch (error) {
    console.log(error);
    weatherSection.innerHTML =
      '<p class="time-weather-error">متاسفانه در حال حاضر اطلاعات مربوط به آب‌وهوا در دسترس نمی‌باشد 😟</p>';
  }
};

// Render received w data for the DOM
function renderWeather(data) {
  const {
    current: currentTemp,
    customDescription: { emoji: descriptionEmoji, text: descriptionText },
    max,
    min,
    weather: { icon },
  } = data[0];

  const currentTempRound = Math.round(currentTemp);
  const maxTempRound = Math.round(max);
  const minTempRound = Math.round(min);

  weatherSection.innerHTML = `
                            <div class="temperature-wrapper d-flex">
                                <h2 class="temperature-digits d-flex">${currentTempRound}°</h2>
                                <div class="temperature-emoji-wrapper">${weatherIcon(
                                  icon
                                )}</div>
                            </div>
                            <div class="temperature-description-wrapper d-flex">
                                <div class="temperature-description-text">${descriptionText}</div>
                                <div class="temperature-description-emoji">${descriptionEmoji}</div>
                                </div>
                                <div class="temperature-min-max-wrapper d-flex">
                                <div class="max-temperature-wrapper d-flex">
                                    <span class="max-temperature-digits">${maxTempRound}°</span>
                                    <span class="max-temperature-text">حداکثر</span>
                                </div>
                                <div class="min-max-separator">.</div>
                                <div class="min-temperature-wrapper d-flex">
                                    <span class="min-temperature-digits">${minTempRound}°</span>
                                    <span class="min-temperature-text">حداقل</span>
                                </div>
                            </div>
                            <select name="forecast"     class="temperature-forecast">
                            <option value="forecast">پیش‌بینی</option>
                            </select>`;
}

// Assign proper weather icon based on the weather data
function weatherIcon(iconCode) {
  return `<img src="./assets/images/weather/${iconCode}.svg" class="temperature-emoji">`;
}

setTimeout(fetchWeather, 0); // Execute the function as the page loads
setInterval(fetchWeather, 600000); // Refresh weather data every 10 minutes
