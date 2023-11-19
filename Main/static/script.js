let data = get_data;
let types = {
  'collection': [],
  'shape': [],
  'portal': [],
  'bevel': [],
  'molding': [],
  'color': []
};

function clear(){
    types = {
      'collection': [],
      'shape': [],
      'portal': [],
      'bevel': [],
      'molding': [],
      'color': []
    };

    $("#select_portal").empty();
    $("#select_shape").empty();
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
                types[el].push(temp);
            }
        }
    });
    types['shape'].forEach(element => add_element(element,'#select_shape','shape'));
    types['portal'].forEach(element => add_element(element,'#select_portal','portal'));
    types['bevel'].forEach(element => add_element(element,'#select_bevel','bevel'));
    types['molding'].forEach(element => add_element(element,'#select_molding','molding'));
    types['color'].forEach(element => add_element(element,'#select_color','color'));
    console.log(types);
}

iterate();

types['collection'].forEach(element => add_element(element,'#select_collection','collection'));



elements = [];
code = $('#code').attr('value');
function add_element(object, target , type) {
    typee ="'"+type+"'";
    $(target).append(`<button type="button" class=${typee}  onclick="set_value(this,${typee})" value = "${object}">${object}</button>`);

    $('.'+type).addClass('butn-light');
}

function set_value(item , type){
    data = get_data.filter(e => e['fields'][type] === item.value);

    iterate()
    const set = {'shape': 'portal', 'portal': 'bevel', 'bevel': 'molding','molding':'color'};
    set_image('media/'+data[0]['fields']['image']);
    $('#door').attr('value',data[0]['pk']);


}

    function set_image(src){
        let link = $('#Door_image');
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
            console.log('asd')
        }

    }
    window.setInterval(validate, 100);


