/**
 * Created by k.allakhvierdov on 11/8/2014.
 */
var async = require('async');

var config = require('./../sconfig');
var log = require('./../libs/log')(module);
var Time = require('./../libs/time');
var currentTime = new Time();
var Dbq = require('./../libs/dbq');
var dbq = new Dbq;
var Promise = require('q');

function Calendar(){

    /**
     * @test myParam1
     * @param myParam2
     */

    this.getUsers = function(req, res) {

        var arrayOrPromises = [dbq.doSet('SELECT name, sname, id FROM user')];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.render('calendar', {users:arrayOfResults[0], req:req});
        });
    }

    this.addDateInfo = function(req, res, newDate) {
        var input = JSON.parse(JSON.stringify(newDate));
        var data = {
            uid  : input.uid,
            type : input.leaveType,
            date : input.date
        };
        if (input.leaveType == 'Holiday'){
            var arrayOrPromises = [dbq.doSet("INSERT INTO calendar (uid) SELECT id FROM user"), dbq.doSet("UPDATE calendar set date=?, type='Holiday'  WHERE type = ''", [data.date])];
            Promise.all(arrayOrPromises).then(function (arrayOfResults) {
                res.send('ok');
            });
        } else {
            var aor = [dbq.doSet("SELECT * FROM calendar WHERE date = ? AND uid = ?", [data.date, parseInt(data.uid)])];
            Promise.all(aor).then(function (arrOfRes) {
                if (arrOfRes[0][0]) {
                    var arrayOrPromises = [dbq.doSet("UPDATE calendar set ? WHERE date = ? AND uid = ?", [data, data.date, parseInt(data.uid)])];
                    Promise.all(arrayOrPromises).then(function (arrayOfResults) {
                        res.send('ok');
                    });
                } else {
                    var arrayOrPromises = [dbq.doSet("INSERT INTO calendar set ?", data)];
                    Promise.all(arrayOrPromises).then(function (arrayOfResults) {
                        res.send('ok');
                    });
                }
            })
        }

    }

    this.getMonthInfo = function(req, res){
        var arrayOrPromises = [dbq.doSet("SELECT * FROM calendar ORDER BY date, uid"), dbq.doSet("SELECT id, name, sname FROM user")];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.send(arrayOfResults);
            res.end();
        });
    }
}


module.exports = Calendar;

