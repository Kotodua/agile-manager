/**
 * Created by Konstantin on 4/21/2015.
 */

function defects() {
    mainURL = config.url + "/api/defects";
    var verifier = new Verifier();
    var defects, user, status, severity, type, feature, defects2, sessionUser, selectedId;
    drawDefects();
    filtering();

    $("body").on("click", 'tr[id^="defect_"]', function () {
        var id = $(this).prop("id");
        id = id.split('_');
        $('#submit').val("Update");
        selectedId = parseInt(id[1]);
        $('#d-l-description').val(defects2[selectedId].description);
        $('#d-l-summary').val(defects2[selectedId].summary);
        $('#d-l-comments').val(defects2[selectedId].comments);
        $("#d-edit").attr('disabled', false);
    });

    $("body").on("dblclick", 'tr[id^="defect_"]', function () {
        var id = $(this).prop("id");
        id = id.split('_');
        selectedId = parseInt(id[1]);
        showForm();
        showDefectInfo(selectedId);
        $('.defect-dialog .ui-button-text:contains(Submit)').text('Update');
    })

    $('#ewDefectForm').validate({
        rules: {
            d_summary: "required"
        }
    });


    function getDate() {
        var d = new Date();
        var min = '' + d.getMinutes();
        var hour = '' + d.getHours()
        if (min.length < 2) min = '0' + min;
        if (hour.length < 2) hour = '0' + hour;
        return user[sessionUser] + ' ' + d.getFullYear() + '-' + (parseInt(d.getMonth()) + 1) + '-' + d.getUTCDate() + ' ' + hour + ':' + min + ':\n\n\n';
    }

    $('#insert-comment').on("click", function () {
        var comment = $('#d-comments').val();
        $('#d-comments').val(getDate() + comment);
    })


    $('#newDefect').hide();

    $('#clear').on("click", function () {
        $('#d_id').val("");
        $('#d-status').val("1");
        $('#d-severity').val("1");
        $('#d_summary').val("");
        $('#d-l-summary').val("");
        $('#d-description').val("");
        $('#d-l-description').val("");
        $('#d-priority').val("");
        $('#d-developer').val("");
        $('#d-build-found').val("");
        $('#d-build-fixed').val("");
        $('#d-comments').val("");
        $('#d-l-comments').val("");
        $('#submit').val("Submit");
        newDefect();
    });

    $('#d-edit').on("click", function () {
        showForm();
        showDefectInfo(selectedId);
        $('.defect-dialog .ui-button-text:contains(Submit)').text('Update');
    });


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



    function showDefectInfo(id) {

        $('#d_id').val(id);
        $('#d_summary').val(defects2[id].summary);
        $('#d-description').val(defects2[id].description);
        $('#d-reporter').val(user[defects2[id].rid]);
        $('#d-comments').val(defects2[id].comments);
        $('#d-build-found').val(defects2[id].bdetected);
        $('#d-build-fixed').val(defects2[id].bfixed);

        $('#d-status').val(defects2[id].sid);
        $('#d-status').selectmenu('refresh', true);
        $('#d-severity').val(defects2[id].sevid);
        $('#d-severity').selectmenu('refresh', true);
        $('#d-priority').val(defects2[id].pid);
        $('#d-priority').selectmenu('refresh', true);
        $('#d-type').val(defects2[id].tid);
        $('#d-type').selectmenu('refresh', true);
        $('#d-feature').val(defects2[id].fid);
        $('#d-feature').selectmenu('refresh', true);
        $('#d-developer').val(defects2[id].did);
        $('#d-developer').selectmenu('refresh', true);



    }


    function postDefect() {
        var data;
        //console.log(sid);
        $.ajax({
            type: "POST",
            data: {
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
            },
            dataType: "json",
            url: mainURL + '/postDefect',
            success: function (res) {
                console.log(res.insertId);
            }
        })
    }

    function updateDefect(id) {
        $.ajax({
            type: "POST",
            data: {
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
            },
            dataType: "json",
            url: mainURL + '/postDefect/' + id,
            success: function (res) {
                console.log(res);
            }
        })
    }


    function drawDefect(i) {
        var html = '<tr id=defect_' + defects[i].id + '>' +
            '<td id="td_id">' + defects[i].id + '</td>' +
            '<td id="td_summary">' + defects[i].summary + '</td>' +
            '<td id="td_status">' + status[defects[i].sid] + '</td>' +
            '<td id="td_sev">' + severity[defects[i].sevid] + '</td>' +
            '<td id="td_p">' + defects[i].pid + '</td>' +
            '<td id="td_r">' + user[defects[i].rid] + '</td>' +
            '<td id="td_d">' + user[defects[i].did] + '</td>' +
            '<td id="td_db">' + defects[i].bdetected + '</td>' +
            '<td id="td_bf">' + defects[i].bfixed + '</td>' +
            '<td id="td_t">' + type[defects[i].tid] + '</td>' +
            '<td id="td_f">' + feature[defects[i].fid] + '</td>' +
            '</tr>'
        $('#d-list').append(html);
        $('#d-reporter').val(user[sessionUser]);

    }


    function newDefect() {
        $('#d-reporter').val(user[sessionUser]);
        showForm();

/*        $('.defect-dialog .ui-button-text:contains(Submit)').attr("disabled", true)
            .addClass("ui-state-disabled");
        $('.defect-dialog .ui-button-text:contains(Cancel)').button("disable");*/
    }

    function showForm() {
        $('#newDefect').dialog({
            modal: true,
            dialogClass: 'defect-dialog',
            buttons: {
                Cancel: function () {
                    $(this).dialog("close");
                },
                Submit: function () {
                    if ($('#d_id').val() == '') {
                        postDefect();
                    } else {
                        updateDefect($('#d_id').val());
                    }
                }
            },
            width: "25%"
        })

        $(".ui-button-text button:contains('Submit')").button("disable");

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
                defects = allData.defect;
                sessionUser = allData.currentUser;


                defects2 = allData.defect.reduce(function(previousValue, currentDigit, currentIndex, array){
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

                for (var i = 0; i < defects.length; i++){
                     drawDefect(i);





                }

                resizeTable()


                $( "#tabs" ).tabs();


            }
        })
    }
}
