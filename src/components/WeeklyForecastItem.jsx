import { useApplicationContext } from "../context/ApplicationContext";

function getWeekNameFromDateTime(date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

function WeeklyForecastItem({ forecast }) {
  const { convertTemperature } = useApplicationContext();

  return (
    <div className="inline-grid-triple align-center padding-2x border-bottom">
      <p className="forecastTertiary">
        {getWeekNameFromDateTime(forecast.Date)}
      </p>
      <div className="inline-grid-double-sm-lg align-center">
        <img
          src={`../assets/weatherIcons/${String(forecast.Day.Icon).padStart(
            2,
            "0"
          )}-s.png`}
          className="weatherIconSmall"
        />
        <p className="bold">{forecast.Day.ShortPhrase}</p>
      </div>
      <p>
        <span className="bold">{`${convertTemperature(
          forecast.Temperature?.Maximum?.Value
        )}`}</span>
        /{`${convertTemperature(forecast.Temperature?.Minimum?.Value)}`}
      </p>
    </div>
  );
}

export default WeeklyForecastItem;
