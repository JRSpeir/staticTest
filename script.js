const form = document.getElementById("form");
const log = document.getElementById("log");

function logSubmit(event) {
  log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
  event.preventDefault();
}

form.addEventListener("submit", logSubmit);
