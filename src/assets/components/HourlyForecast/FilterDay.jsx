export default function FilterDay({ setSelectedDay ,selectedDay}) {
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return (
    <div>
      <select
        name=""
        id=""
        value={selectedDay}
        onChange={e => setSelectedDay(e.target.value)}
        className=" bg-Neutral_700 rounded-lg p-2"
      >
        {dayNames.map(day => (
          <option className="rounded-lg border-8 border-amber-600" key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );
}
