"use strict";

//milkcocoa
var milkcocoa = new MilkCocoa("juiceig81r3wr.mlkcca.com");
var ds;

var $form = $('#form');
var $submit = $('#submit');
var $from = $('#from');
var $dear = $('#dear');
var $message = $('#message');
var $mood = $('#mood');
var $selectView = $('#select-view');
var $toast = $('#toast');

var toast;

function submitHandler(e){
    e.preventDefault();
    var tension;
    var data = {
        from: $from.val(),
        message: $message.val(),
        mood: $mood.find('input[name=mood]:checked').val()
    }
    switch(data.mood){
        case 'fun':
            data.message = '\\vct=150\\' + data.message;
            break;
        case 'normal':
            data.message = '\\vct=120\\' + data.message;
            break;
        case 'sad':
            data.message = '\\vct=80\\' + data.message;
            break;
        case 'angry':
            data.message = '\\vct=50\\' + data.message;
            break;
    }
    ds = milkcocoa.dataStore('dengon/' + $dear.val());
    if(true){
        ds.push(data);
        Toast.show();
        if(toast){
            toast.clearTimeout;
        }
        toast = setTimeout(function(){
            Toast.hide();
        },3000);
    }
}

function windowLoadHandler(){
    $form.on('submit', submitHandler);
}

function selectorChangeHandler(e){
    e.preventDefault();
    var val = $dear.find('option:selected').html();
    var dear = val ? val : '伝言する相手を選択してください';
    $selectView.html(dear);
}


var Toast = (function (){
    var isShow = false;
    var show = function(){
        isShow = true;
        $toast.addClass('is-show');
    }
    var hide = function(){
        isShow = false;
        $toast.removeClass('is-show');
    }
    return {
        show: show,
        hide: hide
    }
})();


$(window).on("load", windowLoadHandler);
$dear.on("change", selectorChangeHandler).trigger('change');
$mood.find('input[name=mood]').on('click', function(){
    $mood.find('input[name=mood]').next().removeClass('is-active');
    $(this).next().addClass('is-active');
});
