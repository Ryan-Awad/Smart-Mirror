const express = require('express');
const fs = require('fs');
const path = require('path');
const {getValues} = require('./features/featureWorkers/featureRoot');
const {update} = require('./features/featureWorkers/featureUpdater');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/GUI'));

let dataPath = 'GUI/data/data.json';
app.get('/', (req, res) => {
    getValues(dataPath, (jsonData) => {
        fs.writeFile(dataPath, JSON.stringify(jsonData), () => {
            // RENDER GUI
            res.sendFile(path.join(__dirname + '/GUI/gui.html'));
        });
    });
});

update(dataPath); // starts data updating sequence to keep data live

app.listen(port, () => {
    console.log(`Smart Mirror web server running on http://127.0.0.1:${port}/\n\n`);
});