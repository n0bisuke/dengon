"use strict";

//milkcocoa
var milkcocoa = new MilkCocoa("juiceig81r3wr.mlkcca.com");
var ds = milkcocoa.dataStore('dengon');

var $form = $('#form');
var $submit = $('#submit');
var $dear = $('#dear');
var $message = $('#message');
var $mood = $('#mood');
var $selectView = $('#select-view');

function submitHandler(e){
    e.preventDefault();
    var data = {
        dear: $dear.val(),
        message: $message.val(),
        mood: $mood.find('input[name=mood]:checked').val()
    }
    ds.push(data);
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


$(window).on("load", windowLoadHandler);
$dear.on("change", selectorChangeHandler).trigger('change');
$mood.find('input[name=mood]').on('click', function(){
    $mood.find('input[name=mood]').next().removeClass('is-active');
    $(this).next().addClass('is-active');
});
ds.on('push', function(res){
    alert(res.value.dear);
    alert(res.value.message);
    alert(res.value.mood);
});
