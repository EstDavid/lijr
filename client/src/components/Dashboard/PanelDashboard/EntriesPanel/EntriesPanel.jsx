import { useContext } from 'react';
import { JournalContext } from '@/context/contexts/JournalContext';
import EntryPreview from './EntryPreview';
import { getYear, getDate } from '@/utils/entryFormats';

// EntriesPanel component
const EntriesPanel = ({ type }) => {
  const { state } = useContext(JournalContext);
  if (state.entries.length === 0) return <></>;

  const entryList = state.entries.sort(
    (a, b) => new Date(getDate(b)) - new Date(getDate(a))
  );
  return (
    <div id="entries-panel" className={`container ${type}`}>
      {entryList.map((entry, index) => {
        if (index === 0) {
          return (
            <div key={entry._id}>
              <h2>{getYear(entry)}</h2>
              <EntryPreview entry={entry} />
            </div>
          );
        }
        if (getYear(entry) !== getYear(entryList[index - 1])) {
          return (
            <div key={entry._id}>
              <h2>{getYear(entry)}</h2>
              <EntryPreview entry={entry} />
            </div>
          );
        }
        return <EntryPreview key={entry._id} entry={entry} />;
      })}
    </div>
  );
};

export default EntriesPanel;
