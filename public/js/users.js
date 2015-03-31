function users(){
    mainURL = config.url+"/api/users";

    var verifier = new Verifier();

    $('#addUser').on("click", function () {
        addNewUser();
    });

    $("body").on('focusout', '#pname_edit', function(){
        if(verifier.verify($(this).val(), 'pname')){
            $('#save').prop('disabled', false);
            $('#save').prop("class", "a-inside edit");
            $(this).prop("class", "text pass");
        } else {
            $(this).prop("class", "text fail");
            $('#save').prop('disabled', true);
            $('#save').prop("class", "a-inside");
        }

    })



    $("body").on("click", "button[id^='delete_']", function(event){
        var id_btn = event.target.id.split('_')[1];

        $.ajax({
            type: "DELETE",
            dataType: "html",
            url: mainURL+'/'+id_btn,
            success: function (data) {
                if (data == "same"){
                    console.log('The Same '+data);
                    alert("Can't remove user.");
                    $('#change_password').remove();
                } else {
                    console.log('Different '+data);
                    $("#"+id_btn).remove();
                }
            }
        })
    });

    $("body").on("click", "#save", function () {
        $.ajax({
            type: "POST",
            data: {name: $('#name_edit').val(), sname: $('#sname_edit').val(), pname: $('#pname_edit').val(), role: $('#role_edit').val()},
            dataType: "json",
            url: mainURL,
            success: function (data) {
            }
        })
        $('#newUser').remove();
        //var lastRowId = $("button[id^='delete_']").last().attr("id").split("_")[1];
        $.ajax({
            type: "GET",
            dataType: "html",
            //data: {id: lastRowId},
            url: mainURL+'/get',
            success: function (users) {
                var user = JSON.parse(users);

                $('#users_tab').append('<tr id='+user[0].id+'></tr>');
                $('#'+user[0].id).append('<th>'+user[0].name+'</th>');
                $('#'+user[0].id).append('<th>'+user[0].sname+'</th>');
                $('#'+user[0].id).append('<th>'+user[0].pname+'</th>');
                $('#'+user[0].id).append('<th>'+user[0].role+'</th>');
                $('#'+user[0].id).append('<button id="edit_'+user[0].id+'" class="a-inside edit">Edit</button>');
                $('#'+user[0].id).append('<button id="delete_'+user[0].id+'" class="a-inside delete">Delete</button>');
                $('#addUser').prop('disabled', false);
            }
        })
        $('#newUser').remove();
    });

    $('body').on("click", "#cancel", function () {
        $('#addUser').prop('disabled', false);
        $(this).parent().remove();
    });

    var a_property;
    $("body").on("mouseover",".a-inside", function(){
        a_property = $(this).prop("class");
        $(this).prop("class", "a-inside over");
    });

    $("body").on("mouseout",".a-inside", function(){
        $(this).prop("class", a_property);
    });

    var b_property;
    $("body").on("mouseover",".b-inside", function(){
        b_property = $(this).prop("class");
        $(this).prop("class", "b-inside over");
    });

    $("body").on("mouseout",".b-inside", function(){
        $(this).prop("class", b_property);
    });

}

function addNewUser(){
    $('#users_tab').append('<tr id="newUser"></tr>');
    $('#newUser').append('<th><input id="name_edit" class="text"></input></th>');
    $('#newUser').append('<th><input id="sname_edit" class="text"></input></th>');
    $('#newUser').append('<th><input id="pname_edit" class="text"></input></th>');
    $('#newUser').append('<th><input id="role_edit" class="text"></input></th>');
    $('#newUser').append('<button id="save" class="a-inside edit">Save</button>');
    $('#newUser').append('<button id="cancel" class="a-inside delete">Cancel</button>');
    $('#addUser').prop('disabled', true);
    $('#save').prop('disabled', true);
    $('#save').prop("class", "a-inside");
}