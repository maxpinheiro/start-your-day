const dirCompass = (dir) => {
    if (dir >= 348.75 || dir < 11.25) return "N";
    else if (dir >= 11.25 && dir < 33.75) return "NNE";
    else if (dir >= 33.75 && dir < 56.25) return "NE";
    else if (dir >= 56.25 && dir < 78.75) return "ENE";
    else if (dir >= 78.75 && dir < 101.25) return "E";
    else if (dir >= 101.25 && dir < 123.75) return "ESE";
    else if (dir >= 123.75 && dir < 146.25) return "SE";
    else if (dir >= 146.25 && dir < 168.75) return "SSE";
    else if (dir >= 168.75 && dir < 191.25) return "S";
    else if (dir >= 191.25 && dir < 213.75) return "SSW";
    else if (dir >= 213.75 && dir < 236.25) return "SW";
    else if (dir >= 236.25 && dir < 258.75) return "WSW";
    else if (dir >= 258.75 && dir < 281.25) return "W";
    else if (dir >= 281.25 && dir < 303.75) return "WNW";
    else if (dir >= 303.75 && dir < 326.25) return "NW";
    else if (dir >= 326.25 && dir < 348.75) return "NNW";
    else return "";
};

function renderWeather(city, state, temp, feels_like, high, low, forecast, wind_speed, wind_dir) {
    const weatherIcons = {"Clouds": "<i class=\"fas fa-cloud fa-4x text-white\"></i>", "Rain": "<i class=\"fas fa-cloud-rain fa-4x text-white\"></i>"};
    $('#weather-container').html(`
        <div class="weather mx-auto text-center d-flex flex-column">
            <h4 class="border-bottom-black pb-3">Today's Weather in ${city}, ${state}:</h4>
            <div class="row d-flex justify-content-around">
                <div class="col my-auto">
                    <p class="large-display m-0">${temp}°F</p>
                    <p class="">Feels like: ${feels_like}</p>
                    <span class="d-flex justify-content-center"><p class="mx-2">${high}</p><p class="mx-2">${low}</p></span>
                </div>
                <div class="col my-auto">
                    ${weatherIcons[forecast]}
                    <p class="mt-3 mb-0">${forecast}</p>
                    <p class="">Wind: ${dirCompass(wind_dir)} ${wind_speed} mph</p>
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
                <h4 class="comfortaa">Today's Horoscope for ${sign}:</h4>
                <div class="border-top-white pt-3 mx-auto d-block">
                    <p class="comfortaa">${description}</p>
                    <span>
                        <label class="comfortaa" for="sign">Zodiac Sun Sign:</label>
                        <select id="sign" name="sign" onchange="loadHoroscope()">
                            ${signs.map(s => `<option value=${s}>${s}</option>`)}
                        </select>
                    </span>
                    <div class="comfortaa">
                        <p>Mood: ${mood}</p>
                        <p>Color: ${color}</p>
                        <p>Lucky Number: ${number}</p>
                        <p>Lucky Time: ${time}</p>
                    </div>
                </div>
            </div>`);
}