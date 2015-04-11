console.log('hello, world');

$(document).ready(init);

function init(){
  $('#clickme').click(doStuff);
  $('#mynums-button').click(createNumberBoxes);
  $('#number-parent').on('click', '.cube', getSquareRoot);
  $('#number-parent').on('dblclick', '.cube', removeCube);
  $('#get-quote').click(getQuote);
  $('#get-colors').click(getColors);
  $('#random-color').click(randomColor);
  $('#color-parent').on('click', '.color', selectColor);
  $(document).keydown(pressedKey);
}

//setInterval(randomColor, 100);

function pressedKey(e){
  var $color = $('.selected');
  $color.removeClass('selected');

  if(e.keyCode === 39){
    var $next = $color.next();
    if(!$next.length){
      $next = $('.color:first-child');
    }
    $next.addClass('selected');
    var color = $next.css('background-color');
    $('body').css('background-color', color);
  }

  if(e.keyCode === 37){
    var $prev = $color.prev();
    if(!$prev.length){
      $prev = $('.color:last-child');
    }
    $prev.addClass('selected');
    var color = $prev.css('background-color');
    $('body').css('background-color', color);
  }
}

function selectColor(){
  var color = $(this).css('background-color');
  $('body').css('background-color', color);
  $('.color').removeClass('selected');
  $(this).addClass('selected');
}

function randomColor(){
  var red = Math.floor(Math.random() * 256);
  var grn = Math.floor(Math.random() * 256);
  var blu = Math.floor(Math.random() * 256);
  var alp = Math.random();
  var rgba = 'rgba('+red+', '+grn+', '+blu+', '+alp+')';

  var $color = $('<div>');
  $color.css('background-color', rgba);
  $color.addClass('color');
  $('#color-parent').prepend($color);
}

function getColors(){
  var colors = $('#colors').val();
  colors = colors.split(',');
  colors.forEach(function(c){
    var $color = $('<div>');
    $color.css('background-color', c);
    $color.addClass('color');
    $('#color-parent').append($color);
  });
}

function getQuote(){
  var symbol = $('#symbol').val().toUpperCase();
  $.getJSON('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol + '&callback=?', function(response){
    var $div = $('<div>');
    $div.addClass('quote');
    $div.text('$' + response.LastPrice);
    $('#quotes').append($div);
  });
}

function removeCube(){
  $(this).remove();
}

function getSquareRoot(){
  $(this).text(Math.sqrt($(this).text()).toFixed(2));
}

function createNumberBoxes(){
  var num = $('#mynums').val() * 1;
  var numbers = [];
  for(var i = 0; i < num; i++){
    numbers.push(i);
  }

  console.log(numbers);
  var odds = numbers.filter(function(n){
    return n%2;
  });

  console.log(odds);

  var cubed = odds.map(function(n){
    return Math.pow(n, 3);
  });

  console.log(cubed);

  cubed.forEach(function(n){
    var $div = $('<div>');
    $div.text(n);
    $div.addClass('cube');
    $('#number-parent').append($div);
  });
}

function doStuff(){
  var generic = $('#generic').val();
  console.log('you just typed', generic);
  $('.delta').css('color', generic);
  $('h1').toggleClass('alert');
}
