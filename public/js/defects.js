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


   /* function showDefectInfo(id){
        $('#d-id').val(id);
        console.log(defects2);

        for (var pn in defects2){
            console.log(pn);
            console.log(defects2.pn);

        }
        $('#d-status').val(id);
    }*/


    function drawDefects() {
        $.ajax({
            type: "GET",
            dataType: "html",
            url: mainURL + '/getDefects',
            success: function (data) {
                var allData = JSON.parse(data);
                defects = allData.defect;

               /* defects2 = allData.defect.reduce(function(previousValue, currentDigit, currentIndex, array){
                    previousValue[array[currentIndex].id+'_some'] = array[currentIndex];
                    return  previousValue;
                }, {});*/

                user = allData.user.reduce(function(previousValue, currentDigit, currentIndex, array){
                    previousValue[array[currentIndex].id] = array[currentIndex].pname;
                    return  previousValue;
                }, {});

                status = allData.defect_status.reduce(function(previousValue, currentDigit, currentIndex, array){
                    previousValue[array[currentIndex].id] = array[currentIndex].name;
                    return  previousValue;
                }, {});

                severity = allData.defect_severity.reduce(function(previousValue, currentDigit, currentIndex, array){
                    previousValue[array[currentIndex].id] = array[currentIndex].name;
                    return  previousValue;
                }, {});

                type = allData.defect_type.reduce(function(previousValue, currentDigit, currentIndex, array){
                    previousValue[array[currentIndex].id] = array[currentIndex].name;
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
