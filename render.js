function renderWeather(city, state, temp, high, low, forecast) {
    const weatherIcons = {"Clouds": "<i class=\"fas fa-cloud fa-3x text-white\"></i>"};
    $('#weather-container').html(`
        <div class="weather mx-auto text-center d-flex flex-column">
            <h4 class="border-bottom-black pb-3">Today's Weather in ${city}, ${state}:</h4>
            <div class="row d-flex justify-content-around">
                <div class="col my-auto">
                    <p class="large-display m-0">${temp}°F</p>
                    <span class="d-flex justify-content-center"><p class="mx-2">${high}</p><p class="mx-2">${low}</p></span>
                </div>
                <div class="col my-auto">
                    ${weatherIcons[forecast]}
                    <p class="mt-3 mb-0">${forecast}</p>
                </div>
            </div>
        </div>`);
}

function renderHoroscope(sign, description, mood, color, number, time) {
    $('#horoscope-container').html(`
            <div class="horoscope row mx-auto justify-content-center text-center text-white" id="horoscope-content">
                <h4 class="">Today's Horoscope for ${sign}:</h4>
                <div class="border-top-white pt-3 mx-auto d-block">
                    <p class="">${description}</p>
                    <div class="row justify-content-around">
                        <p>Mood: ${mood}</p>
                        <p>Color: ${color}</p>
                        <p>Lucky Number: ${number}</p>
                        <p>Lucky Time: ${time}</p>
                    </div>
                </div>
            </div>`);
}