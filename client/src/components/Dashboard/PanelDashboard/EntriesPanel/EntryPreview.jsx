import { getShortDate } from '@/utils/entryFormats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const EntryPreview = ({ entry, handleDeleteEntry, handleSelectEntry }) => {
  return (
    <div className="entry entry-preview">
      <div className="entry-preview-header">
        <div
          className="entry-preview-header-data"
          onClick={() => handleSelectEntry(entry)}
        >
          <h4>{getShortDate(entry)}</h4>
          <h3>{entry.title}</h3>
        </div>
        <button onClick={() => handleDeleteEntry(entry._id)} type="button">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="entry-preview-body">
        <p>{entry.textBody}</p>
      </div>
    </div>
  );
};

export default EntryPreview;
