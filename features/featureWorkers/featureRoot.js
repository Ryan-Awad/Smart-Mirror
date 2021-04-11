const fs = require('fs');
const {getWeather} = require('../weather');
const {getISS} = require('../iss');
const {getDate} = require('../date');

module.exports = {
    getValues: function(dataPath, callback) {
        getWeather((weatherData) => { 
            getISS((issData) => {
                getDate((dateData) => {
                    fs.readFile(dataPath, (err, fileData) => {
                        if (!err) {
                            var dataJson = JSON.parse(fileData);

                            dataJson[0].temp = weatherData[0];
                            dataJson[0].feels = weatherData[1];
                            dataJson[0].sky = weatherData[2];
                            dataJson[0].wind = weatherData[3];
                            dataJson[0].humidity = weatherData[4];
                            dataJson[0].degreetype = weatherData[5];
                            
                            dataJson[1].location = issData[0];
                            dataJson[1].lon = issData[1];
                            dataJson[1].lat = issData[2];

                            dataJson[2].day = dateData[0];
                            dataJson[2].month = dateData[1];
                            dataJson[2].year = dateData[2];
                            dataJson[2].hours = dateData[3];
                            dataJson[2].minutes = dateData[4];

                            callback(dataJson);
                        }
                        else {
                            console.log(`[DATA FETCH ERROR : ${err}]`);
                        }
                    });
                });
            });
        });
    }
};