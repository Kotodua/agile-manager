angular.module('Main', [])
    .controller('mainCtrl', function($scope){
        mainURL = config.url + "/api/votes";

        $.ajax({
            type: "GET",
            dataType: "json",
            url: mainURL + '/getQuestionnaires',
            success: function (res) {
                $scope.questionnaires = res[0];
                countVotes(res[0], res[1], res[2]);
                $scope.$apply();
            }
        })

        var countVotes = function(questionnaires, tests, defects){
            questionnaires.forEach(function(q){
                if(!q.votes){q.votes = 0};
                q.defects = [];
                q.tests = [];
                tests.forEach(function(t){
                    if(q.id == t.qid){
                        q.tests.push(t);
                        if(t.votes){
                            var res = t.votes.split(',');
                            if (indexOf())
                            res.splice(0, 1);
                            q.votes += res.length;
                            t.votesCount = res.length;
                        }
                    }
                })
                defects.forEach(function(d){
                    if(q.id == d.qid){
                        q.defects.push(d)
                        if(d.votes){
                            var res = d.votes.split(',');
                            res.splice(0, 1);
                            q.votes += res.length;
                            d.votesCount = res.length;
                        }
                    }
                })
                console.log('q.votes '+q.votes);
                q.votes /= 6;
            })
        }


        $scope.visibility = {
            edit: false,
            vote: false,
            results: false,
            mainList: true
        }

        //--------------------------------------------ALL QUESTIONNAIRES
        $scope.createQuestionnaire = function(title){
            $.ajax({
                type: "POST",
                data: {title: title},
                dataType: "json",
                url: mainURL + '/createQuestionnaire',
                success: function (res) {
                    $scope.questionnaires.push({id: res.insertId, title: title, status: 'New', defects: [], tests: [], votes: 0});
                    $scope.$apply();
                    console.log('ins. id: '+res.insertId);
                }
            })
        }

        $scope.isVotable = function(qid, uid){

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

        var removeFromArray = function(arr, id){
            $.each(arr, function(i){
                if(arr[i].id == id) {
                    arr.splice(i,1);
                    return false;
                }
            });
        }

        //--------------------------------------------EDIT QUESTIONNAIRE
        $scope.showForm = function(id, form){
            getObjectIndexByValue($scope.questionnaires, 'id', id, function(c){
                $scope.currentQuestionnaire = $scope.questionnaires[c];
            })

            $scope.currentQuestionnaire.selMaxDefects = false;
            $scope.currentQuestionnaire.selMaxTests = false;
            $scope.currentQuestionnaire.defects.forEach(function (e) {
                e.checked = false;
                e.class = 'not-selected';
            })
            $scope.currentQuestionnaire.tests.forEach(function (e) {
                e.checked = false;
                e.class = 'not-selected';
            })
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
            var objToSend = $scope.currentQuestionnaire;
            objToSend.defects.forEach(function(d){
                delete d.checked;
                delete d.class;
            })
            objToSend.tests.forEach(function(t){
                delete t.checked
                delete t.class;
            })

            $.ajax({
                type: "POST",
                data: objToSend,
                dataType: "json",
                url: mainURL + '/'+id,
                success: function (res) {
                    console.log(res);
                }
            })
        }

        //--------------------------------------------VOTE QUESTIONNAIRE


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
            $scope.currentQuestionnaire.selMaxDefects = (count >= 3);
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
            $scope.currentQuestionnaire.selMaxTests = (count >= 3);
        };

        $scope.applyVote = function(currentQuestionnaire){
            var data = {defects: [], tests: []};
            var resultsDefects = $.grep(currentQuestionnaire.defects, function(e){ return e.checked == true; });
            resultsDefects.forEach(function(e){
                data.defects.push(e.id);
            });
            var resultsTests = $.grep(currentQuestionnaire.tests, function(e){ return e.checked == true; });
            resultsTests.forEach(function(e){
                data.tests.push(e.id);
            })
            $.ajax({
                type: "PUT",
                data: data,
                dataType: "json",
                url: mainURL + '/applyVotes/'+currentQuestionnaire.id,
                success: function (res) {
                    getObjectIndexByValue($scope.questionnaires, 'id', currentQuestionnaire.id, function(c){
                        $scope.questionnaires[c].votes += 1;
                    })
                }
            })
        }
    });



var search = function(array, key, value){
    return $.grep(array, function(e){ return e[key] == value; });
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