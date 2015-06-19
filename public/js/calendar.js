/**
 * Created by k.allakhvierdov on 11/30/2014.
 */

var socket;

function calendar(){
    mainURL = config.url+"/api/calendar";

    socket = io.connect(config.url);

    var dd = DateFormat.format.date(new Date(), "yyyy-MM-dd");
    var dd_s = dd.split('-');
    $('#s_status').val(dd_s[0]+'-'+dd_s[1]+'-'+'01');
    drawCalendar();

    socket.on('get_message', function (data) {
        changeCell(data.id, data.leaveDate, data.leaveType);
    });

    socket.on('delCellInfo', function (data) {
        $('#'+data.id).prop('class', 'td-border');
        $('#'+data.id).empty();
    });


    $('#b_update').on("click", function () {
        updateDateForPerson()
    });

    $('#b_show').on("click", function () {
        drawCalendar();
    });

    var a_property;
    $('body').on("mouseover",'tr[id^="uid_"]', function(){
        a_property = $(this).prop("class");
        $(this).prop("class", "row-highlited");
    });

    $("body").on("mouseout",'tr[id^="uid_"]', function(){
        $(this).prop("class", a_property);
    });

    $("body").on("mouseout",'tr[id^="uid_"]', function(){
        $(this).prop("class", a_property);
    });

    $('#s_user').on("change", function(){
        $('[id*="uid_"]').attr('class', 'row-normal');
        $("#uid_"+$(this).children(":selected").attr("id").split('_')[1]).attr('class', 'today');
    });



    // Remove rows != selected Team
    $('body').on('change', '#team', function(){
        $("tr[team!='na']").show();
        var monthId = $('#team option:selected').prop('id');
        if (monthId != 0) {
            $("tr[team!='na'][team!='" + monthId + "']").hide();
        }
    })
}

function updateDateForPerson(t, leaveType){

    var id, leaveDateId;

    if($('#s_user option:selected').prop('id').split('_') == 'default"'){
        var mainId = $('#'+t.id).prop('id').split('_');
        id = mainId[1];
        var date = mainId[2].split('-');
        leaveDateId =  new Date(date[2], date[1]-1, date[0]);
        var leaveDate = DateFormat.format.date(leaveDateId, "dd-MM-yyyy");
        var leaveDateDB = DateFormat.format.date(leaveDateId, "yyyy-MM-dd");
    } else {
        id = $('#s_user option:selected').prop('id').split('_');
        id = id[1];
        leaveDateId = new Date($('#date').val());
        var leaveDate = DateFormat.format.date(leaveDateId, "dd-MM-yyyy");
        var leaveDateDB = DateFormat.format.date(leaveDateId, "yyyy-MM-dd");
    }

    if(!leaveType){var leaveType = $('#leave_type option:selected').text()}

    switch(leaveType){
        case 'Half-Day Leave(NA)':
            postDateUpdate(id, leaveType, leaveDateDB);
            socket.emit('news', { id: id, leaveType: 'day-half-na', leaveDate: leaveDate});
            changeCell(id, leaveDate, 'day-half-na');
            break;
        case 'Leave(NA)':
            socket.emit('news', { id: id, leaveType: 'day-leave-na', leaveDate: leaveDate});
            changeCell(id, leaveDate, 'day-leave-na');
            postDateUpdate(id, leaveType, leaveDateDB);
            break;
        case 'Vacation(NA)':
            socket.emit('news', { id: id, leaveType: 'day-vacation-na', leaveDate: leaveDate});
            changeCell(id, leaveDate, 'day-vacation-na');
            postDateUpdate(id, leaveType, leaveDateDB);
            break;
        case 'Half-Day Leave':
            socket.emit('news', { id: id, leaveType: 'day-half', leaveDate: leaveDate});
            changeCell(id, leaveDate, 'day-half');
            postDateUpdate(id, leaveType, leaveDateDB);
            break;
        case 'Leave':
            socket.emit('news', { id: id, leaveType: 'day-leave', leaveDate: leaveDate});
            changeCell(id, leaveDate, 'day-leave');
            postDateUpdate(id, leaveType, leaveDateDB);
            break;
        case 'Vacation':
            socket.emit('news', { id: id, leaveType: 'day-vacation', leaveDate: leaveDate});
            changeCell(id, leaveDate, 'day-vacation');
            postDateUpdate(id, leaveType, leaveDateDB);
            break;
        case 'L3 Day':
            socket.emit('news', { id: id, leaveType: 'day-l3', leaveDate: leaveDate});
            changeCell(id, leaveDate, 'day-l3');
            postDateUpdate(id, leaveType, leaveDateDB);
            break;
        case 'L3 Leave':
            if(checkL3LeaveApply()){
                socket.emit('news', { id: id, leaveType: 'day-l3-leave', leaveDate: leaveDate});
                changeCell(id, leaveDate, 'day-l3-leave');
                postDateUpdate(id, leaveType, leaveDateDB);
            }
            break;
    }
}

function changeCell(id, leaveDate, leaveType){
    $('#day_'+id+'_'+leaveDate).addClass(leaveType);
}

function postDateUpdate(id, leaveType, leaveDateDB){
    $.ajax({
        type: "POST",
        data: {uid: id, leaveType: leaveType, date: leaveDateDB},
        dataType: "json",
        url: mainURL+'/add',
        success: function (data) {
        }
    })
}




function drawCalendar(){
    $('#table_calendar').remove();
    var id = $('#s_user option:selected').prop('id').split('_');

    $.ajax({
        type: "GET",
        dataType: "html",
        url: mainURL+'/get',
        success: function (data) {

            var date = new Date($('#s_status').val());
            var statuses;
            var newDate = new Date();
            var today = newDate.getDate();
            var midDay, lastDay;

            var statuses = JSON.parse(data);

            $('#calendar').append('<table class="table_calendar" id="table_calendar"></table>');
            $('#table_calendar').append('<tr team="na" id="tr_title"></tr>');

            $('#table_calendar').append('<tr team="na" id="dd"><td class="td-border">Date</td></tr>');
            $('#table_calendar').append('<tr team="na" id="e"><td class="td-border">Name</td></tr>');

            /**Converting dates to real Date*/
            for(var i = 0; i < statuses[0].length; i++){
                var d = new Date(statuses[0][i].date);
                d.setDate(d.getDate());
                statuses[0][i].date = d;
            }

            /**Drawing cells*/
            for (var i = 0; i < 32; i++) {
                var dd = DateFormat.format.date(date, "dd-MM");
                var ddId = DateFormat.format.date(date, "dd-MM-yyyy");
                var e = DateFormat.format.date(date, "E");
                if (DateFormat.format.date(date, 'dd-MM')  == DateFormat.format.date(new Date(), 'dd-MM')) {
                    $('#dd').append('<td class="today">' + dd + '</td>');
                    $('#e').append('<td class="today">' + e + '</td>');
                } else {
                    $('#dd').append('<td class="td-border">' + dd + '</td>');
                    $('#e').append('<td class="td-border">' + e + '</td>');
                }

                if (dd.match(/15-([0-9][0-9])/)){
                    midDay = parseInt(DateFormat.format.date(date,"dd"));
                } else if ((dd.match(/01-([0-9][0-9])/))){
                    lastDay = parseInt(DateFormat.format.date(date-86400000,"dd"));
                }

                for (var j = 0; j < statuses[1].length; j++) {
                    var userName = statuses[1][j].name;
                    var teamId = statuses[1][j].tid;
                    var userSName = statuses[1][j].sname;
                    var userId = statuses[1][j].id;
                    if (i == 0) {
                        $('#table_calendar').append('<tr team='+teamId+' class="row-normal" id="uid_' + userId + '"><td class="user_name">' + userName +' '+userSName+ '</td></tr>');
                    }
                    $('#uid_' + userId).append('<td class="td-border" id="day_'+userId+'_'+ddId+'"></td>');
                    if (e == 'Sun' || e == 'Sat'){
                        $('#day_'+userId+'_'+ddId).addClass('day-weekend');
                        $('#day_'+userId+'_'+ddId).attr('h', 0);
                    }
                }
                date.setDate(date.getDate() + 1);
            }

            /**Adding data and colors*/
            for (var i = 0; i < statuses[0].length; i++){
                var leaveDate = DateFormat.format.date(statuses[0][i].date, "dd-MM-yyyy");
                var leaveUserId = statuses[0][i].uid;
                var leaveType = statuses[0][i].type;
                $('#day_'+leaveUserId+'_'+leaveDate).append('<div title="'+leaveType+'">`</div>');

                switch(leaveType){
                    case 'Leave':
                        $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-leave');
                        $('#day_'+leaveUserId+'_'+leaveDate).attr('h', 0);
                        break;
                    case 'Half-Day Leave':
                        $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-half');
                        $('#day_'+leaveUserId+'_'+leaveDate).attr('h', 4);
                        break;
                    case 'Vacation':
                        $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-vacation');
                        $('#day_'+leaveUserId+'_'+leaveDate).attr('h', 0);
                        break;
                    case 'Leave(NA)':
                        $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-leave-na');
                        $('#day_'+leaveUserId+'_'+leaveDate).attr('h', 0);
                        break;
                    case 'Half-Day Leave(NA)':
                        $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-half-na');
                        $('#day_'+leaveUserId+'_'+leaveDate).attr('h', 4);
                        break;
                    case 'Vacation(NA)':
                        $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-vacation-na');
                        $('#day_'+leaveUserId+'_'+leaveDate).attr('h', 0);
                        break;
                    case 'Holiday':
                        $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-holiday');
                        $('#day_'+leaveUserId+'_'+leaveDate).attr('h', 0);
                        break;
                    case 'L3 Day':
                        $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-l3');
                        $('#day_'+leaveUserId+'_'+leaveDate).attr('h', 0);
                        break;
                    case 'L3 Leave':
                        $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-l3-leave');
                        $('#day_'+leaveUserId+'_'+leaveDate).attr('h', 8);
                        break;
                    case '':
                        $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-work');
                        $('#day_'+leaveUserId+'_'+leaveDate).attr('h', 8);
                        break;
                    default :
                        $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-default');
                        break;
                }
            }

            /**Adding time*/
            for (var j = 0; j < statuses[1].length; j++) {
                var date = new Date($('#s_status').val());
                var timeCount = 0;
                for (var i = 1; i < 32; i++) {
                    if (i < 10){
                        i = '0'+i;
                    }
                    var monthAndYear = DateFormat.format.date(date, "MM-yyyy");
                    var userId = statuses[1][j].id;
                    if (i == midDay) {
                        if ($('#day_'+userId+'_'+i+'-'+monthAndYear).attr('h')){
                            timeCount += parseInt($('#day_'+userId+'_'+i+'-'+monthAndYear).attr('h'));
                        } else {
                            timeCount += 8;
                        }
                        $('#day_' + userId + '_' + i + '-' + monthAndYear).append('<div title="time">' + timeCount + '</div>');
                        timeCount = 0;
                    } else if (i == lastDay) {
                        if ($('#day_'+userId+'_'+i+'-'+monthAndYear).attr('h')){
                            timeCount += parseInt($('#day_'+userId+'_'+i+'-'+monthAndYear).attr('h'));
                        } else {
                            timeCount += 8;
                        }
                        $('#day_'+userId+'_'+i+'-'+monthAndYear).append('<div title="time">'+timeCount+'</div>');
                        timeCount = 0;
                        i = 32;
                    } else {
                        if ($('#day_'+userId+'_'+i+'-'+monthAndYear).attr('h')){
                            timeCount += parseInt($('#day_'+userId+'_'+i+'-'+monthAndYear).attr('h'));
                        } else {
                            timeCount += 8;
                        }
                    }
                }
            }


            //------------------------ CONTEXT MENU
            $('td[id^="day_"]').contextMenu('myMenu1', {
                bindings: {
                    'delete': function(t) {
                        var id = $('#'+t.id).prop('id').split('_');
                        var date = id[2].split('-');
                        alert(id+' '+date[0]+' '+date[1]);
                        $.ajax({
                            type: "DELETE",
                            dataType: "html",
                            url: mainURL+'/'+id[1]+'/'+date[1]+'/'+date[0],
                            success: function (res) {
                                $('#'+t.id).prop('class', 'td-border');
                                $('#'+t.id).empty();
                                socket.emit('del', { id: t.id});
                            }
                        })
                    },
                    'day-hd-leave-na': function(t) {
                        updateDateForPerson(t, "Half-Day Leave(NA)");
                    },
                    'day-hd-leave': function(t) {
                        updateDateForPerson(t, "Half-Day Leave");
                    },
                    'day-leave-na': function(t) {
                        updateDateForPerson(t, "Leave(NA)");
                    },
                    'day-leave': function(t) {
                        updateDateForPerson(t, "Leave");
                    },
                    'day-l3': function(t) {
                        updateDateForPerson(t, "L3 Day");
                    },
                    'day-l3-leave': function(t) {
                        if(checkL3LeaveApply()){
                            updateDateForPerson(t, "L3 Leave");
                        }
                    },
                    'day-vacation-na': function(t) {
                        updateDateForPerson(t, "Vacation(NA)");
                    },
                    'day-vacation': function(t) {
                        updateDateForPerson(t, "Vacation");
                    }
                }
            });

            checkL3LeaveApply = function(){
                $.ajax({
                    type: "GET",
                    dataType: "html",
                    url: config.url+'/api/calendar/getL3Information',
                    success: function (data) {
                        var results = JSON.parse(data);
                        if ((results[0][0]["COUNT(*)"]-results[1][0]["COUNT(*)"])){
                            return true;
                        } else {
                            alert('You do not have L3 Leaves. Please contact your administrator.')
                            return false;
                        }
                    }
                })
            }
        }
    })
}
