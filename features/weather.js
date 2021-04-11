// API URL EXAMPLE: http://weather.service.msn.com/find.aspx?src=outlook&weadegreetype=F&culture=en-US&weasearchstr=San%20Franscisco,%20California
const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    getWeather: function(callback) {
        const logPrefix = '[LOG ~ WEATHER] - ';

        const degreeType = 'C';
        const culture = 'en-US';
        const locationQuery = 'Ontario, Canada';

        const baseUrl = 'http://weather.service.msn.com/find.aspx?src=outlook';
        const urlParams = `&weadegreetype=${degreeType}&culture=${culture}&weasearchstr=${locationQuery}`;
        const url = baseUrl + urlParams;
        //console.log(`${logPrefix}Sending request to: ${url}`);

        var currentTemp;
        var currentFeels;
        var currentSky;
        var currentWind;
        var currentHumidity;

        request.get(url, (error, response, body) => {
            if (response.statusCode == 200 && !error) {
                let $ = cheerio.load(body);

                currentTemp = $('current').attr('temperature');
                currentFeels = $('current').attr('feelslike');
                currentSky = $('current').attr('skytext');
                currentWind = $('current').attr('winddisplay');
                currentHumidity = $('current').attr('humidity') + '%';

                callback([
                    currentTemp,
                    currentFeels,
                    currentSky,
                    currentWind,
                    currentHumidity,
                    degreeType.toUpperCase()
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