// -s arg to run the server WITHOUT the speech detection module
// -w arg to run the server WITHOUT start up sequence (best for windows and ssh sessions)
const express = require('express');
const cors = require('cors');
const path = require('path');
const {fork, exec} = require('child_process');
const {PythonShell} = require('python-shell');
const {argv} = require('yargs');
const {update} = require('./features/featureWorkers/featureUpdater');
const {parseCalBody} = require('./features/featureWorkers/calendarParser');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/GUI'));

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const dataPath = 'GUI/data/data.json';
app.get('/', (req, res) => { // root dir for the smart mirror's GUI
    res.sendFile(path.join(__dirname + '/GUI/gui.html')); // RENDER GUI
});

app.post('/calendar-api', (req, res) => { // calendar api path
    let body = req.body;
    let cmdLine = parseCalBody(body);
    exec(cmdLine, (err, stdout, stderr) => {
        if (!err) {
            res.send('Calendar successfully edited.');
        } else {
            res.send('There was an error with processing your request body. Make sure it\'s valid.');
            console.log(err);
            console.log(`\nBODY RECEIVED: ${JSON.stringify(body)}`);
        }
    });
}); 

update(dataPath); // starts data updating sequence to keep data live

app.listen(port, () => {
    console.log(`Smart Mirror web server running on http://127.0.0.1:${port}/\n\n`);

    if (!Boolean(argv.s) && argv.s != 0) {
        console.log('Speech recognition module initiating.');
        PythonShell.run('ml_modules/speech_recog.py', null, (err, results) => {
            if (err) console.log(`[ERROR : VOICE RECOGNITION SCRIPT DID NOT START - ${err}]`);
            console.log(results);
        });
    }

    if (!Boolean(argv.w) && argv.w != 0) {
        const startupProcess = fork('./startup.js');
        startupProcess.on('message', (msg) => {
            console.log(msg);
        });
    }
});