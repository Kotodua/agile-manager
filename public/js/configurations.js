/**
 * Created by k.allakhvierdov on 4/2/2015.
 */
function configurations(){

    mainURL = config.url+"/api/configurations";
    var verifier = new Verifier();
    var activeElement;


    var treeConfigs = dhtmlXTreeFromHTML("treebox_configurations","100%","100%",0);
    treeConfigs.enableTreeLines(true);
    treeConfigs.setImagePath("vendor/dhtmlx/sources/dhtmlxTree/codebase/imgs/dhxtree_terrace/");

    var treeLists = dhtmlXTreeFromHTML("treebox_lists","100%","100%",0);
    treeLists.enableTreeLines(true);
    treeLists.setImagePath("vendor/dhtmlx/sources/dhtmlxTree/codebase/imgs/dhxtree_terrace/");


    drawConfs(treeConfigs, treeLists);


    function drawConfs(treeConfigs, treeLists){
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

                treeConfigs.loadJSArray(arrFolders);


                for (var i = 0; i < allData.conf_list.length; i++){
                    treeLists.insertNewItem(0, allData.conf_list[i].id+'_list', allData.conf_list[i].name, 0, 0, 0, 0);
                    for (var j = 0; j < allData.conf_listitems.length; j++){
                        if (allData.conf_list[i].id == allData.conf_listitems[j].lid) {
                            treeLists.insertNewItem(allData.conf_listitems[j].lid+'_list', allData.conf_listitems[j].id, allData.conf_listitems[j].name, 0, 0, 0, 0);
                        treeLists.insertNewItem()
                        }
                    }
                }
            }
        })
    }
}

