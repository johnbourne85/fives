const baseid = "appoSpWy6YfbT6owy";
const tablename = "artist";

const apikey = "keyikCO7h5adp9Xtx";

const searchURL = `https://api.airtable.com/v0/${baseid}/${tablename}?api_key=${apikey}&sort%5B0%5D%5Bfield%5D=countSongs&sort%5B0%5D%5Bdirection%5D=desc`;

console.log(searchURL);

$.getJSON(searchURL, function (songData) {
  for (var i = 0; i < songData.records.length; i++) {
    var artistItem = `<div class="card"><div class="song">${songData.records[i].fields.Name}</div><div class="artist">Chosen ${songData.records[i].fields.countSongs} times.`;
    $("#output").append(artistItem);
  }
});
