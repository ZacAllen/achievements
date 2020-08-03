var express = require('express');
var router = express.Router();
const fs = require('fs');

var activeTime, strongmanMaxROM, thermometerMaxROM, slotmachineMaxROM;
let achievementsRaw = fs.readFileSync('./data/achievements.json');
var achievements = JSON.parse(achievementsRaw);

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  activeTime = req.body.activeTime;
  strongmanMaxROM = req.body.strongmanMaxROM;
  thermometerMaxROM = req.body.thermometerMaxROM;
  slotmachineMaxROM =  req.body.slotmachineMaxROM;
  next();
});
router.get('/', function(req, res, next) {
  res.render('landing.ejs', { title: 'Achievements App', activeTime: activeTime, strongmanMaxROM: strongmanMaxROM, 
  thermometerMaxROM: thermometerMaxROM, slotmachineMaxROM: slotmachineMaxROM, achievements: achievements}, function(err, html) {
    res.send(html);
  });
});

module.exports = router;
