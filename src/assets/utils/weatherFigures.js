import drizzle from '../images/icon-drizzle.webp';
import fog from '../images/icon-fog.webp';
import overcast from '../images/icon-overcast.webp';
import partly_Cloud from '../images/icon-partly-cloudy.webp';
import rain from '../images/icon-rain.webp';
import snow from '../images/icon-snow.webp';
import storm from '../images/icon-storm.webp';
import sunny from '../images/icon-sunny.webp';
export function weatherFigures(code) {
  if (code === 3) return overcast;
  if (code === 2) return partly_Cloud;
  if ([61, 63, 65, 66, 67].includes(code)) return rain;
  if ([0, 1].includes(code)) return sunny;
  if ([80, 81, 82, 95, 96, 99].includes(code)) return storm;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return snow;
  if ([51, 53, 55, 56, 57].includes(code)) return drizzle;
  if ([45, 48].includes(code)) return fog;
}
