import React from 'react';
import { formatDate } from '../utils/dateConverter';
import WeatherIMG from './../images/icon-sunny.webp';
import DailyForecastCard from './DailyForecast/DailyForecastCard';
export default function TempCard({ weatherInfo }) {
  const { countryName, city, principalSubdivision } =
    weatherInfo.reverseLocation;
  const currentDate = formatDate(weatherInfo.current.time);
  const currentTemp = Math.floor(weatherInfo.current.temperature_2m);
  const feelsLikeTemp = Math.floor(weatherInfo.current.apparent_temperature);
  const humidity = Math.floor(weatherInfo.current.relative_humidity_2m);
  const wind = Math.floor(weatherInfo.current.wind_speed_10m);
  const precipitation = Math.floor(weatherInfo.current.precipitation);
  return (
    <>
      <section className="flex flex-col text-center justify-between p-6 bg-tempMobile w-full h-[15em] rounded-2xl">
        <div>
          <h1 className="text-2xl font-extrabold">
            {city}, {principalSubdivision}
          </h1>
          <p>{currentDate}</p>
          p
        </div>
        <div className="flex">
          <img className="w-25" src={WeatherIMG} alt="" />
          <h1 className="text-8xl font-extrabold">{currentTemp}°</h1>
        </div>
      </section>
      <section className="pt-3 grid grid-cols-2 gap-y-2">
        <div className="flex flex-col justify-between bg-Neutral_800 rounded-xl p-4 w-[8em] h-[8em]">
          <p>Feel</p>
          <h2 className="text-4xl">{feelsLikeTemp}°</h2>
        </div>
        <div className="flex flex-col justify-between bg-Neutral_800 rounded-xl p-4 w-[8em] h-[8em]">
          <p>Humidity</p>
          <h2 className="text-4xl">{humidity}%</h2>
        </div>
        <div className="flex flex-col justify-between bg-Neutral_800 rounded-xl p-4 w-[8em] h-[8em]">
          <p>Wind</p>
          <h2 className="text-4xl">{wind} mph</h2>
        </div>
        <div className="flex flex-col justify-between bg-Neutral_800 rounded-xl p-4 w-[8em] h-[8em]">
          <p>Precipitation</p>
          <h2 className="text-4xl">{precipitation} in</h2>
        </div>
      </section>

      <DailyForecastCard dailyData={weatherInfo.daily} />
    </>
  );
}
