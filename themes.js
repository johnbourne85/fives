//set up the URL to get data
const baseid = "appoSpWy6YfbT6owy";
const tablename = "themes";
const apikey = "keyikCO7h5adp9Xtx";
const searchURL = `https://api.airtable.com/v0/${baseid}/${tablename}?api_key=${apikey}`;
document.querySelector("#loading").classList.remove("hidden");
let songList = "";
$.getJSON(searchURL, function (songData) {
  for (let i = 0; i < songData.records.length; i++) {
    let output = `
    <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">  ${songData.records[i].fields.theme}</h5>
    <p class="card-text">by ${songData.records[i].fields.whothemeName}</p>
    <a href="${songData.records[i].fields.spotifyUrl}" class="btn btn-primary">Listen on Spotify</a>
  </div>
</div>
`;
    //console.log(output);
    $("#output").append(output);
    document.querySelector("#loading").classList.add("hidden");
  }
});
