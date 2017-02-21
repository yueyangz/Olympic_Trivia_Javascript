var React = require('react');

var ChoiceText = React.createClass({

	getDefaultProps: function() {
		text: 'Default choice text'	
	},

	render: function(){
		return (
			<div>		
				{this.props.text}
			</div>	
		)
	}
});

module.exports = ChoiceText;