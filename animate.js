var currentID;
var moves = 0;
var moveSteps = 100;
var moveRate = 1;
var moveLeftCur = 100;
var moveUpCur = 100;
var text;
var index = 0;
var str = "";
var fontSizeSmall = 20;
var fontSizeBig = 10;
var resizeRate = 1;
var seconds = 0;
var minutes = 0;
var black = true;
var bgColor = "black";
var alarmColor = "#58002C";
var circleA = 200;
var circleB = 200;
var circleRadius = 50;

function moveRightStart() {
  currentID = "right";
  moveRight();
}
function moveRight() {
  if (moves < moveSteps) {
    moves += moveRate;
    getID(currentID).style.left = moves + "px";
    moveRightOn = setTimeout("moveRight()", 5);
  }
  else {
    clearTimeout(moveRightOn);
    moves = 0;
  }
}
function moveLeftStart() {
  currentID = "left";
  moveLeft();
}
function moveLeft() {
  if (moveLeftCur > 0) {
    moveLeftCur--;
    getID(currentID).style.left = moveLeftCur + "px";
    moveLeftOn = setTimeout("moveLeft()", 5);
  }
  else {
    clearTimeout(moveLeftOn);
    moveLeftCur = 100;
  }
}
function moveUpStart() {
  currentID = "up";
  moveUp();
}
function moveUp() {
  if (moveUpCur > 0) {
    moveUpCur--;
    getID(currentID).style.top = moveUpCur + "px";
    moveUpOn = setTimeout("moveUp()", 5);
  }
  else {
    clearTimeout(moveUpOn);
    moveUpCur = 100;
  }
}
function moveDownStart() {
  currentID = "down";
  moveDown();
}
function moveDown() {
  if (moves < moveSteps) {
    moves += moveRate;
    getID(currentID).style.top = moves + "px";
    moveDownOn = setTimeout("moveDown()", 5);
  }
  else {
    clearTimeout(moveDownOn);
    moves = 0;
  }
}
function createStringStart() {
  currentID = "create";
  text = getID(currentID).innerHTML;
  createString();
}
function createString() {
  if (index < text.length) {
    str += text.charAt(index);
    getID(currentID).innerHTML = str;
    index++;
    createStringOn = setTimeout("createString()", 50);
  }
  else {
    clearTimeout(createStringOn);
    index = 0;
    str = "";
  }
}
function resizeSmallStart() {
  currentID = "small";
  resizeSmall();
}
function resizeSmall() {
  if (fontSizeSmall > 10) {
    fontSizeSmall -= resizeRate;
    getID(currentID).style.fontSize = fontSizeSmall + "px";
    resizeSmallOn = setTimeout("resizeSmall()", 5);
  }
  else {
    clearTimeout(resizeSmall);
    fontSizeSmall = 30;
  }
}
function resizeBigStart(id) {
  currentID = "big";
  resizeBig();
}
function resizeBig() {
  if (fontSizeBig < 30) {
    fontSizeBig += resizeRate;
    getID(currentID).style.fontSize = fontSizeBig + "px";
    resizeBigOn = setTimeout("resizeBig()", 5);
  }
  else {
    clearTimeout(resizeBig);
    fontSizeBig = 10;
  }
}
function timerStart() {
  hideID("startTimer");
  showID("stopTimer");
  timer();
}
function timer() {
  if (seconds == 60) {
    minutes++;
    seconds = 0;
  }
  if (seconds < 10)
    getID("time").innerHTML = minutes + ":0" + seconds;
  else
    getID("time").innerHTML = minutes + ":" + seconds;

  seconds++;
  timerOn = setTimeout("timer()",1000);
}
function timerStop() {
  clearTimeout(timerOn);
  seconds = 0;
  minutes = 0;
  hideID("stopTimer");
  showID("startTimer");
  getID("time").innerHTML = "";
}
function alarmStart() {
  currentID = "body";
  hideID("startAlarm");
  showID("stopAlarm");
  alarm();
}
function alarm() {
  if (black) {
    getID(currentID).style.backgroundColor = alarmColor;
    black = false;
  }
  else {
    getID(currentID).style.backgroundColor = bgColor;
    black = true;
  }

  alarmOn = setTimeout("alarmStart()",500);
}
function alarmStop() {
  clearTimeout(alarmOn);
  black = true;
  getID(currentID).style.backgroundColor = bgColor;
  hideID("stopAlarm");
  showID("startAlarm");
}

// (x-a)2 + (y-b)2 = r2
function circle(step, quadrant) {
  step = Number(step);
  if (step < circleRadius && quadrant < 5) {
    switch (quadrant) {
      case "1":
        var x = step + circleA;
        var y = circleB - Math.sqrt(2500 - Math.pow(x - circleA, 2));
        break;
      case "2":
        var x = circleA + circleRadius - step;
        var y = Math.sqrt(2500 - Math.pow(x - circleA, 2)) + circleB;
        break;
      case "3":
        var x = circleA - step;
        var y = Math.sqrt(2500 - Math.pow(x - circleA, 2)) + circleB;
        break;
      case "4":
        var x = circleA - circleRadius + step;
        var y = circleB - Math.sqrt(2500 - Math.pow(x - circleA, 2));
        break;
      default:
        console.log("default");
    }
    var c = getID("circle");
    c.style.left = x + "px";
    c.style.top = y + "px";
    step++;
    var circleOn = setTimeout("circle('" + step + "','" + quadrant + "')", 5);
  }
  else {
    clearTimeout(circleOn);
    if (quadrant < 5) {
      quadrant++;
      circle(0, quadrant.toString());
    }
    else 
      circle(0, "1");
  }
}
function getID(id) {
  return document.getElementById(id);
}
function hideID(id) {
  getID(id).style.display = "none";
}
function showID(id) {
  getID(id).style.display = "block";
}