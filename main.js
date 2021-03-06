var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    //Memory Cleaning
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //Set names for the arrays of creeps in anygiven role
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Harvesters: ' + harvesters.length + ' Builders: ' + builders.length + ' Upgraders: ' + upgraders.length);

    //Loop that handles seeing how many of each kind of creep there is and then spawning more accordingly also logs to console numbers of each.
    for(var name in Game.rooms) {
      var energyLevel = Game.rooms[name].energyAvailable;

      if(upgraders.length < 2 && (energyLevel > 199)) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
      }
      if(harvesters.length < 4 && (energyLevel > 199)) {
          var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
          console.log('Spawning new harvester: ' + newName);
      }
      if(builders.length < 2 && (energyLevel > 199)) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
      }
      console.log('Room"'+name+'" has '+Game.rooms[name].energyAvailable+'energy'); //Logs to console the amount of energy left.
    }

    //Tells creeps where to look for instructions
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester'){
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader'){
          roleUpgrader.run(creep);
        }
    }
}
