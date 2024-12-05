import { createContext, useContext, useReducer } from "react";

const CityContext = createContext();

const CITY_LIST = "SELECTED_CITY_LIST";
const API_KEY = import.meta.env.VITE_REACT_APP_ACCUWEATHER_API_KEY;
const BASE_URL = "https://dataservice.accuweather.com/";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// Functions for local storage
function setDataToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getDataFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

async function getDataFromWebService(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Issues calling the webservice url - ${url}`);

  const response = resp.json();

  return response;
}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "citiesLoaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "clearCities":
      return { ...state, cities: [] };
    case "currentConditionLoaded":
      return { ...state, currentCondition: action.payload, isLoading: false };
    case "hourlyForecastLoaded":
      return { ...state, hourlyForecast: action.payload, isLoading: false };
    case "dailyForecast5":
      return { ...state, dailyForecast5: action.payload, isLoading: false };
    case "cityGeoPositionLoaded":
      state.selectedCityList.find((el) => el.cityID === action.cityID) &&
      action.cityID
        ? ""
        : setDataToLocalStorage(CITY_LIST, [
            ...state.selectedCityList,
            {
              cityName: action.payload.LocalizedName,
              lat: action.payload.GeoPosition.Latitude,
              lng: action.payload.GeoPosition.Longitude,
              emoji: convertToEmoji(action.payload.Country.ID),
              cityID: action.cityID,
            },
          ]);
      return {
        ...state,
        isLoading: false,
        selectedCity: {
          cityName: action.payload.LocalizedName,
          lat: action.payload.GeoPosition.Latitude,
          lng: action.payload.GeoPosition.Longitude,
          emoji: convertToEmoji(action.payload.Country.ID),
          cityID: action.cityID,
        },
        selectedCityList:
          state.selectedCityList.find((el) => el.cityID === action.cityID) &&
          action.cityID
            ? [...state.selectedCityList]
            : [
                ...state.selectedCityList,
                {
                  cityName: action.payload.LocalizedName,
                  lat: action.payload.GeoPosition.Latitude,
                  lng: action.payload.GeoPosition.Longitude,
                  emoji: convertToEmoji(action.payload.Country.ID),
                  cityID: action.cityID,
                },
              ],
      };
    case "currentConditionLoadedForSavedItem":
      return {
        ...state,
        isLoading: false,
        selectedCityList: [
          ...state.selectedCityList.filter(
            (item) => item.cityID !== action.cityID
          ),
          {
            ...state.selectedCityList.find(
              (item) => item.cityID === action.cityID
            ),
            currentCondition: action.payload,
          },
        ],
      };
    case "loaded":
      return { ...state, isLoading: false };
    default:
      throw new Error("Wrong action type mentioned in reducer");
  }
}

function CityContextProvider({ children }) {
  const initialState = {
    cities: [],
    selectedCity: [],
    selectedCityList: getDataFromLocalStorage(CITY_LIST) || [],
    isLoading: false,
    currentCondition: {},
    hourlyForecast: [],
    dailyForecast5: [],
  };

  const [
    {
      cities,
      isLoading,
      currentCondition,
      hourlyForecast,
      dailyForecast5,
      selectedCity,
      selectedCityList,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Utility functions

  async function handleCitySelection(id) {
    if (!id) return;
    dispatch({ type: "loading" });
    let selectedCityData;
    try {
      // Call webservice to load geolocation
      selectedCityData = await getDataFromWebService(
        `${BASE_URL}locations/v1/${id}?apikey=${API_KEY}`
      );
    } catch (err) {
      console.log(err.message);
    }

    // Check if the City if already loaded in the City List. If not add it
    dispatch({
      type: "cityGeoPositionLoaded",
      payload: selectedCityData,
      cityID: id,
    });
  }

  // const controller = new AbortController();

  async function loadCities(query) {
    if (query.length <= 3) {
      clearCities();
      return;
    }

    // controller.abort();

    // dispatch({ type: "loading" });
    // Call webservice to load cities
    let data;
    try {
      // const resp = await fetch(
      //   `${BASE_URL}locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`,
      //   {
      //     signal: controller.signal,
      //   }
      // );
      const resp = await fetch(
        `${BASE_URL}locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`
      );
      if (!resp.ok) {
        throw new Error("Something went wrong while fetching movie data");
      }
      data = await resp.json();
    } catch (e) {
      if (e.name !== "AbortError") {
        console.log(e.message);
      }
    }

    dispatch({ type: "citiesLoaded", payload: data });
  }

  function clearCities() {
    dispatch({ type: "clearCities" });
  }

  function getCurrentConditionForSavedCities() {
    dispatch({ type: "loading" });
    selectedCityList.forEach((item) => {
      // call current condition web service
      let currentCondData;

      // Call webservice to load current condition
      getDataFromWebService(
        `${BASE_URL}currentconditions/v1/${item.cityID}?apikey=${API_KEY}&details=true`
      )
        .then((resp) => {
          currentCondData = resp;
          dispatch({
            type: "currentConditionLoadedForSavedItem",
            payload: currentCondData.at(0),
            cityID: item.cityID,
          });
        })
        .catch((err) => console.log(err.message));
    });

    dispatch({ type: "loaded" });
  }

  async function getCurrentConditionForCity(id) {
    if (!id) return;

    dispatch({ type: "loading" });

    // call current condition web service
    let currentCondData;
    try {
      currentCondData = await getDataFromWebService(
        `${BASE_URL}currentconditions/v1/${id}?apikey=${API_KEY}&details=true`
      );
    } catch (err) {
      console.log(err.message);
    }

    dispatch({
      type: "currentConditionLoaded",
      payload: currentCondData.at(0),
    });
  }

  async function getHourlyForecastForCity(id) {
    if (!id) return;

    dispatch({ type: "loading" });

    // call Hourly forecast web service
    let hourlyForecastData;
    try {
      hourlyForecastData = await getDataFromWebService(
        `${BASE_URL}forecasts/v1/hourly/12hour/${id}?apikey=${API_KEY}&details=true`
      );
    } catch (err) {
      console.log(err.message);
    }

    dispatch({
      type: "hourlyForecastLoaded",
      payload: hourlyForecastData,
    });
  }

  async function getDailyForecastFor5DaysCity(id) {
    if (!id) return;
    dispatch({ type: "loading" });

    // call daily forecast for 5 days web service
    let dailyForecastData;
    try {
      dailyForecastData = await getDataFromWebService(
        `${BASE_URL}forecasts/v1/daily/5day/${id}?apikey=${API_KEY}&details=true`
      );
    } catch (err) {
      console.log(err.message);
    }

    dispatch({
      type: "dailyForecast5",
      payload: dailyForecastData.DailyForecasts,
    });
  }

  // End of functions

  return (
    <CityContext.Provider
      value={{
        cities,
        currentCondition,
        hourlyForecast,
        dailyForecast5,
        selectedCity,
        isLoading,
        selectedCityList,
        loadCities,
        clearCities,
        getCurrentConditionForCity,
        getHourlyForecastForCity,
        getDailyForecastFor5DaysCity,
        handleCitySelection,
        getCurrentConditionForSavedCities,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCityContext() {
  const context = useContext(CityContext);

  if (!context)
    throw new Error("Context accessed outside of the context window");

  return context;
}

export { CityContextProvider, useCityContext };
