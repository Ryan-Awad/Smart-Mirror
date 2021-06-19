const fs = require('fs');
const {argv} = require('yargs')
    .option('d', {
        alias: 'day',
        describe: 'Define the day of the event',
        type: 'string',
        nargs: 1
    })
    .option('n', {
        alias: 'name',
        describe: 'Define the name of the event',
        type: 'string',
        nargs: 1
    })
    .option('i', {
        alias: 'importance',
        describe: 'Define the importance of an event. [1-3]',
        type: 'number',
        nargs: 1
    })
    .option('c', {
        alias: 'clear',
        describe: 'Set argument to the day you want to clear of event. Set to "all" to clear all days in the week.',
        type: 'string',
        nargs: 1
    })
    .option('p', {
        alias: 'path',
        describe: 'Set a specific path to execute this from. (Not recommended unless you are a developper)',
        type: 'string',
        nargs: 1
    });

var path = argv.p;
if (path == undefined) {
    path = 'GUI/data/calendar.json'
}

var clearArg = argv.c;
if (typeof clearArg == 'string') {
    clearArg = clearArg.toLowerCase();
    if (clearArg == 'all') {
        fs.readFile(path, (err, data) => {
            if (!err) {
                var weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
                var jsonData = JSON.parse(data);
                for (var i = 0; i < weekDays.length; i++) {
                    jsonData[0][weekDays[i]].name = null;
                    jsonData[0][weekDays[i]].importance = null;
                }
        
                fs.writeFile(path, JSON.stringify(jsonData), (err) => {
                    if (err) {
                        console.log(`[ERROR WRITING TO CALENDAR : ${err}`);
                    }
                });
            } else {
                console.log(`[CALENDAR DATA FETCH ERROR : ${err}]`);
            }
        });
        
        console.log('Successfully cleared all days.');
    } else {
        fs.readFile(path, (err, data) => {
            if (!err) {
                var jsonData = JSON.parse(data);
                jsonData[0][clearArg].name = null;
                jsonData[0][clearArg].importance = null;
        
                fs.writeFile(path, JSON.stringify(jsonData), (err) => {
                    if (err) {
                        console.log(`[ERROR WRITING TO CALENDAR : ${err}`);
                    }
                });
            } else {
                console.log(`[CALENDAR DATA FETCH ERROR : ${err}]`);
            }
        });

        console.log('Successfully cleared event for selected day.');
    }
} else {
    var day = argv.d.toLowerCase();
    var eventName = argv.n;
    var importance;
    if (typeof eventName == 'string' && typeof day == 'string') {
        if (typeof argv.i == 'number' && argv.i >= 1 && argv.i <= 3) {
            importance = argv.i;
        }
        else if (argv.i != undefined) {
            console.log("Warning: Your importance needs to be between 1-3. Your importance value was set to null.");
        }
        
        fs.readFile(path, (err, data) => {
            if (!err) {
                var jsonData = JSON.parse(data);
                jsonData[0][day].name = eventName;
                if (importance == undefined) {
                    jsonData[0][day].importance = null;
                } else {
                    jsonData[0][day].importance = importance;
                }
        
                fs.writeFile(path, JSON.stringify(jsonData), (err) => {
                    if (err) {
                        console.log(`[ERROR WRITING TO CALENDAR : ${err}`);
                    } else {
                        console.log('Successfully added event to calendar.');
                    }
                });
            } else {
                console.log(`[CALENDAR DATA FETCH ERROR : ${err}]`);
            }
        });
    } else {
        console.log('Error! You forgot to specify an event name or a day for the event.\nTry "node edit-calendar.js --help" for more information.');
    }
}