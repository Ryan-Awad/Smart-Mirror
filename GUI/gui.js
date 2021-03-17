function loadData(path, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
};

updateData();

function loadBasicData(callback) {
    loadData('data/data.json', (response) => {
        var jsonData = JSON.parse(response);

        // Time feature
        var day = jsonData[2].day;
        var month = jsonData[2].month;
        var year = jsonData[2].year;
        var hours = jsonData[2].hours;
        var minutes = jsonData[2].minutes;
        document.getElementById('time-display').innerHTML = hours + ':' + minutes;
        document.getElementById('date-display').innerHTML = year + '-' + month + '-' + day;
        
        // Weather feature
        const weatherSections = ['Temperature', 'Feels Like', 'Sky', 'Wind', 'Humidity'];
        const weatherDataKeys = Object.keys(jsonData[0]);
        for (var i = 0; i < 5; i++) {
            document.getElementById('weather-display' + (i + 1)).innerHTML = weatherSections[i] + ': ' + jsonData[0][weatherDataKeys[i]];
        }

        // ISS feature
        const issSections = ['Flying Over', 'Longitude', 'Latitude'];
        const issDataKeys = Object.keys(jsonData[1]);
        for (var i = 0; i < 3; i++) {
            document.getElementById('iss-display' + (i + 1)).innerHTML = issSections[i] + ': ' + jsonData[1][issDataKeys[i]];
        }

        callback();
    });
}

function loadCalendarData(callback) {
    loadData('data/calendar.json', (response) => {
        var jsonData = JSON.parse(response);

        var days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
        for (var i = 0; i < days.length; i++) {
            if (jsonData[0][days[i]].name != null) {
                document.getElementById('cal-event' + (i + 1)).innerHTML = 'Event: ' + jsonData[0][days[i]].name;
            }
            else {
                document.getElementById('cal-event' + (i + 1)).innerHTML = 'Event: No event';
            }

            if (jsonData[0][days[i]].importance != null) {
                document.getElementById('cal-imp' + (i + 1)).innerHTML = 'Imporance: ' + jsonData[0][days[i]].importance + ' / 3';
            }
            else {
                document.getElementById('cal-imp' + (i + 1)).innerHTML = 'Importance: No importance';
            }
        }

        callback();
    });
}

function updateData() {
    loadBasicData(() => {
        loadCalendarData(() => {
            setTimeout(() => {
                updateData();
            }, 1000);
        });
    })
};