import React, {
  ChangeEventHandler,
  FormEventHandler,
  useContext,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import SearchContext from '../../context/SearchContext';

function Search() {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();
  const searchCtx = useContext(SearchContext);

  const submitSearchHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate('/');
    searchCtx.fetchRecipes(query);
  };

  const changeQueryHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value ?? '');
  };

  return (
    <form className="search" onSubmit={submitSearchHandler}>
      <input
        type="text"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
        onChange={changeQueryHandler}
      />
      <button className="btn search__btn">
        <svg className="search__icon">
          <use href="icons.svg#icon-search"></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
}

export default Search;
