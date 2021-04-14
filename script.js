$(() => {
    loadDate();
    loadHoroscope('Capricorn');
   showPosition();
});

function setZodiacSign() {
    loadHoroscope($('#sign').val());
}

function loadDate() {
    $('#date').html(`Today is ${new Date().toDateString()}`);
}

function loadWeather() {

}

function loadHoroscope(sign) {
    /*
    fetch('http://horoscope-api.herokuapp.com/horoscope/today/capricorn', {mode: 'cors'}).then(res => res.json().then(data => {
        console.log(data["horoscope"]);
    }));*/

    fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, {
        method: 'POST',
    }).then(res => res.json().then(data => {
        $('#horoscope-container').html(`
            <div class="row mx-auto justify-content-around text-center" id="horoscope-content">
                <h4 class=""> Today's Horoscope for ${sign}:</h4>
                <div class="border border-dark border-top-0 border-left-0 border-right-0 mx-auto mb-2" style="width:75%"></div>
                <p class="">${data['description']}</p>
                <p>Mood: ${data['mood']}</p>
                <p>Color: ${data['color']}</p>
                <p>Lucky Number: ${data['lucky_number']}</p>
                <p>Lucky Time: ${data['lucky_time']}</p>
            </div>`);
    }));

}

function loadNews() {

}

function loadQuote() {

}

function loadPoem() {

}

function loadTarot() {

}

function showPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {lat: position.coords.latitude, long: position.coords.longitude};
            console.log(pos);
        });
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}