/**
 * Created by k.allakhvierdov on 4/2/2015.
 */
function configurations(){

    mainURL = config.url+"/api/configurations";
    var verifier = new Verifier();
    var activeConfigurationElement;


    var treeConfigs = dhtmlXTreeFromHTML("treebox_configurations","100%","100%",0);
    treeConfigs.enableTreeLines(true);
    treeConfigs.setImagePath("vendor/dhtmlx/sources/dhtmlxTree/codebase/imgs/dhxtree_terrace/");

    var treeLists = dhtmlXTreeFromHTML("treebox_lists","100%","100%",0);
    initiateTree(treeLists);

    var treeTop = dhtmlXTreeFromHTML("treebox_top","100%","100%",0);
    initiateTree(treeTop);

    var treeLeft = dhtmlXTreeFromHTML("treebox_left","100%","100%",0);
    initiateTree(treeLeft);



    drawConfs(treeConfigs, treeLists);
    treeLists.enableDragAndDrop(true);

    treeConfigs.attachEvent("onSelect", function(id){
       //console.log(id);
       activeConfigurationElement = id;
        treeTop.deleteChildItems('0');
        treeLeft.deleteChildItems('0');
       getConfInfo(id, treeLists, treeTop, treeLeft);

    });

    function initiateTree(tree){
        tree.enableTreeLines(true);
        tree.setImagePath("vendor/dhtmlx/sources/dhtmlxTree/codebase/imgs/dhxtree_terrace/");
        tree.enableDragAndDrop(true);
        tree.enableMercyDrag(true);
        tree.setDragHandler(function(idMoveFrom, idMoveTo){
            moveListItemToConfiguration(idMoveFrom, idMoveTo);
            console.log('id move from: '+idMoveFrom);
            console.log('id move to: '+idMoveTo);
            return true;
        });
    }


// ----------------- DOESN'T WORK
    function moveListItemToConfiguration(idMoveFrom, idMoveTo){
        //  cid: activeConfigurationElement
        // ppid: idMoveTo
        //  pid: AI
        //  lid: <got>
        var idFrom = treeLists.getParentId(treeLists.getSelectedItemId()).split('_');
        console.log('PARENT ID: '+idFrom[0]);
        // liid: idMoveFrom
        // tl:
        //var idTo = idMoveTo//treeLists.getParentId(treeLists.getSelectedItemId()).split('_');
    }



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
                        }
                    }
                }
            }
        })
    }

    function getConfInfo(id, treeLists, treeTop, treeLeft){
        $.ajax({
            type: "GET",
            dataType: "html",
            url: mainURL + '/getConfInfo/'+id,
            success: function (data) {
                var allData = JSON.parse(data);
                var positionLeft = 0;
                var positionTop = 0;

                var tableElement = {};
                var configTable;

                for (var i = allData.length; i > 0 ; i--){
                    if (allData[i-1].tl == '0'){
                        drawListElement(treeLeft, allData[i-1].liid, allData[i-1].lid, allData[i-1].ppid, allData[i-1].pid);
                    }
                    if (allData[i-1].tl == '1') {
                        drawListElement(treeTop, allData[i-1].liid, allData[i-1].lid, allData[i-1].ppid, allData[i-1].pid);
                    }
                }
            }
        })
    }

    function drawListElement(tree, elementId, listId, parent, position){
        $.ajax({
            type: "GET",
            dataType: "html",
            url: mainURL + '/getListElement/' + elementId +'/' + listId,
            success: function (data) {
                var allData = JSON.parse(data);

                console.log('name = '+allData.conf_listitems[0].name+'    parent = '+parent+'   position = '+position);

                tree.insertNewItem(parent, position, allData.conf_listitems[0].name, 0, 0, 0, 0);
                tree.setItemText(position, allData.conf_listitems[0].name ,allData.conf_list[0].name);

            }
        });
    }
}

