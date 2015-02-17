/**
 * Created by k.allakhvierdov on 11/23/2014.
 */


var appendPass = function(){
    $('#change_password').append('<div id="pass_elements"></div>');
    $('#pass_elements').append('<p><input id="old_pass" type="password" placeholder="old pass"></input></p>');
    $('#pass_elements').append('<p><input id="old_pass_check" type="password" placeholder="old pass"></input></p>');
    $('#pass_elements').append('<p><input id="new_pass" type="password" placeholder="new pass"></input></p>');
    $('#pass_elements').append('<button id="update" class="a-inside edit">Update</button>');
    $('#pass_elements').append('<button id="cancel" class="a-inside delete">Cancel</button>');
}

function settings(){
    mainURL = config.url+"/api/users";
    $("#update_pass").on("click", function () {
        appendPass();
        $('body').append('#change_password');
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

    $("body").on("click", "#update", function(){
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {password: $('#new_pass').val()},
            url: mainURL+'/newpass',
            success: function (data) {
                if (data.result == "success"){
                    console.log('Pass was set '+data);
                    $('#pass_elements').remove();

                } else {
                    console.log('Pass set unsuccessful '+data);
                }
            }
        })
    });

    $("body").on("click","#cancel", function(){
        $(this).parent().remove();
    });

}