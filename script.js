const inputBox = document.querySelector("#searchbox");

// Execute a function when the user releases a key on the keyboard when in the inputbox
inputBox.addEventListener("keyup", function (event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Trigger the button element with a click
    document.getElementById("searchBtn").click();
  }
});
