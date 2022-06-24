// const { response } = require("express");
const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.listen(3002, function(req,res)
{
    console.log("Listening to the port 3002");
});

app.get("/",function(req,res)
{
    res.sendFile(__dirname + "/index.html"); 
});

app.post("/",function(req,res)
{
    cityName = req.body.CityName;
    const query = cityName;
    const unit = "metric";
    const apiid = "568d71551714821b0fd87afae185c0e5";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiid;
    https.get(url,function(response)
    {
        console.log(response.statusCode);
        response.on("data",function(data)
        {
            const weatherinfo = JSON.parse(data);
            // console.log(weatherinfo);
            const temp = weatherinfo.main.temp;
            // console.log(temp);
            
            const desc = weatherinfo.weather[0].description;
            // console.log(desc);

            const icon = weatherinfo.weather[0].icon;
            const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently,"+ desc + ".</p>");
            res.write("<h1>The temperature in "+cityName+" is " + temp +  " degree celsius.</h1>");
            res.write("<img src = " + imgurl + ">");
            res.send();
        })
    })

});

   