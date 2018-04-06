var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("search");
})

app.get("/weather", function(req, res){
    var query = req.query.search;
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + query + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    request(url, function(error, response, body){
        if (!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("weather", {data: data});
        }
    });
});

app.listen(3000, function(){
    console.log("Server has started");
});