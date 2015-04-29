/**
 * Created by Konstantin on 4/21/2015.
 */

function defects() {
    mainURL = config.url + "/api/defects";
    var verifier = new Verifier();
    var defects, user, status, severity, type, feature, sessionUser, selectedId;
    drawDefects();
    filtering();

    $('#d-new').on("click", function () {
        showForm();
        showNewDefectInfo()
    });

    $("body").on("click", 'tr[id^="defect_"]', function () {

        $('tr[id^="defect_"]').attr('class', 'd-regular');
        var id = $(this).prop("id");
        id = id.split('_');
        $('#submit').val("Update");
        selectedId = parseInt(id[1]);
        $('#d-l-description').val(defects[selectedId].description);
        $('#d-l-summary').val(defects[selectedId].summary);
        $('#d-l-comments').val(defects[selectedId].comments);
        $("#d-edit").attr('disabled', false);
        console.log(defects[selectedId]);
        $(this).attr('class', 'defect-selected');
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

    function refeshDefectFields(){
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
        refeshDefectFields();
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
        refeshDefectFields()
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
                drawDefect(data);
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
        $('#defect_'+id).remove();
        drawDefect(data);
    }


    function drawDefect(defect) {
        var html = '<tr class="d-regular" id=defect_' + defect.id + '>' +
            '<td id="td_id">' + defect.id + '</td>' +
            '<td id="td_summary">' + defect.summary + '</td>' +
            '<td id="td_status">' + status[defect.sid] + '</td>' +
            '<td id="td_sev">' + severity[defect.sevid] + '</td>' +
            '<td id="td_p">' + defect.pid + '</td>' +
            '<td id="td_r">' + user[defect.rid] + '</td>' +
            '<td id="td_d">' + user[defect.did] + '</td>' +
            '<td id="td_db">' + defect.bdetected + '</td>' +
            '<td id="td_bf">' + defect.bfixed + '</td>' +
            '<td id="td_t">' + type[defect.tid] + '</td>' +
            '<td id="td_f">' + feature[defect.fid] + '</td>' +
            '</tr>'
        $('#d-list').append(html);
        $('#d-reporter').val(user[sessionUser]);
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
                    text: "Cancel"
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


    function resizeTable() {
        // Change the selector if needed
        var $table = $('table.table'),
            $bodyCells = $table.find('thead tr:first').children(),
            colWidth;

        // Adjust the width of thead cells when window resizes
        $(window).resize(function () {
            // Get the tbody columns width array
            colWidth = $bodyCells.map(function () {
                return $(this).width();
            }).get();

            // Set the width of thead columns
            $table.find('tbody tr').children().each(function (i, v) {
                $(v).width(colWidth[i]);
            });
        }).resize(); // Trigger resize handler
    }


    function drawDefects() {
        $.ajax({
            type: "GET",
            dataType: "html",
            url: mainURL + '/getDefects',
            success: function (data) {
                var allData = JSON.parse(data);
                sessionUser = allData.currentUser;
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

                for( var key in defects){
                    if(defects.hasOwnProperty(key)){
                        drawDefect(defects[key]);
                    }
                }

                resizeTable()
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




    function filtering() {
        //------------------------filtering
        $('.filterable .filters input').keyup(function (e) {
            /* Ignore tab key */
            var code = e.keyCode || e.which;
            if (code == '9') return;
            /* Useful DOM data and selectors */
            var $input = $(this),
                inputContent = $input.val().toLowerCase(),
                $panel = $input.parents('.filterable'),
                column = $panel.find('.filters th').index($input.parents('th')),
                $table = $panel.find('.table'),
                $rows = $table.find('tbody tr');
            /* Dirtiest filter function ever ;) */
            var $filteredRows = $rows.filter(function () {
                var value = $(this).find('td').eq(column).text().toLowerCase();
                return value.indexOf(inputContent) === -1;
            });
            /* Clean previous no-result if exist */
            $table.find('tbody .no-result').remove();
            /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
            $rows.show();
            $filteredRows.hide();
            /* Prepend no-result row if all rows are filtered */
            if ($filteredRows.length === $rows.length) {
                $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
            }
        });
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

