import { useContext } from 'react';
import { JournalContext } from '@/context/contexts/JournalContext';
import { UiContext } from '@/context/contexts/UiContext';
import EntryPreview from './EntryPreview';
import { getYear, getDate } from '@/utils/entryFormats';
import entriesService from '@/services/entries';
import { FiltersContext } from '@/context/contexts/FiltersContext';

// EntriesPanel component
const EntriesPanel = () => {
  const {
    state: journalState,
    dispatch: journalDispatch,
    removeEntry
  } = useContext(JournalContext);
  const { state: filtersState } = useContext(FiltersContext);
  const { dispatch: uiDispatch, setEditingEntry } = useContext(UiContext);
  if (journalState.entries.length === 0) return <></>;

  const handleSelectEntry = (entry) => {
    setEditingEntry(uiDispatch, entry);
  };

  const handleDeleteEntry = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      await entriesService.remove(id);
      removeEntry(journalDispatch, id);
    }
  };
  const entryList = journalState.entries
    .filter((entry) => {
      if (filtersState.tags.size === 0) return true;
      return entry.tags.some((tag) => filtersState.tags.has(tag));
    })
    .sort((a, b) => new Date(getDate(b)) - new Date(getDate(a)));

  return (
    <div id="entries-panel" className="container">
      {entryList.map((entry, index) => {
        if (index === 0) {
          return (
            <div key={entry._id}>
              <h2>{getYear(entry)}</h2>
              <EntryPreview
                entry={entry}
                handleSelectEntry={handleSelectEntry}
                handleDeleteEntry={handleDeleteEntry}
              />
            </div>
          );
        }
        if (getYear(entry) !== getYear(entryList[index - 1])) {
          return (
            <div key={entry._id}>
              <h2>{getYear(entry)}</h2>
              <EntryPreview
                entry={entry}
                handleSelectEntry={handleSelectEntry}
                handleDeleteEntry={handleDeleteEntry}
              />
            </div>
          );
        }
        return (
          <div key={entry._id}>
            <EntryPreview
              key={entry._id}
              entry={entry}
              handleSelectEntry={handleSelectEntry}
              handleDeleteEntry={handleDeleteEntry}
            />
          </div>
        );
      })}
    </div>
  );
};

export default EntriesPanel;
