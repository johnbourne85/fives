function searchfunction() {
  $("#output").html("");
  $("#searchbtn").html("...");
  $("#searchbtn").attr("disabled", true);
  $("#pagination").html("");
  var offset = ""
  var baseid = "appoSpWy6YfbT6owy";
  var tablename = "songs";
  var query = "";
  var searchURL = "";
  var apikey = "keyikCO7h5adp9Xtx";

  query = $("#searchbox").val();
  var searchURL = "https://api.airtable.com/v0/" + baseid + "/" + tablename + "?api_key=" + apikey + "&filterByFormula=Find(LOWER(%22" + query + "%22)%2C+LOWER(title))&pageSize=10" + offset;
  $.getJSON(searchURL, function (songData) {
    if (songData.records.length === 0) {
      $("#output").append('<div class="error">Sorry, no results found.</div>');
      $("#searchbtn").html("Search");
      $("#searchbtn").attr("disabled", false);
    } else {
        if (songData.records.length >= 9) {
var offset = "&offset=" + songData.offset;
var offsetURL = searchURL + offset
var nextLink = "<a href='"+offsetURL+"'>Next ></a>";
$("#pagination").append(nextLink);
        }

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
