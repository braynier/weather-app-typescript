import { Forecast } from "../models/forecastModel";

class ForecastView {
  private parentEl = document.getElementById("weather-table-body")!;
  private data: any;

  render(data: any) {
    this.data = data;
    const markup = this.generateMarkup();
    this.clear();
    this.parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  private clear() {
    this.parentEl.innerHTML = "";
  }

  private generateMarkup(): string {
    return this.data
      .map((item: Forecast) => {
        return `<tr data-id="${item.id}">
              <td>${item.name}</td>
              <td>${item.temp}</td>
              <td>${item.humidity}</td>
              <td>${item.windSpeed}</td>
              <td>${item.pressure}</td>
              <td>${item.sunrise}</td>
              <td>${item.sunset}</td>
              <td>-</td>
              <td>
                <button class="button is-small is-danger delete-button">
                  X
                </button>
              </td>
            </tr>`;
      })
      .join(""); // Join the array into a single string
  }

  addHandlerDelete(handler: (id: string) => void) {
    this.parentEl.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      // Check if the delete button was clicked
      if (target.classList.contains("delete-button")) {
        const row = target.closest("tr[data-id]");
        if (!row) return;

        const id = row.dataset.id;
        if (id) handler(id); // Pass the `id` to the handler function
      }
    });
  }
}

export default new ForecastView();
