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
    const signs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
    signs.splice(signs.indexOf(sign),1);
    signs.splice(0, 0, sign);
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
                    <span>
                        <label for="sign">Zodiac Sun Sign:</label>
                        <select id="sign" name="sign" onchange="setZodiacSign()">
                            ${signs.map(s => `<option value=${s}>${s}</option>`)}
                        </select>
                    </span>
                </div>
            </div>`);
}