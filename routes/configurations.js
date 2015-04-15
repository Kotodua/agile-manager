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
    getConfs: function (req, res) {
        console.log('getting info');
        var arrayOrPromises = [dbq.doSet('SELECT * FROM conf_configuration'), dbq.doSet('SELECT * FROM conf_list'), dbq.doSet('SELECT * FROM conf_listitems')];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.type("text/json");
            res.send({conf_configurations:arrayOfResults[0], conf_list:arrayOfResults[1], conf_listitems:arrayOfResults[2]});
        });
    },

    getListElementById: function (req, res, eid, lid) {
        console.log('getting info');
        var arrayOrPromises = [dbq.doSet('SELECT * FROM conf_list WHERE id = ?', lid), dbq.doSet('SELECT * FROM conf_listitems WHERE id = ?', eid)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.type("text/json");
            res.send({conf_list:arrayOfResults[0], conf_listitems:arrayOfResults[1]});
        });
    },

    getConfInfo: function (req, res, id) {
        console.log('getting info');
        var arrayOrPromises = [dbq.doSet('SELECT * FROM conf_configtolists WHERE cid= ?', id)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.type("text/json");
            res.send(arrayOfResults[0]);
        });
    }

}

module.exports = Configurations;