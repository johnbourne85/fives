function searchfunction() {
  $("#output").html("");
  $("#searchbtn").html("...");
  $("#searchbtn").attr("disabled", true);
  $("#searchbtn").css("color", "black");
  $("#searchbtn").css("background-color", "#f2f2f2");
  $("#pagination").html("");
  var offset = "";
  var baseid = "appoSpWy6YfbT6owy";
  var tablename = "songs";
  var query = "";
  var searchURL = "";
  var apikey = "keyikCO7h5adp9Xtx";
  var hadThat =
    "<p>WE'VE HAD THAT ALREADY! Or... at least we've had something kinda similar based on the letters you've typed in...</p>";
  document.querySelector("#message").textContent = "";
  query = $("#searchbox").val();
  var searchURL =
    "https://api.airtable.com/v0/" +
    baseid +
    "/" +
    tablename +
    "?api_key=" +
    apikey +
    "&filterByFormula=Find(LOWER(%22" +
    query +
    "%22)%2C+LOWER(searchroll))&pageSize=100" +
    offset;

  $.getJSON(searchURL, function (songData) {
    if (songData.records.length === 0) {
      $("#message").append(
        "<div class='error'><p>There was a young man called Peter,</p><p>When it comes to cock, he's an eater,</p><p>No results for this search,</p><p>But don't cry, Mr Church,</p><p>You are a song choosing world beater.</p></div>"
      );
      $("#searchbtn").html("Go");
      $("#searchbtn").attr("disabled", false);
      $("#searchbtn").css("color", "white");
      $("#searchbtn").css("background-color", "#0099cc");
    } else {
      $("#message").append(hadThat);

      for (var i = 0; i < songData.records.length; i++) {
        let who = songData.records[i].fields.whoSongRoll;
        if (who === undefined) {
          who = "someone";
        }

        var songitem = `
        <div class="col" >
        <div class="card text-dark bg-light mb-3" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${songData.records[i].fields.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">by ${songData.records[i].fields.artistRoll}</h6>
            <p class="card-text">Chosen by <strong>${who}</strong> in the "<em><strong>${songData.records[i].fields.themeRoll}</strong></em>" theme.</p>
          </div>
        </div>
        </div>`;

        $("#output").append(songitem);

        $("#searchbtn").html("Go");
        $("#searchbtn").attr("disabled", false);
        $("#searchbtn").css("color", "white");
        $("#searchbtn").css("background-color", "#0099cc");
      }
    }
  });
}
