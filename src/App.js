import React from 'react';
import { Dates } from './components/Dates';
import { IsoToCalendarDate } from './components/IsoToCalendarDate';

function App() {
  return (
    <div className="App min-h-screen bg-gray-100 flex items-center justify-center">
      {/* <Dates /> */}
      <IsoToCalendarDate />
    </div>
  );
}

export default App;