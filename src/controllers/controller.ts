import * as model from "../models/forecastModel";
import forecastView from "../views/forecastView";
import paginationView from "../views/paginationView";
import resultsView from "../views/resultsView";
import searchView from "../views/searchView";

const controlForecasts = async () => {
  // Check local storage before rendering
  model.loadFromLocalStorage();
  // Initial table render with pagination applied
  forecastView.render(model.getSearchResultsPage());

  // render pagination buttons
  paginationView.render(model.state);
};

const controlDeleteForecast = (id: string) => {
  // Remove the forecast from the state
  model.state.forecasts = model.state.forecasts.filter(
    (forecast) => forecast.id !== id
  );
  // Save filtered forecasts into local storage
  model.saveToLocalStorage();

  // Re-render the forecasts in the table
  forecastView.render(model.getSearchResultsPage());
};

const controlSearchResults = async () => {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.fetchResults(query);
    console.log(model.state.searchResults);
    resultsView.render(model.state.searchResults);
  } catch (err) {
    console.error(err);
  }
};

const controlAddingSearchResults = async (id: string) => {
  // Find the clicked result in the state
  const selectedResult = model.state.searchResults.find(
    (item) => item.id === id
  );

  if (!selectedResult) return;
  await model.loadSelectedResult(selectedResult);
  console.log(model.state.forecasts);
  //   rerender forecasts, this here is now pagination
  forecastView.render(model.getSearchResultsPage());
  // forecastView.render(model.state.forecasts);

  //   set searhes to empty array
  model.state.searchResults = [];
  //   rerender search array
  //   FIX BUG WITH ERROR CUZ ARRAY IS EMPTY NOW
  resultsView.render(model.state.searchResults);
};

const controlPagination = (goToPage: number) => {
  forecastView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state);
};

export const init = () => {
  searchView.addHandlerSearch(controlSearchResults);
  resultsView.addHandlerResults(controlAddingSearchResults);
  forecastView.addHandlerDelete(controlDeleteForecast);
  paginationView.addHandleClick(controlPagination);

  controlForecasts();
};
