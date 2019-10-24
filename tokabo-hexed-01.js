(function($) {

  var startTime = 0;
  var targetR = 255;
  var targetG = 255;
  var targetB = 255;
  var difficulty = 0;
  var turns = 0;
  var timerVar;
  var totalScore = 0;

  $.fn.hexed = function(settings) {
    // call startup functions inside this block
    difficulty = settings.difficulty;
    turns = settings.turns;

    genHTML(this.get(0));
    drawCanvas(255, 255, 255);
    genHighScoreSaveForm();
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
    return Math.abs(score); // fixes -0
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

  // Generate the game HTML
  function genHTML(startingElement) {
    // Create watchers for predefined elements
    document.getElementById("difficulty").onchange = function () {
      difficulty = document.getElementById("difficulty").value;
    };
    document.getElementById("turns").onchange = function () {
      turns = document.getElementById("turns").value;
    };
    document.getElementById("newGameButton").onclick = function () {
      resetGame();
    };

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
    submit.style = "width: 90px;";
    submit.addEventListener("click", function() {
      stopRound();
    });
    startingElement.appendChild(submit);

    // Next Round Button
    var next = document.createElement("input");
    next.id = "next";
    next.type = "button";
    next.value = "Next Round";
    next.style = "margin-left: 4px; width: 90px;";
    next.addEventListener("click", function() {
      stopRound();
      startRound();
    });
    startingElement.appendChild(next);

    // Countdown timer
    var timer = document.createElement("p");
    timer.id = "timer";
    timer.innerText = "Time Left: 15";
    startingElement.appendChild(timer);

    // Scoreboard
    var scoreboard = document.createElement("p");
    scoreboard.id = "scoreboard";
    scoreboard.hidden = true;
    startingElement.appendChild(scoreboard);

    // High Score
    var form = document.createElement("div");
    form.id = "highScoreSaveForm";
    form.hidden = true;
    var someText = document.createElement("p");
    someText.innerText = "Enter your name and click the button to save your score :)";
    form.appendChild(someText);
    // input field (player name)
    var inputName = document.createElement("input");
    inputName.id = "pName";
    inputName.type = "text";
    inputName.placeholder = "Name here";
    inputName.required = true;
    form.appendChild(inputName);
    // Submit Button
    var submitHighScore = document.createElement("input");
    submitHighScore.id = "saveInfo";
    submitHighScore.type = "button";
    submitHighScore.value = "Save Score";
    submitHighScore.onclick = function() {
      saveInfo();
      alert("Score saved!");
    };
    form.appendChild(submitHighScore);
    startingElement.appendChild(form);

  }

  // Takes in targetColor and userColor, both assumed to be valid canvas colors
  // (When it was the sample code, it was like "#000000"), other color representations
  // likely valid too but unknown at the moment
  function drawCanvas(userR, userG, userB) {

    if(userR == null) {
      userR = getUserR();
      userG = getUserG();
      userB = getUserB();
    }

    userSides = getSides();

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

  function updateScoreboard() {
    var roundScore = calculateScore();
    var result = "Your Score: " + calculateScore().toString() + "\n";
    totalScore += roundScore;
    result += "Percentage Off Red:   " + Math.ceil((percentageOff(targetR, getUserR()) * 100)/100) + "%" + "\n";
    result += "Percentage Off Green: " + Math.ceil((percentageOff(targetG, getUserG()) * 100)/100) + "%" + "\n";
    result += "Percentage Off Blue:  " + Math.ceil((percentageOff(targetB, getUserB()) * 100)/100) + "%" + "\n";
    result += "Total Score: " + totalScore;
    document.getElementById("scoreboard").innerText = result;
  }


  function startRound() {

    if(turns > 0) {

      // Generate a new color and UI
      targetR = genRColor();
      targetG = genGColor();
      targetB = genBColor();
      drawCanvas(255, 255, 255);

      // Reset sliders and values
      document.getElementById("red_slider").value = 255;
      document.getElementById("red_number").value = 255;
      document.getElementById("green_slider").value = 255;
      document.getElementById("green_number").value = 255;
      document.getElementById("blue_slider").value = 255;
      document.getElementById("blue_number").value = 255;

      // Display scoreboard
      updateScoreboard();
      document.getElementById("scoreboard").hidden = true;

      // Decrement turns
      turns--;
      document.getElementById("turns").value = turns;

      // Start a new timer
      startTimer();
    } else {
      if(confirm("The game has finished! Want to start a new game? ")) {
        // They say ok
        // Reset the game
        resetGame();
      } else {
        // They don't say ok
        updateScoreboard();
      }
    }
  }

  function stopRound() {
    stopTimer();
    updateScoreboard();
    document.getElementById("scoreboard").hidden = false;
    if(turns === 0) {
      document.getElementById("highScoreSaveForm").hidden = false;
    }

  }

  function resetGame() {
    stopRound();
    turns = 10;
    document.getElementById("turns").value = turns;
    document.getElementById("scoreboard").hidden = true;
    targetR = 255;
    targetG = 255;
    targetB = 255;
    drawCanvas(255, 255, 255);
    totalScore = 0;
    document.getElementById("timer").innerText = "Time Left: 15";
    document.getElementById("highScoreSaveForm").hidden = true;
  }

  function startTimer() {
    if(timerVar == null) {
      startTime = getTime();
      if(difficulty < 3) {
        document.getElementById("timer").innerText = "Time Left: 15";
        timerVar = setInterval(function() { timer(0); }, 1000);
      } else if(difficulty < 6) {
        document.getElementById("timer").innerText = "Time Left: 15.0";
        timerVar = setInterval(function() { timer(1); }, 100);
      } else if(difficulty < 9) {
        document.getElementById("timer").innerText = "Time Left: 15.00";
        timerVar = setInterval(function() { timer(2); }, 10);
      } else {
        document.getElementById("timer").innerText = "Time Left: 15.000";
        timerVar = setInterval(function() { timer(3); }, 1);
      }
    }
  }

  function stopTimer() {
    clearInterval(timerVar);
    timerVar = null;
  }

  function timer(precision) {

    var timerElement = document.getElementById("timer");
    if(15000 - getTimeTaken() > 0) {
      timerElement.innerText = "Time Left: " + ((15000 - getTimeTaken()) / 1000).toFixed(precision);
    } else {
      timerElement.innerText = "Time Left: 0";
      stopRound();
    }
  }

  function saveInfo() {
    var pName = document.getElementById("pName").value;
    var currentTime = new Date();
    sortTime = currentTime.getTime(); // used for secondary sorting
    var readableTime = currentTime.toDateString(); // what a user looking at the table will actually see
    if (pName.length === 0) {
      alert("Please enter a name");
    } else {
      // take pName, difficulty, turns, totalScore, and find the current time
      //  store all of this in localStorage as an entry in a JSON array
      // check if the array has already been created in localStorage (I want to add to it, not override it)
      if (!localStorage.getItem("highScores")) {
        // the highScores item does NOT exist yet
        var jsonEntry;
        jsonEntry = {"highScores": [{"name":pName, "difficulty":difficulty, "turns":turns, "score":totalScore, "sortTime":sortTime, "readableTime":readableTime}]};
        jsonEntry = JSON.stringify(jsonEntry);
        localStorage.setItem("highScores", [jsonEntry]);
      } else {
        // the highScores item already exists
        jsonEntry = {"name":pName, "difficulty":difficulty, "turns":turns, "score":totalScore, "sortTime":sortTime, "readableTime":readableTime};
        var jsonStr = localStorage.getItem("highScores");
        var jsonObj = JSON.parse(jsonStr);
        jsonObj["highScores"].push(jsonEntry);
        jsonStr = JSON.stringify(jsonObj);
        localStorage.setItem("highScores", jsonStr);
      }
    }
  }

}(jQuery));
