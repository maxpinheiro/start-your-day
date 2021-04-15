$(() => {
    setResponsive();
    loadDate();
    setZodiacSign();
    findPosition();
});

window.onresize = () => setResponsive();

function setZodiacSign() {
    loadHoroscope($('#sign').val() || "Capricorn");
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
        renderHoroscope(sign, data['description'], data['mood'], data['color'], data['lucky_number'], data['lucky_time']);
    }));
}

function setResponsive() {
    // desktop
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('#weather-container').addClass('row');
    } else {
        $('#weather-container').removeClass('row');
    }
}

function loadWeather(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=3373b692a45fa1b95087370f4227da8c`).then(res => res.json().then(data => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&result_type=locality&key=AIzaSyCqAtfJQCTc951PiO9p5T6oTbT6RSWdvmA`).then(res => res.json().then(gglData => {
            const [city, _, state, c] = gglData["results"][0]["address_components"];
            renderWeather(city["long_name"], state["short_name"], Math.round(data['main']['temp']), Math.round(data['main']['temp_max']), Math.round(data['main']['temp_min']), data['weather'][0]['main']);
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
        navigator.geolocation.getCurrentPosition(position => loadWeather(position.coords.latitude, position.coords.longitude),
                error => alert(`Geolocation error: ${error.message}`), {timeout:5000});
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}