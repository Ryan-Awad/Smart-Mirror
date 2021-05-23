// Run this script with the -s argument to run the server WITHOUT the speech detection module
const express = require('express');
const fs = require('fs');
const path = require('path');
const {fork} = require('child_process');
const {PythonShell} = require('python-shell');
const {argv} = require('yargs');
const {getValues} = require('./features/featureWorkers/featureRoot');
const {update} = require('./features/featureWorkers/featureUpdater');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/GUI'));

const dataPath = 'GUI/data/data.json';
app.get('/', (req, res) => {

    // RENDER GUI
    res.sendFile(path.join(__dirname + '/GUI/gui.html'));
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