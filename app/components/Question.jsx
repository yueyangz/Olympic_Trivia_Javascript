var React = require('react');
var ChoiceText = require('ChoiceText');
var QuestionText = require('QuestionText');
var {Button} = require('react-bootstrap');
var $ = require('jquery');
var {Row, Col} = require('react-bootstrap');
var Alert = require('Alert');
var Div = require('Div');
var axios = require('axios');
require("!style-loader!css-loader!sass-loader!../styles/app.scss");


var Question = React.createClass({


		getDefaultProps: function() {
			return {
				data: {},
				show: false
			}		
		},

		getInitialState: function() {
			return {
				choice: '',
				questionCount: 0,
				score: 0,
				alert: null,
				alertType: '',
				resultText: '',
				difficulty: "easy",
				buttonShow: true,
				resultShow: false,
				data: null
			}
		},

		handleSubmit: function(e) {
			e.preventDefault();
			var value = this.state.choice;
			if (value === this.state.data.correct) {
				this.setState({score: this.state.score + 1, alert: "You got it right!", alertType: "success"});
				this.displayAlert();
			} else {
				this.setState({alert: "You are so wrong!", alertType: "error"});
				// this.displayAlert();
			}
		//	if (this.state.questionCount == 10) {
		//		var string = `You got ${this.state.score} out of ${this.state.questionCount + 1} questions correct!`;
		//		this.setState({alert: `Game over!`, resultShow: true, alertType: 'info', buttonShow: false, resultText: string});
				// this.displayAlert();	
		//		return;
		//	}

			
		},


		handleChange: function(e) {
			this.setState({choice: e.currentTarget.value});
		},

		componentWillMount() {
			 var self = this;
			 $.ajax({
		       url: `http://ec2-52-91-195-134.compute-1.amazonaws.com:8080/${self.props.level}`,
		       dataType: 'json',
		       cache: false,
		       success: function(data) {
		       	//console.log(`${url} here you are`);
		         self.setState({data: data});
		       }.bind(this),
		       error: function(xhr, status, err) {
		         console.error(this.props.url, status, err.toString(), 'ERROR');
		       }.bind(this)
		     });
		},

		componentDidMount() {
			console.log('Component Did Mount');
		},

		loadNewQuestion: function() {
		    var self = this;
			$.ajax({
		      url: `http://ec2-52-91-195-134.compute-1.amazonaws.com:8080/${this.props.level}`,
		      dataType: 'json',
		      cache: false,
		      success: function(data) {
		      	//console.log(`${url} here you are`);
		        self.setState({data: data, questionCount: self.state.questionCount + 1});
		        if (this.state.questionCount == 7) {
                                 var string = `You got ${this.state.score} out of ${this.state.questionCount + 1} questions correct!`;
                                 this.setState({alert: `Game over!`, resultShow: true, alertType: 'info', buttonShow: false, resultText: string});

                                return;
                     	 }
			 console.log(`got new data! and questionCount${self.state.questionCount}`);
		      }.bind(this),
		      error: function(xhr, status, err) {
		        //console.log(err);
		      }.bind(this)
		    });
		},
		render: function() {
			if (!this.props.show) {
				return (
					<div>
					</div>
				)
			} else {
				// var fakedata = {'question': 'blablabla', 'answer1': 'dasdasdasdasdas', 'answer2': 'sdasdasda', 'answer3': 'asdsadsadas', 'answer4': 'sasdasas', 'correct': 'sasdasas'}; 
				// this.setState({data: fakedata})
				var questionData = this.state.data;
			//	if (questionData === null) return (<p>this.state.data is null!!!</p>)
				var that = this;
				return (
					<div>	
					     <Div show={this.state.questionCount < 7}>
						<form className="text-center" onSubmit={this.handleSubmit}>
							<QuestionText text={questionData.question}/>
									<img className="text-center" src={this.state.data.pictureURL}/>
									<Row className="text-align mal">
									   <Col xs={7}>	
										<input type="radio" className="choice" name={questionData.answer1} value={questionData.answer1} checked={that.state.choice === questionData.answer1} onChange={that.handleChange}/>
								       </Col>
									   <Col xs={4}>	
										<label className="choice text-left" for={questionData.answer1}>{questionData.answer1}</label>	
									   </Col>
									</Row>
									<Row className="text-align mal">
									   <Col xs={7}>	
										<input type="radio" className="choice" name={questionData.answer2} value={questionData.answer2} checked={that.state.choice === questionData.answer2} onChange={that.handleChange}/>
								       </Col>
									   <Col xs={4}>	
										<label className="choice text-left" for={questionData.answer2}>{questionData.answer2}</label>	
									   </Col>
									</Row>										
									<Row className="text-align mal">
									   <Col xs={7}>	
										<input type="radio" className="choice" name={questionData.answer3} value={questionData.answer3} checked={that.state.choice === questionData.answer3} onChange={that.handleChange}/>
								       </Col>
									   <Col xs={4}>	
										<label className="choice text-left" for={questionData.answer3}>{questionData.answer3}</label>	
									   </Col>									
									</Row>										
									<Row className="text-align mal">
									   <Col xs={7}>	
										<input type="radio" className="choice" name={questionData.answer4} value={questionData.answer4} checked={that.state.choice === questionData.answer4} onChange={that.handleChange}/>
								       </Col>
									   <Col xs={4}>	
										<label className="choice text-left" for={questionData.answer4}>{questionData.answer4}</label>	
									   </Col>									
									</Row>							
							<Div show={this.state.buttonShow}>
								<Button type="submit" name="submit" className='btn-primary maxl button big-button-font jumbo-button enabled' value="Submit" 
											onClick={this.loadNewQuestion} id="submit_button">Submit</Button>		
							</Div>
						</form>
						</Div>
						<Alert className='mal pal alert' message={this.state.alert} type={this.state.alertType} afterFadeOut={()=>this.setState({alert: null, alertType: ''})}/>
						<Div show={!this.state.resultShow}>
							<h1 className="mtxxl text-center">The current score is {this.state.score}</h1>
						</Div>	
						<Div show={this.state.resultShow}>
							<h1 className="mtxxl text-center">{this.state.resultText}</h1>
						</Div>	
					</div>	
				)

			}

		}
});

module.exports = Question;
