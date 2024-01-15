import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { getInputDateFormat, getLongDate } from '../../utils/entryFormats';

const EntryForm = () => {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [textBody, setTextBody] = useState('');
  const [dateEnabled, setDateEnabled] = useState(false);
  const [titleEnabled, setTitleEnabled] = useState(false);

  const handleTitlechange = (event) => {
    if (!titleEnabled) {
      setTitleEnabled(true);
    }
    setTitle(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(new Date(event.target.value));
  };

  const handleTextareaChange = (event) => {
    setTextBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('EntryForm handleSubmit');
  };

  return (
    <div className="entry-form-container">
      <form className="entry-form container" onSubmit={handleSubmit}>
        <div className="entry-form-header">
          <div className="entry-form-cancel">
            <button>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="entry-form-date">
            <h4>{getLongDate(date)}</h4>
            {dateEnabled && (
              <input
                type="date"
                value={getInputDateFormat(date)}
                onChange={handleDateChange}
                onBlur={() => setDateEnabled(false)}
              />
            )}
            <div onClick={() => setDateEnabled(true)}>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
          <div className="entry-form-title">
            <input
              type="text"
              placeholder="Title for your entry"
              value={title}
              onChange={handleTitlechange}
              onBlur={() => setTitleEnabled(false)}
              disabled={title !== '' && !titleEnabled}
            />
            <div onClick={() => setTitleEnabled(true)}>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>
        <div className="entry-form-body">
          <textarea
            rows="4"
            cols="50"
            value={textBody}
            placeholder="Today I want to write about..."
            onChange={handleTextareaChange}
          />
        </div>
        <div className="entry-form-footer">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;
