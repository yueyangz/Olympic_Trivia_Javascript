var express = require('express');
var mysql = require('mysql');
var app = express();

var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var numQuestions = 10

//var $ = require('jquery');
//jQuery(document).ready(function ( $ );
//
var User = require('./app/models/user');
var https = require('https');
var request = require('request');
var path = require('path');
// var auth = require('./config/passport');
var Twit = require('twit');
var config = require('./config/auth');
var tweetHandler = require('./TweetHandler');
const PORT = process.env.PORT || 8080;
var usedQuestions = []

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

app.use(function (req, res, next) {
	if (req.headers['x-forwarded-proto'] === 'https') {
		res.redirect('http://' + req.hostname + req.url);
	} else {
		next();
	}
});

var countries = {"CAN":"Canada","BGR":"Bulgaria","POL":"Poland","NAM":"Namibia","LUX":"Luxembourg","BDI":"Burundi","ECU":"Ecuador","ERI":"Eritrea","GHA":"Ghana","DJI":"Djibouti","CIV":"Cote d'Ivoire","GUY":"Guyana","AFG":"Afghanistan","FRA":"France","AUS":"Australia","RUS":"Russia","SWE":"Sweden","ESP":"Spain","BRA":"Brazil","ITA":"Italy","NLD":"Netherlands","CHN":"China","CUB":"Cuba","JPN":"Japan","HUN":"Hungary","USA":"The United States","DEU":"Germany","GBR":"Great Britain"};



app.use(session({secret: 'anystringoftext',
    saveUninitialized: true,
    resave: true}));

app.get("/easy",function(req,res){

	//
	if(usedQuestions.length == numQuestions){
		usedQuestions = []
	}
	var num = Math.floor(Math.random() * (numQuestions - 0) + 0)
	while(usedQuestions.indexOf(num) != -1){
		num = Math.floor(Math.random() * (numQuestions - 0) + 0)
	}
	usedQuestions.push(num);
	var mysqlConnection = mysql.createConnection({
			  host     : 'localhost',
			  user     : 'root',
			  password : '',
			  database : 'quizdata'
			});
			

	switch(num){
		case 0: 


			var query1='select first_name,last_name,Medal.idAthlete,count(*) as c from Athlete inner join Medal on Athlete.idAthlete = Medal.idAthlete inner join Country on Country.name = Athlete.country where Country.name=? group by Medal.idAthlete order by c desc limit 10;'
			 var countryChoices = ["USA","DEU","GBR"];
			
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
				 var correct = countries[rows[0]['name']]
				 var inc1 = Math.floor(Math.random() * (9 - 2) + 2)
				 var inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc2 == inc1){
					 inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 }
				 var inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc3 == inc2 || inc3 == inc1)
					 inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				var incorrect1 = countries[rows[inc1]['name']]
				var incorrect2 = countries[rows[inc2]['name']]
				var incorrect3 = countries[rows[inc3]['name']]
				 
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
			var query="SELECT  A.first_name, S.name,A.last_name, Count(M.idmedal) AS counts FROM (Event E INNER JOIN Medal M ON E.idEvent=M.idEvent) INNER JOIN Athlete A ON A.idAthlete=M.idAthlete INNER JOIN Sport S on S.idSport=E.idSport WHERE M.year=2008 AND S.name=? GROUP BY A.first_name, A.last_name ORDER  BY counts DESC LIMIT 10;"
			 var yrChoice = ['Athletics','Swimming','Tennis','Basketball'];
			 mysqlConnection.connect();
			 var choice = Math.floor(Math.random() * (4 - 0) + 0)
			 mysqlConnection.query(query,[yrChoice[choice]],function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "In the Sport: "+ yrChoice[choice] + ", what person has the most Olympic medals in 2008\?"
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
			var query="SELECT distinct S.name, count(*) as counts From Event E INNER JOIN Sport S ON E.idSport = S.idSport GROUP BY E.idSport ORDER BY counts DESC limit 10;"
			 mysqlConnection.connect();
			 mysqlConnection.query(query,function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "What sport has the most events in the olympics?"
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
		case 4: 
			var query="select country,count(country) as c from Athlete group by country order by c DESC limit 10;"
			mysqlConnection.connect();
			 mysqlConnection.query(query,function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "What country has had the most athletes in the olympics?"
				 var correct = countries[rows[0]['country']]
				 var inc1 = Math.floor(Math.random() * (9 - 2) + 2)
				 var inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc2 == inc1){
					 inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 }
				 var inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc3 == inc2 || inc3 == inc1)
					 inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				var incorrect1 = countries[rows[inc1]['country']]
				var incorrect2 = countries[rows[inc2]['country']]
				var incorrect3 = countries[rows[inc3]['country']]
				 
				res.status(200).json({"question":question,
						       "correct": correct, 
						     "answer1":incorrect1, 
						     "answer2":incorrect2,
							"answer3":correct,
						     "answer4": incorrect3
				});
			});
			break;
		case 5: 
			var query = 'select first_name,last_name,count(*) as c from Medal M inner join Athlete A on A.idAthlete = M.idAthlete where type="Gold" group by M.idAthlete order by c DESC limit 10;'
			mysqlConnection.connect();
			 mysqlConnection.query(query,function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "Which athlete has won the most gold medals?";
				 var correct = rows[0]['first_name'] + " " + rows[0]['last_name'];
				 var inc1 = Math.floor(Math.random() * (9 - 2) + 2)
				 var inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc2 == inc1){
					 inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 }
				 var inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc3 == inc2 || inc3 == inc1)
					 inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				var incorrect1 = rows[inc1]['first_name'] + " " + rows[inc1]['last_name'];
				var incorrect2 = rows[inc2]['first_name'] + " " + rows[inc2]['last_name'];
				var incorrect3 = rows[inc3]['first_name'] + " " + rows[inc3]['last_name'];
				 
				res.status(200).json({"question":question,
						       "correct": correct, 
						     "answer1":incorrect1, 
						     "answer2":incorrect2,
							"answer3":correct,
						     "answer4": incorrect3
				});
			});
			break;
		case 6: 
			var query='select Distinct M.country from Medal M where M.country not in (select M2.country from Medal M2 where type="Gold");'
			var wrong = ['USA','DEU','CHN','AUS','FRA'];

			mysqlConnection.connect();
			 mysqlConnection.query(query,function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "Which country has never won a gold medal?"
				 var cor = Math.floor(Math.random() * (5 - 0) + 0)
				 var correct = countries[rows[cor]['country']]
				 var inc1 = Math.floor(Math.random() * (4 - 0) + 0)
				 var inc2 = Math.floor(Math.random() * (4 - 0) + 0)
				 while(inc2 == inc1){
					 inc2 = Math.floor(Math.random() * (4 - 0) + 0)
				 }
				 var inc3 = Math.floor(Math.random() * (4 - 0) + 0)
				 while(inc3 == inc2 || inc3 == inc1)
					 inc3 = Math.floor(Math.random() * (4 - 0) + 0)
				var incorrect1 = countries[wrong[inc1]]
				var incorrect2 = countries[wrong[inc2]]
				var incorrect3 = countries[wrong[inc3]]
				 
				res.status(200).json({"question":question,
						       "correct": correct, 
						     "answer1":incorrect1, 
						     "answer2":incorrect2,
							"answer3":correct,
						     "answer4": incorrect3
				});
			});
			break;


		case 7: 

			var question = "Which year is this Olympic game? Hint: consider about the picture quality!"
			var yearArray = ["2000", "2012", "2016"];
			var wrongYears = ["1904", "1916", "1920","1944","1957"];
			var yearIndex = Math.floor(Math.random() * (3 - 0) + 0)
			var correct = yearArray[yearIndex];

			var DynamoURL = "https://ljp36l747c.execute-api.us-east-1.amazonaws.com/jsonpic/"
			var fullURL = DynamoURL + correct
			var done = 1
			var pictureURL = ""
			var dbObject = "";
			var inc1 = Math.floor(Math.random() * (4 - 0) + 0)
			 var inc2 = Math.floor(Math.random() * (4 - 0) + 0)
			 while(inc2 == inc1){
				 inc2 = Math.floor(Math.random() * (4 - 0) + 0)
			 }
			 var inc3 = Math.floor(Math.random() * (4 - 0) + 0)
			 while(inc3 == inc2 || inc3 == inc1)
				 inc3 = Math.floor(Math.random() * (4 - 0) + 0)
			var incorrect1 = wrongYears[inc1]
			var incorrect2 = wrongYears[inc2]
			var incorrect3 = wrongYears[inc3]
			 
		
				var req = https.get(fullURL, function(res2){
				    var body = '';
				    res2.on('data', function(chunk){
					body += chunk;
				    });

				    res2.on('end', function(){
					var response = JSON.parse(body)
					if(response.picPath){
						pictureURL = response.picPath
						res.status(200).json({"question":question,
								"pictureURL": pictureURL, 
						      		"correct": correct, 
						     		"answer1":incorrect1, 
						     		"answer2":incorrect2,
								"answer3":correct,
						     		"answer4": incorrect3
						});
						done = 0;
						return;
	
					}
					
				    });
				}).on('error', function(e){
				      console.log("Got an error: ", e);
				});
				req.end();
				break;

			case 8: 
			var query = "select A.first_name,A.last_name,count(*) as c from Athlete A inner join Medal M on M.idAthlete=A.idAthlete where A.last_name=? group by A.idAthlete LIMIT 1;"
			 var athChoices = ["LOCHTE","BOLT","PHELPS"];
			 mysqlConnection.connect();
			 var choice = Math.floor(Math.random() * (athChoices.length-1));
			 mysqlConnection.query(query,[athChoices[choice]],function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "How many medals does " + rows[0]['first_name'] + " " + rows[0]['last_name'] + " have\?"
				 var correct = rows[0]['c']
				 var inc1 = Math.floor(Math.random() * (9 - 2) + 2)
				 var inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc2 == inc1 || inc2 == correct){
					 inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 }
				 var inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc3 == inc2 || inc3 == inc1 || inc3 == correct)
					 inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				var incorrect1 = inc1
				var incorrect2 = inc2
				var incorrect3 = inc3
				 
				res.status(200).json({"question":question,
						       "correct": correct, 
						     "answer1":incorrect1, 
						     "answer2":incorrect2,
							"answer3":correct,
						     "answer4": incorrect3
				});
			});
			break;
			case 9: 	
				var query = "select M.country,count(*) as count from Medal M group by M.country order by count DESC LIMIT 10;"

			 mysqlConnection.connect();
			 var choice = Math.floor(Math.random() * 9);
			 mysqlConnection.query(query,function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "Which of these countries has the most medals?"
				 var correct = countries[rows[choice]['country']]
				 var inc1 = countries[rows[choice + 1]['country']]
				 var inc2 = countries[rows[choice + 2]['country']]
				 var inc3 = countries[rows[choice + 3]['country']]
				var incorrect1 = inc1
				var incorrect2 = inc2
				var incorrect3 = inc3
				 
				res.status(200).json({"question":question,
						       "correct": correct, 
						     "answer1":incorrect2, 
						     "answer2":incorrect3,
							"answer3":correct,
						     "answer4": incorrect1
				});
			});
			break;
		}

});

app.get("/hard",function(req,res){

	//
	if(usedQuestions.length == numQuestions){
		usedQuestions = []
	}
	var num = Math.floor(Math.random() * (numQuestions - 0) + 0)
	while(usedQuestions.indexOf(num) != -1){
		num = Math.floor(Math.random() * (numQuestions - 0) + 0)
	}
	usedQuestions.push(num);
	var mysqlConnection = mysql.createConnection({
			  host     : 'localhost',
			  user     : 'root',
			  password : '',
			  database : 'quizdata'
			});
			

	switch(num){
		case 0: 


			var query1='select first_name,last_name,Medal.idAthlete,count(*) as c from Athlete inner join Medal on Athlete.idAthlete = Medal.idAthlete inner join Country on Country.name = Athlete.country where Country.name=? group by Medal.idAthlete order by c desc limit 10;'
			var countryChoices = ["AUS","FRA","RUS"];
			
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
			 var yrChoice = ['1988','1980','1964','1956','2000'];
			 mysqlConnection.connect();
			 var choice = Math.floor(Math.random() * (4 - 0) + 0)
			 mysqlConnection.query(query,[yrChoice[choice]],function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "In the year " + yrChoice[choice] + ", what country had the most Olympic medals\?"
				 var correct = countries[rows[0]['name']]
				 var inc1 = Math.floor(Math.random() * (5 - 2) + 2)
				 var inc2 = Math.floor(Math.random() * (5 - 2) + 2)
				 while(inc2 == inc1){
					 inc2 = Math.floor(Math.random() * (5 - 2) + 2)
				 }
				 var inc3 = Math.floor(Math.random() * (5 - 2) + 2)
				 while(inc3 == inc2 || inc3 == inc1)
					 inc3 = Math.floor(Math.random() * (5 - 2) + 2)
				var incorrect1 = countries[rows[inc1]['name']]
				var incorrect2 = countries[rows[inc2]['name']]
				var incorrect3 = countries[rows[inc3]['name']]
				 
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
			 var yrChoice = ['5000m','polo','vault','softball'];
			 mysqlConnection.connect();
			 var choice = Math.floor(Math.random() * (4 - 0) + 0)
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
			var query="SELECT distinct S.name, count(*) as counts From Event E INNER JOIN Sport S ON E.idSport = S.idSport GROUP BY E.idSport ORDER BY counts DESC limit 10;"
			 mysqlConnection.connect();
			 mysqlConnection.query(query,function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "What sport has the most events in the olympics?"
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
		case 4: 
			var query="select country,count(country) as c from Athlete group by country order by c DESC limit 10;"
			mysqlConnection.connect();
			 mysqlConnection.query(query,function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "What country has had the most athletes in the olympics?"
				 var correct = countries[rows[0]['country']]
				 var inc1 = Math.floor(Math.random() * (9 - 2) + 2)
				 var inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc2 == inc1){
					 inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 }
				 var inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc3 == inc2 || inc3 == inc1)
					 inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				var incorrect1 = countries[rows[inc1]['country']]
				var incorrect2 = countries[rows[inc2]['country']]
				var incorrect3 = countries[rows[inc3]['country']]
				 
				res.status(200).json({"question":question,
						       "correct": correct, 
						     "answer1":incorrect1, 
						     "answer2":incorrect2,
							"answer3":correct,
						     "answer4": incorrect3
				});
			});
			break;
		case 5: 
			var query = 'select first_name,last_name,count(*) as c from Medal M inner join Athlete A on A.idAthlete = M.idAthlete where type="Silver" group by M.idAthlete order by c DESC limit 10;'
			mysqlConnection.connect();
			 mysqlConnection.query(query,function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "Which athlete has won the most silver medals?";
				 var correct = rows[0]['first_name'] + " " + rows[0]['last_name'];
				 var inc1 = Math.floor(Math.random() * (9 - 2) + 2)
				 var inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc2 == inc1){
					 inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 }
				 var inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc3 == inc2 || inc3 == inc1)
					 inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				var incorrect1 = rows[inc1]['first_name'] + " " + rows[inc1]['last_name'];
				var incorrect2 = rows[inc2]['first_name'] + " " + rows[inc2]['last_name'];
				var incorrect3 = rows[inc3]['first_name'] + " " + rows[inc3]['last_name'];
				 
				res.status(200).json({"question":question,
						       "correct": correct, 
						     "answer1":incorrect1, 
						     "answer2":incorrect2,
							"answer3":correct,
						     "answer4": incorrect3
				});
			});
			break;
		case 6: 
			var query='select Distinct M.country from Medal M where M.country not in (select M2.country from Medal M2 where M2.type="Bronze");'
			var wrong = ['USA','DEU','CHN','AUS','FRA'];

			mysqlConnection.connect();
			 mysqlConnection.query(query,function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "Which country has never won a bronze medal?"
				 var cor = Math.floor(Math.random() * (4 - 0) + 0)
				 var correct = countries[rows[cor]['country']]
				 var inc1 = Math.floor(Math.random() * (4 - 0) + 0)
				 var inc2 = Math.floor(Math.random() * (4 - 0) + 0)
				 while(inc2 == inc1){
					 inc2 = Math.floor(Math.random() * (4 - 0) + 0)
				 }
				 var inc3 = Math.floor(Math.random() * (4 - 0) + 0)
				 while(inc3 == inc2 || inc3 == inc1)
					 inc3 = Math.floor(Math.random() * (4 - 0) + 0)
				var incorrect1 = countries[wrong[inc1]]
				var incorrect2 = countries[wrong[inc2]]
				var incorrect3 = countries[wrong[inc3]]
				 
				res.status(200).json({"question":question,
						       "correct": correct, 
						     "answer1":incorrect1, 
						     "answer2":incorrect2,
							"answer3":correct,
						     "answer4": incorrect3
				});
			});
			break;


		case 7: 
			var question = "Which year is this Olympic game? Hint: consider about the picture quality!"
			var yearArray = ["1900", "1948", "1953"];
			var wrongYears = ["1904", "1916", "1920","1944","1957"];
			var yearIndex = Math.floor(Math.random() * (3 - 0) + 0)
			var correct = yearArray[yearIndex];

			var DynamoURL = "https://ljp36l747c.execute-api.us-east-1.amazonaws.com/jsonpic/"
			var fullURL = DynamoURL + correct
			var done = 1
			var pictureURL = ""
			var dbObject = "";
			var inc1 = Math.floor(Math.random() * (4 - 0) + 0)
			 var inc2 = Math.floor(Math.random() * (4 - 0) + 0)
			 while(inc2 == inc1){
				 inc2 = Math.floor(Math.random() * (4 - 0) + 0)
			 }
			 var inc3 = Math.floor(Math.random() * (4 - 0) + 0)
			 while(inc3 == inc2 || inc3 == inc1)
				 inc3 = Math.floor(Math.random() * (4 - 0) + 0)
			var incorrect1 = wrongYears[inc1]
			var incorrect2 = wrongYears[inc2]
			var incorrect3 = wrongYears[inc3]
			 
				var req = https.get(fullURL, function(res2){
				    var body = '';
				    res2.on('data', function(chunk){
					body += chunk;
				    });

				    res2.on('end', function(){
					var response = JSON.parse(body)
					if(response.picPath){
						pictureURL = response.picPath
						res.status(200).json({"question":question,
								"pictureURL": pictureURL, 
						      		"correct": correct, 
						     		"answer1":incorrect1, 
						     		"answer2":incorrect2,
								"answer3":correct,
						     		"answer4": incorrect3
						});
						return;
	
					}
					
				    });
				}).on('error', function(e){
				      console.log("Got an error: ", e);
				});
				req.end();
				break;
			case 8: 
			var query = "select A.first_name,A.last_name,count(*) as c from Athlete A inner join Medal M on M.idAthlete=A.idAthlete where A.last_name=? group by A.idAthlete LIMIT 1;"

			 var athChoices = ["SMITH","MARTIN","JOHNSON"];
			
			 mysqlConnection.connect();
			 var choice = Math.floor(Math.random() * (athChoices.length-1));
			 mysqlConnection.query(query,[athChoices[choice]],function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "How many medals does " + rows[0]['first_name'] + " " + rows[0]['last_name'] + " have\?"
				 var correct = rows[0]['c']
				 var inc1 = Math.floor(Math.random() * (9 - 2) + 2)
				 var inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc2 == inc1 || inc2 == correct){
					 inc2 = Math.floor(Math.random() * (9 - 2) + 2)
				 }
				 var inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				 while(inc3 == inc2 || inc3 == inc1 || inc3 == correct)
					 inc3 = Math.floor(Math.random() * (9 - 2) + 2)
				var incorrect1 = inc1
				var incorrect2 = inc2
				var incorrect3 = inc3
				 
				res.status(200).json({"question":question,
						       "correct": correct, 
						     "answer1":incorrect1, 
						     "answer2":incorrect2,
							"answer3":correct,
						     "answer4": incorrect3
				});
			});
			break;

			case 9: 	
				var query = "select M.country,count(*) as count from Medal M group by M.country order by count DESC LIMIT 10;"

			 mysqlConnection.connect();
			 var choice = Math.floor(Math.random() * 9);
			 mysqlConnection.query(query,function(err, rows, fields) {
				 mysqlConnection.end();
				 var question = "Which of these countries has the most medals?"
				 var correct = countries[rows[choice]['country']]
				 var inc1 = countries[rows[choice + 1]['country']]
				 var inc2 = countries[rows[choice + 2]['country']]
				 var inc3 = countries[rows[choice + 3]['country']]
				var incorrect1 = inc1
				var incorrect2 = inc2
				var incorrect3 = inc3
				 
				res.status(200).json({"question":question,
						       "correct": correct, 
						     "answer1":incorrect2, 
						     "answer2":incorrect3,
							"answer3":correct,
						     "answer4": incorrect1
				});
			});
			break;
		}

	});

// require('./config/passport')(passport);
// require('./app/models/user');
// app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
app.use(express.static('public'));

const server = app.listen(PORT, function(){
	console.log("Express server is up on port " + PORT);
});



//Socket.io
var io = require('socket.io').listen(server);


//Twitter
var T = new Twit({
    consumer_key: config.twitter.consumerKey,
    consumer_secret: config.twitter.consumerSecret,
    access_token: config.twitter.accessToken,
    access_token_secret: config.twitter.accessTokenSecret,
})
stream = T.stream('statuses/filter', {track: ['#Archery','#Baseball','#Basketball','#Boxing','#Kayaking','#Cycling','#Diving','#Fencing','#Football','#Handball','#Hockey','#Judo','#Mountain Bike','#Olympics','#Rowing','#Sailing','#Shooting','#Soccer', '#Softball','#Swimming','#Table Tennis','#Taekwondo','#Tennis','#Triathlon','#Volleyball','#Waterpolo','#Weightlifting','#Wrestling'], language:'en'});
stream.on('tweet', function (data) {
    tweetHandler(data, io);
});

var Bing = require('node-bing-api')({accKey: "c9d1eae11c754e3380a178e587b9ee18"});

var bingSearchHandler = require('./BingSearchHandler');

app.get('/search', function (req, res) {
    // res.send('hello world')
    bingSearchHandler(req.query.q, Bing, io);
    res.send();
})



