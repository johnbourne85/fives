$("#searchbtn").click(search);
var apikey = "keyBktR0kgRoYnwGY";

var baseid = "appoSpWy6YfbT6owy";
var tablename = "songs";
var query = "";
var searchURL = "";

function search() {
  $("#output").html("");
  $("#searchbtn").html("Loading...")
        $("#searchbtn").attr("disabled", true);


  query = $("#searchbox").val();
  var searchURL = "https://api.airtable.com/v0/"+baseid+"/"+tablename+"?api_key="+apikey+"&filterByFormula=Find(LOWER(%22"+query+"%22)%2C+LOWER(title))";
   $.getJSON(searchURL, function(songData) {
     console.log(songData);
      for (var i = 0; i < songData.records.length; i++) {
     var songitem = '<div class="card"><div class="song">'+songData.records[i].fields.title+'</div><div class="artist">by '+ songData.records[i].fields.artistRoll+'</div>';
        console.log(songitem)
        $("#output").append(songitem); 
          $("#searchbtn").html("Search")
        $("#searchbtn").attr("disabled", false);
      }
   });
  
}
