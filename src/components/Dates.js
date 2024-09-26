import React, { useState } from 'react';
import { parseDate, parseZonedDateTime } from '@internationalized/date';
import { Card, CardHeader, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';

export const Dates = () => {
  const [dateString, setDateString] = useState('2023-04-15');
  const [timeZone, setTimeZone] = useState('America/New_York');
  const [result, setResult] = useState('');

  const handleDateToISO = () => {
    const date = parseDate(dateString);
    setResult(date.toString());
  };

  const handleStringToDate = () => {
    const date = parseDate(dateString);
    setResult(`Year: ${date.year}, Month: ${date.month}, Day: ${date.day}`);
  };

  const handleApplyTimeZone = () => {
    try {
      // Parse the input date string
      const [year, month, day] = dateString.split('-').map(Number);
      
      // Create a date object (Note: months in JS Date are 0-indexed)
      const date = new Date(year, month - 1, day, 12, 0, 0);
  
      // Format the date as an ISO string with the specified time zone
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short'
      });
  
      const parts = formatter.formatToParts(date);
      const formatted = parts.reduce((acc, part) => {
        if (part.type === 'literal' && part.value === '/') return acc + '-';
        if (part.type === 'literal' && part.value === ', ') return acc + 'T';
        if (part.type === 'timeZoneName') return acc + ' ' + part.value;
        return acc + part.value;
      }, '');
  
      const zonedDateTime = parseZonedDateTime(formatted, timeZone);
      setResult(zonedDateTime.toString());
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">@internationalized/date Demo</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="dateInput" className="block text-sm font-medium text-gray-700">
              Date (YYYY-MM-DD):
            </label>
            <Input
              id="dateInput"
              type="text"
              value={dateString}
              onChange={(e) => setDateString(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="timezoneInput" className="block text-sm font-medium text-gray-700">
              Time Zone:
            </label>
            <Input
              id="timezoneInput"
              type="text"
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="space-x-2">
            <Button onClick={handleDateToISO}>To ISO</Button>
            <Button onClick={handleStringToDate}>String to Date</Button>
            <Button onClick={handleApplyTimeZone}>Apply Time Zone</Button>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Result:</h3>
            <p className="mt-1 text-gray-600">{result}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};