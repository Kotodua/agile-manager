/**
 * Created by k.allakhvierdov on 4/2/2015.
 */

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    //return this; // for testing purposes
};

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

                console.log(allData.conf_items);


                // sorting array by id
                for (var j = 0; j < allData.conf_items.length; j++) {
                    for (var i = 0; i < allData.conf_items.length - 1; i++) {
                        if (allData.conf_items[i].id > allData.conf_items[i + 1].id) {
                            allData.conf_items.move(i, i + 1);
                        }
                    }
                }

                for (var i = 0; i < allData.conf_items.length; i++) {
                    if (allData.conf_items[i].tl == '0') {
                        for (var j = 0; j < allData.conf_lists.length; j++) {
                            if (allData.conf_items[i].lid == allData.conf_lists[j].id) {
                                listName = allData.conf_lists[j].name;
                            }
                        }
                        for (var k = 0; k < allData.conf_listitems.length; k++) {
                            if (allData.conf_items[i].liid == allData.conf_listitems[k].id) {
                                listItemName = allData.conf_listitems[k].name;

                            }
                        }
                        drawListElement(treeLeft, listItemName, listName, allData.conf_items[i].ppid, allData.conf_items[i].id);
                    }

                    if (allData.conf_items[i].tl == '1') {
                        for (var j = 0; j < allData.conf_lists.length; j++) {
                            if (allData.conf_items[i].lid == allData.conf_lists[j].id) {
                                listName = allData.conf_lists[j].name;

                            }
                        }
                        for (var k = 0; k < allData.conf_listitems.length; k++) {
                            if (allData.conf_items[i].liid == allData.conf_listitems[k].id) {
                                listItemName = allData.conf_listitems[k].name;
                            }
                        }
                        drawListElement(treeTop, listItemName, listName, allData.conf_items[i].ppid, allData.conf_items[i].id);
                    }
                }

                // sorting array by pid
                for (var j = 0; j < allData.conf_items.length; j++) {
                    for (var i = 0; i < allData.conf_items.length - 1; i++) {
                        if (allData.conf_items[i].ppid > allData.conf_items[i + 1].ppid) {
                            allData.conf_items.move(i, i + 1);
                        }
                    }
                }


                var map = {}, node, roots = [];
                for (var i = 0; i < allData.conf_items.length; i += 1) {
                    node = allData.conf_items[i];
                    node.children = [];
                    map[node.id] = i; // use map to look-up the parents
                    if (node.ppid !== 0) {
                        allData.conf_items[map[node.ppid]].children.push(node);
                    } else {
                        roots.push(node);
                    }
                }

                for (i = 0; i < roots.length; i++){
                    drawTree(roots[i]);
                }


                function drawTree(e){
                    if (e.children.length == 0){
                        $('#' + e.ppid + '_tr').append('<td class="td-border" id="' + e.ppid + '_td">' + e.id + '</td>');
                    }

                    if (e.children.length !== 0){
                        $('#config-matrix-table').append('<tr id="' + e.id + '_tr"></tr>')
                        $('#' + e.id + '_tr').append('<td class="td-border" id="' + e.id + '_td">' + e.id + '</td>');
                        for (var i = 0; i < e.children.length; i++){
                            drawTree(e.children[i]);
                        }
                    }
                }
            }
        })
    }

    function drawListElement(tree, name, hint, parent, position){
        tree.insertNewItem(parent, position, name, 0, 0, 0, 0);
        tree.setItemText(position, name , hint);

    }
}

