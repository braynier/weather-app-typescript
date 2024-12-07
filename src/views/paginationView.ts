class PaginationView {
  private parentEl = document.getElementById("pagination")!;
  private data: any;

  addHandleClick(handler: any) {
    this.parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".button-pagination");
      if (!btn) return;
      const goToPage: number = +btn.dataset.goto;
      console.log(goToPage);

      handler(goToPage);
    });
  }

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
    // Logic for what current page are we on
    const currentPage: number = this.data.page;
    const numPages = Math.ceil(
      this.data.forecasts.length / this.data.forecastsPerPage
    );
    console.log(numPages);

    if (currentPage === 1 && numPages > 1) {
      return `
      <button disabled class="button-pagination pagination-previous">&#8678; Previous page
      </button>
      <button class="button-pagination pagination-next is-clickable" data-goto="${
        currentPage + 1
      }">Next page
        &#8680;</button>`;
    }
    if (currentPage === numPages && numPages > 1) {
      return `
      <button class="button-pagination pagination-previous is-clickable" data-goto="${
        currentPage - 1
      }">&#8678; Previous page
       </button>
      `;
    }
    if (currentPage < numPages) {
      return `
      <button class="button-pagination pagination-previous is-clickable"  data-goto="${
        currentPage - 1
      }">&#8678; Previous page
      </button>
      <button class="button-pagination pagination-next is-clickable"  data-goto="${
        currentPage + 1
      }">Next page &#8680;</button>
      `;
    }
    return "";
  }
}

export default new PaginationView();
