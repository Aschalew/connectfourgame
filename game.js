var player1 = prompt("Pleayer One: Enter Your Name, You will be Green");
var player1Color = 'rgb(60, 179, 113)'

var player2 = prompt("Pleayer Two: Enter Your Name, You will be Blue");
var player2Color = 'rgb(30, 144, 255)'


var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum) {
  console.log("You WON starting at this roq, col");
  console.log(rowNum);
  console.log(colNum);
}
function changeColor(rowIndex,colIndex,color) {
  console.log("Color Changed to "+color);
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);

}

function returnColor(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBotton(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row,colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row
    }
  }
}

function colorMatchCheck(one,two,three,four) {

  return(one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined )
}


function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))) {
        console.log('Horizontal');
        reportWin(row,col);
        return true;
      } else {
        continue;
      }
    }
  }
}

function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))) {
        console.log('vertical');
        reportWin(row,col);
        return true;
      } else {
        continue;
      }
    }
  }
}

function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))) {
        console.log('Horizontal');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))) {

      } else {
        continue;
      }
    }
  }
}


var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1+" it is your turn, pick a column to drop in!");


$('.board button').on('click', function(){

  var col = $(this).closest('td').index();

  var bottomAvail = checkBotton(col);

  changeColor(bottomAvail,col,currentColor);

  console.log(currentColor+"  "+col+"--"+bottomAvail);

  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    $('h1').text(currentName+" You have WON!")

    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
  }

  currentPlayer = currentPlayer * -1;

  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName+" It is your turn.");
    currentColor = player1Color;
  }
  else {
    currentName = player2;
    $('h3').text(currentName+" It is your turn.");
    currentColor = player2Color;
  }
})
