import { useContext, useState } from 'react';
import { FiltersContext } from '@/context/contexts/FiltersContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

// Timeline component
const Timeline = () => {
  const {
    dispatch: filtersDispatch,
    setTimelineFrom,
    setTimelineTo
  } = useContext(FiltersContext);
  const [showControls, setShowControls] = useState(false);
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
    <div id="timeline" className="filter-panel">
      <div
        className="filter-panel-title"
        onClick={() => setShowControls(!showControls)}
      >
        <h3>Timeline</h3>
        {showControls ? (
          <FontAwesomeIcon icon={faCaretDown} size="2xl" />
        ) : (
          <FontAwesomeIcon icon={faCaretUp} size="2xl" />
        )}
      </div>
      {showControls ? (
        <div>
          <div>
            <button
              type="button"
              onClick={handleSetDates}
              disabled={dateFrom === '' && dateTo === ''}
            >
              Set dates
            </button>
            <button
              type="button"
              className="outline"
              onClick={resetFilters}
              disabled={dateFrom === '' && dateTo === ''}
            >
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
      ) : null}
    </div>
  );
};

export default Timeline;
