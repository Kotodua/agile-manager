/**
 * Created by k.allakhvierdov on 4/2/2015.
 */



function testlab(){

    mainURL = config.url+"/api/testlab";
    var verifier = new Verifier();

     // for script conversion
    var treeTest = dhtmlXTreeFromHTML("treebox_test","100%","100%",0); // for script conversion
    var treeCase = dhtmlXTreeFromHTML("treebox_case","100%","100%",0);
    var d=new Date();

    var activeElement;

    treeCase.setImagePath("vendor/dhtmlx/sources/dhtmlxTree/codebase/imgs/dhxtree_terrace/");
    treeTest.setImagePath("vendor/dhtmlx/sources/dhtmlxTree/codebase/imgs/dhxtree_terrace/");

    var myArray2 = [["1","0","Test Folser 1"],
        ["2","1","Test Folder 2"],
        ["3","2","test1"],
        ["4","0","test2"]];


    drawCases(treeCase);

    treeTest.enableDragAndDrop(true);
    treeTest.loadJSArray(myArray2);

    //treeCase.showItemCheckbox(4, true)
    //myTree.setDragBehavior("complex");



    treeCase.attachEvent("onSelect", function(id){
        $('#test-case-add').removeAttr("disabled");
        $('#test-new').removeAttr("disabled");
        $('[id^="case_"]').remove();
        activeElement = id;
        console.log(id);


        var type = id.split('_');
        console.log('You selected '+type[0]);
        console.log('You selected '+type[1]);
        if (type[1] == 'case'){
            getCase(type[0]);
            $('#test-case-add').attr("disabled", true);
            $('#test-new').attr("disabled", true);
        }
    });

    treeTest.attachEvent("onSelect", function(id){
        //activeElement = id;
        console.log('You selected '+id);
    });

    treeCase.setDragHandler(function(idMoveFrom, idMoveTo){
        moveFolder(treeCase, idMoveFrom, idMoveTo);
    })


    //tree.makeAllDraggable();

    $('body').on('click', '#test-new', function(){
        //if($([activeElement]).getParent == )
        createFolder(treeCase, d.valueOf(), document.getElementById('test-name').value, activeElement);
        fixImage(treeCase, d.valueOf());

    });

    $('body').on('click', '#test-delete', function(){
        deleteFolder(treeCase, activeElement);
    });

    $('body').on('click', '#test-case-add', function(){
        $('#new-case').attr("hidden", false);
        $('#test-case-add').attr("disabled", true);
    });

    $('body').on('click', '#test-case-save', function(){
        saveCase(treeCase);
        $('#test-case-add').attr("disabled", false);
    });



    function deleteFolder(tree, id) {
        $.ajax({
             type: "DELETE",
             dataType: "html",
             url: mainURL + '/' + id,
             success: function (data) {
                console.log(data);
                return data;
             }
        })
        tree.deleteItem(id,true);
    }


    function createFolder(tree, date, name, parent){
        $.ajax({
            type: "POST",
            data: {name: name, parent: parent},
            dataType: "json",
            url: mainURL + '/createFolder',
            success: function (res) {
                tree.insertNewItem(activeElement,res[0].insertId,name,0,0,0,0,'SELECT');
            }
        })
        console.log('adding '+name+' to the tree');
        //tree.insertNewItem(parent,date,name,0,0,0,0,'SELECT');

    }

    function saveCase(tree){
        $.ajax({
            type: "POST",
            data: {
                //dhtmlxId: tree.,
                id: $('#case-id').val(),
                cfid : activeElement,
                steps: $('#case-steps').val(),
                expected: $('#case-expected').val(),
                status: $('#test-status').val(),
                notes: $('#test-notes').val()
                //owner: $('#test-owner').val()
            },
            dataType: "json",
            url: mainURL + '/saveCase',
            success: function (res) {
                console.log(res);
                //getCase(res[0].insertId);
                tree.insertNewItem(activeElement,res[0].insertId+'_case',$('#case-id').val(),0,0,0,0,'SELECT');
                $('#new-case').attr("hidden", true);
            }
        })
        console.log('adding '+name+' to the tree');


    }


    function getCase(id){
        $.ajax({
            type: "GET",
            dataType: "html",
            url: mainURL + '/'+id,
            success: function (data) {
                var allData = JSON.parse(data);

                console.log(allData[0]);
                $('#tc').append('<tr id=case_'+allData[0].id+'></tr>');
                $('#case_'+allData[0].id).append('<th><textarea style="width: 80px" rows="10" id="case_text_id_"'+allData[0].id+'>'+allData[0].name+'</textarea></th>');
                $('#case_'+allData[0].id).append('<th><textarea rows="10" id="case_text_"'+allData[0].id+'>'+allData[0].steps+'</textarea></th>');
                $('#case_'+allData[0].id).append('<th><textarea rows="10" id="case_text_"'+allData[0].id+'>'+allData[0].expected+'</textarea></th>');
                $('[id^="case_text_id"]').elastic();
                $('#test-name').val(allData[0].name);
                $('#test-owner').val(allData[0].owner);
                $('#test-notes').val(allData[0].description);
                $('#test-status option:contains('+allData[0].status+')');
                //$('#test-status').val(allData[0].status);
                /*for (var i = 0; i < allData.folder.length; i++){
                    arrFolders.push([allData.folder[i].id,allData.folder[i].pid,allData.folder[i].name]);
                }*/


            }
        })
    }



    function moveFolder(tree, moveFrom, moveTo){
        console.log(tree.getItemText(moveFrom)+" "+tree.getItemText(moveTo));
        $.ajax({
            type: "PUT",
            dataType: "html",
            url: mainURL + '/getCTree',
            success: function (data) {
                var jData = JSON.parse(data);

                var arr =[];
                for (var i = 0; i < jData.length; i++){
                    arr.push([jData[i].id,jData[i].pid,jData[i].name]);
                }
                tree.loadJSArray(arr);
            }
        })
        return confirm(tree.getItemText(moveFrom)+' '+ tree.getItemText(moveTo));
    }

    function drawCases(tree){
        //var tree = dhtmlXTreeFromHTML(treeId,"100%","100%",0);
        console.log('drawingCases');
        $.ajax({
            type: "GET",
            dataType: "html",
            url: mainURL + '/getCTree',
            success: function (data) {
                var allData = JSON.parse(data);
                var arrFolders =[];
                var arrCases =[];
                for (var i = 0; i < allData.folder.length; i++){
                    arrFolders.push([allData.folder[i].id,allData.folder[i].pid,allData.folder[i].name]);
                }

                console.log(allData.case[0]);

                tree.loadJSArray(arrFolders);

                for (var i = 0; i < allData.case.length; i++){
                    //arrFolders.push([allData.case[i].id,,allData.case[i].name]);
                    tree.insertNewItem(allData.case[i].cfid, allData.case[i].id + '_case', allData.case[i].name, 0, 0, 0, 0);


                }

                console.log(arrFolders);


                //tree.loadJSArray(arrCases);
                //tree.enableDragAndDrop(true);
                //tree.enableMercyDrag(true);
            }
        })
    }

    function fixImage(myTree, id){
        console.log('fixingImgs');
        switch(myTree.getLevel(id)){
            case 1:
                myTree.setItemImage2(id,'folderClosed.gif','folderOpen.gif','folderClosed.gif');
                break;
            case 2:
                myTree.setItemImage2(id,'folderClosed.gif','folderOpen.gif','folderClosed.gif');
                break;
            case 3:
                myTree.setItemImage2(id,'folderClosed.gif','folderOpen.gif','folderClosed.gif');
                break;
            default:
                myTree.setItemImage2(id,'leaf.gif','folderClosed.gif','folderOpen.gif');
                break;
        }
    }

}

