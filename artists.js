const baseid = "appoSpWy6YfbT6owy";
const tablename = "artist";

const apikey = "keyikCO7h5adp9Xtx";

const searchURL = `https://api.airtable.com/v0/${baseid}/${tablename}?api_key=${apikey}&sort%5B0%5D%5Bfield%5D=countSongs&sort%5B0%5D%5Bdirection%5D=desc`;

$.getJSON(searchURL, function (songData) {
  for (var i = 0; i < songData.records.length; i++) {
    `
    <div class="card">
    <div class="rank"></div>
    <div class="data">
      <div class="song">${songData.records[i].fields.Name}</div>
      <div class="artist">
        Chosen ${songData.records[i].fields.countSongs} times.
      </div>
    </div>
  </div>`;
    var artistItem = ` <div class="accordion-item">
  <h2 class="accordion-header" id="heading${i + 1}">
    <button
      class="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapse${i + 1}"
      aria-expanded="true"
      aria-controls="collapse${i + 1}"
    >
    <span><strong>${i + 1}</strong></span>: ${
      songData.records[i].fields.Name
    } (Chosen ${songData.records[i].fields.countSongs} times).
    </button>
  </h2>
  <div
    id="collapse${i + 1}"
    class="accordion-collapse collapse"
    aria-labelledby="heading${i + 1}"
    data-bs-parent="#output"
  >
    <div class="accordion-body">
      <p>TBC</p>
    </div>
  </div>
</div>`;

    $("#output").append(artistItem);
  }
  document.querySelector("#loading").classList.add("hidden");
});
