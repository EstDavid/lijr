import { useContext, useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { JournalContext } from '@/context/contexts/JournalContext';

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

const suggestions = categories.map((category) => {
  return {
    id: category,
    text: category
  };
});

aspects.forEach((aspect) => {
  suggestions.push({
    id: aspect.title,
    text: `${aspect.aspectType} | ${aspect.title}`
  });
});

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TaggingPanel = ({ entryTags, handleTagsChange }) => {
  const [tags, setTags] = useState(
    entryTags.map((tag) => ({ id: tag, text: tag }))
  );

  const { state: journalState } = useContext(JournalContext);

  const [suggestions] = useState(
    Array.from(journalState.tags).map((tag) => {
      return {
        id: tag,
        text: tag
      };
    })
  );

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
    handleTagsChange(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
    handleTagsChange([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
    handleTagsChange(newTags);
  };

  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  return (
    <ReactTags
      tags={tags}
      suggestions={suggestions}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      handleTagClick={handleTagClick}
      inputFieldPosition="top"
      autocomplete
    />
  );
};
export default TaggingPanel;
