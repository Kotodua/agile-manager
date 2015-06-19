function admin(){
    mainURL = config.url+"/api/admin";


    $('.toggle-content').hide();

    $('.toggle-control')
        .addClass('clickable')
        .bind('click', function() {
            var $control = $(this);
            var $parent = $control.parents('.toggle-unit');

            $parent.toggleClass('expanded');
            $parent.find('.toggle-content').slideToggle();

            // if control has HTML5 data attributes, use to update text
            if ($parent.hasClass('expanded')) {
                $control.html($control.attr('data-expanded-text'));
            } else {
                $control.html($control.attr('data-text'));
            }
        })



}