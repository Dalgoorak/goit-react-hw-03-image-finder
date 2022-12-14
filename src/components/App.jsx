import React, { Component } from 'react';

import { SearchBar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { fetchImages } from 'helpers/images-api';

export default class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
    showModal: false,
    originalImageURL: null,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImg();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
      showModal: false,
    });
  };

  fetchImg = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    fetchImages(options)
      .then(hits => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleClickImage = largeImageURL => {
    this.openModal(largeImageURL);
  };

  openModal = largeImageURL =>
    this.setState({ showModal: true, originalImageURL: largeImageURL });

  closeModal = () => this.setState({ showModal: false, originalImageURL: '' });

  render() {
    const { images, isLoading, showModal, originalImageURL } = this.state;

    const buttonIsShown = images.length > 0 && !isLoading;

    return (
      <>
        <SearchBar onSubmit={this.onChangeQuery} />

        <ImageGallery images={images} onImageClick={this.handleClickImage} />

        {showModal && (
          <Modal
            largeImageURL={originalImageURL}
            closeModal={this.closeModal}
          ></Modal>
        )}

        {isLoading && <Loader />}

        {buttonIsShown && <Button onLoadMore={this.fetchImg} />}
      </>
    );
  }
}
