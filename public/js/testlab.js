/**
 * Created by k.allakhvierdov on 4/2/2015.
 */

String.prototype.lines = function() { return this.split(/\r*\n/); }
String.prototype.lineCount = function() { return this.lines().length; }
String.prototype.lineCountLht = function(){
    var lht = parseInt($('textarea').css('lineHeight'),5);
    return lines = $('textarea').attr('scrollHeight')/lht;
}



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
            getTestCases(type[0]);
            $('#folder-new').attr("disabled", true);
            $('#test-new').attr("disabled", true);
        }else if(type[1] == 'testcase'){
            getCase(type[2]);
            $('#test-case-add').attr("disabled", true);
            $('#folder-new').attr("disabled", true);
            $('#test-new').attr("disabled", true);
        }
    });

    $('body').on('click', 'textarea', function(){
            this.rows = $(this).val().lineCount();

    })

    treeCase.setDragHandler(function(idMoveFrom, idMoveTo){
        var idMoveWhat = idMoveFrom.split('_');
        var idMoveWhere = idMoveTo.split('_');

        if (idMoveWhere[1] == 'case'){
            treeCase.enableDragAndDrop(false);
        } else if(idMoveWhat[1] == 'case' && idMoveWhere[1] == 'test'){
            treeCase.enableMercyDrag(true);
            return moveCaseToTest(treeCase, idMoveWhat[0]+'_case', idMoveWhere[0]+'_test');

        }
    })


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

    $('body').on('keypress', 'textarea', function( event ) {
        if (event.which == 13) {
            this.rows = $(this).val().lineCount()+1;
        }
    });

    function deleteFolder(tree, id) {
        $.ajax({
             type: "DELETE",
             dataType: "html",
             url: mainURL + '/' + id,
             success: function (data) {
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
                //getCase(res[0].insertId);
                tree.insertNewItem(activeElement,res[0].insertId+'_case',$('#case-id').val(),0,0,0,0,'SELECT');
                $('#new-case').attr("hidden", true);
                fixImage(tree, res[0].insertId+'_case');
            }
        })
    }


    function getCase(id, increment){
        $.ajax({
            type: "GET",
            dataType: "html",
            url: mainURL + '/'+id,
            success: function (data) {
                var allData = JSON.parse(data);
                $('#tc').append('<tr id=case_'+allData[0].id+'_'+increment+'></tr>');
                $('#case_'+allData[0].id+'_'+increment).append('<th><textarea class="added" style="width: 80px" rows="1" id="case_data_'+increment+'">'+allData[0].name+'</textarea></th>');
                $('#case_'+allData[0].id+'_'+increment).append('<th><textarea class="added" rows="1" id="case_data_'+increment+'">'+allData[0].steps+'</textarea></th>');
                $('#case_'+allData[0].id+'_'+increment).append('<th><textarea class="added" rows="1" id="case_data_'+increment+'">'+allData[0].expected+'</textarea></th>');
                $('#case_data_'+increment).height( $("#case_data_"+increment)[0].scrollHeight+1 );


                /*window.setTimeout( function() {
                    $('#case_data_'+increment).height( $('#case_data_'+increment)[0].scrollHeight+1 );
                }, 1);
*/
                $('#test-name').val(allData[0].name);
                $('#test-owner').val(allData[0].owner);
                $('#test-notes').val(allData[0].description);
                $('#test-status option:contains('+allData[0].status+')');
            }
        })
    }

    function getTestCases(id){
        $.ajax({
            type: "GET",
            dataType: "html",
            url: mainURL + '/getTestCases/'+id,
            success: function (data) {
                var allData = JSON.parse(data);
                for (var i=0; i<allData.length; i++){
                    getCase(allData[i].cid, i);
                }
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
                    //tree.enableMercyDrag(true);
                    tree.insertNewItem(testId+'_test',caseId+'_testcase', 'NAME'/*tree.getItemText(caseId+'_case')*/,0,0,0,0,'SELECT');
                }
            })
            return true;
        } else {
            return false;
        }
    }

    function drawCases(tree){
        $.ajax({
            type: "GET",
            dataType: "html",
            url: mainURL + '/getCaseTree',
            success: function (data) {
                var allData = JSON.parse(data);
                var arrFolders =[];

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
                            tree.insertNewItem(allData.testcases[j].tid + '_test', allData.testcases[j].id + '_testcase_' + allData.testcases[j].cid, 'tc_'+allData.case[i].name, 0, 0, 0, 0);
                            tree.setItemImage2(allData.testcases[j].id + '_testcase_'+ allData.testcases[j].cid,'testcase.gif','testcase.gif','testcase.gif');
                        }
                    }
                }
            }
        })
    }

    function fixImage(myTree, id){
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

