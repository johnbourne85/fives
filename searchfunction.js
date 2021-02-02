function searchfunction() {
  $("#output").html("");
  $("#searchbtn").html("Loading...");
  $("#searchbtn").attr("disabled", true);


  query = $("#searchbox").val();
  var searchURL = "https://api.airtable.com/v0/" + baseid + "/" + tablename + "?api_key=" + apikey + "&filterByFormula=Find(LOWER(%22" + query + "%22)%2C+LOWER(title))";
  $.getJSON(searchURL, function (songData) {
    if (songData.records.length === 0) {
      $("#output").append('<div class="error">Sorry, no results found.</div>');
      $("#searchbtn").html("Search");
      $("#searchbtn").attr("disabled", false);
    } else {
      for (var i = 0; i < songData.records.length; i++) {
        var songitem = '<div class="card"><div class="song">'
          + songData.records[i].fields.title
          + '</div><div class="artist">by '
          + songData.records[i].fields.artistRoll
          + '</div><div class="who">Chosen by ' + songData.records[i].fields.whoSongRoll
          + ' in "' + songData.records[i].fields.themeRoll
          + '" week.</div>';

        $("#output").append(songitem);
        $("#searchbtn").html("Search");
        $("#searchbtn").attr("disabled", false);
      }
    }
  });

}
