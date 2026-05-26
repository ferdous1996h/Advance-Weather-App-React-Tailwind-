import { useEffect, useState } from 'react';
import { geoWeatherInfo } from './assets/utils/geoWeatherInfo';
import Navbar from './assets/components/Navbar';
import SearchBar from './assets/components/SearchBar';
import TempCard from './assets/components/TempCard';
import HourlyForecast from './assets/components/HourlyForecast/HourlyForecast';
export default function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  useEffect(() => {
    async function finalFetchData() {
      const response = await geoWeatherInfo();
      console.log(response);
      setWeatherInfo(response);
    }
    finalFetchData();
  }, []);
  if (!weatherInfo) return;
  return (
    <main className="font-DM_Sans p-8 min-h-dvh bg-Neutral_900 text-baseSize text-neutral-50">
      <Navbar />
      <SearchBar />
      <TempCard weatherInfo={weatherInfo} />
      <HourlyForecast weatherInfo={weatherInfo} />
    </main>
  );
}
