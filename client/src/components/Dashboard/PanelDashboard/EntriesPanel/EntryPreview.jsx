import { getShortDate } from '@/utils/entryFormats';

const EntryPreview = ({ entry }) => {
  return (
    <div className="entry entry-preview">
      <div className="entry-preview-header">
        <h4>{getShortDate(entry)}</h4>
        <h3>{entry.title}</h3>
      </div>
      <div className="entry-preview-body">
        <p>{entry.textBody}</p>
      </div>
    </div>
  );
};

export default EntryPreview;
