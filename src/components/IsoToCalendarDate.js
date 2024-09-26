import { parseAbsolute, toCalendarDate } from '@internationalized/date';


export const IsoToCalendarDate = () => {

  const isoString = "2024-09-18T03:00:00.000Z";
  const parsedDateTime = parseAbsolute(isoString, 'UTC');  

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Iso To CalendarDate</h1>
      <p>Input: {isoString}</p>
      <p>Output: {toCalendarDate(parsedDateTime).toString()}</p>
    </div>
  )
}