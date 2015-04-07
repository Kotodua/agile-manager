/**
 * Created by k.allakhvierdov on 3/30/2015.
 */
function teams(){
    mainURL = config.url+"/api/teams";
    var verifier = new Verifier();

    //-------------------------- ADD NEW TEAM
    $('#addTeam').on("click", function(){
        addNewTeam();
    });

    //-------------------------- SAVE NEW TEAM
    $("body").on("click", "#save", function(){
        saveNewTeam();
    });

    //-------------------------- DELETE TEAM
    $("body").on("click", "button[id^='delete_']", function(event){
        deleteTeam(event)
    });
}


function deleteTeam(event){
        var id_btn = event.target.id.split('_')[1];
        $.ajax({
            type: "DELETE",
            dataType: "html",
            url: mainURL + '/' + id_btn,
            success: function (data) {
                $("#" + id_btn).remove();
            }
        })
}

function saveNewTeam(){
    console.log('create new team');
    $.ajax({
        type: "POST",
        data: {title: $('#title_edit').val()},
        dataType: "json",
        url: mainURL+'/add',
        success: function (data) {
        }
    })
    $('#newTeam').remove();

    console.log('append new team');

    //--------------------------------- Doesn't work
    $.ajax({
        type: "GET",
        dataType: "html",
        //data: {id: lastRowId},
        url: mainURL+'/get',
        success: function (teams) {
            var team = JSON.parse(teams);

            $('#teams_tab').append('<tr id='+team[0].id+'></tr>');
            $('#'+team[0].id).append('<th>'+team[0].title+'</th>');
            $('#'+team[0].id).append('<button id="edit_'+team[0].id+'" class="a-inside edit">Edit</button>');
            $('#'+team[0].id).append('<button id="delete_'+team[0].id+'" class="a-inside delete">Delete</button>');
            $('#addTeam').prop('disabled', false);
        }
    })
    $('#newTeam').remove();
}


function addNewTeam(){
    console.log('show new team fields');
    $('#teams_tab').append('<tr id="newTeam"></tr>');
    $('#newTeam').append('<th><input id="title_edit" class="text"></input></th>');
    $('#newTeam').append('<button id="save" class="a-inside edit">Save</button>');
    $('#newTeam').append('<button id="cancel" class="a-inside delete">Cancel</button>');
    $('#addTeam').prop('disabled', true);
    $('#save').prop('disabled', true);
    $('#save').prop("class", "a-inside");

    $("body").on("focus", "#title_edit", function(){
        $('#save').prop('disabled', false);
        $('#save').prop("class", "a-inside edit");
    });

    $('body').on("click", "#cancel", function () {
        $('#addTeam').prop('disabled', false);
        $(this).parent().remove();
    })
}
