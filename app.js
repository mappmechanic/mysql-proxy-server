/*
 * ==================================================
 *            MySQL Proxy Server
 * ==================================================
 * A proxy Middleware Server to mediate MySQL DB Administration using a REST API. The Rest API can be used to build a * Web/Mobile based Administration Console to run Queries.
 * Author: Rahat Khanna
 * Date: 10th December 2013
*/

var express = require('express');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'mobileadmin',
  password : 'mobile@123',
  database : 'sqleditor'
});


// Initialize an Express App & Write Basic Configuration statements
var app = express();
var port = port    = parseInt(process.env.PORT, 10) || 8080;

app.configure(function(){
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


// Default Route in express
app.get("/",function(req,res){
	res.sendfile(__dirname + '/public/help.html');
});

// API Method to Run a Query on a Fixed MySQL Database

// POST {queryText:"your sql query..."}
app.post("/api/runQuery",function(req,res){

	   if(req.body.queryText != undefined) {

	   	   connection.connect();
		   var postedQuery = req.body.queryText;

		   connection.query(postedQuery,function(err,rows,fields)
		   {

		   	// If Error Occurs send details about the error to the server
		   	if (err)
		   		res.send(200,{result:err});
		   	else	
		   		res.send(200,{result:rows});

		  	connection.end();
		   });
		  
	  }else
	  {
	  	res.send({error:101,message:"No queryText parameter found in request body"});
	  }

});


app.listen(port);
console.log("App Server running at http://localhost:8080");