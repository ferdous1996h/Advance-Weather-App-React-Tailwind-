import { useEffect, useState } from 'react';
import { geoWeatherInfo } from './assets/utils/geoWeatherInfo';
import LoadingPage from './assets/components/LoadingPage';
import Navbar from './assets/components/NavBar/Navbar';
import SearchBar from './assets/components/SearchBar';
import TempCard from './assets/components/TempCard';
import HourlyForecast from './assets/components/HourlyForecast/HourlyForecast';
export default function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [switchWeather, setSwitchWeather] = useState({});
  function handleSwitchUnit(data) {
    setSwitchWeather(data);
  }
  useEffect(() => {
    async function finalFetchData(lat, long, switchData) {
      try {
        const response = await geoWeatherInfo(lat, long, switchData);
        console.log(response);
        setWeatherInfo(response);
      } catch (err) {
        console.error(err);
      }
    }
    finalFetchData(44.2706, -71.3033, switchWeather);
  }, [switchWeather]);
  function handleCLKedLocation(data) {
    setWeatherInfo(null);
    const { lat, long } = data;
    async function finalFetchData(lat, long) {
      try {
        const response = await geoWeatherInfo(lat, long);
        console.log(response);
        setWeatherInfo(response);
      } catch (err) {
        console.error(err);
      }
    }
    finalFetchData(lat, long);
  }

  if (!weatherInfo) return <LoadingPage />;
  return (
    <main className="font-DM_Sans p-8 min-h-dvh bg-Neutral_900 text-baseSize text-neutral-50">
      <Navbar
        handleSwitchUnit={handleSwitchUnit}
        switchWeather={switchWeather}
      />
      <SearchBar
        setWeatherInfo={setWeatherInfo}
        handleCLKedLocation={handleCLKedLocation}
      />
      <section className="grid lg:grid-cols-3 gap-5">
        <TempCard weatherInfo={weatherInfo} switchWeather={switchWeather} />
        <HourlyForecast weatherInfo={weatherInfo} />
      </section>
    </main>
  );
}
