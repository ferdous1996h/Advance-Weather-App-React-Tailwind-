import React from 'react';
import SingleDailyCard from './SingleDailyCard';
import { getDayName } from '../../utils/singleDay';
export default function DailyForecastCards({ dailyData }) {
  return (
    <section>
      <h1>Daily forecast</h1>
      <section className='grid grid-cols-3 gap-2'>
        {Array.from({ length: 7 }).map((_, ind) => (
        <SingleDailyCard
          key={ind}
          maxTemp={dailyData.temperature_2m_max[ind]}
          minTemp={dailyData.temperature_2m_min[ind]}
          weatherCode={dailyData.weather_code[ind]}
          day={getDayName(dailyData.time[ind])}
        />
      ))}
      </section>

    </section>
  );
}
