import { SearchQuery } from "../models/forecastModel";

class SearchView {
  private parentEl = document.getElementById("search-form-modal")!;
  private modal = document.getElementById("modal");
  private openButton = document.getElementById("button-modal")!;

  getQuery(): SearchQuery {
    const searchQuery: SearchQuery = {
      query: this.parentEl.querySelector("input")!.value,
      type: this.parentEl.querySelector("select")!.value,
    };
    this.clearInput();
    return searchQuery;
  }

  private clearInput(): void {
    this.parentEl.querySelector("input")!.value = "";
  }

  addHandlerSearch(handler: any) {
    this.openButton.addEventListener("click", () => {
      this.modal?.classList.add("is-active");
    });
    this.modal?.querySelector(".modal-close")?.addEventListener("click", () => {
      this.modal?.classList.remove("is-active");
    });
    this.modal
      ?.querySelector(".modal-background")
      ?.addEventListener("click", () => {
        this.modal?.classList.remove("is-active");
      });
    this.parentEl?.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
