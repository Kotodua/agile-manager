function profile(){
    mainURL = config.url+"/api/users";
    var today = new Date();
    var todayDate = today.getDate() +'-'+today.getMonth()+'-'+today.getFullYear();


    $('.toggle-content').hide();

    $('.toggle-control')
        .addClass('clickable')
        .bind('click', function() {
            var $control = $(this);
            var $parent = $control.parents('.toggle-unit');

            $parent.toggleClass('expanded');
            $parent.find('.toggle-content').slideToggle();

            // if control has HTML5 data attributes, use to update text
            if ($parent.hasClass('expanded')) {
                $control.html($control.attr('data-expanded-text'));
            } else {
                $control.html($control.attr('data-text'));
            }
        })

    $.ajax({
        type: "GET",
        dataType: "html",
        url: mainURL+'/get2',
        success: function (data) {
            $('#user_info').append('<div>'+data+'</div>');
        }
    })


    $.ajax({
        type: "GET",
        dataType: "html",
        url: config.url+'/api/calendar/getL3Information',
        success: function (data) {
            $('#user_info').append('<div>'+data+'</div>');
        }
    })

    $.ajax({
        type: "GET",
        dataType: "html",
        url: config.url+"/api/task/get",
        success: function (tasks) {
            var data = JSON.parse(tasks);
            $('#tasks_today').append('<table id="tl_table_today" class="tasks"></table>');
            $('#tl_table_today').append('<tr><td>Title</td><td>Date</td><td>Duration</td><td>Status</td><td>Action</td></tr>')
            $('#tasks_other').append('<table id="tl_table_other" class="tasks"></table>');
            $('#tl_table_other').append('<tr><td>Title</td><td>Date</td><td>Duration</td><td>Status</td><td>Action</td></tr>')

            for(var i=0; i < data[0].length; i++){
                var myDate = new Date(data[0][i].date);
                var currentDate = myDate.getDate() +'-'+myDate.getMonth()+'-'+myDate.getFullYear();
                if(todayDate == currentDate) {
                    appendTask(data[0][i], '#tl_table_today');
                } else {
                    appendTask(data[0][i], '#tl_table_other');
                }
            }
        }
    })

    $('body').on("click", "#delete"  , function() {
        var parentId = this.parentNode.parentNode.id;
        $.ajax({
            type: "DELETE",
            url: config.url + "/api/task/delete/" + parentId,
            success: function (data) {
                console.log(data);
            }
        })
        $('#'+parentId).remove();
    })

    var myCount;
    $('body').on("click", "#break"  , function() {
        var parentId = this.parentNode.parentNode.id
        $.ajax({
            type: "POST",
            data: {status: 'Break'},
            dataType: "json",
            url: config.url + "/api/task/change_status/" + parentId,
            success: function (data) {
                console.log(data);
            }
        })
        $('#status_'+parentId).text('Break');
        $(this).text('Start');
        $(this).attr('id', 'start');
        $('#status_'+parentId).attr('class', 'task-Break');
        $('#tasks_timer').hide();
        myCount.stop();
        $('#main_title').html('Agile Manager');
    })

    $('body').on("click", "#start"  , function(){
        var parentId = this.parentNode.parentNode.id;
        var btn = this;
        $.ajax({
            type: "POST",
            data: {status: 'In Progress'},
            dataType: "json",
            url: config.url+"/api/task/change_status/"+parentId,
            success: function (data) {
            }
        })
        $('#status_'+parentId).text('In Progress');
        $(btn).text('Break');
        $(btn).attr('id', 'break');
        $('#tasks_timer').attr('class', 'timer-work');



        var myCounter = new Countdown({
            seconds: $('#duration_'+parentId).text()*60,  // number of seconds to count down
            onUpdateStatus: function(sec){
                $('#tasks_timer').show();
                $('#tasks_timer').html('TASK IN PROGRESS: ' +sec);
                $('#main_title').html('WORK: ' +sec)}, // callback for each second
                onCounterEnd: function(){
                    $.ajax({
                        type: "POST",
                        data: {status: 'Done'},
                        dataType: "json",
                        url: config.url+"/api/task/change_status/"+parentId,
                        success: function (data) {
                        }
                    })
                    $(btn).text('Start');
                    $(btn).attr('id', 'start');
                    $('#status_'+parentId).text('Done');
                    $('#tasks_timer').html('TASK DONE');
                    $('#tasks_timer').attr('class', 'timer-rest');
                    alert('Time is up!');
                    $('#main_title').html('Agile Manager');
                    $('#status_'+parentId).attr('class', 'task-Done');
                    myCounter.stop()
                } // final action
        });
        myCount = myCounter;

        myCounter.start();


    })




    $('#new_task').append('<button id="task_create">Create</button>');
    $('#new_task').append('<table id="create_task_table"></table>');
    $('#create_task_table').hide();
    $('#create_task_table').append('<tr id="title"></tr>');
    $('#title').append('<td>Title</td>');
    $('#title').append('<td><input id="task_title" class="text"></input></td>');
    $('#create_task_table').append('<tr id="date"></tr>');
    $('#date').append('<td>Date</td>');
    $('#date').append('<td><input id="task_date" class="select" type="date"></input></td>');
    $('#create_task_table').append('<tr id="duration"></tr>');
    $('#duration').append('<td>Duration</td>');
    $('#duration').append('<td><input id="task_duration" class="select" ></input></td>');
    $('#create_task_table').append('<tr id="submit"></tr>');
    $('#duration').append('<td></td><td><button id="task_submit">Submit</button></td>');

    $('#task_create').on('click', function(){
        $('#create_task_table').show();
    })

    $('#task_submit').on('click', function(){
        mainURL = config.url+"/api/task"
        $('#create_task_table').hide();
        $.ajax({
            type: "POST",
            data: {title: $('#task_title').val(), date: $('#task_date').val(), duration: $('#task_duration').val()},
            dataType: "json",
            url: mainURL+'/create',
            success: function (data) {
                var myDate = new Date(data[1][0].date);
                var currentDate = myDate.getDate() +'-'+myDate.getMonth()+'-'+myDate.getFullYear();
                if(todayDate == currentDate) {
                    appendTask(data[1][0], '#tl_table_today');
                } else {
                    appendTask(data[1][0], '#tl_table_other');
                }
            }
        })
    })

    appendTask = function(task, place){
        var myDate = new Date(task.date);
        var currentDate = myDate.getDate() +'-'+myDate.getMonth()+'-'+myDate.getFullYear();
        $(place).append('<tr id="' + task.id + '"><td>' + task.title + '</td>' +
            '<td>' + currentDate + '</td>' +
            '<td id="duration_' + task.id + '">' + task.duration + '</td>' +
            '<td id="status_' + task.id + '" class="task-' + task.status + '">' + task.status + '</td>' +
            '<td><button id="start">Start</button>' +
            '<button id="edit">Edit</button>' +
            '<button id="delete">Delete</button></td></tr>')
    }


}