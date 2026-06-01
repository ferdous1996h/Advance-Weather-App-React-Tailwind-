
import { formatDate } from '../utils/dateConverter';
import { weatherFigures } from '../utils/weatherFigures';
import { regionNameFull } from '../utils/regionNameFull';
import DailyForecastCard from './DailyForecast/DailyForecastCard';
export default function TempCard({ weatherInfo, switchWeather }) {
  const { countryCode, city, principalSubdivision } =
    weatherInfo.reverseLocation;
  console.log(weatherInfo);
  const currentDate = formatDate(weatherInfo.current.time);
  const currentTemp = Math.floor(weatherInfo.current.temperature_2m);
  const feelsLikeTemp = Math.floor(weatherInfo.current.apparent_temperature);
  const humidity = Math.floor(weatherInfo.current.relative_humidity_2m);
  const wind = Math.floor(weatherInfo.current.wind_speed_10m);
  const precipitation = Math.floor(weatherInfo.current.precipitation);
  const weatherCode = weatherInfo.current.weather_code;
  return (
    <section className="lg:col-span-2 lg:col-start-1">
      <section className="md:grid md:grid-cols-2 lg:bg-tempDesktop m-auto flex flex-col bg-no-repeat bg-cover text-center justify-between p-6 bg-tempMobile w-12/12 h-[15em] rounded-4xl">
        <div className="h-full text-left flex flex-col md:gap-8">
          <div className="text-3xl font-extrabold lg:text-4xl">
            {principalSubdivision}, {city}
            <h2 className="text-xl font-bold">
              -{regionNameFull(countryCode)}
            </h2>
          </div>
          <p>{currentDate}</p>
        </div>
        <div className="flex m-auto">
          <img className="w-25 self-center" src={weatherFigures(weatherCode)} alt="" />
          <h1 className="text-8xl font-extrabold">
            {currentTemp} {switchWeather?.temperature_unit ? '°F' : '°C'}
          </h1>
        </div>
      </section>
      <section className="mt-5 pt-3 grid grid-cols-2 gap-2 auto-cols-[minmax(8em,15em)] gap-y-2 lg:grid-cols-4">
        <div className="flex flex-col justify-between bg-Neutral_800 rounded-xl p-4 h-[8em]">
          <p>Feel</p>
          <h2 className="text-4xl">
            {feelsLikeTemp} {switchWeather?.temperature_unit ? '°F' : '°C'}
          </h2>
        </div>
        <div className="flex flex-col justify-between bg-Neutral_800 rounded-xl p-4 h-[8em]">
          <p>Humidity</p>
          <h2 className="text-4xl">{humidity}%</h2>
        </div>
        <div className="flex flex-col justify-between bg-Neutral_800 rounded-xl p-4 h-[8em]">
          <p>Wind</p>
          <h2 className="text-4xl">
            {wind} {switchWeather?.wind_speed_unit ? 'mph' : 'km/h'}
          </h2>
        </div>
        <div className="flex flex-col justify-between bg-Neutral_800 rounded-xl p-4 h-[8em]">
          <p>Precipitation</p>
          <h2 className="text-4xl">
            {precipitation} {switchWeather?.precipitation_unit ? 'inch' : 'mm'}
          </h2>
        </div>
      </section>

      <DailyForecastCard dailyData={weatherInfo.daily} />
    </section>
  );
}
