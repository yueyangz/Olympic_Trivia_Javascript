var express = require('express');
var mysql = require('mysql');
var app = express();

var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

const PORT = process.env.PORT || 8080;

//make hard variables
var countries = {"USA":"The United States","DEU":"Germany"};
var countryChoices = ["USA","DEU"];




app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(function (req, res, next) {
	if (req.headers['x-forwarded-proto'] === 'https') {
		res.redirect('http://' + req.hostname + req.url);
	} else {
		next();
	}
});




app.use(session({secret: 'anystringoftext',
    saveUninitialized: true,
    resave: true}));

app.get("/stuff",function(req,res){

	//
	var num = Math.floor(Math.random() * (3 - 0) + 0)
	console.log(num);
	var mysqlConnection = mysql.createConnection({
			  host     : 'localhost',
			  user     : 'root',
			  password : '',
			  database : 'quizdata'
			});
			

	switch(num){
		case 0: 
			
			var query1='select first_name,last_name,Medal.idAthlete,count(*) as c from Athlete inner join Medal on Athlete.idAthlete = Medal.idAthlete inner join Country on Country.name = Athlete.country where Country.name=? group by Medal.idAthlete order by c desc limit 10;'
			
			 mysqlConnection.connect();
			 var choice = Math.floor(Math.random() * (countryChoices.length));
			 mysqlConnection.query(query1,[countryChoices[choice]],function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "In the country " + countries[countryChoices[choice]] + ", who has the most Olympic medals\?"
				 var correct = rows[0]['first_name'] + " " + rows[0]['last_name']
				 var inc1 = Math.floor(Math.random() * (9 - 2) + 2)
				 var inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc2 == inc1){
					 inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 }
				 var inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc3 == inc2 || inc3 == inc1)
					 inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				var incorrect1 = rows[inc1]['first_name'] + " " + rows[inc1]['last_name']
				var incorrect2 = rows[inc2]['first_name'] + " " + rows[inc2]['last_name']
				var incorrect3 = rows[inc3]['first_name'] + " " + rows[inc3]['last_name']
				 
				res.status(200).json({"question":question,
						       "correct": correct, 
						     "answer1":incorrect1, 
						     "answer2":incorrect2,
							"answer3":correct,
						     "answer4": incorrect3
				});
			});
			break;
		case 1: 
			 var query="SELECT C.name, Count(M.idmedal) AS counts FROM Synccountry C INNER JOIN Medal M ON C.name = M.country WHERE M.year=? GROUP BY C.name ORDER  BY counts DESC LIMIT 10;"
			 var yrChoice = ['1992','1996','2000','2004','2008'];
			 mysqlConnection.connect();
			 var choice = Math.floor(Math.random() * (4 - 0) + 0)
			 mysqlConnection.query(query,[yrChoice[choice]],function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "In the year " + yrChoice[choice] + ", what country had the most Olympic medals\?"
				 var correct = rows[0]['name']
				 var inc1 = Math.floor(Math.random() * (9 - 2) + 2)
				 var inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc2 == inc1){
					 inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 }
				 var inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc3 == inc2 || inc3 == inc1)
					 inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				var incorrect1 = rows[inc1]['name']
				var incorrect2 = rows[inc2]['name']
				var incorrect3 = rows[inc3]['name']
				 
				res.status(200).json({"question":question,
						       "correct": correct, 
						     "answer1":incorrect1, 
						     "answer2":incorrect2,
							"answer3":correct,
						     "answer4": incorrect3
				});
			});
			break;
		case 2: 
			var query="SELECT  A.first_name, S.name,A.last_name, Count(M.idmedal) AS counts FROM (Event E INNER JOIN Medal M ON E.idEvent=M.idEvent) INNER JOIN Athlete A ON A.idAthlete=M.idAthlete INNER JOIN Sport S on S.idSport=E.idSport WHERE E.name=? GROUP BY A.first_name, A.last_name ORDER  BY counts DESC LIMIT 10;"
			 var yrChoice = ['5000m','polo','vault','baseball'];
			 mysqlConnection.connect();
			 var choice = Math.floor(Math.random() * (4 - 0) + 0)
		 	 console.log(yrChoice[choice]);
			 mysqlConnection.query(query,[yrChoice[choice]],function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "In the Sport-Event: " + rows[0]['name']+ "- "+ yrChoice[choice] + ", what person has the most Olympic medals\?"
				 var correct = rows[0]['first_name'] + " " + rows[0]['last_name']
				 var inc1 = Math.floor(Math.random() * (9 - 2) + 2)
				 var inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc2 == inc1){
					 inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 }
				 var inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc3 == inc2 || inc3 == inc1)
					 inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				var incorrect1 = rows[inc1]['first_name'] + " " + rows[inc1]['last_name']
				var incorrect2 = rows[inc2]['first_name'] + " " + rows[inc2]['last_name']
				var incorrect3 = rows[inc3]['first_name'] + " " + rows[inc3]['last_name']
				 
				res.status(200).json({"question":question,
						       "correct": correct, 
						     "answer1":incorrect1, 
						     "answer2":incorrect2,
							"answer3":correct,
						     "answer4": incorrect3
				});
			});
			break;
		case 3: 
			var query="SELECT  A.first_name, S.name,A.last_name, Count(M.idmedal) AS counts FROM (Event E INNER JOIN Medal M ON E.idEvent=M.idEvent) INNER JOIN Athlete A ON A.idAthlete=M.idAthlete INNER JOIN Sport S on S.idSport=E.idSport WHERE E.name=? GROUP BY A.first_name, A.last_name ORDER  BY counts DESC LIMIT 10;"
			 var yrChoice = ['5000m','polo','vault','baseball'];
			 mysqlConnection.connect();
			 var choice = Math.floor(Math.random() * (4 - 0) + 0)
		 	 console.log(yrChoice[choice]);
			 mysqlConnection.query(query,[yrChoice[choice]],function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "In the Sport-Event: " + rows[0]['name']+ "- "+ yrChoice[choice] + ", what person has the most Olympic medals\?"
				 var correct = rows[0]['first_name'] + " " + rows[0]['last_name']
				 var inc1 = Math.floor(Math.random() * (9 - 2) + 2)
				 var inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc2 == inc1){
					 inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 }
				 var inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc3 == inc2 || inc3 == inc1)
					 inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				var incorrect1 = rows[inc1]['first_name'] + " " + rows[inc1]['last_name']
				var incorrect2 = rows[inc2]['first_name'] + " " + rows[inc2]['last_name']
				var incorrect3 = rows[inc3]['first_name'] + " " + rows[inc3]['last_name']
				 
				res.status(200).json({"question":question,
						       "correct": correct, 
						     "answer1":incorrect1, 
						     "answer2":incorrect2,
							"answer3":correct,
						     "answer4": incorrect3
				});
			});
			break;

	}

	});

require('./config/passport')(passport);
require('./app/models/user');
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
app.use(express.static('public'));

app.listen(PORT, function(){
	console.log("Express server is up on port " + PORT);
});
