// NewEntryPanel component
import { useContext } from 'react';
import { UiContext } from '@/context/contexts/UiContext';
import { UserContext } from '@/context/contexts/UserContext';

const NewEntryPanel = () => {
  const { dispatch, setCreatingEntry } = useContext(UiContext);
  const { state: userState } = useContext(UserContext);

  return (
    <div className="new-entry-panel">
      <div className="triggering-question">
        <h3>{`${userState.user.firstName}, how are you feeling today?`}</h3>
      </div>
      <div className="new-entry-form">
        <h3 onClick={() => setCreatingEntry(dispatch, true)}>Today...</h3>
      </div>
    </div>
  );
};

export default NewEntryPanel;
