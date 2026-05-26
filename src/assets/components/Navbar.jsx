import { useState, useRef, useEffect } from 'react';
import logo from '../images/logo.svg';
import Gear from '../images/icon-units.svg';
import DropDown from '../images/icon-dropdown.svg';
export default function Navbar() {
  const [dropDownOPEN, setDropDownOPEN] = useState(false);
  const dropDownRef = useRef();
  useEffect(() => {
    const outSideDropDown = e => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setDropDownOPEN(false);
      }
    };
    document.addEventListener('click', outSideDropDown);
    return () => document.removeEventListener('click', outSideDropDown);
  }, []);
  return (
    <>
      <section className="flex justify-between">
        <img src={logo} alt="App logo" />
        <section ref={dropDownRef} className="relative">
          <button
            onClick={() => setDropDownOPEN(prev => !prev)}
            className="cursor-pointer rounded-lg bg-Neutral_800 flex gap-2 px-2 py-1"
          >
            <img className="self-center" src={Gear} alt="" />
            Units
            <img className="self-center" src={DropDown} alt="" />
          </button>
          {dropDownOPEN && (
            <section className="w-50 right-0 absolute top-full rounded-lg bg-Neutral_800 px-2 py-1">
              <button className="text-left p-0.5 cursor-pointer hover:bg-Neutral_600 w-full   block rounded-lg ">
                Switch to Imperial
              </button>
              <p className="text-neutral-400">Temperature</p>
              <button className="text-left p-0.5 cursor-pointer hover:bg-Neutral_600 w-full block rounded-lg">
                Celsius(°C)
              </button>
              <button className="text-left p-0.5 cursor-pointer hover:bg-Neutral_600 w-full block rounded-lg">
                Fahrenheit (°F)
              </button>
              <hr className="text-neutral-400" />
              <p className="text-neutral-400">Wind Speed</p>
              <button className="text-left p-0.5 cursor-pointer hover:bg-Neutral_600 w-full block rounded-lg">
                km/h
              </button>
              <button className="text-left p-0.5 cursor-pointer hover:bg-Neutral_600 w-full block rounded-lg">
                mph
              </button>
              <hr className="text-neutral-400" />
              <p className="text-neutral-400">Precipitation</p>
              <button className="text-left p-0.5 cursor-pointer hover:bg-Neutral_600 w-full block rounded-lg">
                Millimetres(mm)
              </button>
              <button className="text-left p-0.5 cursor-pointer hover:bg-Neutral_600 w-full block rounded-lg">
                Inches(in)
              </button>
            </section>
          )}
        </section>
      </section>
    </>
  );
}
