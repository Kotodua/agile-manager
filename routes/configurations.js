/**
 * Created by Konstantin on 4/9/2015.
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

function Configurations(){
    var self = this;
}

Configurations.prototype = {
    //------------------ CASES
    getConfs: function (req, res, id) {
        console.log('getting info');
        var arrayOrPromises = [dbq.doSet('SELECT * FROM configurations')];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.type("text/json");
            res.send(arrayOfResults[0]);
        });
    }

}

module.exports = Configurations;