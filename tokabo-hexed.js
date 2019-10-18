(function($) {

  $.fn.hexed = function(difficulty, turns) {
    // call functions inside this block
    genHTML(this.get(0));

    var startTime = getTime();
    var targetColor = genRandomColor();

    drawCanvas(targetColor, "#ffffff", 20);

    document.getElementById("submit").addEventListener("click", function() {
      updateCanvas(targetColor, startTime, difficulty)
    });

  };

  function updateCanvas(targetColor, startTime, difficulty) {
    var in_r = parseInt(document.getElementById("red_number").value);
    var in_g = parseInt(document.getElementById("green_number").value);
    var in_b = parseInt(document.getElementById("blue_number").value);
    var hexValue = "#" + toPaddedHex(in_r) + toPaddedHex(in_g) + toPaddedHex(in_b);
    console.log(hexValue);
    var time_taken = getTime() - startTime;
    close = calculate_score(r, g, b, in_r, in_g, in_b, time_taken, difficulty);
    close = 20;
    console.log(close);
    drawCanvas(targetColor, hexValue, close);
  }

  function genRandomColor() {
    var in_r = r_color();
    var in_g = g_color();
    var in_b = b_color();
    return "#" + toPaddedHex(in_r) + toPaddedHex(in_g) + toPaddedHex(in_b);
  }

  function toPaddedHex(d) {
    var s = (+d).toString(16);
    if(s.length < 2) {
      s = '0' + s;
    }
    return s;
  }

  // define functions inside this block
  // returns milliseconds since UNIX epoch
  function getTime() {
    var d = new Date();
    var t = d.getTime();
    return t;
  }

  function percentage_off(guess, actual) {
    var percentage_off = (Math.abs(actual - guess) / 255) * 100;
    return percentage_off;
  }

  function calculate_score(r, g, b, in_r, in_g, in_b, time_taken, difficulty) {
    var r_poff = percentage_off(in_r, r);
    var g_poff = percentage_off(in_g, g);
    var b_poff = percentage_off(in_b, b);
    var average = (r_poff + g_poff + b_poff) / 3;
    var score = ((15 - difficulty - average) / (15 - difficulty)) * (15000 - time_taken);
    score = Math.ceil(score * 100) / 100;
    if (score < 0) {
      score = 0;
    }
    return score;
  }

  function r_color() {
    r = Math.floor(Math.random() * 256);
    return r;
  }

  function g_color() {
    g = Math.floor(Math.random() * 256);
    return g;
  }

  function b_color() {
    b = Math.floor(Math.random() * 256);
    return b;
  }

  function score() {
    //get values from page and call calculate_score
  }

  // Generate the game HTML
  function genHTML(startingElement) {

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
    sliders_red_slider.value = "0";
    sliders_red_slider.oninput = function(){
        document.getElementById("red_number").value = this.value;
    };
    sliders_red_slider.onchange = function(){
        document.getElementById("red_number").value = this.value;
    };
    var sliders_red_number = document.createElement("input");
    sliders_red_number.id = "red_number";
    sliders_red_number.type = "number";
    sliders_red_number.value = "0";
    sliders_red_number.min = "0";
    sliders_red_number.max = "255";
    sliders_red_number.oninput = function(){
        document.getElementById("red_slider").value = this.value;
    };
    sliders_red_number.onchange = function(){
        document.getElementById("red_slider").value = this.value;
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
    sliders_green_slider.value = "0";
    sliders_green_slider.oninput = function(){
        document.getElementById("green_number").value = this.value;
    };
    sliders_green_slider.onchange = function(){
        document.getElementById("green_number").value = this.value;
    };
    var sliders_green_number = document.createElement("input");
    sliders_green_number.id = "green_number";
    sliders_green_number.type = "number";
    sliders_green_number.value = "0";
    sliders_green_number.min = "0";
    sliders_green_number.max = "255";
    sliders_green_number.oninput = function(){
        document.getElementById("green_slider").value = this.value;
    };
    sliders_green_number.onchange = function(){
        document.getElementById("green_slider").value = this.value;
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
    sliders_blue_slider.value = "0";
    sliders_blue_slider.oninput = function(){
        document.getElementById("blue_number").value = this.value;
    };
    sliders_blue_slider.onchange = function(){
        document.getElementById("blue_number").value = this.value;
    };
    var sliders_blue_number = document.createElement("input");
    sliders_blue_number.id = "blue_number";
    sliders_blue_number.type = "number";
    sliders_blue_number.value = "0";
    sliders_blue_number.min = "0";
    sliders_blue_number.max = "255";
    sliders_blue_number.oninput = function(){
        document.getElementById("blue_slider").value = this.value;
    };
    sliders_blue_number.onchange = function(){
        document.getElementById("blue_slider").value = this.value;
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
    submit.onclick = function() { score(); } ;
    startingElement.appendChild(submit);

    // Scoreboard
    var score = document.createElement("p");
    score.id = "scoreboard";
    score.innerText = "Your Score: ";
    startingElement.appendChild(score);
  }

  // Takes in targetColor and userColor, both assumed to be valid canvas colors
  // (When it was the sample code, it was like "#000000"), other color representations
  // likely valid too but unknown at the moment
  function drawCanvas(targetColor, userColor, totalSides) {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    var leftCircle_centerX = (canvas.width / 2) - (canvas.width / 4);
    var leftCircle_centerY = (canvas.height / 2);
    var rightCircle_centerX = (canvas.width / 2) + (canvas.width / 4);
    var rightCircle_centerY = (canvas.height / 2);
    var radius = (canvas.height / 4);

/*      context.beginPath();
    context.arc(leftCircle_centerX, leftCircle_centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = targetColor;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#000000';
    context.stroke();

    context.beginPath();
    context.arc(rightCircle_centerX, rightCircle_centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = userColor;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#000000';
    context.stroke();*/

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

    context.fillStyle = targetColor;
    context.fill();

    // 2nd hexagon

    //var totalSides = 30;

    size = 70;
    x = 230;
    y = 100;

    context.beginPath();
    context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    for (var side = 0; side < totalSides; side++) {
      context.lineTo(x + size * Math.cos(side * 2 * Math.PI / totalSides), y + size * Math.sin(side * 2 * Math.PI / totalSides));
    }

    context.fillStyle = "#000000";
    context.fill();

    size = 65;
    x = 230;
    y = 100;
    side = 0;

    context.beginPath();
    context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    for (var side = 0; side < totalSides; side++) {
      context.lineTo(x + size * Math.cos(side * 2 * Math.PI / totalSides), y + size * Math.sin(side * 2 * Math.PI / totalSides));
    }

    context.fillStyle = userColor;
    context.fill();


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
  submit.value = "Save Info";
  submit.onclick = function() { saveInfo(); };
  form.appendChild(submit);
  document.body.appendChild(form);
}


// genForm() MUST finish before this function is called, as it takes the input from genForm and from other elements on the page
function saveInfo() {
  alert("button clicked");
}

