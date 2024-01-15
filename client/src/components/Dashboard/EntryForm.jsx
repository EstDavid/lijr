import { useContext, useState } from 'react';
import { JournalContext } from '@/context/contexts/JournalContext';
import { UiContext } from '@/context/contexts/UiContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { getInputDateFormat, getLongDate } from '@/utils/entryFormats';
import entriesService from '@/services/entries';

const categories = [
  'Personal',
  'Decisions',
  'Work',
  'Health',
  'Relationships',
  'Family',
  'Friends',
  'Hobbies',
  'Travel',
  'Spirituality',
  'Finances',
  'Education',
  'Career',
  'Other'
];

const aspects = [
  {
    aspectType: 'Personal',
    title: 'Going to the gym'
  },
  {
    aspectType: 'Work',
    title: 'Meeting with my boss'
  },
  {
    aspectType: 'Hobbies',
    title: 'Playing the guitar'
  },
  {
    aspectType: 'Hobbies',
    title: 'Playing beach volleyball'
  }
];

const CategoriesSelector = ({ aspectList, categoryList }) => {
  const [filteredCategories, setCategories] = useState(categoryList);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [aspects, setAspects] = useState(aspectList);
  const [selectedAspect, setSelectedAspect] = useState('');

  const filterCategories = (event) => {
    const filter = event.target.value.toUpperCase();

    setCategories((filteredCategories) => {
      return filteredCategories.filter((category) => {
        return category.toUpperCase().includes(filter);
      });
    });
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };
  return (
    <div className="dropdown-categories">
      <div className="dropdown-categories-content">
        {selectedCategory === '' ? (
          <>
            <input
              type="text"
              name="categories"
              placeholder="Search categories..."
              onKeyUp={filterCategories}
            />
            {filteredCategories.map((category) => {
              return (
                <div key={category} className="entry-form-category">
                  <p onClick={() => selectCategory(category)}>{category}</p>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {selectedAspect === '' ? (
              <>
                <p>{selectedCategory}</p>
                <form>
                  <input
                    type="text"
                    name="categories"
                    placeholder="Search categories..."
                    onKeyUp={filterCategories}
                  />
                </form>
                {aspects
                  .filter((aspect) => aspect.aspectType === selectedCategory)
                  .map((aspect) => {
                    return (
                      <option
                        key={aspect.title}
                        className="entry-form-category"
                      >
                        <p onClick={() => setSelectedAspect(aspect)}>
                          {aspect.title}
                        </p>
                      </option>
                    );
                  })}
              </>
            ) : (
              <>
                <p>{selectedAspect.title}</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const EntryForm = ({ entry }) => {
  const { dispatch: journalDispatch, addEntry } = useContext(JournalContext);
  const { dispatch: uiDispatch, setCreatingEntry } = useContext(UiContext);
  const [date, setDate] = useState(entry?.journaledDate || new Date());
  const [title, setTitle] = useState(entry?.title || '');
  const [textBody, setTextBody] = useState(entry?.textBody || '');
  const [dateEnabled, setDateEnabled] = useState(false);
  const [titleEnabled, setTitleEnabled] = useState(false);
  const [edited, setEdited] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO Set custom invalid messages for inputs, such in:
    // https://www.geeksforgeeks.org/form-required-attribute-with-a-custom-validation-message-in-html5/
    const newEntry = {
      title,
      textBody,
      journaledDate: date
    };

    const response = await entriesService.create(newEntry);
    setDate(new Date());
    setTitle('');
    setTextBody('');
    addEntry(journalDispatch, response.entry);
    setCreatingEntry(uiDispatch, false);
  };

  const handleCancel = () => {
    if (edited) {
      window.confirm('Are you sure you want to discard your changes?');
    } else {
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
            <div className="aspects-container"></div>
            <CategoriesSelector
              categoryList={categories}
              aspectList={aspects}
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
