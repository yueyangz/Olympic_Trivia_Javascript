var React = require('react');
var {Button} = require('react-bootstrap');
var Alert = require('Alert');
var {Row, Col} = require('react-bootstrap');
// var Button = require('Button');



var DifficultyLevel = React.createClass({

	render: function() {
		if (!this.props.show) {
			return (
				<div>
				</div>
			)
		} else {
			return (
				<div>		
					<h3 className="page-title text-center maxxl">Please select the difficulty level of the game</h3>			
					  <Row>
					  		<Col xs={12} className="text-center">
								<Button onClick={this.props.onEasyClick} className="btn-primary button jumbo-button enabled big-button-font maxl" value="Easy">Easy</Button><br/>	
								<Button onClick={this.props.onHardClick} className="btn-primary button jumbo-button enabled big-button-font maxl" value="Hard">Hard</Button>				    	
					 		</Col>
					  </Row>				
				</div>
		)

		}


	}

});

module.exports = DifficultyLevel;
