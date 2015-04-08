/**
 * Created by k.allakhvierdov on 4/2/2015.
 */



function testlab(){

    mainURL = config.url+"/api/testlab";
    var verifier = new Verifier();

     // for script conversion
    var treeCase = dhtmlXTreeFromHTML("treebox_case","100%","100%",0);
    treeCase.enableTreeLines(true);
    var d=new Date();

    var activeElement;

    treeCase.setImagePath("vendor/dhtmlx/sources/dhtmlxTree/codebase/imgs/dhxtree_terrace/");

    drawCases(treeCase);
    treeCase.enableDragAndDrop(true);
    //treeCase.showItemCheckbox(4, true)
    //myTree.setDragBehavior("complex");



    treeCase.attachEvent("onSelect", function(id){
        $('#test-case-add').removeAttr("disabled");
        $('#test-new').removeAttr("disabled");
        $('#folder-new').removeAttr("disabled");
        $('[id^="case_"]').remove();
        activeElement = id;
        var type = id.split('_');
        if (type[1] == 'case'){
            getCase(type[0]);
            $('#test-case-add').attr("disabled", true);
            $('#folder-new').attr("disabled", true);
            $('#test-new').attr("disabled", true);
        } else if(type[1] == 'test'){
            //getCase(type[0]);
            $('#folder-new').attr("disabled", true);
            $('#test-new').attr("disabled", true);
        }else if(type[1] == 'testcase'){
            getCase(type[0]);
            $('#test-case-add').attr("disabled", true);
            $('#folder-new').attr("disabled", true);
            $('#test-new').attr("disabled", true);
        }
    });

    treeCase.setDragHandler(function(idMoveFrom, idMoveTo){

        var idMoveWhat = idMoveFrom.split('_');
        var idMoveWhere = idMoveTo.split('_');

        if (idMoveWhere[1] == 'case'){
            treeCase.enableDragAndDrop(false);
        } else if(idMoveWhat[1] == 'case' && idMoveWhere[1] == 'test'){
            treeCase.enableMercyDrag(true);
            moveCaseToTest(treeCase, idMoveWhat[0]+'_case', idMoveWhere[0]+'_test');
            treeCase.enableMercyDrag(false);
        }


        //moveFolder(treeCase, idMoveFrom, idMoveTo);
    })


    //tree.makeAllDraggable();

    $('body').on('click', '#folder-new', function(){
        //if($([activeElement]).getParent == )
        createFolder(treeCase, d.valueOf(), document.getElementById('test-name').value, activeElement);
        fixImage(treeCase, d.valueOf());
    });

    $('body').on('click', '#tree-expand', function(){
        treeCase.openAllItems(activeElement);
    });

    $('body').on('click', '#tree-collaps', function(){
        treeCase.closeAllItems(activeElement);
    });

    $('body').on('click', '#test-new', function(){
        //if($([activeElement]).getParent == )
        createTest(treeCase, d.valueOf(), document.getElementById('test-name').value, activeElement);
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

    function createTest(tree, date, name, parent){
        $.ajax({
            type: "POST",
            data: {
                //dhtmlxId: tree.,
                name: name,
                pid: activeElement,
                //owner: $('#case-steps').val(),
                //expected: $('#case-expected').val(),
                status: $('#test-status').val(),
                description: $('#test-notes').val()
            },
            dataType: "json",
            url: mainURL + '/createTest',
            success: function (res) {
                console.log(res);
                //getCase(res[0].insertId);
                tree.insertNewItem(activeElement,res[0].insertId+'_test',name,0,0,0,0,'SELECT');
                fixImage(tree, res[0].insertId+'_test');
            }
        })
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
                fixImage(tree, res[0].insertId+'_case');
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
                //$('[id^="case_text_id"]').elastic();
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





    function moveCaseToTest(tree, caseId, testId){
        var r = confirm('Would you like to move "'+tree.getItemText(caseId)+'" case to "'+ tree.getItemText(testId)+'" test.');
        if (r == true) {
            $.ajax({
                type: "POST",
                data: {cid: caseId, tid: testId},
                dataType: "json",
                url: mainURL + '/moveCaseToTest',
                success: function (res) {
                    tree.enableMercyDrag(true);
                    tree.insertNewItem(testId='_test',caseId+'_testcase', 'NAME'/*tree.getItemText(caseId+'_case')*/,0,0,0,0,'SELECT');
                    fixImage(tree, caseId+'_testcase');
                }
            })
        } else {
            //txt = "You pressed Cancel!";
        }
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
                //var arrCases =[];

                //--------------- Drawing Folders
                for (var i = 0; i < allData.folder.length; i++){
                    arrFolders.push([allData.folder[i].id,allData.folder[i].pid,allData.folder[i].name]);
                }
                tree.loadJSArray(arrFolders);

                //--------------- Drawing Tests
                for (var i = 0; i < allData.test.length; i++){
                    tree.insertNewItem(allData.test[i].pid, allData.test[i].id + '_test', allData.test[i].name, 0, 0, 0, 0);
                    tree.setItemImage2(allData.test[i].id + '_test','test.gif','test.gif','test.gif');
                }

                //--------------- Drawing Cases
                for (var i = 0; i < allData.case.length; i++){
                    tree.insertNewItem(allData.case[i].cfid, allData.case[i].id + '_case', allData.case[i].name, 0, 0, 0, 0);
                    tree.setItemImage2(allData.case[i].id + '_case','case.gif','case.gif','case.gif');
                    for (var j = 0; j < allData.testcases.length; j++){
                        if (allData.testcases[j].cid == allData.case[i].id){
                            console.log(allData.case[i].name);
                            tree.insertNewItem(allData.testcases[j].tid + '_test', allData.testcases[j].id + '_testcase', 'tc_'+allData.case[i].name, 0, 0, 0, 0);
                            tree.setItemImage2(allData.testcases[j].id + '_testcase','testcase.gif','testcase.gif','testcase.gif');
                        }

                    }
                }




                //tree.loadJSArray(arrCases);

                //tree.enableMercyDrag(true);
            }
        })
    }

    function fixImage(myTree, id){
        console.log('fixingImgs');
        var type = id.split('_');

        if (type[1] == 'test'){
            myTree.setItemImage2(id,'test.gif','test.gif','test.gif');
        } else if (type[1] == 'case') {
            myTree.setItemImage2(id, 'case.gif', 'case.gif', 'case.gif');
        } else if (type[1] == 'testcase') {
            myTree.setItemImage2(id,'testcase.gif','testcase.gif','testcase.gif');
        } else{
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

}

