
//
(function($) {
    $.fn.hexed = function() {
        // call functions inside this block
    }
    // define functions inside this block
    // returns miliseconds since UNIX epoch
    function getTime() {
        var d = new Date();
        var t = d.getTime();
    }

    function percentage_off(guess, actual){
      var percentage_off = (Math.abs(actual - guess) / 255) * 100;
      return percentage_off;
    }
    function calculate_score(r, g, b, in_r, in_g, in_b, time_taken, difficulty){
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

    function r_color(){
      r = Math.floor(Math.random() * 256);
      return r;
    }
    function g_color(){
      g = Math.floor(Math.random() * 256);
      return g;
    }
    function b_color(){
      b = Math.floor(Math.random() * 256);
      return b;
    }

    var r = r_color();
    var g = g_color();
    var b = b_color();



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
        canvas.style = "text-align: center;";
        startingElement.appendChild(canvas);

        // Create sliders
        var sliders = document.createElement("div");

        // Red slider
        var sliders_red = document.createElement("div");
        var sliders_red_slider = document.createElement("input");
        sliders_red_slider.id = "red_slider";
        var sliders_red_number = document.createElement("input");
        sliders_red_number.id = "red_number";

        sliders_red.appendChild(sliders_red_slider);
        sliders_red.appendChild(sliders_red_number);
        sliders.appendChild(sliders_red);

        // Green slider
        var sliders_green = document.createElement("div");
        var sliders_green_slider = document.createElement("input");
        sliders_green_slider.id = "green_slider";
        var sliders_green_number = document.createElement("input");
        sliders_green_number.id = "green_number";

        sliders_green.appendChild(sliders_green_slider);
        sliders_green.appendChild(sliders_green_number);
        sliders.appendChild(sliders_green);

        // Blue slider
        var sliders_blue = document.createElement("div");
        var sliders_blue_slider = document.createElement("input");
        sliders_blue_slider.id = "blue_slider";
        var sliders_blue_number = document.createElement("input");
        sliders_blue_number.id = "blue_number";

        sliders_blue.appendChild(sliders_blue_slider);
        sliders_blue.appendChild(sliders_blue_number);
        sliders.appendChild(sliders_blue);


    }

    // Takes in targetColor and userColor, both assumed to be valid canvas colors
    // (When it was the sample code, it was like "#000000"), other color representations
    // likely valid too but unknown at the moment
    function drawCanvas(targetColor, userColor) {
      var canvas = document.getElementById("myCanvas");
      var context = canvas.getContext("2d");

      var leftCircle_centerX = (canvas.width / 2) - (canvas.width / 4);
      var leftCircle_centerY = (canvas.width / 2) - (canvas.width / 4);
      var rightCircle_centerX = (canvas.width / 2) + (canvas.width / 4);
      var rightCircle_centerY = (canvas.width / 2) + (canvas.width / 4);
      var radius = (canvas.height / 4);

      context.beginPath();
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
      context.stroke();

    }
    function sliderNumber() {
      document.getElementById("sliders_red_slider").addEventListener("change", function () {
        document.getElementById("sliders_red_number").value = document.getElementById("sliders_red_slider").value;
      });
      document.getElementById("sliders_red_number").addEventListener("change", function () {
        document.getElementById("sliders_red_slider").value = document.getElementById("sliders_red_number").value;
      });
      document.getElementById("sliders_green_slider").addEventListener("change", function () {
        document.getElementById("sliders_green_number").value = document.getElementById("sliders_green_slider").value;
      });
      document.getElementById("sliders_green_number").addEventListener("change", function () {
        document.getElementById("sliders_green_slider").value = document.getElementById("sliders_green_number").value;
      });
      document.getElementById("sliders_blue_slider").addEventListener("change", function () {
        document.getElementById("sliders_blue_number").value = document.getElementById("sliders_blue_slider").value;
      });
      document.getElementById("sliders_blue_number").addEventListener("change", function () {
        document.getElementById("sliders_blue_slider").value = document.getElementById("sliders_blue_number").value;
      });
    }



}(jQuery));

