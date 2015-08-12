angular.module('Main', [])
    .controller('mainCtrl', function($scope){
        mainURL = config.url + "/api/votes";

        $.ajax({
            type: "GET",
            dataType: "json",
            url: mainURL + '/getQuestionnaires',
            success: function (res) {
                $scope.questionnaires = res;
                $scope.$apply();
            }
        })

        $scope.visibility = {
            edit: false,
            vote: false,
            mainList: true
        }
        $scope.currentQuestionnaire = {};



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
                    removeFromArray($scope.questionnaires, id);
                    $scope.$apply();
                }
            })
        }

        //--------------------------------------------EDIT QUESTIONNAIRE

        $scope.voteQuestionnaire = {}
        var removeFromArray = function(arr, id){
            $.each(arr, function(i){
                if(arr[i].id == id) {
                    arr.splice(i,1);
                    return false;
                }
            });
        }

        $scope.showForm = function(id, form){
            var searchResults = $.grep($scope.questionnaires, function(e){ return e.id == id; });
            if(!searchResults[0].defects) {
                $.ajax({
                    type: "GET",
                    data: {id: id},
                    dataType: "json",
                    url: mainURL + '/getQuestionnaireInfo/' + id,
                    success: function (res) {
                        getObjectIndexByValue($scope.questionnaires, 'id', id, function(c){
                            $scope.currentQuestionnaire = $scope.questionnaires[c];
                        })
                        $scope.currentQuestionnaire.defects = res[0];
                        $scope.currentQuestionnaire.tests = res[1];
                        $scope.currentQuestionnaire.defects.forEach(function (e) {
                            e.checked = false;
                            e.class = 'not-selected';
                        })
                        $scope.currentQuestionnaire.tests.forEach(function (e) {
                            e.checked = false;
                            e.class = 'not-selected';
                        })
                        $scope.$apply();
                    }
                })
            } else {
                $scope.currentQuestionnaire = searchResults[0];
            }

            $scope.visibility[form] = true;

        }




        $scope.hideForm = function(){
            for (var form in $scope.visibility) {
                if ($scope.visibility.hasOwnProperty(form)) {
                    $scope.visibility[form] = false;
                }
            }

            var questionnaireToUpdate = search($scope.questionnaires, 'id', $scope.currentQuestionnaire.defects[0].qid);

            getObjectIndexByValue($scope.questionnaires, 'id', questionnaireToUpdate.id, function(c){
                $scope.questionnaires[c] = $scope.currentQuestionnaire;
            })

            $scope.currentQuestionnaire = {}
        }

        $scope.isVisible = function(form){
            return $scope.visibility[form];
        }

        $scope.addNewDefectToQuestionnaire = function(){
            $scope.currentQuestionnaire.defects.push({id: ''});
        }

        $scope.addNewTestForm = function(){
            $scope.currentQuestionnaire.tests.push({id: ''});
        }

        $scope.applyFormChanges = function(id) {
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

        //--------------------------------------------VOTE QUESTIONNAIRE
        $scope.selMaxDefects = false;
        $scope.selMaxTests = false;

        $scope.checkedDefect = function(){
            var count = 0;
            for(x in $scope.currentQuestionnaire.defects){

                if($scope.currentQuestionnaire.defects[x].checked){
                    count++;
                    $scope.currentQuestionnaire.defects[x].class = 'selected';
                } else {
                    $scope.currentQuestionnaire.defects[x].class = 'not-selected';
                }
            }
            $scope.selMaxDefects = (count >= 3);
        };


        $scope.checkedTest = function(){
            var count = 0;
            for(x in $scope.currentQuestionnaire.tests){

                if($scope.currentQuestionnaire.tests[x].checked){
                    count++;
                    $scope.currentQuestionnaire.tests[x].class = 'selected';
                } else {
                    $scope.currentQuestionnaire.tests[x].class = 'not-selected';
                }
            }
            $scope.selMaxTests = (count >= 3);
        };
    });



var search = function(array, key, value){
    var searchResults = $.grep(array, function(e){ return e[key] == value; });
    return searchResults[0];
}


var getObjectIndexByValue = function(arr, key, value, callback) {
    var counter = 0;
    arr.forEach(function (e) {
        if (e[key] == value) {
            callback(counter);
            return counter;
        }
        counter++
    })
}