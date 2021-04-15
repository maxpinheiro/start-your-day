$(() => {
    $('#horoscope-container').hide();
    setResponsive();
    loadDate();
    //loadHoroscope();
    findPosition();
});

window.onresize = () => setResponsive();


function setResponsive() {
    // desktop
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('#weather-container').addClass('row');
    } else {
        $('#weather-container').removeClass('row');
    }
}

function setView(view) {
    switch (view) {
        case "horoscope":
            $('body').removeClass().addClass("bg-stars");
            $('.btn-group button').removeClass().prop('disabled',false).addClass('btn btn-secondary');
            $('#horoscope-btn').prop('disabled',true);
            $('#horoscope-container').show();
            $('#weather-container').hide();
            loadHoroscope();
            break;
        case "weather":
            $('body').removeClass().addClass("bg-clouds");
            $('.btn-group button').removeClass().prop('disabled',false).addClass('btn btn-primary');
            $('#weather-btn').prop('disabled',true);
            $('#weather-container').show();
            $('#horoscope-container').hide();
            loadWeather(42.360081, -71.058884);
            break;
        default:
            break;
    }
}

const days = {"Mon": "Monday", "Tue": "Tuesday", "Wed": "Wednesday", "Thu": "Thursday", "Fri": "Friday", "Sat": "Saturday", "Sun": "Sunday"};
const months = {"Jan": "January", "Feb": "February", "Mar": "March", "Apr": "April", "May": "May", "Jun": "June", "Jul": "July", "Aug": "August", "Sep": "September", "Oct": "October", "Nov": "November", "Dec": "December"};
const dateSuffix = {"1": "st", "2": "nd", "3": "rd"};

function loadDate() {
    const [day, month, date, year] = new Date().toDateString().split(' ');
    $('#date').html(`Today is ${days[day]}, ${months[month]}, ${date}${dateSuffix[date%10] || "th"} ${year}`);
}

function loadHoroscope() {
    const sign = $('#sign').val() || "Capricorn";
    /*$.ajax({
        url: `https://aztro.sameerkumar.website/?sign=${sign}&day=today`,
        headers: {
            "Access-Control-Allow-Headers": "*"
        },
        type: "POST",
        dataType: "json",
        success: function (data) {
            renderHoroscope(sign, data['description'], data['mood'], data['color'], data['lucky_number'], data['lucky_time']);
        },
        error: function () {
            console.log("error");
        }
    });
*/

    fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, {
        method: 'POST',
    }).then(res => res.json().then(data => {
        renderHoroscope(sign, data['description'], data['mood'], data['color'], data['lucky_number'], data['lucky_time']);
    }));
}

function loadWeather(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=3373b692a45fa1b95087370f4227da8c`).then(res => res.json().then(data => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&result_type=locality&key=AIzaSyCqAtfJQCTc951PiO9p5T6oTbT6RSWdvmA`).then(res => res.json().then(gglData => {
            const [city, _, state, c] = gglData["results"][0]["address_components"];
            renderWeather(city["long_name"], state["short_name"], Math.round(data['main']['temp']), Math.round(data['main']['feels_like']), Math.round(data['main']['temp_max']), Math.round(data['main']['temp_min']), data['weather'][0]['main'], Math.round(data['wind']['speed']), Math.round(data['wind']['deg']));
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
                error => loadWeather(42.360081, -71.058884), {timeout:5000});
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}