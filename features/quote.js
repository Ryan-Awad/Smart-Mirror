const request = require('request');
const fs = require('fs');


module.exports = {
    getQuote: function(callback) {
        fs.readFile('api_keys/quotes', 'UTF8', (err, data) => {
            if (!err) {
                const apiKey = data;

                const options = {
                    method: 'GET',
                    url: 'https://quotes15.p.rapidapi.com/quotes/random/',
                    headers: {
                        'x-rapidapi-key': apiKey,
                        'x-rapidapi-host': 'quotes15.p.rapidapi.com',
                        useQueryString: true
                    }
                };

                request(options, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        const response = JSON.parse(body);
                        
                        const quote = response.content;
                        const author = response.originator.name;
                        
                        callback([
                            quote,
                            author
                        ]);
                    }
                    else {
                        console.log(`[ERROR FETCH QUOTE DATA : ${error}]`);
                        console.log(`RESPONSE CODE : ${response.statusCode}`);
                    }
                });
            }
            else {
                console.log(`[API KEY FETCH ERROR : ${err}]`);
            }
        });
    }
};