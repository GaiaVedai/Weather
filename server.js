var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var requestModule = require('request');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(express.static('node_modules'));


app.get('/weather/:cityName', function (req, res) {
   let cityName = req.params.cityName
    requestModule('http://api.apixu.com/v1/current.json?key=db0d77d4d01445f4bd7105144181908&q=' + cityName, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        console.log(body) // Shows the HTML for the EA homepage. 
        res.send(body)
        }
    })
  
})


app.listen(8000,function(){
    console.log('xxx')
});