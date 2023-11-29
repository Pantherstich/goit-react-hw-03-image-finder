import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Wrapper, Error } from './App.styled';
import SearchService from '../services/apiPixaby';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    nameSearch: '',
    images: [],
    page: 1,
    loadMore: false,
    showModal: false,
    isLoader: false,
    modalData: { img: '', tags: '' },
    error: null,
  };

  // handleSubmit = nameSearch => {
  //   this.setState({ nameSearch: nameSearch, page: 1 });
  // };

  // handleLoadClick = prevState => {
  //   this.setState({ page: this.state.page + 1 });
  // };

  // setModalData = (img, tags) => {
  //   this.setState({ showModal: true, modalData: { img, tags } });
  // };

  // closeModal = () => {
  //   this.setState({ showModal: false });
  // };
  componentDidUpdate(_, prevState) {
    const PrevState = prevState.nameSearch;
    const NextState = this.state.nameSearch;
    const { page } = this.state;

    if (PrevState !== NextState || page !== prevState.page) {
      this.setState({ isLoader: true, loadMore: false, error: null });

      const searchService = new SearchService(NextState, page);
      searchService
        .fetchImg(page)
        .then(images => {
          if (images.hits.length > 0) {
            this.setState(prevState => ({
              images:
                page === 1
                  ? images.hits
                  : [...prevState.images, ...images.hits],
              loadMore: page < Math.ceil(images.totalHits / 12),
            }));
          } else {
            this.setState({
              images: [],
              error: 'Oops... there are no images matching your search...',
            });
          }
        })
        .catch(error => {
          this.setState({ images: [], error });
        })
        .finally(this.setState({ isLoader: false }));
    }
  }
  handleSubmit = nameSearch => {
    this.setState({ nameSearch: nameSearch, page: 1 });
  };

  handleLoadClick = prevState => {
    this.setState({ page: this.state.page + 1 });
  };

  setModalData = (img, tags) => {
    this.setState({ showModal: true, modalData: { img, tags } });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    const { error, isLoader, loadMore, showModal, images, modalData } =
      this.state;
    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        {isLoader && <Loader />}
        {error && <Error>{error}</Error>}
        {!isLoader && (
          <ImageGallery
            loadMore={loadMore}
            showModal={showModal}
            images={images}
            handleLoadClick={this.handleLoadClick}
            closeModal={this.closeModal}
            setModalData={this.setModalData}
            modalData={modalData}
          ></ImageGallery>
        )}
      </Wrapper>
    );
  }
}
