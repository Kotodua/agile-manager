/**
 * Created by k.allakhvierdov on 11/8/2014.
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


function Users(){
    var self = this;

    this.createUser = function(req, res, user) {
        var input = JSON.parse(JSON.stringify(user));
        var data = {
            name  : input.name,
            sname : input.sname,
            pname : input.pname,
            role  : input.role,
            password : self.encryptPassword("")
        };
        var arrayOrPromises = [dbq.doSet("INSERT INTO user set ? ",data)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.send('ok');
        });
    }

    this.getLastUsers = function(req, res, id){
        var arrayOrPromises = [dbq.doSet('SELECT * FROM user ORDER BY id DESC LIMIT 1')];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            console.log(currentTime.getDateTime()+' ---> Response: '+{users:arrayOfResults[0]});
            res.type("text/json");
            res.send(arrayOfResults[0]);
        });
    };


    this.getUsers = function(req, res) {
        var arrayOrPromises = [dbq.doSet('SELECT * FROM user')];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            console.log(currentTime.getDateTime()+' ---> Response: Trying to render Users with '+{users:arrayOfResults[0]});
            res.render('users', {users:arrayOfResults[0]});
        });
    }


    this.getCurrentUser2 = function(req, res, id){
        console.log('getting user '+id);
        var arrayOrPromises = [dbq.doSet('SELECT * FROM user WHERE id = ?', id)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            console.log(currentTime.getDateTime()+' ---> Response: '+{users:arrayOfResults[0]});
            res.send({users:arrayOfResults[0]});
        });
    };

    this.getCurrentUser = function(req, res, id){
        console.log('getting user '+id);
        var arrayOrPromises = [dbq.doSet('SELECT * FROM user WHERE id = ?', id)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            console.log(currentTime.getDateTime()+' ---> Response: '+{users:arrayOfResults[0]});
            res.render('settings', {users:arrayOfResults[0]});
        });
    };

    this.deleteUser = function(req, res, id){
        var arrayOrPromises = [dbq.doSet('DELETE FROM user WHERE id = ?', id), dbq.doSet('DELETE FROM calendar WHERE uid = ?', id) ];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            console.log(currentTime.getDateTime()+' ---> Response: User Deleted');
        });
    };

    this.getUserByName = function(req, res){
        var input = JSON.parse(JSON.stringify(req.body));
        console.log(currentTime.getDateTime()+' || trying to get user by pname: '+input.name);
        var arrayOrPromises = [dbq.doSet('select * FROM user WHERE pname = ?', [input.name])];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            if (arrayOfResults[0]) {
                var queryResult = JSON.parse(JSON.stringify(arrayOfResults[0]));
                if (queryResult[0].pname == input.name) {
                    console.log(queryResult[0].pname);
                    if (self.encryptPassword(input.password) == queryResult[0].password){
                        req.session.user = queryResult[0].id;
                        console.log(currentTime.getDateTime()+' ---> Response: '+{'result': 'success'});
                        res.send({'result': 'success'});
                    } else {
                        res.send({'result': 'failed'});
                        console.log(currentTime.getDateTime()+' ---> Response: Wrong pass');
                        console.log('wrong pass');
                    }
                } else {
                    res.send({'result': 'failed'});
                    console.log(currentTime.getDateTime()+' ---> Response: User not Found');
                }
            }
            else {
                res.send({'result': 'failed'});
                console.log(currentTime.getDateTime()+' ---> Response: User not Found');
            }
        });
    }

    this.encryptPassword = function(password){
        return crypto.createHmac('sha1', 'salt').update(password).digest('hex');
    }

    this.checkPassword = function(user, password){
        console.log('checking password');
        this.pass;
        var arrayOrPromises = [dbq.doSet('SELECT password FROM user WHERE user=',[user])];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            this.pass = arrayOfResults[0].password;
        });
        return self.encryptPassword(password) === this.pass;
    }

    this.pingDB = function(){
        var arrayOrPromises = [dbq.doSet('SELECT * FROM user WHERE name= ?',['Twister'])];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            console.log(currentTime.getDateTime()+'!--> DB Ping passed');
        });
    }

    this.updatePassword = function(req, res){
        var input = JSON.parse(JSON.stringify(req.body));
        var arrayOrPromises = [dbq.doSet('UPDATE user set password = ? WHERE id = ? ',[self.encryptPassword(input.password), req.session.user])];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.send({result: 'success'});
            console.log('pass updated');
        });
    }

}


module.exports = Users;

