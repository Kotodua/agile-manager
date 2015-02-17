/**
 * Created by k.allakhvierdov on 11/29/2014.
 */
var Promise = require('q');
var mysql  = require('mysql');

var connection = mysql.createConnection({
    host: '176.38.81.16',
    user: 'root',
    password: 'Twisteremp126',
    port: 3306,
    database: 'nodejs'
});

function Dbq(){
    this.doSet = function(query, data){
        var d = Promise.defer();
        connection.query(query, data, function (err, rows) {
            if (err) {
                d.reject(console.log("Error Selecting : %s ", err));
            } else {
                d.resolve(rows);
            }
        });
        return d.promise;
    };
}

module.exports = Dbq;