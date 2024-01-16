import { useContext, useState } from 'react';
import { FiltersContext } from '@/context/contexts/FiltersContext';

// Timeline component
const Timeline = () => {
  const {
    dispatch: filtersDispatch,
    setTimelineFrom,
    setTimelineTo
  } = useContext(FiltersContext);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    const fromTo = event.target.id;
    if (fromTo === 'dateFrom') {
      setTimelineFrom(filtersDispatch, date);
    } else if (fromTo === 'dateTo') {
      setTimelineTo(filtersDispatch, date);
    }
  };

  const handleSetDates = () => {
    dateFrom !== '' && setTimelineFrom(filtersDispatch, new Date(dateFrom));
    dateTo !== '' && setTimelineTo(filtersDispatch, new Date(dateTo));
  };

  const resetFilters = () => {
    setDateFrom('');
    setDateTo('');
    setTimelineFrom(filtersDispatch, null);
    setTimelineTo(filtersDispatch, null);
  };

  return (
    <div id="timeline" className="">
      <h3>Timeline</h3>
      <div>
        <button type="button" onClick={handleSetDates}>
          Set dates
        </button>
        <button type="button" onClick={resetFilters}>
          Clear dates
        </button>
      </div>
      <label htmlFor="dateFrom">From:</label>
      <input
        type="date"
        id="dateFrom"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
        onBlur={handleDateChange}
      />
      <label htmlFor="dateTo">To:</label>
      <input
        type="date"
        id="dateTo"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
        onBlur={handleDateChange}
      />
    </div>
  );
};

export default Timeline;
