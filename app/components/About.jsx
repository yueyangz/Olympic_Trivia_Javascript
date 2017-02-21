import React from "react";

class About extends React.Component{

	render(){
		return (
		<div  className='about-block'>
			<h1 className='text-center page-title'>About Olympic Trivia</h1>
			<ul className='row'>	
					<p className='about-title'> 
						<img src="http://images.wisegeek.com/olympic-medals.jpg" alt="Olympic Medal" height="420" width="420"/>
					</p>
					<p className='about-title'> 
						Basic Features
					</p>	
					<p className='about-p'> 
						This trivia has two difficulty levels: the Easy mode will include countries and events that you tend to be more familiar with, and the Hard mode will test whether you are really into Olympics!
					</p> 
					<p className='about-p'> 
						Each mode has 8 questions in total, and all the questions are dynamically and randomly generated. 
					</p>
					<p className='about-title'> 
						Additional Features
					</p>
					<p className='about-p'> 
						<img src="https://www.mgewholesale.com/img/facebook.png"></img>
						Facebook: you can also log in with your facebook account to record your score or share your score to Facebook.
					</p>
					<p className='about-p'> 
						<img src="http://4.bp.blogspot.com/-F8OVMz2I0zw/VQIseIwrDQI/AAAAAAAAAHI/XkC6Vug-NbU/s1600/50%2Btwitter%2Bicon.png"></img>
						Twitter: Twitter stream data related to Olympics or sports.
					</p>	
			</ul>
		</div>)
	}
}


module.exports = About;
