import React from "react";

var ResultList = React.createClass({
    render() {

        var results = this.props.data.map((result, index) =>
            <li key={index}>
                <h4>
                    <a href={result['url']}>
                        <strong>{result['name']}</strong></a>
                </h4>
                <div className="b_caption">
                    <div className="b_attribution">
                        <cite>{result['displayUrl']}</cite>
                    </div>
                    <p>{result['snippet']}</p>
                </div>
            </li>
        );
        return (
            <div>
                <ul>{results}</ul>
            </div>

        )
    }
});

var BingBox = React.createClass({
    addResult(data){
        this.setState({result: data});
        console.log(this.state.data);
    },
    getInitialState(){
        return {result: []};
    },

    componentDidMount() {
        var socket = io.connect();
        socket.on('searchResult', this.addResult);
    },
    render() {
        return (
            <div>
                <h1 className="text-center">Bing Search Result</h1>
                <ResultList data={this.state.result}/>
            </div>
        )
    }
});

module.exports = BingBox;