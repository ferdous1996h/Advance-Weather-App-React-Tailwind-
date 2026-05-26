import React from 'react';
import { dayNameLong } from '../../utils/dayNameLong';
import { weatherFigures } from '../../utils/weatherFigures';
import onlyTime from '../../utils/onlyTime';
export default function SingleHour({ hourlyData, selectedDay }) {
  console.log(hourlyData);
  return (
    <>
      {hourlyData.time.map((day, ind) => {
        // <div>{dayNameLong(day)}</div>;
        if (dayNameLong(day) === selectedDay) {
          return (
            <div className="mt-2 flex justify-between items-center border-2 border-Neutral_200 rounded-lg px-2">
              <div className='flex items-center'>
                <img
                  className="w-12"
                  src={weatherFigures(hourlyData.weather_code[ind])}
                  alt=""
                />
                <p>{onlyTime(hourlyData.time[ind])}</p>
              </div>

              <p>{Math.round(hourlyData.temperature_2m[ind])}°</p>
            </div>
          );
        }
      })}
    </>
  );
}
