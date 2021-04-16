import React from 'react';

export default class HoroscopeTab extends React.Component {
    state = {
        sign: "",
        description: "",
        mood: "",
        color: "",
        number: "",
        time: "",
    };

    signs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];

    componentDidMount() {
        if (this.props.sign) {this.signs.splice(this.signs.indexOf(this.props.sign),1); this.signs.splice(0, 0, this.props.sign);}
        this.loadHoroscope(this.props.sign || "Capricorn");
    }

    loadHoroscope(sign) {
        fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, {
            method: 'POST',
        }).then(res => res.json().then(data => {
            this.setState(prevState => (
                {...prevState,
                    sign,
                    description: data['description'],
                    mood: data['mood'],
                    color: data['color'],
                    number: data['lucky_number'],
                    time: data['lucky_time'],
                }));
        }));
    }

    render() {
        return (
            <div className="horoscope-container row mx-auto justify-content-center text-center text-white" id="horoscope-content">
                <h4 className="comfortaa">Today's Horoscope for {this.state.sign}:</h4>
                <div className="border-top-white pt-3 mx-auto d-block">
                    <p className="comfortaa">{this.state.description}</p>
                    <span>
                        <label className="comfortaa" for="sign">Zodiac Sun Sign:</label>
                        <select id="sign" name="sign">
                            {this.signs.map(s => <option value={s} onClick={() => this.props.setSign(s)}>{s}</option>)}
                        </select>
                    </span>
                    <div className="comfortaa">
                        <p>{this.state.mood && `Mood: ${this.state.mood}`}</p>
                        <p>{this.state.color && `Color: ${this.state.color}`}</p>
                        <p>{this.state.number && `Lucky Number: ${this.state.number}`}</p>
                        <p>{this.state.time && `Lucky Time: ${this.state.time}`}</p>
                    </div>
                </div>
            </div>
        );
    }
}