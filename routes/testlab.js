/**
 * Created by k.allakhvierdov on 4/2/2015.
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

function TestLab(){
    var self = this;
}

TestLab.prototype = {
    getCase: function (req, res, id) {
        console.log('getting info');
        var arrayOrPromises = [dbq.doSet('SELECT * FROM case_points WHERE id = ?', id)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.type("text/json");
            res.send(arrayOfResults[0]);
        });
    },

    getCaseTree: function (req, res) {
        console.log('getting info');
        var arrayOrPromises = [dbq.doSet('SELECT * FROM case_folder'), dbq.doSet('SELECT * FROM case_points')];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.type("text/json");
            res.send({folder:arrayOfResults[0], case:arrayOfResults[1]});
        });
    },

    deleteFolder: function(req, res, id){
        var arrayOrPromises = [dbq.doSet('DELETE FROM case_folder WHERE id = ?', id)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            console.log(currentTime.getDateTime()+' ---> Response: Folder Deleted');
            res.send('success');
        });
    },

    moveFolder: function (req, res){
        console.log('moving folder');
        var arrayOrPromises = [dbq.doSet('SELECT * FROM case_folder')];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.type("text/json");
            res.send(arrayOfResults[0]);
        });
    },

    createFolder: function(req, res, folder) {
        var input = JSON.parse(JSON.stringify(folder));
        var data = {
            name  : input.name,
            pid : input.parent
        };
        var arrayOrPromises = [dbq.doSet("INSERT INTO case_folder set ? ",data)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.send('ok');
        });
    },

    saveCase: function(req, res, data) {
        var input = JSON.parse(JSON.stringify(data));
        var data = {
            name : input.id,
            cfid : input.cfid,
            steps: input.steps,
            expected: input.expected,
            status: input.status,
            description: input.notes
            //owner: input.owner
        };
        var arrayOrPromises = [dbq.doSet("INSERT INTO case_points set ? ",data)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.send(arrayOfResults);
        });
    }


}

module.exports = TestLab;