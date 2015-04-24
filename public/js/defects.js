/**
 * Created by Konstantin on 4/21/2015.
 */

function defects() {
    mainURL = config.url + "/api/defects";
    var verifier = new Verifier();
    var defects, user, status, severity, type, feature, defects2, sessionUser;

    drawDefects();
    filtering();

    $("body").on("click",'tr[id^="defect_"]', function(){
        var id = $(this).prop("id");
        id = id.split('_');
        $('#submit').val("Update");
        showDefectInfo(parseInt(id[1]));
    });

    $('#clear').on("click", function(){
        $('#d-id').val("");
        $('#d-status').val("1");
        $('#d-severity').val("1");
        $('#d-summary').val("");
        $('#d-description').val("");
        $('#d-priority').val("");
        $('#d-reporter').val(user[sessionUser]);
        $('#d-developer').val("");
        $('#d-build-found').val("");
        $('#d-build-fixed').val("");
        $('#d-comments').val("");
        $('#submit').val("Submit");
    });

    $('#submit').on("click", function(){
        if($('#d-id').val() == ''){
            postDefect();
        } else {
            updateDefect($('#d-id').val());
        }
    })

    function filtering(){
        //------------------------filtering
        $('.filterable .filters input').keyup(function(e){
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
            var $filteredRows = $rows.filter(function(){
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
                $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="'+ $table.find('.filters th').length +'">No result found</td></tr>'));
            }
        });


    }

    function showDefectInfo(id){
        console.log(defects2[id].feature);
        $('#d-id').val(id);
        $('#d-status').val(defects2[id].sid);
        $('#d-severity').val(defects2[id].sevid);
        $('#d-summary').val(defects2[id].summary);
        $('#d-description').val(defects2[id].description);
        $('#d-priority').val(defects2[id].pid);
        $('#d-reporter').val(user[defects2[id].rid]);
        $('#d-type').val(defects2[id].tid);
        $('#d-feature').val(defects2[id].fid);
        $('#d-developer').val(defects2[id].did);
        $('#d-build-found').val(defects2[id].bdetected);
        $('#d-build-fixed').val(defects2[id].bfixed);
        $('#d-comments').val(defects2[id].comments);
    }


    function postDefect(){
        var data;
        //console.log(sid);
        $.ajax({
            type: "POST",
            data: {
                sid: $('#d-status').val(),
                summary: $('#d-summary').val(),
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

    function updateDefect(id){
        $.ajax({
            type: "POST",
            data: {
                sid: $('#d-status').val(),
                summary: $('#d-summary').val(),
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
            url: mainURL + '/postDefect/'+id,
            success: function (res) {
                console.log(res);

            }
        })
    }


    function drawDefect(i){
        var html = '<tr id=defect_'+defects[i].id+'>' +
            '<td>'+defects[i].id+'</td>' +
            '<td>'+defects[i].summary+'</td>' +
            '<td>'+status[defects[i].sid]+'</td>' +
            '<td>'+severity[defects[i].sevid]+'</td>' +
            '<td>'+defects[i].pid+'</td>' +
            '<td>'+user[defects[i].rid]+'</td>' +
            '<td>'+user[defects[i].did]+'</td>' +
            '<td>'+defects[i].bdetected+'</td>' +
            '<td>'+defects[i].bfixed+'</td>' +
            '<td>'+type[defects[i].tid]+'</td>' +
            '<td>'+feature[defects[i].fid]+'</td>' +
            '</tr>'
        $('#d-list').append(html);
        $('#d-reporter').val(user[sessionUser]);
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

                // Change the selector if needed
                var $table = $('table.table'),
                    $bodyCells = $table.find('thead tr:first').children(),
                    colWidth;

                // Adjust the width of thead cells when window resizes
                $(window).resize(function() {
                    // Get the tbody columns width array
                    colWidth = $bodyCells.map(function() {
                        return $(this).width();
                    }).get();

                    // Set the width of thead columns
                    $table.find('tbody tr').children().each(function(i, v) {
                        $(v).width(colWidth[i]);
                    });
                }).resize(); // Trigger resize handler
            }
        })
    }
}
