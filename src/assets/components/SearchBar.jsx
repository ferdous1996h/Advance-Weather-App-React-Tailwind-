import { useState, useEffect, Fragment } from 'react';
import { geoWeatherInfo } from '../utils/geoWeatherInfo';
import locationICON from '../images/icons8-location.gif';
export default function SearchBar({ handleCLKedLocation, setWeatherInfo }) {
  const [filteredName, setFilteredName] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  console.log(filteredName, filteredData);
  useEffect(() => {
    async function getSuggestionData() {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${filteredName}&apiKey=08f86428e656420997749da0525af031`
      );
      const data = await res.json();
      console.log(data);
      const filterOBJ = data.features.map(item => ({
        lat: item.properties.lat,
        long: item.properties.lon,
        place: item.properties.formatted,
      }));
      console.log(filterOBJ);
      setFilteredData(filterOBJ);
    }
    if (filteredName) getSuggestionData();
  }, [filteredName]);

  //Manually typed search
  async function handleSearch(formData) {
    const typePlace = formData.get('placeInput');
    if (typePlace) setFilteredData(null);
    const resPlace = await fetch(
      `https://geocode.maps.co/search?q=${typePlace}&api_key=6a15e989622fb490703327ezsa1c2c2`
    );
    const dataPlace = await resPlace.json();
    console.log(dataPlace);
    const { lat, lon } = dataPlace[0];
    async function finalFetchData(lat, long) {
      try {
        const response = await geoWeatherInfo(lat, long);
        console.log(response);
        setWeatherInfo(response);
      } catch (err) {
        console.error(err);
      }
    }
    finalFetchData(lat, lon);
  }
  return (
    <section className="text-center">
      <div className="min-h-[10em] flex items-center">
        <h1 className="font-extrabold text-4xl m-auto">
          How's the sky looking today?
        </h1>
      </div>
      <form
        className="pb-8 flex flex-col  justify-center gap-4 sm:flex-row"
        action={handleSearch}
      >
        <div className="relative">
          <input
            className="w-full relative px-2 sm:min-w-lg p-2 rounded-lg bg-Neutral_600"
            type="text"
            name="placeInput"
            id="placeInputID"
            onChange={e => setFilteredName(e.target.value)}
          />
          {filteredData && (
            <section className="rounded-lg absolute top-full left-0 w-full bg-white text-black">
              {filteredData.map(ele => (
                <Fragment key={ele.lat}>
                  <div
                    className="pl-1.5 flex items-center text-left py-2 cursor-pointer rounded-lg w-full hover:bg-neutral-200"
                    onClick={() => {
                      handleCLKedLocation({ lat: ele.lat, long: ele.long });
                      setFilteredData(null);
                    }}
                  >
                    <img
                      className="w-4 rounded-full"
                      src={locationICON}
                      alt=""
                    />
                    <p className="pl-1">{ele.place}</p>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </section>
          )}
        </div>
        <button className="cursor-pointer rounded-lg py-2 px-3 bg-Blue_700" type="submit">
          Search
        </button>
      </form>
    </section>
  );
}
