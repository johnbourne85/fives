//set up the URL to get data
const baseid = "appoSpWy6YfbT6owy";
const tablename = "us";
const apikey = "keyikCO7h5adp9Xtx";
const searchURL = `https://api.airtable.com/v0/${baseid}/${tablename}?api_key=${apikey}`;
document.querySelector("#loading").classList.remove("hidden");

let songList = "";
let sortable = [];

$.getJSON(searchURL, function (songData) {
  for (let i = 0; i < songData.records.length; i++) {
    let artistArray = songData.records[i].fields.artistRoll.split(";;;");

    let topArtists = ` <div class="accordion-item">
    <div class="accordion-header" id="heading${i + 1}">
    <button
      class="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapse${i + 1}"
      aria-expanded="true"
      aria-controls="collapse${i + 1}"
    ><div class="totalArtistsChosenByUs">
    <h3>${
      songData.records[i].fields.Name
    }</h3><p class="text-muted">Chosen a total of <strong><span id="totalArtists${i}"></span></strong> artists</p> </button>
  </div>
  </div>
  <div
    id="collapse${i + 1}"
    class="accordion-collapse collapse"
    aria-labelledby="heading${i + 1}"
    data-bs-parent="#output"
  >
    <div class="accordion-body">
      <ol id="us${i}">
      </ol>
    </div>
  </div>
  </div>`;
    $("#output").append(topArtists);
    document.querySelector("#loading").classList.add("hidden");

    var counts = {};
    artistArray.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    var sortable = [];
    for (var bands in counts) {
      sortable.push([bands, counts[bands]]);
    }

    sortable.sort(function (a, b) {
      return a[1] - b[1];
    });
    sortable.reverse();

    let totalChosen = sortable.length;
    $(`#totalArtists${i}`).append(totalChosen);
    for (let j = 0; j < 10; j++) {
      let artistAndTotal = sortable[j];
      let artistTitle = artistAndTotal[0];
      let totalPicked = artistAndTotal[1];

      songList = `<li class="listItems">
      <span class="artistTitle"><strong>${
        j + 1
      }: ${artistTitle}</strong></span><span class="chosenAmount badge bg-primary rounded-pill"> ${totalPicked}</span>
          </li>`;
      $(`#us${i}`).append(songList);
    }
  }
});
