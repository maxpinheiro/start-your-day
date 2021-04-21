import React from 'react';

export default class NewsTab extends React.Component {
    state = {
        articles: [{
            title: "",
            url: "",
            date: ""
        }]
    };


    componentDidMount() {
        this.loadNews();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.sign !== this.props.sign) this.loadHoroscope(this.props.sign || "Capricorn");
    }

    loadNews() {
        fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=d889355982654972aed66bb7aa9bf9b4').then(res => res.json().then(data => {
            if (!data["articles"]) return;
            this.setState(prevState => (
                {
                    articles: data["articles"].slice(0, 10).map(article => {
                        const date = new Date(article["publishedAt"]);
                        return {
                            title: article["title"],
                            url: article["url"],
                            date: `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`
                        };
                    }
                    )
                }));
        }))
    }

    render() {
        return (
            <div className="news-container mx-auto text-center text-dark" id="news-content">
                <h4 className="text-center">Today's Headlines in the US:</h4>
                <div className="border-top-white pt-3 mx-auto d-block">
                    {   this.state.articles.length > 1 ?
                        (this.state.articles.map(article => (
                        <div className="">
                            <a href={article.url || '#'} className="text-dark ">
                                <p className="headline">{article.title && `${article.title} - ${article.date}`}</p>
                            </a>
                        </div>))) :
                        <p>Sorry, it seems like the news cannot be loaded now, likely because the API has exhausted its daily request limit. Try again later :(</p>
                    }
                </div>
            </div>
        );
    }
}