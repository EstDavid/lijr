import { useContext } from 'react';
import { FiltersContext } from '@/context/contexts/FiltersContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  const { state, dispatch, setSearchTerm } = useContext(FiltersContext);
  return (
    <div className="search-bar">
      <FontAwesomeIcon icon={faSearch} className="icon" size="l" />
      <input
        type="text"
        placeholder="Search"
        value={state.searchTerm}
        onChange={(event) => {
          setSearchTerm(dispatch, event.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
