import SearchHeader from "../components/SearchHeader";
import TodayWeather from "../components/TodayWeather";
import HourlyForecasts from "../components/HourlyForecasts";
import MoreWeatherInfo from "../components/MoreWeatherInfo";
import WeeklyForecast from "../components/WeeklyForecast";
import PageWrapper from "../components/PageWrapper";
import NoWeatherData from "../components/NoWeatherData";
import { Link, useParams } from "react-router-dom";
import { useCityContext } from "../context/CityContext";

import styles from "./weatherPage.module.css";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

function WeatherPage() {
  const { id } = useParams();
  const {
    clearCities,
    getCurrentConditionForCity,
    getHourlyForecastForCity,
    getDailyForecastFor5DaysCity,
    handleCitySelection,
    isLoading,
    selectedCityList,
  } = useCityContext();

  // useEffect to get Weather data on ID change
  useEffect(
    function () {
      clearCities();

      // Call function to load geolocation data
      handleCitySelection(id);

      // Call the other functions for quick load of weather data
      getCurrentConditionForCity(id);
      getHourlyForecastForCity(id);
      getDailyForecastFor5DaysCity(id);
    },
    [id]
  );

  if (isLoading) return <Spinner />;

  return (
    <PageWrapper>
      <div>
        <SearchHeader />
        {selectedCityList.length > 0 ? (
          <div className={styles.historyContainer}>
            {selectedCityList.map((item) => (
              <Link
                to={`/${item.cityID}`}
                key={item.cityID}
                className={styles.searchHistoryItems}
              >
                {item.cityName}
              </Link>
            ))}
          </div>
        ) : (
          <></>
        )}
        {id ? (
          <main className={styles.main}>
            <div className={styles.weatherData}>
              <TodayWeather />
              <HourlyForecasts />
              <MoreWeatherInfo />
            </div>
            <WeeklyForecast />
          </main>
        ) : (
          <NoWeatherData />
        )}
      </div>
    </PageWrapper>
  );
}

export default WeatherPage;
