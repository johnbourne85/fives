//set up the URL to get data
const baseid = "appoSpWy6YfbT6owy";
const tablename = "themes";
const apikey = "keyikCO7h5adp9Xtx";
const searchURL = `https://api.airtable.com/v0/${baseid}/${tablename}?api_key=${apikey}`;
console.log(searchURL);
document.querySelector("#loading").classList.remove("hidden");

let songList = "";

//Filter by person, or "all"
function filterByPerson(chosenPerson) {
  //clear content
  document.querySelector("#loading").classList.remove("hidden");
  document.querySelector("#output").innerHTML = "";

  //get the data
  $.getJSON(searchURL, function (songData) {
    for (let i = 0; i < songData.records.length; i++) {
      if (chosenPerson == "All") {
        let themeInfo = ` <div class="accordion-item">
        <div class="accordion-header" id="heading${i + 1}">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse${i + 1}"
          aria-expanded="true"
          aria-controls="collapse${i + 1}"
        ><div class="totalArtistsChosenByUs">
        <h3>${songData.records[i].fields.theme}</h3>
        
      
      </div>
      </div>
      <div
        id="collapse${i + 1}"
        class="accordion-collapse collapse"
        aria-labelledby="heading${i + 1}"
        data-bs-parent="#output"
      >
        <div class="accordion-body">
        <a href="${
          songData.records[i].fields.spotifyUrl
        }" class="btn btn-secondary spotifyBtn" id="totalArtists${i}"><i class="fab fa-spotify spotifyIcon"></i>Listen on Spotify </a>
          <ol id="songList${i}">
          </ol>
        </div>
      </div>
      </div>`;

        $("#output").append(themeInfo);
        document.querySelector("#loading").classList.add("hidden");

        const songsArr = songData.records[i].fields.songsRoll.split(";;;");
        const artistsArr = songData.records[i].fields.artistsRoll.split(";;;");

        for (let j = 0; j < songsArr.length; j++) {
          let songList = `<li>
          <strong>${songsArr[j]}</strong> by ${artistsArr[j]}
              </li>`;
          $(`#songList${i}`).append(songList);
        }

        //if person seletcted isn't the person in this part of the loop, skip it
      } else if (songData.records[i].fields.whothemeName != chosenPerson) {
        continue;
      } else if (chosenPerson != "All") {
        let themeInfo = `<div class="accordion-item">
        <div class="accordion-header" id="heading${i + 1}">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse${i + 1}"
          aria-expanded="true"
          aria-controls="collapse${i + 1}"
        ><div class="totalArtistsChosenByUs">
        <h3>${songData.records[i].fields.theme}</h3>
       
      
      </div>
      </div>
      <div
        id="collapse${i + 1}"
        class="accordion-collapse collapse"
        aria-labelledby="heading${i + 1}"
        data-bs-parent="#output"
      >
        <div class="accordion-body">
        <a href="${
          songData.records[i].fields.spotifyUrl
        }" class="btn btn-secondary spotifyBtn" id="totalArtists${i}"><i class="fab fa-spotify spotifyIcon"></i>Listen on Spotify</a>
          <ol id="songList${i}">
          </ol>
        </div>
      </div>
      </div>`;

        $("#output").append(themeInfo);
        document.querySelector("#loading").classList.add("hidden");
        const songsArr = songData.records[i].fields.songsRoll.split(";;;");
        const artistsArr = songData.records[i].fields.artistsRoll.split(";;;");

        for (let j = 0; j < songsArr.length; j++) {
          let songList = `<li>
          <strong>${songsArr[j]}</strong> by ${artistsArr[j]}
              </li>`;
          $(`#songList${i}`).append(songList);
        }
      }
    }
    document.querySelector("#whoSelect").classList.remove("hidden");
  });
}
//Listen for change on select box

document
  .getElementById("whoSelect")
  .addEventListener("change", function getPerson() {
    document.querySelector("#whoSelect").classList.add("hidden");
    let chosen = this.value;
    switch (chosen) {
      case "0":
        chosen = "All";
        break;
      case "1":
        chosen = "Chid";
        break;
      case "2":
        chosen = "Dave";
        break;
      case "3":
        chosen = "John";
        break;
      case "4":
        chosen = "Luke";
        break;
      case "5":
        chosen = "Pete";
        break;
      case "6":
        chosen = "Rocky";
        break;
      default:
        chosen = "All";
    }
    filterByPerson(chosen);
  });

// run the filter
filterByPerson("All");
