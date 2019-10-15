Function:



Function:




//Function:
function percentage_off(guess, actual){
  var percentage_off = (Math.abs(actual - guess) / 255) * 100;
  return percentage_off;
}
function calculate_score(r, g, b, in_r, in_g, in_b, time_taken, difficulty){
  var r_poff = percentage_off(in_r, r);
  var g_poff = percentage_off(in_g, g);
  var b_poff = percentage_off(in_b, b);
  var average = (Math.abs(r_poff) + Math.abs(g_poff) + Math.abs(b_poff)) / 3;
  var score = ((15 - difficulty - average) / (15 - difficulty)) * (15000 - time_taken);
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
