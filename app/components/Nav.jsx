import React from "react";
const http = require('http');
import {Link, IndexLink} from "react-router";
import {Button} from "react-bootstrap";
import {Row, Col} from "react-bootstrap";
var Facebook = require("./Facebook");
import {browserHistory} from 'react-router';




class Nav extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.sendSearchRequest = this.sendSearchRequest.bind(this);
    };

    sendSearchRequest(){
        var options = {
            port: 8080,
            hostname: 'localhost',
            method: 'GET',
            path: "/search" + "?q=" + document.getElementById('searchKey').value
        };

        var req = http.request((options),(res) => {
            // console.log('statusCode:', res.statusCode);
            this.context.router.replace('bing');
        });

        req.end();
        // console.log('send request: ' + options['path']);

    }
    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className='container-fluid'>
                    <div className="collapse navbar-collapse">
                        <Col xs={6}>
                        <ul className="nav navbar-nav">
                            <li className="left-45px"><img src="http://democraticfuture.org/wp-content/uploads/2015/03/trivia.jpg"
                                     width="150px" height="80px"/></li>
                            <li className="left-45px bold"><Link to="/" className="nav-item">Play!</Link></li>
                            <li className="left-45px bold"><Link to="about" className="nav-item">About</Link></li>
                            <li className="left-45px bold"><Link to="twitter" className="nav-item">Twitter Stream</Link></li>
                        </ul>
                        </Col>

                        <Col xs={6}>
                        <Col xs={8}>
                        <form className="navbar-form navbar-right">
                            <div className="form-group">
                                <input type="text" name='q' className="form-control nav-item mtm mbm mrm bold" id='searchKey'
                                       placeholder="Search by Bing"/>
                            </div>
                            <Button type='submit' className='btn-primary mtm mbm bold' value='Cheat'
                            onClick={this.sendSearchRequest}>Search</Button>
                        </form>
                        </Col>

                        <Col xs={4}>
                            <Facebook/>
                        </Col>
                            
                        </Col>  
                    </div>
                </div>
            </nav>
        );
    }
}
Nav.contextTypes = {
    router: React.PropTypes.object.isRequired
}
module.exports = Nav;
