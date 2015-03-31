/**
 * Created by k.allakhvierdov on 3/30/2015.
 */
var async = require('async');

var config = require('./../sconfig/index');
var log = require('./../libs/log')(module);
var crypto = require('crypto');
var Time = require('./../libs/time');

var Dbq = require('./../libs/dbq');
var dbq = new Dbq;
var Promise = require('q');
var currentTime = new Time();

function Teams(){
    var self = this;
}

Teams.prototype = {
    getTeams: function(req, res){
        var arrayOrPromises = [dbq.doSet('SELECT * FROM team')];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            console.log(currentTime.getDateTime() + ' ---> Response: Trying to render Teams with ' + {teams: arrayOfResults[0]});
            res.render('teams', {teams: arrayOfResults[0], req: req});
        });
    },

    createTeam: function(req, res, team){
        var input = JSON.parse(JSON.stringify(team));
        var data = {
            title  : input.title
        };
        var arrayOrPromises = [dbq.doSet("INSERT INTO team set ? ",data)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.send('ok');
        });
    },

    deleteTeam: function(req, res, id){
        var arrayOrPromises = [dbq.doSet('DELETE FROM team WHERE id = ?', id)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            console.log(currentTime.getDateTime() + ' ---> Response: Team Deleted');
            res.send('deleted');
        });
    }
}




module.exports = Teams;
//module.exports = Teams.prototype.getTeams();
