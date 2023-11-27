import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Wrapper, Error } from './App.styled';
import { searchService } from '../services/apiPixaby';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    currentItem: null,
    isLoading: false,
    isModalOpen: false,
    isLoadMore: false,
    isSearchDisabled: false,
    error: '',
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      this.setState({ isLoading: true, isSearchDisabled: true });
      searchService(query, page)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            this.setState({
              error:
                'Sorry, there are no images matching your search query. Please try again.',
            });
            return;
          }
          this.setState(prev => ({
            images: [...prev.images, ...hits],
            isLoadMore: this.state.page < Math.ceil(totalHits / 12),
            error: '',
          }));
        })
        .catch(error =>
          this.setState({
            error: 'Sorry, something went wrong. Please try again later.',
          })
        )
        .finally(() =>
          this.setState({ isLoading: false, isSearchDisabled: false })
        );
    }
  }

  handleSearch = obj => {
    if (obj.searchQuery.trim() === '') {
      this.setState({
        error: 'Please, enter your query',
      });
      return;
    }
    this.setState({
      query: obj.searchQuery,
      page: 1,
      images: [],
      isLoadMore: false,
      error: '',
    });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  openModal = e => {
    const currentImageId = Number(e.target.id);
    const currentItem = this.state.images.find(
      ({ id }) => id === currentImageId
    );
    this.setState({ currentItem: currentItem, isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ currentItem: null, isModalOpen: false });
  };

  render() {
    const {
      images,
      isModalOpen,
      isLoadMore,
      isLoading,
      isSearchDisabled,
      currentItem,
      error,
    } = this.state;

    return (
      <Wrapper>
        <Searchbar
          handleSearch={this.handleSearch}
          isSearchDisabled={isSearchDisabled}
        />
        {error === '' ? (
          <ImageGallery items={images} handleOpenModal={this.handleOpenModal} />
        ) : (
          <Error>{error}</Error>
        )}
        {isLoading && <Loader />}
        {isLoadMore && <Button onClick={this.handleLoadMore} />}
        {isModalOpen && (
          <Modal item={currentItem} closeModal={this.closeModal} />
        )}
      </Wrapper>
    );
  }
}
