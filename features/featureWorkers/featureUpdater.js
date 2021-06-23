const fs = require('fs');
const {getValues} = require('./featureRoot');

module.exports = {
    // not the most efficient solution. work on a cleaner and more efficient solution!
    update: function(dataPath) {
        getValues(dataPath, (jsonData) => {
            fs.writeFile(dataPath, JSON.stringify(jsonData), () => {
                setTimeout(() => {
                    module.exports.update(dataPath);
                }, 4000); // updates the data every 4 seconds
            });
        });
    }
};