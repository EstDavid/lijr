// NewEntryPanel component
import { useContext } from 'react';
import { UiContext } from '@/context/contexts/UiContext';

const NewEntryPanel = () => {
  const { dispatch, setCreatingEntry } = useContext(UiContext);

  return (
    <div className="new-entry-panel">
      <div className="triggering-question">
        <h3>How are you feeling today?</h3>
      </div>
      <div className="new-entry-form">
        <h3 onClick={() => setCreatingEntry(dispatch, true)}>
          Start a new journal entry...
        </h3>
      </div>
    </div>
  );
};

export default NewEntryPanel;
