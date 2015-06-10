var express = require('express');
var config = require('./sconfig');
var MySQLStore  = require('express-mysql-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Users = require('./routes/users');
var Teams = require('./routes/teams');
var Configurations = require('./routes/configurations');
var Defects = require('./routes/defects');
var TestLab = require('./routes/testlab');
var Calendar = require('./routes/calendar');
var Task = require('./routes/task');
var session = require('express-session');
var log = require('./libs/log')(module);
var Time = require('./libs/time');
var router = express.Router();
var app = express();
var pomodoro = new Task();
var currentTime = new Time();

var calendar = new Calendar();
var user = new Users();
var team = new Teams();
var tl = new TestLab();
var configurations = new Configurations();
var d = new Defects();


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



//------------------------------ LOGIN
app.post('/login', function(req, res){user.getUserByName(req, res)});
app.get('/login', function(req, res){res.render('login')});
app.get('/logout',function(req,res){req.session.destroy(function(err){
    if(err){console.log(err)
    } else {
        res.redirect('login')
    }})});

//------------------------------ USERS
app.get('/api/users/get', function(req, res){user.getLastUsers(req, res, req.body)});
app.get('/api/users/get2', function(req, res){user.getCurrentUser2(req, res, req.session.user)});
app.post('/api/users', function(req, res){user.createUser(req, res, req.body)});
app.post('/api/users/newpass', function(req, res){user.updatePassword(req, res, req.body)});
app.delete('/api/users/:id', function(req, res){
    if (req.params.id == req.session.user){
        res.send('same');
    } else {
        user.deleteUser(req, res, req.params.id);
        res.send('different');
    }});

//------------------------------ TEAMS
app.post('/api/teams/add', function(req, res){team.createTeam(req, res, req.body)});
app.delete('/api/teams/:id', function(req, res){team.deleteTeam(req, res, req.params.id)});
app.post('/api/teams/add', function(req, res){team.createTeam(req, res, req.body)});


//------------------------------ CALENDAR
//app.get('/calendar', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /calendar');var calendar = new Calendar(); calendar.getUsers(req, res)});
app.post('/api/calendar/add', function(req, res){calendar.addDateInfo(req, res, req.body)});
app.get('/api/calendar/get', function(req, res){calendar.getMonthInfo(req, res)});
app.delete('/api/calendar/:id/:month/:day', function(req, res){calendar.deleteDate(req, res, req.params.id, req.params.month, req.params.day)});
app.get('/api/calendar/getL3Information', function(req, res){calendar.getL3Information(req, res, req.session.user)});

//------------------------------ TEST LAB
app.get('/api/testlab/getCaseTree', function(req, res){tl.getCaseTree(req, res)});
app.post('/api/testlab/createFolder', function(req, res){tl.createFolder(req, res, req.body)});
app.delete('/api/testlab/:id', function(req, res){tl.deleteFolder(req, res, req.params.id)});
app.get('/api/testlab/:id', function(req, res){tl.getCase(req, res, req.params.id)});
app.get('/api/testlab/getTestCases/:id', function(req, res){tl.getTestCases(req, res, req.params.id)});
app.post('/api/testlab/saveCase', function(req, res){tl.saveCase(req, res, req.body)});
app.post('/api/testlab/createTest', function(req, res){tl.createTest(req, res, req.body)});
app.post('/api/testlab/moveCaseToTest', function(req, res){tl.moveCaseToTest(req, res)});


//------------------------------ CONFIGURATIONS
app.get('/api/configurations/getConfs', function(req, res){configurations.getConfs(req, res)});
app.get('/api/configurations/getListElement/:eid/:lid', function(req, res){configurations.getListElementById(req, res, req.params.eid, req.params.lid)});
app.get('/api/configurations/getConfInfo/:id', function(req, res){configurations.getConfInfo(req, res, req.params.id)});
app.post('/api/configurations/moveItemToConfig', function(req, res){configurations.moveListItemToConfiguration(req, res, req.body)});


//------------------------------ DEFECTS
app.get('/api/defects/getDefects', function(req, res){d.getDefects(req, res)});
app.post('/api/defects/postDefect', function(req, res){d.postDefect(req, res)});
app.post('/api/defects/postDefect/:id', function(req, res){d.updateDefect(req, res)});

//------------------------------ TASKS
app.post('/api/task/create', function(req, res){pomodoro.createTask(req, res, req.body)});
app.get('/api/task/get', function(req, res){pomodoro.getTasks(req, res)});
app.get('/api/task/getBreaks', function(req, res){pomodoro.getBreaks(req, res)});
app.post('/api/task/change_status/:id', function(req, res){pomodoro.changeTaskStatus(req, res)});
app.delete('/api/task/delete/:id', function(req, res){pomodoro.deleteTask(req, res)});


app.use(function(req, res, next){
    if (req.session.user){
        if (req.url == '/users') {
            console.log(currentTime.getDateTime() + ' <--- Request GET /users ' + req.session.user);
            user.getUsers(req, res);
        }
        else if (req.url == '/teams'){
                console.log(currentTime.getDateTime()+' <--- Request GET /teams ' + req.session.user);
                team.getTeams(req, res, req.session.user);
        } else if (req.url == '/testlab'){
            console.log(currentTime.getDateTime()+' <--- Request GET /testlab ' + req.session.user);
            res.render('testlab');
        } else if (req.url == '/configurations'){
            console.log(currentTime.getDateTime()+' <--- Request GET /configurations' + req.session.user);
            res.render('configurations');
        } else if (req.url == '/defects') {
            console.log(currentTime.getDateTime() + ' <--- Request GET /configurations' + req.session.user);
            res.render('defects');
        } else if (req.url == '/settings'){
            console.log(currentTime.getDateTime()+' <--- Request GET /settings ' + req.session.user);
            user.getCurrentUser(req, res, req.session.user);
        } else if (req.url == '/calendar'){
            console.log(currentTime.getDateTime()+' <--- Request GET /calendar');
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


/*          FUTURE
app.get('/releases', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /login'); res.render('login')});
app.get('/sprints', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /login'); res.render('login')});
app.get('/stories', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /login'); res.render('stories')});
app.get('/testlab', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /login'); res.render('login')});
app.get('/configurations', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /login'); res.render('login')});
app.get('/testplan', function(req, res){console.log(currentTime.getDateTime()+' <--- Request GET /login'); res.render('login')});
*/




