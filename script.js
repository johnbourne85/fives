const inputBox = document.querySelector("#searchbox");
console.log(inputBox);

// Execute a function when the user releases a key on the keyboard
inputBox.addEventListener("keyup", function (event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Trigger the button element with a click
    document.getElementById("searchBtn").click();
  }
});
