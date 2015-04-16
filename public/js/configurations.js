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
        tree.attachEvent("onDrop", function(sId, tId, id, sObject, tObject){
            var parentTreeId = tObject.parentObject.id.split('_');
            var idFrom = treeLists.getParentId(treeLists.getSelectedItemId()).split('_');
            var liid = splitId(sId+'_', '_');
            var targetTree;
            var tl = parentTreeId[1];
            if (tl == 'top'){
                tl = 1;
                targetTree = treeTop;
            } else if(tl == 'left'){
                tl = 0;
                targetTree = treeLeft;
            }
            tree.deleteItem(sId);
            moveListItemToConfiguration(activeConfigurationElement, tId, idFrom[0], liid, tl, targetTree);
        });
        tree.attachEvent("onSelect", function(id){
            console.log('selected '+id);
        });

    }

    function splitId(item, symbol){
        if(item.indexOf(symbol) === -1)
        {
            return item;
        } else {
           var result = item.split(symbol);
           return result[0];
        }
    }


    function moveListItemToConfiguration(cid, ppid, lid, liid, tl, tTree){

        $.ajax({
            type: "POST",
            data: {cid: cid, ppid: ppid, lid: lid, liid: liid, tl: tl},
            dataType: "json",
            url: mainURL + '/moveItemToConfig',
            success: function (res) {
                console.log(res.insertId);
                tTree.insertNewItem(ppid, res.insertId, treeLists.getItemText(liid),0,0,0,0,'SELECT');

            }
        })
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

    function getConfInfo(id, treeList, treeTop, treeLeft){
        $.ajax({
            type: "GET",
            dataType: "html",
            url: mainURL + '/getConfInfo/'+id,
            success: function (data) {
                var allData = JSON.parse(data);
                var listName;
                var listItemName;
                $('#config-matrix-table tr').remove();


                for (var i = 0; i < allData.conf_items.length ; i++){
                    if (allData.conf_items[i].tl == '0'){

                        for (var j = 0; j < allData.conf_lists.length; j++){
                            if (allData.conf_items[i].lid == allData.conf_lists[j].id){
                                listName = allData.conf_lists[j].name;

                            }
                        }
                        for (var k = 0; k < allData.conf_listitems.length; k++){
                            if (allData.conf_items[i].liid == allData.conf_listitems[k].id){
                                listItemName = allData.conf_listitems[k].name;
                                //$('#config-matrix-table').append('<tr><td class="td-border">'+allData.conf_listitems[k].name+'</td></tr>');
                            }
                        }
                        drawListElement(treeLeft, listItemName, listName, allData.conf_items[i].ppid, allData.conf_items[i].id);
                    }

                    if (allData.conf_items[i].tl == '1') {
                        for (var j = 0; j < allData.conf_lists.length; j++){
                            if (allData.conf_items[i].lid == allData.conf_lists[j].id){
                                listName = allData.conf_lists[j].name;

                            }
                        }
                        for (var k = 0; k < allData.conf_listitems.length; k++){
                            if (allData.conf_items[i].liid == allData.conf_listitems[k].id){
                                listItemName = allData.conf_listitems[k].name;
                                //$('#1').append('<td class="td-border">'+allData.conf_listitems[k].name+'</td>');
                            }
                        }
                        drawListElement(treeTop, listItemName, listName, allData.conf_items[i].ppid, allData.conf_items[i].id);
                    }
                }



                /////////////////////////////////////////////////////////       MATRIX Experiments
/*                //console.log(treeTop.getAllFatItems());
                var list = treeTop.getAllFatItems();

                var listAll = treeTop.getAllLeafs();

                console.log(list);
                console.log(listAll);

                var listOfItems = list.split(',');

                function getFatElements(listOfItems){
                    for (var i = 0; i < listOfItems.length; i++){
                        $('#config-matrix-table').append('<tr></tr>');
                        console.log(listOfItems[i]);
                        console.log('name is '+treeTop.getItemText(listOfItems[i]) ); //  getIdByIndex(listOfItems[i]));
                    }
                }

                function getLeafsElements(listOfItems){
                    for (var i = 0; i < listOfItems.length; i++){
                        console.log(listOfItems[i]);
                        console.log('name is '+treeTop.getItemText(listOfItems[i]) ); //  getIdByIndex(listOfItems[i]));
                    }
                }*/





            }
        })
    }

    function drawListElement(tree, name, hint, parent, position){
        tree.insertNewItem(parent, position, name, 0, 0, 0, 0);
        tree.setItemText(position, name , hint);

    }
}

