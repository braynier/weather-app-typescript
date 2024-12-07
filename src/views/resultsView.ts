import { SearchResult } from "../models/forecastModel";

class ResultsView {
  private parentEl = document.getElementById("search-results-modal")!;
  private data: any;
  private errorMessage = "No results found. Please try again";

  render(data: any) {
    if (!data || data.length === 0) return this.renderError();
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
      .map((item: SearchResult) => {
        return `<li class="is-flex is-justify-content-space-between is-clickable" data-id="${item.id}">
            <span>${item.name}</span>
            <span>${item.country}</span>
          </li>`;
      })
      .join(""); // Join the array into a single string
  }

  renderError(message: string = this.errorMessage) {
    const markup = `
            <p class="has-text-centered has-text-danger">
            No locations to display. Please try again.
          </p>
`;
    this.clear();
    this.parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerResults(handler: (id: string) => void) {
    this.parentEl.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;

      // Find the parent `<li>` with `data-id` (if a child was clicked)
      const listItem = target.closest("li[data-id]");
      if (!listItem) return;

      const id = listItem.dataset.id; // Retrieve `data-id`
      console.log("You clicked on this id" + id);

      if (id) handler(id); // Pass the id to the provided handler
    });
  }
}

export default new ResultsView();
