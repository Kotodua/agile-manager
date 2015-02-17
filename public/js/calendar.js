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
                for (var i = 0; i < 31; i++) {
                    var dd = DateFormat.format.date(date, "dd-MM");
                    var e = DateFormat.format.date(date, "E");
                    $('#dd').append('<td>' + dd + '</td>');
                    $('#e').append('<td>' + e + '</td>');
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
                            break;
                        case 'Half-Day Leave':
                            $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-half');
                            break;
                        case 'Vacation':
                            $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-vacation');
                            break;
                        case 'Holiday':
                            $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-holiday');
                            break;
                        case '':
                            $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-work');
                            break;
                        default :
                            $('#day_'+leaveUserId+'_'+leaveDate).addClass('day-default');
                            break;
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

