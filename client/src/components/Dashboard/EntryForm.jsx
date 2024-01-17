import { useContext, useState } from 'react';
import { JournalContext } from '@/context/contexts/JournalContext';
import { UiContext } from '@/context/contexts/UiContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { getInputDateFormat, getLongDate } from '@/utils/entryFormats';
import entriesService from '@/services/entries';
import TaggingPanel from './TaggingPanel';

const EntryForm = () => {
  const {
    dispatch: journalDispatch,
    addEntry,
    updateEntry
  } = useContext(JournalContext);
  const {
    state: uiState,
    dispatch: uiDispatch,
    setCreatingEntry,
    setEditingEntry
  } = useContext(UiContext);
  const entry = uiState.currentEntry;
  const [date, setDate] = useState(entry?.journaledDate || new Date());
  const [title, setTitle] = useState(entry?.title || '');
  const [textBody, setTextBody] = useState(entry?.textBody || '');
  const [dateEnabled, setDateEnabled] = useState(false);
  const [titleEnabled, setTitleEnabled] = useState(false);
  const [edited, setEdited] = useState(false);
  const [tags, setTags] = useState(entry?.tags || []);

  const handleTitlechange = (event) => {
    if (!titleEnabled) {
      setTitleEnabled(true);
    }
    if (!edited) {
      setEdited(true);
    }
    setTitle(event.target.value);
  };

  const handleDateChange = (event) => {
    if (!edited) {
      setEdited(true);
    }
    setDate(new Date(event.target.value));
  };

  const handleTextareaChange = (event) => {
    if (!edited) {
      setEdited(true);
    }
    setTextBody(event.target.value);
  };

  const handleTagsChange = (tags) => {
    setTags(tags);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO Set custom invalid messages for inputs, such in:
    // https://www.geeksforgeeks.org/form-required-attribute-with-a-custom-validation-message-in-html5/
    const entryToSave = {
      title,
      textBody,
      journaledDate: date,
      tags: tags.map((tag) => tag.text)
    };

    let response;
    if (entry) {
      response = await entriesService.edit({ ...entryToSave, _id: entry._id });
      updateEntry(journalDispatch, response.entry);
    } else {
      response = await entriesService.create(entryToSave);
      addEntry(journalDispatch, response.entry);
    }
    setDate(new Date());
    setTitle('');
    setTextBody('');
    setEditingEntry(uiDispatch, null);
    setCreatingEntry(uiDispatch, false);
  };

  const handleCancel = () => {
    if (edited) {
      if (window.confirm('Are you sure you want to discard your changes?')) {
        setEditingEntry(uiDispatch, null);
        setCreatingEntry(uiDispatch, false);
      }
    } else {
      setEditingEntry(uiDispatch, null);
      setCreatingEntry(uiDispatch, false);
    }
  };

  return (
    <div className="entry-form-container">
      <form className="entry-form container" onSubmit={handleSubmit}>
        <div className="entry-form-header">
          <div className="entry-form-date">
            <h4>{getLongDate(date)}</h4>
            {dateEnabled && (
              <input
                type="date"
                name="date"
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
              name="title"
              placeholder="Title for your entry"
              value={title}
              onChange={handleTitlechange}
              onBlur={() => setTitleEnabled(false)}
              required
              disabled={title !== '' && !titleEnabled}
            />
            <div onClick={() => setTitleEnabled(true)}>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>
        <div className="entry-form-body">
          <textarea
            name="text-body"
            value={textBody}
            placeholder="Today I want to write about..."
            onChange={handleTextareaChange}
            required
          />
          <div className="entry-form-aspects">
            <TaggingPanel
              entryTags={tags}
              handleTagsChange={handleTagsChange}
            />
          </div>
        </div>
        <div className="entry-form-footer">
          <button
            type="button"
            className="button-cancel"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;
