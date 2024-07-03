export class SubDivContainers {
  //field

  //constructor
  constructor(divContainers, hourlySlots) {
    this.divContainers = divContainers;
    this.hourlySlots = hourlySlots;
  }

  //methods
  createHourlyForecast = () => {
    this.divContainers.forEach((container, index) => {
      const subDivContainers = document.createElement("div");
      if (this.hourlySlots[index] == 0) {
        console.log("bruh");
      } else {
        for (
          let hourlySlot = 0;
          hourlySlot < this.hourlySlots[index];
          hourlySlot++
        ) {
          const hourlySlotEL = document.createElement("div");
          hourlySlotEL.classList.add("hourlySlot");
          subDivContainers.appendChild(hourlySlotEL);
        }
      }

      subDivContainers.classList.add("subContainers");
      subDivContainers.style.display = "none";
      container.insertAdjacentElement("afterend", subDivContainers); //append subDivContainers after each divContainers
    });
  };
}
