const request = require('request');
const wc = require('which-country');
const cc = require('country-code-info');

module.exports = {
    getISS: function(callback) {
        const logPrefix = '[LOG ~ ISS] - ';

        //console.log(`${logPrefix}Sending request to: http://api.open-notify.org/iss-now.json`);
        request.get('http://api.open-notify.org/iss-now.json', (error, response, body) => {
            if (response.statusCode == 200 && !error) {
                let jsonResponse = JSON.parse(body).iss_position;
                let lon = parseFloat(jsonResponse.longitude);
                let lat = parseFloat(jsonResponse.latitude);
                
                let location = wc([lon, lat]);

                if (location == null) {
                    location = "the Oceans";
                }
                else {
                    location = cc.findCountry({a3: location}).name;
                }

                callback([
                    location,
                    lon,
                    lat
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