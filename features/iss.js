const request = require('request');
const wc = require('which-country');
const cc = require('country-code-info');

module.exports = {
    getISS: function(callback) {
        const logPrefix = '[LOG ~ ISS] - ';

        //console.log(`${logPrefix}Sending request to: https://api.wheretheiss.at/v1/satellites/25544`);
        request.get('https://api.wheretheiss.at/v1/satellites/25544', (error, response, body) => {
            if (response.statusCode == 200 && !error) {
                let jsonResponse = JSON.parse(body);

                let lon = parseFloat(jsonResponse.longitude);
                let lat = parseFloat(jsonResponse.latitude);
                let alt = parseFloat(jsonResponse.altitude);
                let vel = parseFloat(jsonResponse.velocity);
                let vis = jsonResponse.visibility;
                let location = wc([lon, lat]);

                if (location == null) {
                    location = "the Oceans";
                }
                else {
                    location = cc.findCountry({a3: location}).name;
                }

                callback([
                    location,
                    lon.toFixed(4),
                    lat.toFixed(4),
                    alt.toFixed(4),
                    vel.toFixed(4),
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