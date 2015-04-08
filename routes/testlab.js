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
        var arrayOrPromises = [dbq.doSet('SELECT * FROM case_folder'),
            dbq.doSet('SELECT * FROM case_points'),
            dbq.doSet('SELECT * FROM test'),
            dbq.doSet('SELECT * FROM casetotest'),
        ];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.type("text/json");
            res.send({folder:arrayOfResults[0], case:arrayOfResults[1], test:arrayOfResults[2], testcases:arrayOfResults[3]});
        });
    },

    deleteFolder: function(req, res, id){
        var arrayOrPromises = [dbq.doSet('DELETE FROM case_folder WHERE id = ?', id)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            console.log(currentTime.getDateTime()+' ---> Response: Folder Deleted');
            res.send(arrayOfResults);
        });
        this.deletChildFolders(req, res, id);
    },

    deletChildFolders: function(req, res, pid){
        var arrayOrPromises = [dbq.doSet('SELECT * FROM case_folder WHERE pid = ?', pid)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            console.log("nested count"+arrayOfResults[0].length);
            console.log(arrayOfResults);
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

    moveCaseToTest: function (req, res){
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            cid  : input.cid,
            tid : input.tid
        };
        var arrayOrPromises = [dbq.doSet("INSERT INTO casetotest set ? ",data)];
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
            res.send(arrayOfResults);
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
    },

    createTest: function(req, res, data) {
        var input = JSON.parse(JSON.stringify(data));
        var data = {
            name : input.name,
            pid : input.pid,
            //expected: input.expected,
            status: input.status,
            description: input.description
            //owner: input.owner
        };
        var arrayOrPromises = [dbq.doSet("INSERT INTO test set ? ",data)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.send(arrayOfResults);
        });
    }


}

module.exports = TestLab;