export class Location {
  constructor(location) {
    this.location = location;
  }

  //methods
  createLocation() {
    const header = document.createElement("h1");
    header.classList.add("location");
    header.textContent = `${this.location}`;
    app.appendChild(header);
  }
}
