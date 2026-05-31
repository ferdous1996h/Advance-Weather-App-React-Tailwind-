import {useState} from 'react';
import FilterDay from './FilterDay';
import SingleHour from './SingleHour';
export default function HourlyForecast({ weatherInfo }) {
  const hourlyData = weatherInfo.hourly;
  const [selectedDay, setSelectedDay] = useState('Friday');
  console.log(selectedDay)
  return (
    <section className="overflow-y-scroll scrollbar-thumb-Neutral_600 h-dvh lg:col-span-1  lg:col-start-3 bg-neutral-800 rounded-lg p-6 ">
      <div className="hourlyForecastTop flex justify-between items-center">
        <h3>Hourly forecast</h3>
        <FilterDay setSelectedDay={setSelectedDay} selectedDay={selectedDay} />
      </div>
      {/* Main weather data */}
      <SingleHour hourlyData={hourlyData} selectedDay={selectedDay} />
    </section>
  );
}
