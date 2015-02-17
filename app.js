var express = require('express');
var config = require('./sconfig');
var MySQLStore  = require('express-mysql-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Users = require('./routes/users');
var Calendar = require('./routes/calendar');
var Task = require('./routes/task');
var session = require('express-session');
var log = require('./libs/log')(module);
var Time = require('./libs/time');
var router = express.Router();

var app = express();
var user = new Users();
var pomodoro = new Task();

var currentTime = new Time();
app.set('port', config.get('port'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(router);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MySQLStore(config.get('mysql'))
}));

setInterval(user.pingDB, 3000000);
//setInterval(calendar.addDay, 86400000/24/60/5);

app.listen(config.get('port'));
console.log("Server listening on port: "+config.get('port'));

//router.get('/users', function (req, res, next) {
//    next();
//})

console.log(currentTime.getDateTime());


app.get('/api/users/get', function(req, res){console.log(currentTime.getDateTime()+'<--- Request GET /api/users/get'); user.getLastUsers(req, res, req.body)});
app.get('/api/users/get2', function(req, res){console.log(currentTime.getDateTime()+'<--- Request GET /api/users/get'); user.getCurrentUser2(req, res, req.session.user)});

app.delete('/api/users/:id', function(req, res){
    console.log('<--- Request DELETE /api/users/:id ' + req.params.id);
    if (req.params.id == req.session.user){
        res.send('same');
    } else {
        user.deleteUser(req, res, req.params.id);
        res.send('different');
    }
});
app.post('/api/users', function(req, res){console.log(currentTime.getDateTime()+' <--- Request POST /api/users '); user.createUser(req, res, req.body)});
app.post('/api/users/newpass', function(req, res){console.log(currentTime.getDateTime()+' <--- Request POST /api/users/newpass '); user.updatePassword(req, res, req.body)});
app.post('/login', function(req, res){console.log(currentTime.getDateTime()+' <--- Request POST /login'); user.getUserByName(req, res)});
app.get('/login', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /login'); res.render('login')});
app.get('/logout',function(req,res){console.log(currentTime.getDateTime()+' <--- Request GET /logout'); req.session.destroy(function(err){if(err){console.log(err)} else {res.redirect('login')}})});

app.get('/teams', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /login'); res.render('login')});
//app.get('/calendar', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /calendar');var calendar = new Calendar(); calendar.getUsers(req, res)});
app.post('/api/calendar/add', function(req, res){console.log(currentTime.getDateTime()+' <--- Request POST /api/calendar/add ');var calendar = new Calendar(); calendar.addDateInfo(req, res, req.body)});
app.get('/api/calendar/get', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /api/calendar/get ');var calendar = new Calendar(); calendar.getMonthInfo(req, res)});

app.get('/releases', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /login'); res.render('login')});
app.get('/sprints', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /login'); res.render('login')});
app.get('/stories', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /login'); res.render('stories')});
app.get('/testlab', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /login'); res.render('login')});
app.get('/configurations', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /login'); res.render('login')});
app.get('/testplan', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /login'); res.render('login')});

app.post('/api/task/create', function(req, res){console.log(currentTime.getDateTime()+' <--- Request POST /api/task/create '); pomodoro.createTask(req, res, req.body)});
app.get('/api/task/get', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /api/task/get '); pomodoro.getTasks(req, res)});
app.post('/api/task/change_status/:id', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /api/task/change_status '); pomodoro.changeTaskStatus(req, res)});
app.delete('/api/task/delete/:id', function(req, res){console.log(currentTime.getDateTime()+' <--- Request DELETE /api/task/delete '); pomodoro.deleteTask(req, res)});


app.use(function(req, res, next){
    if (req.session.user){
        if (req.url == '/users'){
            console.log(currentTime.getDateTime()+' <--- Request GET /users '+ req.session.user);
            user.getUsers(req, res);
        } else if (req.url == '/settings'){
            console.log(currentTime.getDateTime()+' <--- Request GET /settings ' + req.session.user);
            user.getCurrentUser(req, res, req.session.user);
        } else if (req.url == '/calendar'){
            console.log(currentTime.getDateTime()+' <--- Request GET /calendar');
            var calendar = new Calendar();
            calendar.getUsers(req, res)
        } else if (req.url == '/profile'){
            console.log(currentTime.getDateTime()+' <--- Request GET /profile ' + req.session.user);
            res.render('profile');
        }
        else{
            next();
        }
    }else {
        res.render('login');
        console.log(currentTime.getDateTime()+'---> Response: Render Login');
    }
});



console.log(user.encryptPassword(""));
//user.updatePassword('187', user.encryptPassword("god"));


app.use(function(req, res){
    res.send(404, "Page not found, sorry.");
})









