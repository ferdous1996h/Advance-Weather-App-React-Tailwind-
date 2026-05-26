import React from 'react';
import { weatherFigures } from '../../utils/weatherFigures';
export default function SingleDailyCard({
  day,
  weatherCode,
  maxTemp,
  minTemp,
}) {
  return (
    <section className="bg-Neutral_800 rounded-xl p-3 text-center">
      <p className="font-semibold">{day}</p>
      <img className="w-20" src={weatherFigures(weatherCode)} alt="" />
      <div className="flex justify-between">
        <h3>{Math.floor(maxTemp)}°</h3>
        <p className="text-neutral-500">{Math.floor(minTemp)}°</p>
      </div>
    </section>
  );
}
