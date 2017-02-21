var React = require('react');
var {BoldSectionHeading} = require('Heading');


var QuestionText = React.createClass({

	getDefaultProps: function() {
		return {
			text: 'Hard-coded question: Which country has never hosted Olympics before?'
		}
			
	},


	render: function(){
		return (
			<div>		
				<h3 className='maxxl question'>{this.props.text}</h3>
			</div>	
		)
	}
});

module.exports = QuestionText;
