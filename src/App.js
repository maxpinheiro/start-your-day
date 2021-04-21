import React from "react";
import WeatherTab from "./components/WeatherTab";
import HoroscopeTab from "./components/HoroscopeTab";
import NewsTab from "./components/NewsTab";

export default class App extends React.Component {
    state = {
        view: "weather",
        backgroundClass: "bg-clouds",
        date: "",
        sign: "",
    };

    views = ["weather", "horoscope", "news"];
    backgroundClasses = {"weather": "bg-clouds", "horoscope": "bg-stars", "news": "bg-news"};
    buttonClasses = {"weather": "btn-primary", "horoscope": "btn-secondary", "news": "btn-warning"};
    days = {"Mon": "Monday", "Tue": "Tuesday", "Wed": "Wednesday", "Thu": "Thursday", "Fri": "Friday", "Sat": "Saturday", "Sun": "Sunday"};
    months = {"Jan": "January", "Feb": "February", "Mar": "March", "Apr": "April", "May": "May", "Jun": "June", "Jul": "July", "Aug": "August", "Sep": "September", "Oct": "October", "Nov": "November", "Dec": "December"};
    dateSuffix = {"1": "st", "2": "nd", "3": "rd"};

    componentDidMount() {
        const [day, month, date, year] = new Date().toDateString().split(' ');
        this.setState(prevState => ({
            ...prevState, date: `Today is ${this.days[day]}, ${this.months[month]}, ${date}${this.dateSuffix[date%10] || "th"} ${year}`}))
    }

    render() {
        return (
            <div className={`${this.state.backgroundClass} mx-auto`}>
                <div className="text-white text-center pt-3">
                    <h1>Start Your Day</h1>
                    <h3>{this.state.date}</h3>
                    <div className="btn-group d-block my-2">
                        {this.views.map(view => (
                            <button className={`btn btn-lg ${this.buttonClasses[this.state.view]} ${this.state.view === view ? 'disabled' : ''}`}
                                    onClick={() => this.setState(prevState => ({...prevState, view, backgroundClass: this.backgroundClasses[view]}))}>
                                {view}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="container-fluid my-4">
                    {this.state.view === "weather" && <WeatherTab />}
                    {this.state.view === "horoscope" && <HoroscopeTab sign={this.state.sign} setSign={(sign) => this.setState(prevState => ({...prevState, sign}))}/>}
                    {this.state.view === "news" && <NewsTab />}
                </div>
            </div>
        );
    }
}
