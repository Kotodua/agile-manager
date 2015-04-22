/**
 * Created by Konstantin on 4/21/2015.
 */

function defects() {
    mainURL = config.url + "/api/defects";
    var verifier = new Verifier();
    var defects;
    var user;
    var status;
    var severity;
    var type;
    var feature;
    var defects2;
    drawDefects();


    $("body").on("click",'tr[id^="defect_"]', function(){
        var id = $(this).prop("id");
        id = id.split('_');
        showDefectInfo(parseInt(id[1]))

    });

    $('#new').on("click", function(){
        $('#d-id').val("");
        $('#d-status').val("1");
        $('#d-severity').val("1");
        $('#d-summary').val("");
        $('#d-description').val("");
        $('#d-priority').val("");
        $('#d-reporter').val("");
        $('#d-developer').val("");
        $('#d-build-found').val("");
        $('#d-build-fixed').val("");
        $('#d-comments').val("");
    });

    function showDefectInfo(id){
        console.log(defects2[id]);
        $('#d-id').val(id);
        $('#d-status').val(defects2[id].sid);
        $('#d-severity').val(defects2[id].sevid);
        $('#d-summary').val(defects2[id].summary);
        $('#d-description').val(defects2[id].description);
        $('#d-priority').val(defects2[id].pid);
        $('#d-reporter').val(user[defects2[id].rid]);
        $('#d-developer').val(defects2[id].did);
        $('#d-build-found').val(defects2[id].bdetected);
        $('#d-build-fixed').val(defects2[id].bfixed);
        $('#d-comments').val(defects2[id].comments);
    }


    function drawDefects() {
        $.ajax({
            type: "GET",
            dataType: "html",
            url: mainURL + '/getDefects',
            success: function (data) {
                var allData = JSON.parse(data);
                defects = allData.defect;

                defects2 = allData.defect.reduce(function(previousValue, currentDigit, currentIndex, array){
                    previousValue[array[currentIndex].id] = array[currentIndex];
                    return  previousValue;
                }, {});

                user = allData.user.reduce(function(previousValue, currentDigit, currentIndex, array){
                    previousValue[array[currentIndex].id] = array[currentIndex].pname;
                    $('#d-developer').append($('<option>', {
                        value: array[currentIndex].id,
                        text: array[currentIndex].pname
                    }));
                    return  previousValue;
                }, {});

                status = allData.defect_status.reduce(function(previousValue, currentDigit, currentIndex, array){
                    previousValue[array[currentIndex].id] = array[currentIndex].name;
                    //$('#d-status option[value='+array[currentIndex].name+']');
                    $('#d-status').append($('<option>', {
                        value: array[currentIndex].id,
                        text: array[currentIndex].name
                    }));
                    return  previousValue;
                }, {});

                severity = allData.defect_severity.reduce(function(previousValue, currentDigit, currentIndex, array){
                    previousValue[array[currentIndex].id] = array[currentIndex].name;
                    $('#d-severity').append($('<option>', {
                        value: array[currentIndex].id,
                        text: array[currentIndex].name
                    }));
                    return  previousValue;
                }, {});

                type = allData.defect_type.reduce(function(previousValue, currentDigit, currentIndex, array){
                    previousValue[array[currentIndex].id] = array[currentIndex].name;
                    $('#d-type').append($('<option>', {
                        value: array[currentIndex].id,
                        text: array[currentIndex].name
                    }));
                    return  previousValue;
                }, {});

                feature = allData.feature.reduce(function(previousValue, currentDigit, currentIndex, array){
                    previousValue[array[currentIndex].id] = array[currentIndex].name;
                    return  previousValue;
                }, {});



                for (var i = 0; i < defects.length; i++){

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

                }

            }
        })
    }
}
