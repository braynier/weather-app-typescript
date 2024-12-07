// import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import { FORECASTS_PER_PAGE } from "../config";

export type Forecast = {
  id: string;
  name: string;
  country: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  sunrise: number;
  sunset: number;
};

export type SearchQuery = {
  query: string | null | undefined;
  type: string | null | undefined;
};

export type SearchResult = {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
};

export const state = {
  forecasts: [] as Forecast[],
  searchResults: [] as SearchResult[],
  forecastsPerPage: FORECASTS_PER_PAGE,
  page: 1,
};

// Ugly code to fetch data from the API's
export const fetchResults = async (searchQuery: SearchQuery) => {
  // By city name
  if (searchQuery.type === "name") {
    const response = await axios.get(
      "http://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q: searchQuery.query,
          limit: 5,
          appid: "067680d43c82d50f8138bbc7eb701c11",
        },
      }
    );
    const data = response.data;

    data.forEach((item: SearchResult) => {
      state.searchResults.push({
        id: uuidv4(),
        name: item.name,
        lat: item.lat,
        lon: item.lon,
        country: item.country,
      });
    });
  }
  // By zip code
  else if (searchQuery.type === "zip") {
    const response = await axios.get(
      "http://api.openweathermap.org/geo/1.0/zip",
      {
        params: {
          zip: searchQuery.query,
          appid: "067680d43c82d50f8138bbc7eb701c11",
          limit: 5,
        },
      }
    );
    const data = response.data;

    state.searchResults.push({
      id: uuidv4(),
      name: data.name,
      lat: data.lat,
      lon: data.lon,
      country: data.country,
    });
  }
  // By coordinates
  else if (searchQuery.type === "coords") {
    const [lat, lon] = searchQuery.query.split(",");
    const response = await axios.get(
      "http://api.openweathermap.org/geo/1.0/reverse",
      {
        params: {
          lat,
          lon,
          limit: 5,
          appid: "067680d43c82d50f8138bbc7eb701c11",
        },
      }
    );
    const data = response.data;

    data.forEach((item: SearchResult) => {
      state.searchResults.push({
        id: uuidv4(),
        name: item.name,
        lat: item.lat,
        lon: item.lon,
        country: item.country,
      });
    });
  }
};

export const loadSelectedResult = async (
  selectedSearchResult: SearchResult
) => {
  const { lat, lon, id } = selectedSearchResult;
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat,
        lon,
        appid: "067680d43c82d50f8138bbc7eb701c11",
        units: "metric",
      },
    }
  );

  const data = response.data;

  state.forecasts.push({
    id: id,
    name: data.name,
    country: data.sys.country,
    temp: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
  });
  saveToLocalStorage();
};

// Pagination
export const getSearchResultsPage = (page: number = state.page) => {
  state.page = page;
  const start: number = (page - 1) * state.forecastsPerPage;
  const end: number = page * state.forecastsPerPage;

  return state.forecasts.slice(start, end);
};

export const saveToLocalStorage = () => {
  localStorage.setItem("forecasts", JSON.stringify(state.forecasts));
};

export const loadFromLocalStorage = () => {
  const storedForecasts = localStorage.getItem("forecasts");
  if (storedForecasts) {
    state.forecasts = JSON.parse(storedForecasts);
  }
};
