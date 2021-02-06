const express = require('express');
const fs = require('fs');
const path = require('path');

const { getWeather } = require('./features/weather');
const { getISS } = require('./features/iss');

const app = express();
const port = 3000; 

app.use(express.static(__dirname + '/GUI'));

app.get('/', (req, res) => {
    getWeather((weatherData) => { 
        getISS((issData) => {
            fs.readFile('GUI/data.json', (err, fileData) => {
                if (!err) {
                    var dataJson = JSON.parse(fileData);

                    dataJson[0].temp = weatherData[0];
                    dataJson[0].feels = weatherData[1];
                    dataJson[0].sky = weatherData[2];
                    dataJson[0].wind = weatherData[3];
                    dataJson[0].humidity = weatherData[4];
                    
                    dataJson[1].location = issData[0];
                    dataJson[1].lon = issData[1];
                    dataJson[1].lat = issData[2];


                    fs.writeFile('GUI/data.json', JSON.stringify(dataJson), () => {
                        // RENDER GUI
                        res.sendFile(path.join(__dirname + '/GUI/gui.html'));
                    });
                }
                else {
                    console.log(`[DATA FETCH ERROR : ${err}]`);
                }
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Magic Mirror web server running on http://127.0.0.1:${port}/\n\n`);
});