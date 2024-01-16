import { useContext, useState } from 'react';
import { JournalContext } from '@/context/contexts/JournalContext';
import { FiltersContext } from '@/context/contexts/FiltersContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

// Categories component
const Tags = () => {
  const { state: journalState } = useContext(JournalContext);
  const { dispatch: filtersDispatch, setTags } = useContext(FiltersContext);
  const [showControls, setShowControls] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagChange = (tag) => {
    const updatedTags = [...selectedTags];
    if (updatedTags.includes(tag)) {
      // Remove tag if already selected
      updatedTags.splice(updatedTags.indexOf(tag), 1);
    } else {
      // Add tag if not selected
      updatedTags.push(tag);
    }
    setSelectedTags(updatedTags);
    setTags(filtersDispatch, new Set(updatedTags)); // Pass selected tags to parent component if needed
  };

  const handleClearTags = () => {
    setTags(filtersDispatch, new Set());
    setSelectedTags([]);
  };

  return (
    <div id="Tags" className="filter-panel">
      <div
        className="filter-panel-title"
        onClick={() => setShowControls(!showControls)}
      >
        <h3>Tags</h3>
        {showControls ? (
          <FontAwesomeIcon icon={faCaretDown} size="2xl" />
        ) : (
          <FontAwesomeIcon icon={faCaretUp} size="2xl" />
        )}
      </div>
      {showControls ? (
        <div>
          <div>
            <button type="button" onClick={handleClearTags}>
              Clear trags
            </button>
          </div>
          {journalState.tags.size === 0 ? (
            <p>No tags yet</p>
          ) : (
            <ul>
              {Array.from(journalState.tags).map((tag) => (
                <li key={tag}>
                  <label className="tags-container">
                    {tag}
                    <input
                      type="checkbox"
                      className="checkmark"
                      value={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagChange(tag)}
                    />
                    <span className="checkmark"></span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Tags;
