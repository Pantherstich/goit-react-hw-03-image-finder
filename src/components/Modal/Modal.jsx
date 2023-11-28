import { Component } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

export class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { modalData } = this.props;
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img src={modalData.largeImageURL} alt={modalData.tags} />
        </ModalWindow>
      </Overlay>
    );
  }
}
