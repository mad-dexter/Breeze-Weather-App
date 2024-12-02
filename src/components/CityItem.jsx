import { useApplicationContext } from "../context/ApplicationContext";

function CityItem({ cityName, currentCondition }) {
  const { convertTemperature } = useApplicationContext();
  return (
    <div className="inline-grid-triple align-center padding-2x border-bottom">
      <img
        src={`../assets/weatherIcons/${String(
          currentCondition?.WeatherIcon
        ).padStart(2, "0")}-s.png`}
        className="weatherIconSmall"
      />
      <div className="flex align-center">
        <p className="bold font-size-2">{cityName}</p>
        <p className="forecastTertiary">{currentCondition?.WeatherText}</p>
      </div>
      <p className="siblingHeadingTertiary">
        {convertTemperature(currentCondition?.Temperature?.Imperial?.Value)}
      </p>
    </div>
  );
}

export default CityItem;
