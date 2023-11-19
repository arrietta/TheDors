
$( document ).ready( ready());
function ready(){

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
            total();
}
    let set  = [];
    function edit(element , value){
        let id = element.value;
        let object =$('#count-'+ id);

        let count = Number(object.html());
        let price = Number($('#price-'+ id).html() ) / count;


        if(count + value <= 0){
            id = object.attr('id').substring(6,999);

            deleteOrder(id);

        }else{
            object.html(count+value);
        }
        $('#price-'+ id).html(price * (count+value));
        add_to_set()

        save();
        total();
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
        document.getElementById("#order-"+orderId).remove();
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

    function total() {

        let total = 0;
        for (let i = 0; i < $('.price').length; i++) {
            total+=Number($('.price')[i].innerHTML);

        }


        $('#total_price').html(total);
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