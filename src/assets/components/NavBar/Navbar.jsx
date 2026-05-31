import { useState, useRef, useEffect } from 'react';
import logo from '../../images/logo.svg';
import Gear from '../../images/icon-units.svg';
import DropDown from '../../images/icon-dropdown.svg';
import DropDownNav from './DropDownNav';
export default function Navbar({ handleSwitchUnit, switchWeather }) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropDownRef = useRef(null);
  useEffect(() => {
    function toggleDropDown(e) {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setDropDownOpen(false);
      }
    }
    document.addEventListener('click', toggleDropDown);
    () => document.removeEventListener('click', toggleDropDown);
  }, []);
  return (
    <>
      <section className="flex justify-between">
        <img src={logo} alt="App logo" />
        <section
          ref={dropDownRef}
          className="relative bg-Neutral_800  rounded-lg cursor-pointer"
        >
          <section
            onClick={() => setDropDownOpen(prev => !prev)}
            className="p-2 flex items-center gap-2"
          >
            <img className="w-4" src={Gear} alt="" />
            <p>Units</p>
            <img className="w-4" src={DropDown} alt="" />
          </section>
          {dropDownOpen && (
            <DropDownNav
              handleSwitchUnit={handleSwitchUnit}
              switchWeather={switchWeather}
            />
          )}
        </section>
      </section>
    </>
  );
}
