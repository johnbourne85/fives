function searchfunction() {
  document.querySelector("#output").innerHTML = "";
  document.querySelector("#searchBtn").textContent = "...";
  document.querySelector("#searchBtn").classList.add("disabled");

  const baseid = "appoSpWy6YfbT6owy";
  const tablename = "songs";
  const query = document.querySelector("#searchbox").textContent;
  const apikey = "keyikCO7h5adp9Xtx";
  const hadThat = `<div class="alert alert-warning" role="alert"><p><strong>We've had that already!</strong></p></p>Or... at least we've had something kinda similar based on the letters you've typed in...</p></div>`;
  document.querySelector("#message").textContent = "";
  const searchURL = `https://api.airtable.com/v0/${baseid}/${tablename}?api_key=${apikey}&filterByFormula=Find(LOWER(%22${query}%22)%2C+LOWER(searchroll))`;
  let oddEven = "";

  $.getJSON(searchURL, function (songData) {
    if (songData.records.length === 0) {
      $("#message").append(
        `<div class="alert alert-warning" role="alert"><p>There was a young man called Peter,</p><p>When it comes to cock, he's an eater,</p><p>No results for this search,</p><p>But don't cry, Mr Church,</p><p>You are a song choosing world beater.</p></div>`
      );
      document.querySelector("#searchBtn").textContent = "Go";
      document.querySelector("#searchBtn").classList.remove("disabled");
    } else {
      $("#message").append(hadThat);

      for (let i = 0; i < songData.records.length; i++) {
        let who = songData.records[i].fields.whoSongRoll;
        if (who === undefined) {
          who = "someone";
        }

        if (i % 2 == 0) {
          oddEven = "list-group-item-success";
        } else {
          oddEven = "list-group-item-primary";
        }

        const songitem = `
        <ul class="list-group">
        <li class="list-group-item ${oddEven}">
        <h4 class="card-title">${songData.records[i].fields.title}</h4>
            <h5 class="card-subtitle mb-2 text-muted">by ${songData.records[i].fields.artistRoll}</h5>
            <p class="card-text">Chosen by <strong>${who}</strong> in the "<em><strong>${songData.records[i].fields.themeRoll}</strong></em>" theme.</p>
        </li>
        </ul>
        `;

        $("#output").append(songitem);

        document.querySelector("#searchBtn").textContent = "Go";
        document.querySelector("#searchBtn").classList.remove("disabled");
      }
    }
  });
}
