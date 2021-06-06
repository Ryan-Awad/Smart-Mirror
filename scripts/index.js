function send() {
    let ip = document.getElementById('ip').value;
    let port = document.getElementById('port').value;

    let clear = document.getElementById('clearCheckbox').checked;
    let daysMenu = document.getElementById('days');
    let day = daysMenu.options[daysMenu.selectedIndex].value;
    let event = document.getElementById('eventName').value;
    let importance = document.getElementById('importance').value;

    let body = {
        clear: clear,
        day: day
    }

    if (!clear) {
        body.event = event;
        body.importance = parseInt(importance);
    }

    body = JSON.stringify(body);

    let xobj = new XMLHttpRequest();
    xobj.open('POST',`http://${ip}:${port}/calendar-api`, true);
    xobj.setRequestHeader('Content-Type', 'application/json');
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == '200') {
            alert(xobj.responseText); // ** CHANGE THIS **
        }
    }

    xobj.send(body);
}

function checkClear() {
    let clearCheckbox = document.getElementById('clearCheckbox');
    let addInputsDiv = document.getElementById('addInputsDiv').getElementsByTagName("*");
    if (clearCheckbox.checked) {
        for (let i = 0; i < addInputsDiv.length; i++) {
            addInputsDiv[i].style.display = 'none';
        }
    } else {
        for (let i = 0; i < addInputsDiv.length; i++) {
            addInputsDiv[i].style.display = 'block';
        } 
    }
}