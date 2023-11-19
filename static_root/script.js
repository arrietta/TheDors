


let data = get_data;
let input= {}
let collection ;
let types = {
  'collection': [],
  'shape': {'icon':[],'shape':[]},
  'portal': [],
  'bevel': [],
  'molding': [],
  'color': []
};
const local = 'http://localhost:8000/media/'

function clear(){
    types = {
      'collection': [],
      'icon': [],
      'shape': [],
      'portal': [],
      'bevel': [],
      'molding': [],
      'color': []
    };

    // $("#select_portal").empty();

    $("#select_bevel").empty();
    $("#select_molding").empty();
    $("#select_color").empty();


}
function iterate() {
    clear()
    data.forEach(e => {
        let list = e['fields'];
        for (let el in list) {
            let temp = list[el];
            if (Array.isArray(types[el])&& !types[el].includes(temp)) {

                if(el ==="icon"){
                    let check = true;
                    let i = types['shape'].length;
                    for (let j = 0; j < i; j++) {
                        if(types['shape'][j]['icon'] == temp){
                            check =false;
                        }
                    }
                    if(check){
                        types['shape'][i-1]['icon'] =temp;
                    }


                }else if(el ==="shape"){
                    let check = true;
                    let i = types['shape'].length;
                        for (let j = 0; j < i; j++) {
                            if(types['shape'][j]['shape'] == temp){
                                check =false;

                            }

                        }
                        console.log(i);
                        if(check){
                            types[el].push({'shape':temp});
                            types['shape'][i]['icon'] ='';
                        }


                }else {
                    types[el].push(temp);
                }
            }
        }
    });


    types['bevel'].forEach(element => add_element(element,'#select_bevel','bevel'));
    types['molding'].forEach(element => add_element(element,'#select_molding','molding'));
    types['color'].forEach(element => add_element(element,'#select_color','color'));

}

iterate();
console.log(types)
types['shape'].forEach(element => add_element(element,'#select_shape','shape'));
types['portal'].forEach(element => add_element(element,'#select_portal','portal'));



elements = [];
code = $('#code').attr('value');
function add_element(object, target , type) {
    typee ="'"+type+"'";

    if(type === "color"){
        $(target).append(`<button type="button" style="background-color: ${object}" class=${typee}  onclick="set_value(this,${typee})" value = "${object}"></button>`);
        $('.'+type).addClass('bttn-color');
    }else if(type === "shape"){
         $(target).append(`<button type="button" class=${typee}  onclick="set_value(this,${typee})" value = "${object['shape']}"><img src="media/${object['icon']}"></button>`);
        $('.'+type).addClass('bttn-dark');
    }
    else{
        $(target).append(`<button type="button" class=${typee}  onclick="set_value(this,${typee})" value = "${object}">${object}</button>`);
        $('.'+type).addClass('bttn-dark');
    }

}

function set_value(item , type){
    data = get_data.filter(e => e['fields'][type] === item.value);
    if(type==="color"){
        $('.image_box').css('background-color',item.value)
    }else{
        iterate()
        set_image('media/'+data[0]['fields']['image'],$('#Door_image'));
        set_image('media/'+data[0]['fields']['portal_image'],$('#portal_image'));
        $('#price').html(data[0]['fields']['price']);

    }
    $('#door').attr('value',data[0]['pk']);




}

    function set_image(src,link){

        if(link.attr("src").toString() !== src.toString()){
            link.hide();
            link.attr('src',src);
            link.fadeIn();
        }
    }
    function validate(){
        const object = $("#code");
        if(object.attr('value')!==code){
            object.attr('value',code);
        }

    }
    window.setInterval(validate, 100);


function changeToCatalogue2(element){
    $('#content-1').fadeOut();
    $('#content-2').fadeIn();

}
function changeToCatalogue1(element){
    $('#content-1').fadeIn();
    $('#content-2').fadeOut();
}

$(document).ready(function(){
    $(".c2").click(function(){
        $(".c1").css("color", "grey");
        $(this).css("color", "white");
    });
});
$(document).ready(function(){
    $('.construct').fadeOut();
    $(".c1").click(function(){
        $(".c2").css("color", "grey");
        $(this).css("color", "white");
    });
});


function choose(obj){

    $("span").css("display", "none");
    setTimeout(open(obj),800);



}
function open(obj){
    $(obj).fadeIn();

    setTimeout(function(){$(obj).addClass("zoom");$(".contents").fadeOut();},100);
    setTimeout(function(){
        $('.construct').fadeIn();
        collection = $(obj).html();
        $('#collection').html(collection);
        $('.catalog').fadeOut();
    },50);

}