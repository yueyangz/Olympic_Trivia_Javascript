import React from 'react';
import FacebookLogin from 'react-facebook-login';
import TiSocialFacebookCircular from 'react-icons/lib/fa/facebook-official';
var Div = require('Div');
var {Row, Col, Button} = require('react-bootstrap');
const classNames = require('classnames');


var Facebook = React.createClass({

    getInitialState() {
        return {
            userName: null,
            buttonShow: false
        }
    },


    componentDidMount: function () {
        var button = '<div class="fb-login-button" ' +
            'data-max-rows="1" data-size="large" ' +
            'data-show-faces="false" data-auto-logout-link="true"' +
        'onlogin="this.checkLoginState"' + ' onlogout="this.checkLoginState";</div>';
        var div = document.getElementById('facebook-login-button');
        div.innerHTML=button;

        window.fbAsyncInit = function () {
            FB.init({
                appId: '339495233083294',
                cookie: true,  // enable cookies to allow the server to access
                // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.1' // use version 2.1
            });

            FB.getLoginStatus(function (response) {
                this.statusChangeCallback(response);
            }.bind(this));

            document.getElementById('shareBtn').onclick = function() {
                FB.ui({
                    method: 'share',
                    display: 'popup',
                    href: 'ec2-52-91-195-134.compute-1.amazonaws.com:8080',
                    quote: `Awesome game, I learned so much in Olympic Trivia! Please come take the quiz!`
                }, function(response){});
            }
        }.bind(this);

        // Load the SDK asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    },


// This is called with the results from from FB.getLoginStatus().
    statusChangeCallback: function (response) {
        console.log('statusChangeCallback');
        console.log(response);
        var that = this;
        if (response.status === 'connected') {
            this.setState({buttonShow: true});
            FB.api('/me', function (response) {
                var name = response.name;
                that.setState({userName: name});
                console.log('Successful login for: ' + response.name);})
        } else {
            FB.api('/me', function (response) {
                console.log('Successful logout');})
        }

    },

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
    checkLoginState: function () {
        FB.getLoginStatus(function (response) {
            this.statusChangeCallback(response);
        }.bind(this));
    },



    dynamicClassName: function() {
        return classNames('text-center', 'btn-group-xs',this.state.buttonShow ? 'mtm' : 'mtxl');
    },

    render: function(){
        return (
            <div> 
                <Row className='text-center'>  
                    <Col xs={6}>  
                        <div className={this.dynamicClassName()} id = 'facebook-login-button'></div>
                    </Col>        
                    <Col xs={6}> 
                    </Col> 

                </Row>
                <Row className="text-center">  
                    <Col xs={6}>  
                    <Div show={this.state.buttonShow}>    
                        <Button id="shareBtn" className="btn-primary btn-group-xs mtm mrl fb">Share</Button>
                    </Div>
                    </Col>
                    <Col xs={6}>
                        <Div className='fb' show={this.state.userName !== null}>
                            Hi, {this.state.userName}
                        </Div>  
                    </Col>
                </Row>        

            </div>    

        )
    }

});

module.exports= Facebook;

