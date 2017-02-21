var React = require('react');
var Question = require('Question');
var DifficultyLevel = require('DifficultyLevel');
var $ = require('jquery');

var Quiz = React.createClass({

	getInitialState: function() {
		return {
			difficultyLevel: "easy",
			shouldQuestionShow: false,
			shouldDifficultyshow: true,
			data: null
		}
	},

	handleEasyClick: function(e) {
             	console.log("Handling easy click");
                var self = this;
                this.setState({difficultyLevel: "easy", shouldQuestionShow: true, shouldDifficultyshow: false});
                /*this.setState({difficultyLevel: "easy"}, () => {
                 $.ajax({
                      url: "http://ec2-52-91-195-134.compute-1.amazonaws.com:8080/easy",
                      dataType: 'json',
                      cache: false,
                      success: function(data) {
                        debugger
                        self.setState({data: data});
                      }.bind(this),
                      error: function(xhr, status, err) {
                        console.error(this.props.url, status, err.toString(), 'ERROR FUCK');
                        debugger
                      }.bind(this)
             		 });
                });*/
	},
	handleHardClick: function(e) {
             	console.log("Handling hard click");
                var self = this;
                this.setState({difficultyLevel: "hard", shouldQuestionShow: true, shouldDifficultyshow: false});
		/*
                this.setState({difficultyLevel: "hard"}, () => {
                 $.ajax({
                      url: "http://ec2-52-91-195-134.compute-1.amazonaws.com:8080/hard",
                      dataType: 'json',
                      cache: false,
                      success: function(data) {
                        debugger
                        self.setState({data: data});
                      }.bind(this),
                      error: function(xhr, status, err) {
                        console.error(this.props.url, status, err.toString(), 'ERROR FUCK');
                        debugger
                      }.bind(this)
             		 });
                });
               this.setState({shouldQuestionShow: true, shouldDifficultyshow: false});
		*/
	},


	componentDidUpdate: function() {

	},


	handleSubmit: function(e) {
		console.log("HANDLING SUBMIT!!!!");
		var level = e.currentTarget.value;
		/*var self = this;
			$.ajax({
		      url: "http://ec2-52-91-195-134.compute-1.amazonaws.com:8080/stuff",
		      dataType: 'json',
		      cache: false,
		      success: function(data) {
		      	//console.log(`${url} here you are`);
		      	console.log(data);
		        self.setState({data: data});
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString(), 'ERROR FUCK');
		        debugger
		      }.bind(this)
		    });*/
		this.setState({difficultyLevel: level, shouldQuestionShow: true, shouldDifficultyshow: false});
		this.render();
	},


	render: function() {
		console.log(`You selected ${this.state.difficultyLevel}!`);
		var children = React.Children.map(this.props.children, function (child) {
    		return React.cloneElement(child, {
      			data: this.state.data
    		})
  		});
  		
		return (
			<div>
				<DifficultyLevel show={this.state.shouldDifficultyshow} onEasyClick={this.handleEasyClick}  onHardClick={this.handleHardClick} text={this.state.difficultyLevel}/>
				<Question show={this.state.shouldQuestionShow} onClick={this.handleSubmit} data={this.state.data} level={this.state.difficultyLevel}/>

			</div>
		)

	}

});

module.exports = Quiz;
