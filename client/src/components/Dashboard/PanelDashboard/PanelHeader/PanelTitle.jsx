import { useContext } from 'react';
import { UserContext } from '@/context/contexts/UserContext';

// PanelTitle component
const PanelTitle = ({ type }) => {
  const { state } = useContext(UserContext);
  if (state.loading || state.error) {
    return null;
  }
  return (
    <div className={`panel-title ${type}`}>
      <h2>{`${state.user.firstName}'s LiJr`}</h2>
    </div>
  );
};

export default PanelTitle;
