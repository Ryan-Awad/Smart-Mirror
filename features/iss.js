const request = require('request');
const wc = require('which-country');
const cc = require('country-code-info');

module.exports = {
    getISS: function(callback) {
        const logPrefix = '[LOG ~ ISS] - ';

        //console.log(`${logPrefix}Sending request to: https://api.wheretheiss.at/v1/satellites/25544&units=kilometers`);
        request.get('https://api.wheretheiss.at/v1/satellites/25544&units=kilometers', (error, response, body) => {
            if (response.statusCode == 200 && !error) {
                let jsonResponse = JSON.parse(body);
                
                // ** LOOK INTO ADDING AN IFRAME TO A MAP WITH LON AND LAT **
                let lon = parseFloat(jsonResponse.longitude).toFixed(4);
                let lat = parseFloat(jsonResponse.latitude).toFixed(4);
                let alt = parseFloat(jsonResponse.altitude).toFixed(2); // m
                let vel = parseFloat(jsonResponse.velocity).toFixed(3); // km/h
                let vis = jsonResponse.visibility;
                let location = wc([lon, lat]);
                vis = vis.charAt(0).toUpperCase() + vis.slice(1);

                if (location == null) {
                    location = "the Oceans";
                }
                else {
                    location = cc.findCountry({a3: location}).name;
                }

                callback([
                    location,
                    lon,
                    lat,
                    alt,
                    vel,
                    vis
                ]);
            }
            else {
                // ADD A WAY TO DISPLAY ON THE MIRROR THAT THERE WAS AN ERROR
                console.log(`[Error : ${error}]`);
                console.log(`Status Code: ${response.statusCode}`);
            }
        });
    }
};