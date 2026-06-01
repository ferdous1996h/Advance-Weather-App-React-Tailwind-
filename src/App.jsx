import { useEffect, useState } from 'react';
import { geoWeatherInfo } from './assets/utils/geoWeatherInfo';
import Retry from './assets/components/Retry';
import LoadingPage from './assets/components/LoadingPage';
import Navbar from './assets/components/NavBar/Navbar';
import SearchBar from './assets/components/SearchBar';
import TempCard from './assets/components/TempCard';
import HourlyForecast from './assets/components/HourlyForecast/HourlyForecast';
export default function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [switchWeather, setSwitchWeather] = useState({});
  const [error, setError] = useState(false);
  function handleSwitchUnit(data) {
    setSwitchWeather(data);
  }
  const newLat = weatherInfo?.reverseLocation?.latitude;
  const newLon = weatherInfo?.reverseLocation?.longitude;
  useEffect(() => {
    async function finalFetchData(lat, long, switchData) {
      try {
        const response = await geoWeatherInfo(lat, long, switchData);
        console.log(response);
        setWeatherInfo(response);
      } catch (err) {
        console.error(err);
        console.log(err);
        setError(err);
      }
    }
    finalFetchData(newLat, newLon, switchWeather);
  }, [switchWeather, error === false]);
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

  if (error) return <Retry setError={setError} />;
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
