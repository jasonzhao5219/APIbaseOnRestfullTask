var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static( __dirname + '/restfulAngularApp/dist' ));
// Setting our Views Folder Directory
// app.set('views', path.join(__dirname, './views'));
// // Setting our View Engine set to EJS
// app.set('view engine', 'ejs');
// Routes
// Root Request
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
var Schema = mongoose.Schema;
var restfulltaskSchema = new mongoose.Schema({
 title: {type:String,required:true},
 description:{type:String,default:""},
 completed:{type:Boolean,default:false}

 
 
},{timestamps:true});

mongoose.model('Task', restfulltaskSchema); // We are setting this Schema in our Models as 'User'
var Task = mongoose.model('Task');

app.get('/tasks', function(req, res){
	Task.find({}, function(err, results) {
         //console.log(results);
        res.json(results);
       //console.log("find something in database"+passquotes);
      })
  //res.json({message: "Success", data: {}});
})    
//var PersonArray = [];
app.post('/new/', function(req, res){

	// console.log("may i be here?");
	// console.log("what is req.params.name : "+req.params.name);
  	var task = new Task({title:req.body.title,description:req.body.description,completed:req.body.completed});
  	//PersonArray.push(Person);
	
	 task.save(function(err) {
  
    if(err) {
      console.log('something went wrong');
      // res.json({message: "error exist", data: {}});
    } else { 
      
      console.log('successfully added a user!');
 	//res.json(PersonArray);
 	 Task.find({}, function(err, results) {
         //console.log(results);
        res.json(results);
       //console.log("find something in database"+passquotes);
      })
	}
})
	
}) 
//remove
app.get('/remove/:_id/', function(req, res){

  Task.remove({_id:req.params._id}, function(err){
		   if(err) {
      console.log('something went wrong');
      // res.render('validation', {errors: quoteTwo.errors});
    	} else { 
      
     		 console.log('successfully Delete a user!');
 			
		}
	})
  Task.find({}, function(err, results) {
         //console.log(results);
        res.json(results);
       //console.log("find something in database"+passquotes);
      })
})  
app.get('/:_id', function(req, res){
	Task.findOne({_id:req.params._id}, function(err, results) {
         //console.log(results);
        res.json(results);
       //console.log("find something in database"+passquotes);
      })
  //res.json({message: "Success", data: {}});
})    
app.put('/:_id',function(req,res){
	Task.update({_id:req.params._id},{title:req.body.title,description:req.body.description,completed:req.body.completed},function(err,results){
		   if(err) {
      console.log('something went wrong');
      // res.render('validation', {errors: quoteTwo.errors});
    	} else { 
      
     		 console.log('successfully Delete a user!');
 			res.json(results);
		}
	})

})

app.listen(8000, function() {
    console.log("listening on port 8000");
})