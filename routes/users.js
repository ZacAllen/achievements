var express = require('express');
var router = express.Router();
const fs = require('fs');
const csv = require('csv-parser')


var filePath; 


router.post('/', async (req, res) => {
  // getData(req.body.userURL); 
  filePath = './data/' + req.body.userURL;
  const response = await getData(filePath);
  res.send(response);
});

async function getData(file) {
  return new Promise (function(resolve, reject) {
    var activeTimeList = [];
    var strongmanROMList = [];
    var thermometerROMList = [];
    var slotmachineROMList = [];
    fs.createReadStream(file)

    .pipe(csv({separator: '|'}))
    .on('data', (row) => {
        // use row data
        console.log(activeTimeList)
        activeTimeList.push(row.active_time);
        strongmanROMList.push(row.Strongman_rom_max);
        thermometerROMList.push(row.Thermometer_rom_max);
        slotmachineROMList.push(row.SlotMachine_rom_max);

    })

    .on('end', () => {
        var activeTimeMax = Math.round(Math.max.apply(null, activeTimeList));
        var strongmanMax = Math.round(Math.max.apply(null, strongmanROMList));
        var thermometerMax = Math.round(Math.max.apply(null, thermometerROMList));
        var slotmachineMax = Math.round(Math.max.apply(null, slotmachineROMList));

        var dataObj = {activeTime: activeTimeMax, strongmanMaxROM: strongmanMax, 
          thermometerMaxROM: thermometerMax, slotmachineMaxROM: slotmachineMax}

        console.log(dataObj.activeTime)  
        resolve(dataObj);
    })
    .on('error', reject)
  }); 
} 

module.exports = router;
