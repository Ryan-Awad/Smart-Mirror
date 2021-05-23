function loadData(path, callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
};

updateSpeechData();
updateData();

function loadBasicData(callback) {
    loadData('data/data.json', (response) => {
        if (Boolean(response)) {
            let jsonData = JSON.parse(response);

            // Time feature
            let day = jsonData[2].day;
            let month = jsonData[2].month;
            let year = jsonData[2].year;
            let hours = jsonData[2].hours;
            let minutes = jsonData[2].minutes;
            document.getElementById('time-display').innerHTML = hours + ':' + minutes;
            document.getElementById('date-display').innerHTML = year + '-' + month + '-' + day;
            
            // Weather feature
            jsonData[0]['temp'] += ` °${jsonData[0].degreetype}`;
            jsonData[0]['feels'] += ` °${jsonData[0].degreetype}`;

            const weatherSections = ['Temperature', 'Feels Like', 'Wind', 'Humidity']; // blank item is for the sky
            const weatherDataKeys = Object.keys(jsonData[0]);
            for (let i = 0; i < 4; i++) {
                document.getElementById('weather-display' + (i + 1)).innerHTML = weatherSections[i] + ': ' + jsonData[0][weatherDataKeys[i]];
            }

            document.getElementById('weather-icon').src = jsonData[0]['icon_url'];
            document.getElementById('skytext').innerHTML = jsonData[0]['sky'];

            // ISS feature
            jsonData[1]['lon'] += '°';
            jsonData[1]['lat'] += '°';
            jsonData[1]['alt'] += ' km';
            jsonData[1]['vel'] += ' km/h';

            const issSections = ['Flying Over', 'Longitude', 'Latitude', 'Altitude', 'Velocity', 'Visibility'];
            const issDataKeys = Object.keys(jsonData[1]);
            for (let i = 0; i < 6; i++) {
                document.getElementById('iss-display' + (i + 1)).innerHTML = issSections[i] + ': ' + jsonData[1][issDataKeys[i]];
            }
        }

        callback();
    });
};

function loadCalendarData(callback) {
    loadData('data/calendar.json', (response) => {
        if (Boolean(response)) {
            let jsonData = JSON.parse(response);

            let days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
            for (let i = 0; i < days.length; i++) {
                if (jsonData[0][days[i]].name != null) {
                    document.getElementById('cal-event' + (i + 1)).innerHTML = 'Event: ' + jsonData[0][days[i]].name;
                }
                else {
                    document.getElementById('cal-event' + (i + 1)).innerHTML = 'Event: No event';
                }

                if (jsonData[0][days[i]].importance != null) {
                    document.getElementById('cal-imp' + (i + 1)).innerHTML = 'Importance: ' + jsonData[0][days[i]].importance + ' / 3';
                }
                else {
                    document.getElementById('cal-imp' + (i + 1)).innerHTML = 'Importance: No importance';
                }
            }
        }

        callback();
    });
};

function loadSpeechData(callback) {
    loadData('data/data.json', (response) => {
        if (Boolean(response)) {
            let jsonData = JSON.parse(response);

            // Voice recog feature
            let command = jsonData[3].command;
            let responseLine = jsonData[3].response;
            document.getElementById('command').innerHTML = command;
            document.getElementById('response').innerHTML = responseLine;
        }

        callback();
    });
};

function updateSpeechData() {
    loadSpeechData(() => {
        setTimeout(() => {
            updateSpeechData();
        }, 100);
    });
};

function updateData() {
    loadBasicData(() => {
        loadCalendarData(() => {
            setTimeout(() => {
                updateData();
            }, 100);
        });
    });
};
