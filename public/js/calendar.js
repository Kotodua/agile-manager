/**
 * Created by k.allakhvierdov on 11/30/2014.
 */
function calendar(){
    mainURL = config.url+"/api/calendar";


    $('#b_update').on("click", function () {
        var id = $('#s_user option:selected').prop('id').split('_');
        $.ajax({
            type: "POST",
            data: {uid: id[1], leaveType: $('#leave_type option:selected').text(), date: $('#date').val()},
            dataType: "json",
            url: mainURL+'/add',
            success: function (data) {
            }
        })

    });

    $('#b_show').on("click", function () {
        $('#table_calendar').remove();
        var id = $('#s_user option:selected').prop('id').split('_');
        $.ajax({
            type: "GET",
            dataType: "html",
            url: mainURL+'/get',
            success: function (data) {
                var date = new Date($('#s_status').val());
                var statuses = JSON.parse(data);
                var midDay, lastDay;
                var newDate = new Date();
                var today = newDate.getDate();

                $('#calendar').append('<table class="table_calendar" id="table_calendar"></table>');
                $('#table_calendar').append('<tr id="tr_title"></tr>');

                $('#table_calendar').append('<tr id="dd"><td>Date</td></tr>');
                $('#table_calendar').append('<tr id="e"><td>Name</td></tr>');

                /**Converting dates to real Date*/
                for(var i = 0; i < statuses[0].length; i++){
                    var d = new Date(statuses[0][i].date);
                    d.setDate(d.getDate());
                    statuses[0][i].date = d;
                }

                /**Drawing cells*/
                var oneTime = 0;
                for (var i = 0; i < 32; i++) {
                    var dd = DateFormat.format.date(date, "dd-MM");
                    var e = DateFormat.format.date(date, "E");
                    console.log(today + ' today');
                    console.log(date + ' date');

                    if (date.getDate() == today && oneTime == 0) {
                        $('#dd').append('<td class="today">' + dd + '</td>');
                        $('#e').append('<td class="today">' + e + '</td>');
                        oneTime++;
                    } else {
                        $('#dd').append('<td>' + dd + '</td>');
                        $('#e').append('<td>' + e + '</td>');
                    }

                    if (dd.match(/15-([0-9][0-9])/)){
                        midDay = parseInt(DateFormat.format.date(date,"dd"));
                    } else if ((dd.match(/01-([0-9][0-9])/))){
                        lastDay = parseInt(DateFormat.format.date(date-86400000,"dd"));
                    }

                    for (var j = 0; j < statuses[1].length; j++) {
                        var userName = statuses[1][j].name;
                        var userSName = statuses[1][j].sname;
                        var userId = statuses[1][j].id;
                        if (i == 0) {
                            $('#table_calendar').append('<tr class="row-normal" id="uid_' + userId + '"><td class="user_name">' + userName +' '+userSName+ '</td></tr>');
                        }
                        $('#uid_' + userId).append('<td id="day_'+userId+'_'+dd+'"></td>');
                        if (e == 'Sun' || e == 'Sat'){
                            $('#day_'+userId+'_'+dd).addClass('day-weekend');
                            $('#day_'+userId+'_'+dd).attr('h', 0);
                        }
                    }
                    date.setDate(date.getDate() + 1);
                }


                /**Adding data and colors*/
                for (var i = 0; i < statuses[0].length; i++){
                    var leaveDate = DateFormat.format.date(statuses[0][i].date, "dd-MM");
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
                        case 'Holiday':
                            $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-holiday');
                            $('#day_'+leaveUserId+'_'+leaveDate).attr('h', 0);
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
                        var month = DateFormat.format.date(date, "MM");
                        var userId = statuses[1][j].id;
                        if (i == midDay) {
                            if ($('#day_'+userId+'_'+i+'-'+month).attr('h')){
                                timeCount += parseInt($('#day_'+userId+'_'+i+'-'+month).attr('h'));
                            } else {
                                timeCount += 8;
                            }
                            $('#day_' + userId + '_' + i + '-' + month).append('<div title="time">' + timeCount + '</div>');
                            timeCount = 0;
                        } else if (i == lastDay) {
                                $('#day_'+userId+'_'+i+'-'+month).append('<div title="time">'+timeCount+'</div>');
                                timeCount = 0;
                                i = 32;
                        } else {
                            if ($('#day_'+userId+'_'+i+'-'+month).attr('h')){
                                timeCount += parseInt($('#day_'+userId+'_'+i+'-'+month).attr('h'));
                            } else {
                                timeCount += 8;
                            }
                        }
                    }

                }


            }
        })
    });

    var a_property;
    $('body').on("mouseover",'tr[id^="uid_"]', function(){
        a_property = $(this).prop("class");
        $(this).prop("class", "row-highlited");
    });

    $("body").on("mouseout",'tr[id^="uid_"]', function(){
        $(this).prop("class", a_property);

    });
}

