/**
 * Created by k.allakhvierdov on 12/10/2014.
 */
var SP = require('sharepoint'),
    site = '',
    username = '',
    password = '';

var client = new SP.RestService(site),
    contacts = client.list('AllItems');

var showResponse = function (err, data) {
    console.log(data);
}

client.signin(username, password, function () {

    contacts.get(showResponse);

});