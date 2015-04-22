/**
 * Created by Konstantin on 4/21/2015.
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

function Defects(){
    var self = this;
}

Defects.prototype = {
    postDefect: function(req, res){
        req.body.rid = req.session.user;
        var arrayOrPromises = [dbq.doSet("INSERT INTO defect set ? ",req.body)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.type("text/json");
            res.send(arrayOfResults[0]);
        });
    },

    getDefects: function (req, res) {
        console.log('getting info');
        var arrayOrPromises = [
            dbq.doSet('SELECT * FROM defect'),
            dbq.doSet('SELECT * FROM defect_status'),
            dbq.doSet('SELECT * FROM defect_severity'),
            dbq.doSet('SELECT * FROM defect_type'),
            dbq.doSet('SELECT * FROM user'),
            dbq.doSet('SELECT * FROM feature')
        ];

        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.type("text/json");
            res.send({
                defect: arrayOfResults[0],
                defect_status: arrayOfResults[1],
                defect_severity: arrayOfResults[2],
                defect_type: arrayOfResults[3],
                user: arrayOfResults[4],
                feature: arrayOfResults[5],
                currentUser: req.session.user
            });
        });
    }
}


module.exports = Defects;