import { useContext } from 'react';
import { JournalContext } from '@/context/contexts/JournalContext';
import Entry from './Entry';

// EntriesPanel component
const EntriesPanel = ({ type }) => {
  const { state } = useContext(JournalContext);
  if (state.entries.length === 0) return <></>;
  return (
    <div id="entries-panel" className={`container ${type}`}>
      {state.entries.map((entry) => {
        return <Entry key={entry._id} entry={entry} />;
      })}
    </div>
  );
};

export default EntriesPanel;
