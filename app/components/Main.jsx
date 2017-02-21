// var React = require('react');
var Nav = require('Nav');
var http = require('http');
var url = 'http://ec2-52-91-195-134.compute-1.amazonaws.com:8080/stuff';
import React from "react";
// var url ='localhost:8080/stuff';

class Main extends React.Component
{



    render (){
        var children = React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, {
                data: 'http://ec2-52-91-195-134.compute-1.amazonaws.com:8080/stuff'
            })
        });

        return (
			<div>
				<Nav />
				<div>
                    {children}
				</div>
			</div>
        )
    }
}

module.exports=Main;
