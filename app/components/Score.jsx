var React = require('react');

var Score = React.createClass({

	getDefaultProps: function() {
		return {
			score: 0
		}
	},


	componentDidUpdate: function(prevProps, prevState) {
		 
	},

	winningOrNot: function() {
		return `The current score is ${this.props.score}`;
	},

	render: function(){
		var msg = this.winningOrNot();
		return (
			<div>	
				<table>	
					<tbody>
						<tr>
							<td>
								<p>{msg}</p>
							</td>
						</tr>
					</tbody>	
				</table>
			</div>	
		)
	}
});

module.exports = Score;