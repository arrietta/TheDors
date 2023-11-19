$( ".navbar-toggler " ).on( "click", function() {
            let obj = $( ".navbar-toggler" );

            let tar1 = $('main')
            if( obj.attr('aria-expanded')==="true"){
                tar1.removeClass('shift');
            }else{
                tar1.addClass('shift');
            }
        } );

        $( document ).ready( underline);


        $( window ).on("resize",
            underline);

        function underline(){

            let obj = $( ".navbar-toggler" );

            if($( window ).width() >992 ){

                if( obj.attr('aria-expanded')==="true"){
                    obj.click();
                }

            }


        }

