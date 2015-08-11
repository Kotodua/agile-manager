angular.module('Main', [])
    .controller('mainCtrl', function($scope){
        mainURL = config.url + "/api/votes";

        $.ajax({
            type: "GET",
            dataType: "json",
            url: mainURL + '/getQuestionnaires',
            success: function (res) {
                console.log(res);
                $scope.questionnaires = res;
                $scope.$apply();
            }
        })

        $scope.visible = false;
        $scope.currentQuestionnaire = {};
        $scope.questionnaireTitle = '';


        //--------------------------------------------ALL QUESTIONNAIRES
        $scope.createQuestionnaire = function(title){
            $.ajax({
                type: "POST",
                data: {title: title},
                dataType: "json",
                url: mainURL + '/createQuestionnaire',
                success: function (res) {
                    $scope.questionnaires.push({id: res.insertId, title: title, status: 'New', defects: [], tests: []});
                    $scope.$apply();
                    console.log('ins. id: '+res.insertId);
                }
            })
        }

        $scope.deleteQuestionnaire = function(id){
            $.ajax({
                type: "DELETE",
                data: {id: id},
                dataType: "json",
                url: mainURL + '/'+id,
                success: function (res) {
                    console.log(res);
                    removeFromArray($scope.questionnaires, id);
                    $scope.$apply();
                }
            })
        }

        //--------------------------------------------EDIT QUESTIONNAIRE

        var removeFromArray = function(arr, id){
            $.each(arr, function(i){
                if(arr[i].id == id) {
                    arr.splice(i,1);
                    return false;
                }
            });
        }

        var addInformationToQuestionnaire = function (arrTo, from, id){
            console.log('from: '+from);
            $.each(from, function(i){
                if(arr[i].id == id) {
                    arr.splice(i,1);
                    return false;
                }
            });
        }


        $scope.showForm = function(id){
            $.ajax({
                type: "GET",
                data: {id: id},
                dataType: "json",
                url: mainURL + '/getQuestionnaireInfo/'+id,
                success: function (res) {
                    console.log(res);
                    addInformationToQuestionnaire($scope.questionnaires, res, id);
                    $scope.$apply();
                }
            })
            $scope.visible = true;
            var searchResults = $.grep($scope.questionnaires, function(e){ return e.id == id; });
            $scope.currentQuestionnaire = searchResults[0];
            if(!$scope.currentQuestionnaire.defects){
                $scope.currentQuestionnaire.defects = []
            }
            if(!$scope.currentQuestionnaire.tests){
                $scope.currentQuestionnaire.tests = []
            }
            console.log($scope.currentQuestionnaire);
        }

        $scope.hideForm = function(){
            $scope.visible = false;
            $scope.currentQuestionnaire = {}
        }

        $scope.isVisible = function(){
            return $scope.visible;
        }

        $scope.addNewDefectToQuestionnaire = function(){
            console.log('pushing...');
            $scope.currentQuestionnaire.defects.push({id: ''});
        }

        $scope.addNewTestForm = function(){
            console.log('pushing...');
            $scope.currentQuestionnaire.tests.push({id: ''});
            console.log($scope.currentQuestionnaire);
        }

        $scope.applyFormChanges = function(id) {
            console.log($scope.currentQuestionnaire);
            $.ajax({
                type: "POST",
                data: $scope.currentQuestionnaire,
                dataType: "json",
                url: mainURL + '/'+id,
                success: function (res) {
                    console.log(res);
                }
            })
        }
    });



angular.module('Vote', [])
.controller('voteCtrl', function($scope){
        $scope.defects = [
            {
                id: 'SSENG1010',
                summary: 'This is defect"s summary. Maybe it will be longer then originally. But any way.',
                description: 'This is defect"s summary. Maybe it will be longer then originally. But any way. This is defect"s summary. Maybe it will be longer then originally. But any way. This is defect"s summary. Maybe it will be longer then originally. But any way.',
                reporter: 'glkallak',
                selected: false,
                class: 'not-selected'},
            {
                id: 'SSENG1011',
                summary: 'This is defect"s summary. Maybe it will be longer then originally. But any way.',
                reporter: 'mludanov',
                selected: false,
                class: 'not-selected'},
            {
                id: 'SSENG1012',
                summary: 'This is defect"s summary. Maybe it will be longer then originally. But any way.',
                reporter: 'yzaremba',
                selected: false,
                class: 'not-selected'},
            {
                id: 'SSENG1015',
                summary: 'This is defect"s summary. Maybe it will be longer then originally. But any way.',
                reporter: 'gldladyg',
                selected: false,
                class: 'not-selected'},
            {
                id: 'SSENG1013',
                summary: 'This is defect"s summary. Maybe it will be longer then originally. But any way.',
                reporter: 'nsilchen',
                selected: false,
                class: 'not-selected'},
            {
                id: 'SSENG1014',
                summary: 'This is defect"s summary. Maybe it will be longer then originally. But any way.',
                reporter: 'okurochk',
                selected: false,
                class: 'not-selected'}
        ];
        $scope.tests = [
            {
                id: 'test1',
                name: 'test name can be not so long',
                creator: 'glkallak'},
            {
                id: 'test1',
                name: 'test name can be not so long',
                creator: 'nsilchen'},
            {
                id: 'test1',
                name: 'test name can be not so long',
                creator: 'yzaremba'},
            {
                id: 'test1',
                name: 'test name can be not so long',
                creator: 'gldladyg'}]
        $scope.selMaxDefects = false;
        $scope.selMaxTests = false;

        $scope.checkedDefect = function(){
            var count = 0;
            for(x in $scope.defects){

                if($scope.defects[x].checked){
                    count++;
                    $scope.defects[x].class = 'selected';
                } else {
                    $scope.defects[x].class = 'not-selected';
                }
            }
            $scope.selMaxDefects = (count >= 3);
        };


        $scope.checkedTest = function(){
            var count = 0;
            for(x in $scope.tests){

                if($scope.tests[x].checked){
                    count++;
                    $scope.tests[x].class = 'selected';
                } else {
                    $scope.tests[x].class = 'not-selected';
                }
            }
            $scope.selMaxTests = (count >= 3);
        };
    })

