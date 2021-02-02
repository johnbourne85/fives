
var apikey = "keyBktR0kgRoYnwGY";
var input = document.getElementById("searchbox");
console.log(input);
var baseid = "appoSpWy6YfbT6owy";
var tablename = "songs";
var query = "";
var searchURL = "";

function searchfunction() {
  $("#output").html("");
  $("#searchbtn").html("Loading...")
        $("#searchbtn").attr("disabled", true);


  query = $("#searchbox").val();
  var searchURL = "https://api.airtable.com/v0/"+baseid+"/"+tablename+"?api_key="+apikey+"&filterByFormula=Find(LOWER(%22"+query+"%22)%2C+LOWER(title))";
   $.getJSON(searchURL, function(songData) {
     if (songData.records.length === 0){
          $("#output").append('<div class="error">Sorry, no results found.</div>'); 
          $("#searchbtn").html("Search")
        $("#searchbtn").attr("disabled", false);
     } else {
      for (var i = 0; i < songData.records.length; i++) {
     var songitem = 
     '<div class="card"><div class="song">'
     +songData.records[i].fields.title
     +'</div><div class="artist">by '
     + songData.records[i].fields.artistRoll
     +'</div><div class="who">Chosen by '+ songData.records[i].fields.whoSongRoll
     +' in "'+songData.records[i].fields.themeRoll 
     +'" week.</div>';

        $("#output").append(songitem); 
          $("#searchbtn").html("Search")
        $("#searchbtn").attr("disabled", false);
      }
     }
   });
  
}
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    console.log("enter");
    document.getElementById("searchbtn").click();
  }
});
