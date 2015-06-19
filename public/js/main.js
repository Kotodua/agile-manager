function main(){
    var url = config.url;
        $("#submit").on("click", function () {

            $.ajax({
                type: "POST",
                data: {name: $("#login").val(), password: $("#password").val()},
                dataType: "json",
                url: url+"/login",
                success: function (data) {
                    if(data.result == 'success')
                        window.location.replace(url+"/users");
                    else {
                        $('#notes').text('Wrong login or password');
                    }
                }
            })
        });

        $('body').bind('keypress', function(e) {
            if(e.keyCode==13){
                $("#submit").click();
            }
        });

        $(document).ready(function($) {
            if (window.history && window.history.pushState) {
                window.history.pushState('forward', null, './#forward');
                $(window).on('popstate', function() {
                    window.location.replace(url+"/login");
                });
            }
        });

       $(".a-inside").on("mouseover", function(){
           $(this).prop("class", "a-inside over");
       });

        $(".a-inside").on("mouseout", function(){
            $(this).prop("class", "a-inside edit");
        });

}