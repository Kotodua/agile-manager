/**
 * Created by Konstantin on 4/21/2015.
 */

function defects() {
    mainURL = config.url + "/api/defects";
    var defects, user, status, severity, type, feature, sessionUser, selectedId, table;
    drawDefects();


    $('#d-new').on("click", function () {
        showForm();
        showNewDefectInfo()
    });



    $("body").on("click", 'tr[id^="defect_"]', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }

        var id = $(this).prop("id");
        id = id.split('_');
        $('#submit').val("Update");
        selectedId = parseInt(id[1]);
        $('#d-l-description').val(defects[selectedId].description);
        $('#d-l-summary').val(defects[selectedId].summary);
        $('#d-l-comments').val(defects[selectedId].comments);
        $("#d-edit").attr('disabled', false);
        console.log(defects[selectedId]);

    });

    $("body").on("dblclick", 'tr[id^="defect_"]', function () {
        var id = $(this).prop("id");
        id = id.split('_');
        selectedId = parseInt(id[1]);
        showForm();
        showDefectInfo(selectedId);
        $('.defect-dialog .ui-button-text:contains(Submit)').text('Update');
    })


     $('#newDefect').hide();

    $('#d-edit').on("click", function () {
        showForm();
        showDefectInfo(selectedId);
        $('.defect-dialog .ui-button-text:contains(Submit)').text('Update');
    });

    function refreshDefectFields(){
        $('#d-status').selectmenu('refresh', true);
        $('#d-severity').selectmenu('refresh', true);
        $('#d-priority').selectmenu('refresh', true);
        $('#d-type').selectmenu('refresh', true);
        $('#d-feature').selectmenu('refresh', true);
        $('#d-developer').selectmenu('refresh', true);

    }

    function showDefectInfo(id) {
        $('#d_id').val(id);
        $('#d_summary').val(defects[id].summary);
        $('#d-description').val(defects[id].description);
        $('#d-reporter').val(user[defects[id].rid]);
        $('#d-comments').val(defects[id].comments);
        $('#d-build-found').val(defects[id].bdetected);
        $('#d-build-fixed').val(defects[id].bfixed);
        $('#d-status').val(defects[id].sid);
        $('#d-severity').val(defects[id].sevid);
        $('#d-priority').val(defects[id].pid);
        $('#d-type').val(defects[id].tid);
        $('#d-feature').val(defects[id].fid);
        $('#d-developer').val(defects[id].did);
        refreshDefectFields();
    }

    function showNewDefectInfo(){
        $('#d-reporter').val(user[sessionUser]);
        $('#d_id').val("");
        $('#d-status').val("1");
        $('#d-severity').val("1");
        $('#d_summary').val("");
        $('#d-l-summary').val("");
        $('#d-description').val("");
        $('#d-l-description').val("");
        $('#d-priority').val("1");
        $('#d-developer').val(sessionUser);
        $('#d-build-found').val("");
        $('#d-build-fixed').val("");
        $('#d-comments').val("");
        $('#d-l-comments').val("");
        $('#submit').val("Submit");
        refreshDefectFields();
    }

    function postDefect() {
        var data = {
            sid: $('#d-status').val(),
            summary: $('#d_summary').val(),
            description: $('#d-description').val(),
            pid: $('#d-priority').val(),
            rid: $('#d-reporter').val(),
            did: $('#d-developer').val(),
            bdetected: $('#d-build-found').val(),
            bfixed: $('#d-build-fixed').val(),
            sevid: $('#d-severity').val(),
            comments: $('#d-comments').val(),
            fid: $('#d-feature').val(),
            tid: $('#d-type').val()
        }
        $.ajax({
            type: "POST",
            data: data,
            dataType: "json",
            url: mainURL + '/postDefect',
            success: function (res) {
                data.id = res.insertId;
                data.rid = sessionUser;
                var key = res.insertId;
                defects[key] = data;
                $('#d-list').DataTable().row.add({
                        "id":       data.id,
                        "summary":  data.summary,
                        "status":   status[data.sid],
                        "sev": severity[data.sevid],
                        "pid": data.pid,
                        "rname": user[sessionUser],
                        "dname":user[data.did],
                        "bdetected" :data.bdetected,
                        "bfixed"    :data.bfixed,
                        "type"     :type[data.tid],
                        "feature"  :feature[data.fid]
            }).draw();
            }
        })
    }


    function updateDefect(id) {
        var data = {
            sid: $('#d-status').val(),
            summary: $('#d_summary').val(),
            description: $('#d-description').val(),
            pid: $('#d-priority').val(),
            did: $('#d-developer').val(),
            bdetected: $('#d-build-found').val(),
            bfixed: $('#d-build-fixed').val(),
            sevid: $('#d-severity').val(),
            comments: $('#d-comments').val(),
            fid: $('#d-feature').val(),
            tid: $('#d-type').val()
        }
        $.ajax({
            type: "POST",
            data: data,
            dataType: "json",
            url: mainURL + '/postDefect/' + id,
            success: function (res) {
            }
        })
        data.id = id;
        data.rid = sessionUser;
        defects[id] = data;
        $('#d-list').DataTable().row( $('#defect_'+id)).remove().draw();
        $('#d-list').DataTable().row.add({
            "id":       data.id,
            "summary":  data.summary,
            "status":   status[data.sid],
            "sev": severity[data.sevid],
            "pid": data.pid,
            "rname": user[sessionUser],
            "dname":user[data.did],
            "bdetected" :data.bdetected,
            "bfixed"    :data.bfixed,
            "type"     :type[data.tid],
            "feature"  :feature[data.fid]
        }).draw();
        $('#d-l-comments').val(data.comments);
        $('#d-l-description').val(data.description);
        $('#d-l-summary').val(data.summary);
        $('#defect_'+id).addClass('selected');
    }


    function showForm() {
        $('#newDefect').dialog({
            modal: true,
            dialogClass: 'defect-dialog',
            buttons: {
                Insert:{
                    click: function(){
                        console.log('called insert comment');
                        var comment = $('#d-comments').val();
                        $('#d-comments').val(getDate() + comment);
                    },
                    text: "Insert comment"
                },
                Cancel: {
                    click: function () {
                    $(this).dialog("close");
                    },
                    id: "btn_cancel",
                    text: "Close"
                },
                Submit: {
                    click: function () {
                       $('#d-notification').remove();
                       if ($('#d_id').val() == '') {
                            postDefect();
                           $(".ui-dialog-buttonpane").append("<div id='d-notification'>Defect successfuly Submitted.</div>");
                           showNewDefectInfo()
                           $('#btn_submit').attr("disabled", true).addClass("ui-state-disabled");
                       } else {
                        updateDefect($('#d_id').val());
                        $(".ui-dialog-buttonpane").append("<div id='d-notification'>Defect successfuly Updated.</div>");
                        $('#btn_submit').attr("disabled", true).addClass("ui-state-disabled");
                       }
                    },
                    id: "btn_submit",
                    text: "Submit"
                }
            },
            width: "27%",
            heigth: "40%"
        })

        maxLength();

        $('#btn_submit').attr("disabled", true).addClass("ui-state-disabled");
        $('#newDefect').children().each(function (i, v) {
            $(v).on('change', function(){
                console.log(v + ' changed.')
                $('#btn_submit').attr("disabled", false).removeClass("ui-state-disabled");
                $('#d-notification').remove();
            });
        });
        $("#d-status").selectmenu();
        $("#d-severity").selectmenu();
        $("#d-priority").selectmenu();
        $("#d-developer").selectmenu();
        $("#d-type").selectmenu();
        $("#d-feature").selectmenu();
        $("#newDefect").show('bounce', {}, 500, function callback() {
            setTimeout(function () {
                $("#effect:visible").removeAttr("style").fadeOut();
            }, 1000);
        });
    }



    function drawDefects() {
        $.ajax({
            type: "GET",
            dataType: "html",
            url: mainURL + '/getDefects',
            success: function (data) {
                var allData = JSON.parse(data);
                sessionUser = allData.currentUser;
                var def = allData.defect;


                defects = allData.defect.reduce(function(previousValue, currentDigit, currentIndex, array){
                    previousValue[array[currentIndex].id] = array[currentIndex];

                    return  previousValue;
                }, {});

                user = allData.user.reduce(function(previousValue, currentDigit, currentIndex, array){
                    return  fillArray(previousValue, currentDigit, currentIndex, array, '#d-developer');
                }, {});

                status = allData.defect_status.reduce(function(previousValue, currentDigit, currentIndex, array){
                    return  fillArray(previousValue, currentDigit, currentIndex, array, '#d-status');
                }, {});

                severity = allData.defect_severity.reduce(function(previousValue, currentDigit, currentIndex, array){
                    return  fillArray(previousValue, currentDigit, currentIndex, array, '#d-severity');
                }, {});

                type = allData.defect_type.reduce(function(previousValue, currentDigit, currentIndex, array){
                    return  fillArray(previousValue, currentDigit, currentIndex, array, '#d-type');
                }, {});

                feature = allData.feature.reduce(function(previousValue, currentDigit, currentIndex, array){
                    return fillArray(previousValue, currentDigit, currentIndex, array, '#d-feature');
                }, {});

                def.forEach(function(entry){
                    entry.rname = user[entry.rid];
                    entry.status = status[entry.sid];
                    entry.dname = user[entry.did];
                    entry.sev = severity[entry.sevid];
                    entry.type = type[entry.tid];
                    entry.feature = feature[entry.fid];

                })

                function fillArray(pv, cd, ci, arr, obj){
                    if (obj == '#d-developer'){
                        pv[arr[ci].id] = arr[ci].pname;
                        $(obj).append($('<option>', {
                            value: arr[ci].id,
                            text: arr[ci].pname
                        }))
                    }else {
                        pv[arr[ci].id] = arr[ci].name;
                        $(obj).append($('<option>', {
                            value: arr[ci].id,
                            text: arr[ci].name
                        }))
                    }
                    return  pv;
                }

                table = $('#d-list').DataTable({
                    "scrollY":        "400px",
                    "scrollCollapse": true,
                    data: def,
                    columns: [
                        { data: 'id'},
                        { data: 'summary'},
                        { data: 'status' },
                        { data: 'sev'},
                        { data: 'pid'},
                        { data: 'rname'},
                        { data: 'dname'},
                        { data: 'bdetected'},
                        { data: 'bfixed'},
                        { data: 'type'},
                        { data: 'feature'}
                    ],
                    "sDom": 'Rlfrtip',
                    "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $(nRow).attr("id",'defect_' + aData.id);
                    return nRow;
                    }

                });
            }
        })
    }


    function maxLength(){
        var txts = document.getElementsByTagName('textarea');
        for(var i = 0, l = txts.length; i < l; i++) {
            if(txts[i].getAttribute("maxlength")) {
                var func = function() {
                    var len = parseInt(this.getAttribute("maxlength"), 10);
                    if(this.value.length > len-1) {
                        $('#d-notification').remove();
                        $(".ui-dialog-buttonpane").append("<div id='d-notification'>Max length achieved</div>");
                        this.value = this.value.substr(0, len);
                        return false;
                    } else{
                        $('#d-notification').remove();
                        $(".ui-dialog-buttonpane").append("<div id='d-notification'>Left "+(len-this.value.length)+" symbols</div>");
                    }
                }
                txts[i].onkeyup = func;
                txts[i].onfocus = func;
            } else {
                   $('#d-notification').remove();
            }
        }
    }

    function getDate() {
        var d = new Date();
        var min = '' + d.getMinutes();
        var hour = '' + d.getHours()
        if (min.length < 2) min = '0' + min;
        if (hour.length < 2) hour = '0' + hour;
        return user[sessionUser] + ' ' + d.getFullYear() + '-' + (parseInt(d.getMonth()) + 1) + '-' + d.getUTCDate() + ' ' + hour + ':' + min + ':\n\n\n';
    }
}

