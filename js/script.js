var drinks = [];

var coins = {
    one: 0,
    two: 0,
    five: 0,
    ten: 0,
};

var balance = 0;

$( document ).ready(function(){

    init();


    $('#coin_one').on('click', function(){
        if(coins.one-1 >= 0) {
            coins.one--;
            render_coins();
            add_coins(1);
        }
    });
    $('#coin_two').on('click', function(){
        if(coins.two-1 >= 0) {
            coins.two--;
            render_coins();
            add_coins(2);
        }
    });
    $('#coin_five').on('click', function(){
        if(coins.five-1 >= 0) {
            coins.five--;
            render_coins();
            add_coins(5);
        }
    });
    $('#coin_ten').on('click', function(){
        if(coins.ten-1 >= 0) {
            coins.ten--;
            render_coins();
            add_coins(10);
        }
    });

    $('#change').on('click', function(){
        getChange();
    });

});

function getChange(){
    count_ten = Math.floor(balance/10);
    balance -= count_ten*10;
    if(count_ten>0) {
        coins.ten = +coins.ten + count_ten;
    }

    count_five = Math.floor(balance/5);
    balance -= count_five*5;
    if(count_five>0) {
        coins.five = +coins.five + count_five;
    }

    count_two = Math.floor(balance/2);
    balance -= count_two*2;
    if(count_two>0) {
        coins.two = +coins.two + count_two;
    }

    count_one = Math.floor(balance);
    balance -= count_one;
    if(count_one>0) {
        coins.one = +coins.one + Number(count_one);
    }

    render_coins();
    add_coins(0);
}

function add_coins(count) {
    balance+=Number(count);
    $('#sum').html(balance);
}

function buy(id){
    if(balance - drinks[id].price >= 0) {
        drinks[id].count--;
        add_coins(-drinks[id].price);
    }
    else{
        alert('Недостаточно средств!');
    }
}

function render_coins(){
    one.innerHTML = coins.one;
    two.innerHTML = coins.two;
    five.innerHTML = coins.five;
    ten.innerHTML = coins.ten;
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

function getCoins(){
    $.ajax({
        url: 'server.php',
        type: 'get',
        data: 'get=coins',
    }).done(function(data){
        coins = data;
        render_coins();
    });
}

function init(){
    getDrinks();
    getCoins();
}