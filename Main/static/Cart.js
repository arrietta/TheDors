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

            }else{

            }
            let set = $('.butn-dark')
            console.log(set[0].value);
            for (let x in set) {

                if(Number.isInteger(Number(x))){
                    // console.log(set[x].value());
                    let id = set[x].value;
                    let object =$('#count-'+ id);
                    let count = Number(object.html());
                    let price = Number($('#price-'+ id).html());
                    $('#price-'+ id).html(price * count);

                }

            }

        }
        let set  = [];
    function edit(element , value){
        let id = element.value;
        let object =$('#count-'+ id);

        let count = Number(object.html());
        let price = Number($('#price-'+ id).html() ) / count;


        if(count + value === 0){
            id = object.attr('id').substring(6,999);
            document.getElementById("#order-"+id).remove();
            deleteOrder(id);

        }else{
            object.html(count+value);
        }
        $('#price-'+ id).html(price * (count+value));
        add_to_set()

        save();
    }
    function add_to_set(){
        let list;
        list =$('.pk');
        let arr;

        for (let i = 0; i < list.length; i++) {
            arr = {'id': list.get(i).id.substring(6, 999), 'count': list.get(i).innerHTML}
            set.push(arr);
        }
    }
    function deleteOrder(orderId) {
        $.ajax({
            url: `/Delete/` + orderId+'/',
            method: 'POST',
            success: function(data) {
                 $('#message').text(data.message);

            },
            error: function(error) {
                console.error('Ошибка при удалении заказа:', error);
            }
        });
    }
    function save(){
        $.ajax({
            type: 'POST',
            url: '/save/',  // The URL should match your URL pattern
            data: JSON.stringify({ 'data': set }),
            contentType: 'application/json',
            success: function(data) {
                $('#message').text(data.message); // Display the response message
            }
        });
        set = [];
    }


