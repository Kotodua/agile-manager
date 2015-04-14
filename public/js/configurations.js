/**
 * Created by k.allakhvierdov on 4/2/2015.
 */
function configurations(){

    mainURL = config.url+"/api/configurations";
    var verifier = new Verifier();


    drawConfs();


    function drawConfs(){
        $.ajax({
            type: "GET",
            dataType: "html",
            url: mainURL + '/getConfs',
            success: function (data) {
                var allData = JSON.parse(data);



                for (var i = 0; i < allData.conf_configurations.length; i++){
                    $('#configurations').append('<div>'+allData.conf_configurations[i].name+'</div></br>');
                }

                for (var i = 0; i < allData.conf_list.length; i++){
                    $('#list').append('<div>'+allData.conf_list[i].name+'</div></br>');
                    for (var j = 0; j < allData.conf_listitems.length; j++){
                        if (allData.conf_list[i].id == allData.conf_listitems[j].lid)
                        $('#list').append('<div>'+allData.conf_listitems[j].name+'</div></br>');
                    }
                }


            }
        })
    }
}

