import React, { Component } from 'react';

import {
  SearchForm,
  SearchBar,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    nameSearch: '',
  };

  handleChange = e => {
    this.setState({ nameSearch: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.nameSearch.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.nameSearch);
    this.reset();
  };

  reset = () => {
    this.setState({
      nameSearch: '',
    });
  };

  render() {
    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">🔍</SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images"
            value={this.state.nameSearch}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}
