import { fetchWeatherApi } from 'openmeteo';
const geolocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      error => reject(error)
    );
  });
};
async function reverseGeoLocation(lat, long) {
  const data = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
  );
  const result = await data.json();
  return result;
}
export async function geoWeatherInfo() {
  const { lat, long } = await geolocation();
  const params = {
    latitude: 44.2706,
    longitude: -71.3033,
    // Will change this later
    // latitude: lat,
    // longitude: long,
    daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min'],
    hourly: ['temperature_2m', 'weather_code'],
    current: [
      'temperature_2m',
      'precipitation',
      'wind_speed_10m',
      'relative_humidity_2m',
      'apparent_temperature',
      'weather_code',
    ],
    timezone: 'auto',
  };
  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);

  // Process first location
  const response = responses[0];

  // Attributes for timezone and location
  const latitude = response.latitude();
  const longitude = response.longitude();
  const elevation = response.elevation();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  console.log(
    `\nCoordinates: ${latitude}°N ${longitude}°E`,
    `\nElevation: ${elevation}m asl`,
    `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
    `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`
  );

  const current = response.current();
  const hourly = response.hourly();
  const daily = response.daily();

  // Weather data object
  const weatherData = {
    reverseLocation: await reverseGeoLocation(latitude, longitude),
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0).value(),
      precipitation: current.variables(1).value(),
      wind_speed_10m: current.variables(2).value(),
      relative_humidity_2m: current.variables(3).value(),
      apparent_temperature: current.variables(4).value(),
      weather_code: current.variables(5).value(),
    },

    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000
          )
      ),

      temperature_2m: hourly.variables(0).valuesArray(),
      weather_code: hourly.variables(1).valuesArray(),
    },

    daily: {
      time: Array.from(
        {
          length:
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
        },
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
              1000
          )
      ),

      weather_code: daily.variables(0).valuesArray(),
      temperature_2m_max: daily.variables(1).valuesArray(),
      temperature_2m_min: daily.variables(2).valuesArray(),
    },
  };

  return weatherData;
}
