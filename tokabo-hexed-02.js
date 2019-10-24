window.addEventListener("storage", function() {
  genPage();
});

// I call the same function twice because I want it to run once when the page loads
//  and again every time localStorage is changed

window.onload = function() {
  genPage();
};


function genPage() {
  if (!localStorage.getItem("highScores")) {
    var noInfo = document.createElement("p");
    noInfo.innerText = "No scores :(";
    noInfo.id = "noInfo";
    document.body.insertBefore(noInfo, document.getElementById("scores"));
  } else {
    if (document.getElementById("noInfo")) {
      // if the element exists, remove it
      document.getElementById("noInfo").remove();
    }
    // make sure that the table is empty (if it is not, empty it)
    if ($("#scores").children().length > 0) {
      // table is not empty
      $("tr").remove();
    }
    // populate the table
    var jsonStr = localStorage.getItem("highScores");
    var jsonObj = JSON.parse(jsonStr);
    jsonObj.highScores.sort(function(a, b) {
      if (a.score != b.score) {
        // sort scores in descending order (highest on top)
        return b.score - a.score;
      } else {
        // sort timestamps in ascending order (most recent on top)
        return b.sortTime - a.sortTime;
      }
    });
    // add classes/IDs as necessary for any CSS stuff
    // it can be done anywhere *above* the tHeader.appendChild() lines
    var tHeader = document.createElement("tr");
    var h1 = document.createElement("th");
    var h2 = document.createElement("th");
    var h3 = document.createElement("th");
    var h4 = document.createElement("th");
    var h5 = document.createElement("th");
    h1.innerHTML = "Player Name";
    h2.innerHTML = "Difficulty";
    h3.innerHTML = "Turns";
    h4.innerHTML = "Score";
    h5.innerHTML = "Timestamp"
    tHeader.appendChild(h1);
    tHeader.appendChild(h2);
    tHeader.appendChild(h3);
    tHeader.appendChild(h4);
    tHeader.appendChild(h5);
    document.getElementById("scores").appendChild(tHeader);
    // highScores array is now sorted, so I can loop through it and create a table
    for (var i = 0; i < jsonObj.highScores.length; i++) {
      var row = document.createElement("tr");
      var pn = document.createElement("th");
      var di = document.createElement("th");
      var tu = document.createElement("th");
      var sc = document.createElement("th");
      var ti = document.createElement("th");
      pn.innerText = jsonObj.highScores[i].name;
      di.innerText = jsonObj.highScores[i].difficulty;
      tu.innerText = jsonObj.highScores[i].turns;
      sc.innerText = jsonObj.highScores[i].score;
      ti.innerText = jsonObj.highScores[i].readableTime;
      // add classes/IDs/attributes here if necessary
      row.appendChild(pn);
      row.appendChild(di);
      row.appendChild(tu);
      row.appendChild(sc);
      row.appendChild(ti);
      document.getElementById("scores").appendChild(row);
    }
  }
}


function clearHS() {
  var result = window.confirm("Are you sure you want to clear your high scores?");
  if (result === true) {
    localStorage.removeItem("highScores");
  }
}
