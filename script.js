$(() => {
    loadDate();
    setZodiacSign();
    findPosition();
});

function setZodiacSign() {
    loadHoroscope($('#sign').val());
}

const days = {"Mon": "Monday", "Tue": "Tuesday", "Wed": "Wednesday", "Thu": "Thursday", "Fri": "Friday", "Sat": "Saturday", "Sun": "Sunday"};
const months = {"Jan": "January", "Feb": "February", "Mar": "March", "Apr": "April", "May": "May", "Jun": "June", "Jul": "July", "Aug": "August", "Sep": "September", "Oct": "October", "Nov": "November", "Dec": "December"};
const dateSuffix = {"1": "st", "2": "nd", "3": "rd"};

function loadDate() {
    const [day, month, date, year] = new Date().toDateString().split(' ');
    $('#date').html(`Today is ${days[day]}, ${months[month]}, ${date}${dateSuffix[date%10] || "th"} ${year}`);
}

function loadHoroscope(sign) {
    fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, {
        method: 'POST',
    }).then(res => res.json().then(data => {
        $('#horoscope-container').html(`
            <div class="horoscope row mx-auto justify-content-around text-center text-white" id="horoscope-content">
                <h4 class="">Today's Horoscope for ${sign}:</h4>
                <div class="border border-white border-top-0 border-left-0 border-right-0 mx-auto mb-2 d-block" style="width:75%"></div>
                <p class="">${data['description']}</p>
                <p>Mood: ${data['mood']}</p>
                <p>Color: ${data['color']}</p>
                <p>Lucky Number: ${data['lucky_number']}</p>
                <p>Lucky Time: ${data['lucky_time']}</p>
            </div>`);
    }));
}

function loadWeather(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=3373b692a45fa1b95087370f4227da8c`).then(res => res.json().then(data => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&result_type=locality&key=AIzaSyCqAtfJQCTc951PiO9p5T6oTbT6RSWdvmA`).then(res => res.json().then(gglData => {
            const [city, _, state, c] = gglData["results"][0]["address_components"];
            $('#weather-container').html(`
                <div class="weather row mx-auto text-center d-flex flex-column">
                    <h4 class="">Today's Weather in ${city["long_name"]}, ${state["short_name"]}:</h4>
                    <div class="border border-dark border-top-0 border-left-0 border-right-0 mx-auto mb-2 d-block" style="width:75%"></div>
                    <div class="row justify-content-around">
                        <p>${data['weather'][0]['main']}</p>
                        <p>${data['main']['temp']}°F</p>
                        <p>Hi: ${data['main']['temp_max']}°F</p>
                        <p>Lo: ${data['main']['temp_min']}°F</p>
                    </div>
                </div>`);
    }))}));
}

function loadNews() {

}

function loadQuote() {

}

function loadPoem() {

}

function loadTarot() {

}

function findPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            loadWeather(position.coords.latitude, position.coords.longitude);
        });
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}