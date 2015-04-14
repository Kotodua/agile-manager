/**
 * Created by k.allakhvierdov on 4/2/2015.
 */
function configurations(){

    mainURL = config.url+"/api/configurations";
    var verifier = new Verifier();


    var treeConfigs = dhtmlXTreeFromHTML("treebox_configurations","100%","100%",0);
    treeConfigs.enableTreeLines(true);

    var activeElement;

    treeConfigs.setImagePath("vendor/dhtmlx/sources/dhtmlxTree/codebase/imgs/dhxtree_terrace/");



    drawConfs(treeConfigs);


    function drawConfs(tree){
        $.ajax({
            type: "GET",
            dataType: "html",
            url: mainURL + '/getConfs',
            success: function (data) {
                var allData = JSON.parse(data);

                var arrFolders = [];

                //--------------- Drawing Folders
                for (var i = 0; i < allData.conf_configurations.length; i++){
                    arrFolders.push([allData.conf_configurations[i].id,0,allData.conf_configurations[i].name]);
                }
                tree.loadJSArray(arrFolders);


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

