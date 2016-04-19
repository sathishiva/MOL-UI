$(document).ready(function() {
    //initial load 
    // temp
    $('a').hover(function () {
       $(this).prop('title', $(this).text()); 
    });
    
    // stack all elements
    $('ul.level-0 > li').removeClass().addClass('coverflow-right');
    // uncomment on below line to apply coverflow top on first child if reqd.
    // $('ul.level-0 > li:first-child').removeClass().addClass('coverflow-top');
    // hide child and grand child ul's
    $('.level-1, .level-2').hide();
    // on click on any circle (anchor)
    $('ul.timeline-list li a').on('click', function () { 
        //algorithm for horizontal multilevel accordion
        //1. hide all ul except top level
        //2.a) check if current anchor's li's ul has parent(li), show parent(li)
        //2.b) check if current anchor's li has child(ul), show child(ul)
        // * show/hide always will be there on ul                                        
        var $current_circle = $(this),
            $current_list_item = $current_circle.parent(),
            $step_value = $current_circle.data().step;

//        $('ul.timeline-list li a').css('outline', 'none');
//        $current_circle.css('outline', '1px solid red');

        // hide
        $('.level-1, .level-2').hide();
        // 2.show
        // 2.a. show all parent
        $current_list_item.parentsUntil(".level-0").filter(function (i, elem) {
            return elem.nodeName === "LI"? $(elem): false;
        }).children('ul').show();
        // 2.b. show children
        $current_list_item.children('ul').show();

        $current_list_item.removeClass().addClass('coverflow-top');
        //if current li is not the immediate child of level-0 , remove coverflow-top from parent li also and apply coverflow-left
//                    buggy logic; parent li has to be at top always else siblings will go down in the stack
//                    if ($current_list_item.parent('ul.level-0').length === 0) {
//                        $current_list_item.parent('ul').parent('li').removeClass().addClass('coverflow-left');
//                    }
        $current_list_item.prevAll().removeClass().addClass('coverflow-left');
        $current_list_item.nextAll().removeClass().addClass('coverflow-right');

        //form show/hide
        $('div.form-panel > div').hide();
        if (!$step_value) {
            $step_value = "no_step";
            $('.pending-task-panel').hide();
        } else {
            $('.pending-task-panel').show();
        }
        $('.form-row').show();
        $('div.form-panel > div[data-step="'+ $step_value +'"]').show();
    });
    
    
    //trigger click from next/ previous/ submit buttons
    $('.form-actions-panel > button').on('click', function() {
        var $step_value = $(this).data().step;
        if ($step_value) {
            $('a[data-step="'+ $step_value +'"]').trigger( "click" ); 
        }
        // cancel action
        if($(this).text() === "Cancel") {
            window.location.href = "loan_list_v2.html";
        }
    });
    
    //temp
    $('#first-row a[data-step="step_3"]').trigger( "click" );
//    $('#second-row a[data-step="step_2"]').trigger( "click" );
//    $('#third-row a[data-step="step_1_1"]').trigger( "click" );
//    $('#fourth-row a[data-step="step_4"]').trigger( "click" );
});