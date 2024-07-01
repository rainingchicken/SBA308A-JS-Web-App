export class Location {
  constructor(city, state) {
    this.city = city;
    this.state = state;
  }

  //methods
  createLocation() {
    const header = document.createElement("h1");
    header.classList.add("location");
    header.textContent = `${this.city}, ${this.state}`;
    app.appendChild(header);
  }
}
