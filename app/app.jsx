
// var React = require('react');
var ReactDOM = require('react-dom');
import {Route, Router, IndexRoute, hashHistory} from "react-router";
import React from "react";
import Main from "./components/Main"
import About from "./components/About"
import Quiz from "./components/Quiz"
import TweetBox from "./components/Twitter";
import BingResult from "./components/BingResult"
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

//Load foundation

// require('style!css!foundation-sites/dist/foundation.min.css')
// $(document).foundation();

// require('style!css!sass!applicationStyles')




ReactDOM.render(
	<Router history={hashHistory}> 
		<Route path="/" component={Main}>
			<Route path="about" component={About}/>
			<Route path="twitter" component={TweetBox}/>
			<Route path="bing" component = {BingResult}/>
			<IndexRoute component={Quiz} />
		</Route>	 
	</Router>,
	document.getElementById("my_application")	
);
