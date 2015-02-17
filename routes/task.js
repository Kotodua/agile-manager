/**
 * Created by k.allakhvierdov on 12/12/2014.
 */

var config = require('./../sconfig');
var log = require('./../libs/log')(module);
var Time = require('./../libs/time');
var currentTime = new Time();
var Dbq = require('./../libs/dbq');
var dbq = new Dbq;
var Promise = require('q');

function Task(){
    this.createTask = function(req, res){
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            title  : input.title,
            date : input.date,
            duration : input.duration,
            uid: req.session.user,
            status: "New"
        };
        var arrayOrPromises = [dbq.doSet("INSERT INTO pomodoro_tasks set ?",data), dbq.doSet("SELECT * FROM pomodoro_tasks WHERE uid=? ORDER BY id DESC LIMIT 1",req.session.user)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.type("text/json");
            res.send(arrayOfResults);
        });
    }

    this.getTasks = function(req, res){
        console.log('getting tasks');
        var arrayOrPromises = [dbq.doSet("SELECT * FROM pomodoro_tasks WHERE uid=? ORDER BY id DESC",req.session.user)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.type("text/json");
            res.send(arrayOfResults);
        });
    }

    this.deleteTask = function(req, res){
        var id = req.params.id;
        var arrayOrPromises = [dbq.doSet("DELETE FROM pomodoro_tasks WHERE id=?", [parseInt(id)])];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.type("text/json");
            res.send('success');
        });
    }

    this.changeTaskStatus = function(req, res){
        var id = req.params.id;
        var input = JSON.parse(JSON.stringify(req.body));
        console.log('Changing task status to: '+input.status);
        var arrayOrPromises = [dbq.doSet("UPDATE pomodoro_tasks SET status=? WHERE id=?",[input.status, id])];
        if (input.status == 'Break'){
            console.log('Status is Break.');
            arrayOrPromises.push(dbq.doSet("INSERT INTO pomodoro_breaks SET tid=?, date=?, uid=?", [id, new Date(), req.session.user]));
        }
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.type("text/json");
            res.send('success');
        });
    }
}

module.exports = Task;