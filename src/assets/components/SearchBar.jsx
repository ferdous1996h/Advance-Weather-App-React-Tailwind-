import { useState, useEffect, Fragment, useActionState } from 'react';
import { geoWeatherInfo } from '../utils/geoWeatherInfo';
import { DNA } from 'react-loader-spinner';
import locationICON from '../images/icons8-location.gif';
import { HiH3 } from 'react-icons/hi2';
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
  async function handleSearch(prevState, formData) {
    try {
      const typePlace = formData.get('placeInput')?.toString().trim();
      if (!typePlace) return { message: 'Please enter a location' };
      const error = {};
      if (typePlace) setFilteredData(null);
      const resPlace = await fetch(
        `https://geocode.maps.co/search?q=${typePlace}&api_key=6a15e989622fb490703327ezsa1c2c2`
      );
      if (!resPlace.ok) {
        error.message = "This isn't any valid location name";
      }
      const dataPlace = await resPlace.json();
      if (dataPlace.length < 1) {
        error.message = "This isn't any valid location name";
      }
      if (Object.keys(error).length > 0) {
        return { success: false, message: error.message };
      }
      const { lat, lon } = dataPlace[0];
      const response = await geoWeatherInfo(lat, lon);
      return { success: true, response };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message || 'Something went wrong' };
    }
  }
  const [state, formAction, isPending] = useActionState(handleSearch, {
    success: false,
  });

  useEffect(() => {
    if (state.success && state?.response) {
      setWeatherInfo(state.response);
    }
  }, [state, setWeatherInfo]);
  return (
    <section className="text-center">
      <div className="min-h-[10em] flex items-center">
        <h1 className="font-extrabold text-4xl m-auto">
          How's the sky looking today?
        </h1>
      </div>
      {isPending && (
        <div className="flex justify-center">
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
      <form
        className="pb-8 flex flex-col  justify-center gap-4 sm:flex-row"
        action={formAction}
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
        <button
          className="cursor-pointer rounded-lg py-2 px-3 bg-Blue_700"
          type="submit"
        >
          Search
        </button>
      </form>
      {state?.message && (
        <p className="text-red-600 pb-4">⚠️ {state?.message}!</p>
      )}
    </section>
  );
}
