function loadData(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
};

loadData(function(response) {
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
    const weatherDataKeys = Object.keys(jsonData[0]);
    for (var i = 0; i < 5; i++) {
        document.getElementById('weather-display' + (i + 1)).innerHTML += jsonData[0][weatherDataKeys[i]];
    }

    // ISS feature
    const issDataKeys = Object.keys(jsonData[1]);
    for (var i = 0; i < 3; i++) {
        document.getElementById('iss-display' + (i + 1)).innerHTML += jsonData[1][issDataKeys[i]];
    }
});