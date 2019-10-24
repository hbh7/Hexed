(function($) {

  var startTime = 0;
  var targetR = genRColor();
  var targetG = genGColor();
  var targetB = genBColor();
  var difficulty = 0;
  var turns = 0;
  var timerVar;
  var totalScore = 0;

  $.fn.hexed = function(user_difficulty, user_turns) {
    // call startup functions inside this block

    difficulty = user_difficulty;
    turns = user_turns;

    genHTML(this.get(0), targetR, targetG, targetB, startTime, difficulty);

    drawCanvas(255, 255, 255, getSides());

    // This relies on getTime(), so the timer needs to be reset separately
    // for future rounds
    startTimer();

  };

  function getUserR() {
    return parseInt(document.getElementById("red_number").value);
  }

  function getUserG() {
    return parseInt(document.getElementById("green_number").value);
  }

  function getUserB() {
    return parseInt(document.getElementById("blue_number").value);
  }

  function getSides() {
    var close = averagePercentageOff(targetR, targetG, targetB, getUserR(), getUserG(), getUserB());
    return Math.max(6, 4 + Math.floor(close));
  }

  // returns milliseconds since UNIX epoch
  function getTime() {
    var d = new Date();
    return d.getTime();
  }

  function getTimeTaken() {
    return getTime() - startTime;
  }

  function percentageOff(targetColor, userColor) {
    return ((targetColor - userColor) / 255) * 100;
  }

  function averagePercentageOff(targetR, targetG, targetB, userR, userG, userB) {
    var userR_off = Math.abs(percentageOff(targetR, userR));
    var userG_off = Math.abs(percentageOff(targetG, userG));
    var userB_off = Math.abs(percentageOff(targetB, userB));
    return (userR_off + userG_off + userB_off) / 3;
  }

  function calculateScore() {
    var score = ((15 - difficulty - averagePercentageOff(targetR, targetG, targetB, getUserR(), getUserG(), getUserB())) / (15 - difficulty)) * Math.max(0, 15000 - getTimeTaken());
    score = Math.ceil(score * 100) / 100;
    if (score < 0) {
      score = 0;
    }
    return score;
  }

  function genRColor() {
    return Math.floor(Math.random() * 256);
  }

  function genGColor() {
    return Math.floor(Math.random() * 256);
  }

  function genBColor() {
    return Math.floor(Math.random() * 256);
  }

  function score() {
    //get values from page and call calculateScore
  }

  // Generate the game HTML
  function genHTML(startingElement, targetR, targetG, targetB) {

    // Create title header
    var h1 = document.createElement("h1");
    h1.innerText = "Hexed! Guess The Color!";
    h1.style = "text-align: center;";
    startingElement.appendChild(h1);

    // Create description header
    var h2 = document.createElement("h2");
    h2.innerText = "The goal of this game is to guess the RGB value";
    h2.style = "text-align: center;";
    startingElement.appendChild(h2);

    // Create canvas
    var canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    canvas.style = "text-align: center;";
    canvas.height = 200;
    canvas.width = 300;
    startingElement.appendChild(canvas);

    // Create sliders
    var sliders = document.createElement("div");

    // Red slider
    var sliders_red = document.createElement("div");
    var sliders_red_slider = document.createElement("input");
    sliders_red_slider.id = "red_slider";
    sliders_red_slider.type = "range";
    sliders_red_slider.max = "255";
    sliders_red_slider.value = "255";
    sliders_red_slider.oninput = function(){
      document.getElementById("red_number").value = this.value;
      drawCanvas();
    };
    sliders_red_slider.onchange = function(){
      document.getElementById("red_number").value = this.value;
      drawCanvas();
    };
    var sliders_red_number = document.createElement("input");
    sliders_red_number.id = "red_number";
    sliders_red_number.type = "number";
    sliders_red_number.value = "255";
    sliders_red_number.min = "0";
    sliders_red_number.max = "255";
    sliders_red_number.oninput = function(){
      document.getElementById("red_slider").value = this.value;
      drawCanvas();
    };
    sliders_red_number.onchange = function(){
      document.getElementById("red_slider").value = this.value;
      drawCanvas();
    };

    sliders_red.appendChild(sliders_red_slider);
    sliders_red.appendChild(sliders_red_number);
    sliders.appendChild(sliders_red);

    // Green slider
    var sliders_green = document.createElement("div");
    var sliders_green_slider = document.createElement("input");
    sliders_green_slider.id = "green_slider";
    sliders_green_slider.type = "range";
    sliders_green_slider.max = "255";
    sliders_green_slider.value = "255";
    sliders_green_slider.oninput = function(){
      document.getElementById("green_number").value = this.value;
      drawCanvas();
    };
    sliders_green_slider.onchange = function(){
      document.getElementById("green_number").value = this.value;
      drawCanvas();
    };
    var sliders_green_number = document.createElement("input");
    sliders_green_number.id = "green_number";
    sliders_green_number.type = "number";
    sliders_green_number.value = "255";
    sliders_green_number.min = "0";
    sliders_green_number.max = "255";
    sliders_green_number.oninput = function(){
      document.getElementById("green_slider").value = this.value;
      drawCanvas();
    };
    sliders_green_number.onchange = function(){
      document.getElementById("green_slider").value = this.value;
      drawCanvas();
    };

    sliders_green.appendChild(sliders_green_slider);
    sliders_green.appendChild(sliders_green_number);
    sliders.appendChild(sliders_green);

    // Blue slider
    var sliders_blue = document.createElement("div");
    var sliders_blue_slider = document.createElement("input");
    sliders_blue_slider.id = "blue_slider";
    sliders_blue_slider.type = "range";
    sliders_blue_slider.max = "255";
    sliders_blue_slider.value = "255";
    sliders_blue_slider.oninput = function(){
      document.getElementById("blue_number").value = this.value;
      drawCanvas();
    };
    sliders_blue_slider.onchange = function(){
      document.getElementById("blue_number").value = this.value;
      drawCanvas();
    };
    var sliders_blue_number = document.createElement("input");
    sliders_blue_number.id = "blue_number";
    sliders_blue_number.type = "number";
    sliders_blue_number.value = "255";
    sliders_blue_number.min = "0";
    sliders_blue_number.max = "255";
    sliders_blue_number.oninput = function(){
      document.getElementById("blue_slider").value = this.value;
      drawCanvas();
    };
    sliders_blue_number.onchange = function(){
      document.getElementById("blue_slider").value = this.value;
      drawCanvas();
    };

    sliders_blue.appendChild(sliders_blue_slider);
    sliders_blue.appendChild(sliders_blue_number);
    sliders.appendChild(sliders_blue);

    startingElement.appendChild(sliders);

    // Submit Button
    var submit = document.createElement("input");
    submit.id = "submit";
    submit.type = "button";
    submit.value = "Submit";
    submit.addEventListener("click", function() {
      // Make scoreboard
      var score = document.createElement("p");
      score.id = "scoreboard";
      document.getElementById("timer").appendChild(score);

      var roundScore = calculateScore();
      var result = "Your Score: " + calculateScore().toString() + "\n";
      totalScore += roundScore;
      result += "Percentage Off Red:   " + Math.ceil((percentageOff(targetR, getUserR()) * 100)/100) + "%" + "\n";
      result += "Percentage Off Green: " + Math.ceil((percentageOff(targetG, getUserG()) * 100)/100) + "%" + "\n";
      result += "Percentage Off Blue:  " + Math.ceil((percentageOff(targetB, getUserB()) * 100)/100) + "%" + "\n";
      result += "Total Score: " + totalScore;
      score.innerText = result;
      clearInterval(timerVar);
    });
    startingElement.appendChild(submit);

    // next Button
    var next = document.createElement("input");
    next.id = "next";
    next.type = "button";
    next.value = "Next Round";
    next.addEventListener("click", function() {
      if (turns > 0) {
        startTime = getTime();
        startTimer();
        document.getElementById("scoreboard").remove();
        turns--;
      }

    });
    startingElement.appendChild(next);

    // Countdown timer
    var timer = document.createElement("p");
    timer.id = "timer";
    timer.innerText = "Time Left: ";
    startingElement.appendChild(timer);
  }

  // Takes in targetColor and userColor, both assumed to be valid canvas colors
  // (When it was the sample code, it was like "#000000"), other color representations
  // likely valid too but unknown at the moment
  function drawCanvas(userR, userG, userB, userSides) {

    if(userR == null) {
      userR = getUserR();
      userG = getUserG();
      userB = getUserB();
    }

    if(userSides == null) {
      userSides = getSides();
    }

    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    var size = 70;
    var x = 70;
    var y = 100;

    context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    for (var side = 0; side < 7; side++) {
      context.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
    }

    context.fillStyle = "#000000";
    context.fill();

    size = 65;
    x = 70;
    y = 100;
    side = 0;

    context.beginPath();
    context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    for (var side = 0; side < 7; side++) {
      context.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
    }

    context.fillStyle = "rgb(" + targetR + "," + targetG + "," + targetB + ")";
    context.fill();

    // 2nd hexagon

    // Clear first
    context.clearRect(canvas.width/2, 0, canvas.width, canvas.height);

    //var userSides = 30;

    size = 70;
    x = 230;
    y = 100;

    context.beginPath();
    context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    for (var side = 0; side < userSides; side++) {
      context.lineTo(x + size * Math.cos(side * 2 * Math.PI / userSides), y + size * Math.sin(side * 2 * Math.PI / userSides));
    }

    context.fillStyle = "#000000";
    context.fill();

    size = 65;
    x = 230;
    y = 100;
    side = 0;

    context.beginPath();
    context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    for (var side = 0; side < userSides; side++) {
      context.lineTo(x + size * Math.cos(side * 2 * Math.PI / userSides), y + size * Math.sin(side * 2 * Math.PI / userSides));
    }

    context.fillStyle = "rgb(" + userR + "," + userG + "," + userB + ")";
    context.fill();


  }

  function startTimer() {
    startTime = getTime();
    if(difficulty < 3) {
      timerVar = setInterval(function() { timer(0); }, 1000);
    } else if(difficulty < 6) {
      timerVar = setInterval(function() { timer(1); }, 100);
    } else if(difficulty < 9) {
      timerVar = setInterval(function() { timer(2); }, 10);
    } else {
      timerVar = setInterval(function() { timer(3); }, 1);
    }
  }

  function timer(precision) {

    var timerElement = document.getElementById("timer");
    if(15000 - getTimeTaken() > 0) {
      timerElement.innerText = "Time Left: " + ((15000 - getTimeTaken()) / 1000).toFixed(precision);
    } else {
      timerElement.innerText = "Time Left: 0.0";
      clearInterval(timerVar);
      document.getElementById("scoreboard").innerText = "Your Score: " + calculateScore().toString();
    }
  }


}(jQuery));




// not sure where this code will go yet (some of it will probably go in a different file)
// this function should run after the game ends and the user's score is calculated
function genForm() {
  var form = document.createElement("div");
  var someText = document.createElement("p");
  someText.innerText = "Enter your name and click the button to save your score :)"
  form.appendChild(someText);
  // input field (player name)
  var inputName = document.createElement("input");
  inputName.id = "pName";
  inputName.type = "text";
  inputName.placeholder = "Name here";
  inputName.required = "required";
  form.appendChild(inputName);
  // Submit Button
  var submit = document.createElement("input");
  submit.id = "saveInfo";
  submit.type = "button";
  submit.value = "Save Score";
  submit.onclick = function() { saveInfo(); };
  form.appendChild(submit);
  document.body.appendChild(form);
}

/* NOTE: for now, this function will not work because the variables are not defined in its scope.
    to fix this, either make the variables in question global or put this function inside the plugin
    I'm not sure where it's going to go yet so for now it will remain broken (but trust me, it does work, as long as the variables are defined) */

// genForm() MUST finish before this function is called, as it takes the input from genForm and from other elements on the page
function saveInfo() {
  var pName = document.getElementById("pName").value;
  var currentTime = new Date();
  sortTime = currentTime.getTime(); // used for secondary sorting
  var readableTime = currentTime.toDateString(); // what a user looking at the table will actually see
  if (pName.length == 0) {
    alert("Please enter a name");
  } else {
    // take pName, difficulty, turns, totalScore, and find the current time
    //  store all of this in localStorage as an entry in a JSON array
    // check if the array has already been created in localStorage (I want to add to it, not override it)
    if (!localStorage.getItem("highScores")) {
      // the highScores item does NOT exist yet
      var jsonEntry = {"highScores": [{"name":pName, "difficulty":difficulty, "turns":turns, "score":totalScore, "sortTime":sortTime, "readableTime":readableTime}]};
      jsonEntry = JSON.stringify(jsonEntry);
      localStorage.setItem("highScores", [jsonEntry]);
    } else {
      // the highScores item already exists
      var jsonEntry = {"name":pName, "difficulty":difficulty, "turns":turns, "score":totalScore, "sortTime":sortTime, "readableTime":readableTime};
      var jsonStr = localStorage.getItem("highScores");
      var jsonObj = JSON.parse(jsonStr);
      jsonObj["highScores"].push(jsonEntry);
      jsonStr = JSON.stringify(jsonObj);
      localStorage.setItem("highScores", jsonStr);
    }
  }
}











