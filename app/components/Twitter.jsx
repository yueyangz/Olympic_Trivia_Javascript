import React from "react";

var TweetList = React.createClass({
    render() {
        // var tweets = this.props.data.map(function(tweet, index) {
        var tweets = this.props.data.map((tweet, index) =>
            <li className = "media" key={index}>
                <div className="media">
                    <div className="media-left">
                        <img className="media-object" src={tweet['avatar']} width="80px" height="80px"/>
                    </div>
                    <div className="media-body">
                        <h4 className="media-heading">{tweet['author']}</h4>
                        <p>{tweet['body']}</p>
                    </div>
                </div>
            </li>
        );
        return (
            <div>
                <ul>
                    {tweets}
                </ul>
            </div>
        )
    }
});

var TweetBox = React.createClass({
    addTweet(data) {
        console.log(data['boby']);
        var tweets = this.state.data;
        var newTweets = tweets.concat([data]);
        // console.log(this.state.data);
        if(newTweets.length > 5) {
            newTweets.splice(0, 1);
        }

        this.setState({data: newTweets});
    },
    getInitialState() {
        return {data: []};
    },
    componentDidMount() {
        var socket = io.connect();
        socket.on('tweet', this.addTweet);
    },
    render() {
        return (
            <div>
                <h1 className="page-title text-center">Twitter Stream</h1>

                <TweetList data={this.state.data} />
            </div>
        )
    }
});

module.exports = TweetBox;