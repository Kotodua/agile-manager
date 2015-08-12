/**
 * Created by Konstantin on 4/21/2015.
 */
var async = require('async');
var config = require('./../sconfig/index');
var log = require('./../libs/log')(module);
var Time = require('./../libs/time');

var Dbq = require('./../libs/dbq');
var dbq = new Dbq;
var Promise = require('q');
var currentTime = new Time();

function Vote(){
    var self = this;
}

Vote.prototype = {
    createQuestionnaire: function(req, res){
        var data = {title: req.body.title, status: 'New'};
        var arrayOrPromises = [dbq.doSet("INSERT INTO questionnaire set ? ",data)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.send(arrayOfResults[0]);
        });
    },

    getQuestionnaires: function(req, res){
        var arrayOrPromises = [dbq.doSet("SELECT * FROM questionnaire")];
        var resData = [];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            arrayOfResults[0].forEach(function(q){
                resData.push(q);
            })
            res.send(arrayOfResults[0]);
        });
    },

    getQuestionnaireInfo: function(req, res, id){
        console.log(id);
        var arrayOrPromises = [dbq.doSet('SELECT * FROM questionnaire_defect WHERE qid = ?', id),
                               dbq.doSet('SELECT * FROM questionnaire_test WHERE qid = ?', id)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            res.send(arrayOfResults);
        });
    },

    deleteQuestionnaire: function(req, res, id){
        console.log('id is: '+id);
        var arrayOrPromises = [dbq.doSet('DELETE FROM questionnaire WHERE id = ?', id),
            dbq.doSet('DELETE FROM questionnaire_defect WHERE qid = ?', id),
            dbq.doSet('DELETE FROM questionnaire_test WHERE qid = ?', id)];
        Promise.all(arrayOrPromises).then(function (arrayOfResults) {
            console.log(currentTime.getDateTime()+' ---> Response: Questionnaire Deleted');
            res.send(arrayOfResults);
        });
    },

    updateQuestionnaireData: function(req, res, id){
        var input = JSON.parse(JSON.stringify(req.body));
        console.log('id is: '+req.body);
        var arrayOrPromises = [];
        if(input.defects){
            input.defects.forEach(function(e){
                e.qid = id;
                if(!e.id){
                    e.id = 'NULL';
                    arrayOrPromises.push(dbq.doSet("INSERT INTO questionnaire_defect SET ?", e))
                }  else {
                    arrayOrPromises.push(dbq.doSet("UPDATE questionnaire_defect SET ? WHERE id = ?",[e, e.id]))
                }
            })
        }
        if(input.tests){
            input.tests.forEach(function(e){
                e.qid = id;
                if(!e.id){
                    e.id = 'NULL';
                    arrayOrPromises.push(dbq.doSet("INSERT INTO questionnaire_test SET ?", e))
                }  else {
                    arrayOrPromises.push(dbq.doSet("UPDATE questionnaire_test SET ? WHERE id = ?",[e, e.id]))
                }
            })

            Promise.all(arrayOrPromises).then(function (arrayOfResults) {
                console.log(currentTime.getDateTime()+' ---> Response: Questionnaire Updated');
                res.send(arrayOfResults);
            });
        }

    },

    addVoteDefectItem: function(req,res){

    },

    updateVoteDefectItem: function(req,res){

    },

    deleteVoteDefectItem: function(req,res){

    },

    addVoteTestItem: function(req,res){

    },

    updateVoteTestItem: function(req,res){

    },

    deleteVoteTestItem: function(req,res){

    },

    // Publish Questionnaire. Users are able to vote. vote appeared in the Questionnaire's list for all users with status InProgress
    publishQuestionnaire: function(req, res){

    },

    // Close Questionnaire session. No one can vote after vote closed.
    stopQuestionnaire: function(req, res){

    }


}


module.exports = Vote;