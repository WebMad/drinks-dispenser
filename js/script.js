var drinks = [];



var coins = 0;

$( document ).ready(function(){

    init();


    $('#coin_one').on('click', function(){
        add_coins(1);
    });
    $('#coin_two').on('click', function(){
        add_coins(2);
    });
    $('#coin_five').on('click', function(){
        add_coins(5);
    });
    $('#coin_ten').on('click', function(){
        add_coins(10);
    });
});
function add_coins(count) {
    coins+=count;
    $('#sum').html(coins);
}

function buy(id){
    if(coins - drinks[id].price >= 0) {
        drinks[id].count--;
        add_coins(-drinks[id].price);
    }
    else{
        alert('Недостаточно средств!');
    }
}

function render_drinks(){
    document.getElementById('drinks').innerHTML = '';

    drinks.forEach(function(object, index){
        div = document.createElement('div');
        div.setAttribute('class', 'drink');
        div.setAttribute('onclick', 'buy('+ index +')');

        img_div = document.createElement('div');
        img_div.setAttribute('class', 'img-drink');
        img_div_img = new Image();
        img_div_img.onload = function(){};
        img_div_img.src= object.img; //картинка товара
        img_div.appendChild(img_div_img);
        div.appendChild(img_div);

        name_div = document.createElement('div');
        name_div.setAttribute('class', 'name-drink');
        name_div.innerHTML = object.name; //название товара
        div.appendChild(name_div);

        price_div = document.createElement('div');
        price_div.setAttribute('class', 'price-drink');

        span_price_div = document.createElement('span');
        span_price_div.setAttribute('id', 'price-drink');
        span_price_div.innerHTML = object.price; //цена товара

        price_div.appendChild(span_price_div);

        rub = document.createTextNode('руб.');

        price_div.appendChild(rub);
        div.appendChild(price_div);

        document.getElementById('drinks').appendChild(div);
    });

}

function getDrinks(){
    $.ajax({
        url: 'server.php',
        type: 'get',
        data: 'get=drinks',
    }).done(function(data){
        drinks = data;
        render_drinks();
    });
}

function init(){
    getDrinks();
}