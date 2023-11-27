import {
  SearchForm,
  SearchBar,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const handleSumbit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.elements.search.value.trim().toLowerCase();
    return onSubmit(inputValue);
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSumbit}>
        <SearchFormButton type="submit">Search</SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
      </SearchForm>
    </SearchBar>
  );
};
export default Searchbar;
