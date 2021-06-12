function send() {
    document.getElementById('output').innerHTML = 'Connecting to Smart Mirror...';
    document.getElementById('loader').style.display = 'block'; // display the loader

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

    try {
        let xobj = new XMLHttpRequest();
        xobj.open('POST',`http://${ip}:${port}/calendar-api`, true);
        xobj.setRequestHeader('Content-Type', 'application/json');
        xobj.onreadystatechange = function() {
            document.getElementById('loader').style.display = 'none'; // hide the loader
            if (xobj.readyState == 4 && xobj.status == '200') {
                document.getElementById('output').innerHTML = xobj.responseText; // Calendar successfully edited.
            } else {
                document.getElementById('output').innerHTML = 'Something went wrong. Unable to connect to Smart Mirror.';
                if (xobj.status != 0) {
                    document.getElementById('output').innerHTML += '<br>Code: ' + xobj.status;
                }
            }
        }

        xobj.send(body);
    } catch (e) {
        if (e instanceof DOMException) {
            document.getElementById('output').innerHTML = 'Invalid Fields. Make sure the IPv4 address and port is valid.';
            document.getElementById('loader').style.display = 'none'; // hide the loader
        }
    }
}


function checkClear() {
    let clearCheckbox = document.getElementById('clearCheckbox');
    let addInputsDiv = document.getElementById('addInputsDiv').getElementsByTagName('*');
    let daysSelect = document.getElementById('days');
    let allOption;
    if (clearCheckbox.checked) {
        for (let i = 0; i < addInputsDiv.length; i++) {
            addInputsDiv[i].style.display = 'none';
        }

        allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.text = 'All';
        daysSelect.appendChild(allOption);
    } else {
        for (let i = 0; i < addInputsDiv.length; i++) {
            addInputsDiv[i].style.display = 'block';
        } 

        daysSelect.removeChild(daysSelect.childNodes[daysSelect.childNodes.length - 1]);
    }
}