export default function DropDownNav({ handleSwitchUnit, switchWeather }) {
  return (
    <section className="absolute bg-Neutral_800 w-[10.5em] right-0 top-full p-2 rounded-lg mt-1 text-base">
      <p className="hover:bg-Neutral_600 p-1 rounded-lg">
        {Object.keys(switchWeather).length < 3 ? (
          <span
            onClick={() =>
              handleSwitchUnit({
                wind_speed_unit: 'mph',
                temperature_unit: 'fahrenheit',
                precipitation_unit: 'inch',
              })
            }
          >
            Switch to Imperial
          </span>
        ) : (
          <span onClick={() => handleSwitchUnit({})}>Switch to Metric</span>
        )}
      </p>
      <span className="text-neutral-400 text-sm">Temperature</span>
      <p
        onClick={() =>
          handleSwitchUnit(prev => {
            const newOBJ = { ...prev };
            delete newOBJ.temperature_unit;
            return newOBJ;
          })
        }
        className="hover:bg-Neutral_600 p-1 rounded-lg"
      >
        Celsius (°C) {!switchWeather?.temperature_unit && '✔'}
      </p>
      <p
        onClick={() =>
          handleSwitchUnit(prev => ({
            ...prev,
            temperature_unit: 'fahrenheit',
          }))
        }
        className="hover:bg-Neutral_600 p-1 rounded-lg"
      >
        Fahrenheit (°F) {switchWeather?.temperature_unit && '✔'}
      </p>
      <hr className="text-neutral-400" />
      <span className="text-neutral-400 text-sm">Wind Speed</span>
      <p
        onClick={() =>
          handleSwitchUnit(prev => {
            const newOBJ = { ...prev };
            delete newOBJ.wind_speed_unit;
            return newOBJ;
          })
        }
        className="hover:bg-Neutral_600 p-1 rounded-lg"
      >
        km/h {!switchWeather?.wind_speed_unit && '✔'}
      </p>
      <p
        onClick={() =>
          handleSwitchUnit(prev => ({
            ...prev,
            wind_speed_unit: 'mph',
          }))
        }
        className="hover:bg-Neutral_600 p-1 rounded-lg"
      >
        mph {switchWeather?.wind_speed_unit && '✔'}
      </p>
      <hr className="text-neutral-400" />
      <span className="text-neutral-400 text-sm">Precipitaion</span>
      <p
        onClick={() =>
          handleSwitchUnit(prev => {
            const newOBJ = { ...prev };
            delete newOBJ.precipitation_unit;
            return newOBJ;
          })
        }
        className="hover:bg-Neutral_600 p-1 rounded-lg"
      >
        Millimeters (mm) {!switchWeather?.precipitation_unit && '✔'}
      </p>
      <p
        onClick={() =>
          handleSwitchUnit(prev => ({
            ...prev,
            precipitation_unit: 'inch',
          }))
        }
        className="hover:bg-Neutral_600 p-1 rounded-lg"
      >
        Inches (in) {switchWeather?.precipitation_unit && '✔'}
      </p>
    </section>
  );
}
