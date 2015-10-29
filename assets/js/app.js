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

function _castData(){
    var data = {
        dear: $dear.find('option:selected').html(),
        from: $from.val(),
        mood: $mood.find('input[name=mood]:checked').val()
    }
    data.message = _changeTone($message.val());
    data.message = _castMoodMessage(data.message, data.mood);
    return data;
}

function _changeTone(message){
    var message = message.replace(/。/g, '--  。  ');
    message = message.replace(/、/g, '  、  ');
    message = message.replace(/。/g, '  ,  ');
    message = message.replace(/,/g, '  ,  ');
    return message;
}


function _castMoodMessage(message,mood){
    switch(mood){
        case 'fun':
            return '\\vct=150\\' + message;
        case 'normal':
            return '\\vct=120\\' + message;
        case 'sad':
            return '\\vct=80\\' + message;
        case 'angry':
            return '\\vct=50\\' + message;
    }
    return;
}

function submitHandler(e){
    e.preventDefault();
    var data = _castData();
    console.log(data);
    ds = milkcocoa.dataStore('dengon/' + $dear.val());
    if(data.dear && data.from && data.mood && data.message){
        ds.push(data);
        Toast.show();
        if(toast){
            toast.clearTimeout;
        }
        toast = setTimeout(function(){
            Toast.hide();
        },3000);
    }else{
        alert('すべて入力してください');
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
