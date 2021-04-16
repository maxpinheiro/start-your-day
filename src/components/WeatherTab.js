import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCloud, faCloudRain, faSnowflake} from "@fortawesome/free-solid-svg-icons";

export default class WeatherTab extends React.Component {
    state = {
        city: "",
        state: "",
        temp: "",
        feelsLike: "",
        high: "",
        low: "",
        forecast: "",
        windSpeed: "",
        windDir: "",
    };

    weatherIcons = {
        "Clouds": faCloud,
        "Rain": faCloudRain,
        "Snow": faSnowflake,
    };

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => this.loadWeather(position.coords.latitude, position.coords.longitude),
                error => this.loadWeather(42.360081, -71.058884), {timeout: 3000});
        } else {
            alert("Sorry, your browser does not support HTML5 geolocation.");
        }
    }

    loadWeather(lat, lon) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=3373b692a45fa1b95087370f4227da8c`).then(res => res.json().then(data => {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&result_type=locality&key=AIzaSyCqAtfJQCTc951PiO9p5T6oTbT6RSWdvmA`).then(res => res.json().then(gglData => {
                const [city, _, state, c] = gglData["results"][0]["address_components"];
                this.setState(prevState => (
                    {...prevState,
                        city: city["long_name"],
                        state: state["short_name"],
                        temp: Math.round(data['main']['temp']),
                        feelsLike: Math.round(data['main']['feels_like']),
                        high: Math.round(data['main']['temp_max']),
                        low: Math.round(data['main']['temp_min']),
                        forecast: data['weather'][0]['main'],
                        windSpeed: Math.round(data['wind']['speed']),
                        windDir: Math.round(data['wind']['deg']),
                    }))
            }))}));
    }

    dirCompass(dir) {
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

    render() {
        return (
            <div className="weather-container row mx-auto text-center d-flex flex-column">
                <h4 className="">{this.state.city && `Today's Weather in ${this.state.city}, ${this.state.state}:`}</h4>
                <div className="row d-flex justify-content-around">
                    <div className="col my-auto">
                        <p className="large-display m-0">{this.state.temp && `${this.state.temp} °F`}</p>
                        <p className="">{this.state.feelsLike && `Feels like: ${this.state.feelsLike}`}</p>
                        <span className="d-flex justify-content-center"><p className="mx-2">{this.state.high}</p><p
                            className="mx-2">{this.state.low}</p></span>
                    </div>
                    <div className="col my-auto">
                        {this.state.forecast && <FontAwesomeIcon className="text-white fa-5x" icon={this.weatherIcons[this.state.forecast]} />}
                        <p className="mt-3 mb-0">{this.state.forecast}</p>
                        <p className="">{this.state.windDir && `Wind: ${this.dirCompass(this.state.windDir)} ${this.state.windSpeed} mph`}</p>
                    </div>
                </div>
            </div>
        );
    }
}