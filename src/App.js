import React, { Component } from 'react';
import debounce from 'lodash/debounce';

import Navigation from './containers/Navigation';
import Slider from './containers/Slider';
import images from './assets/data/data';

import './index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.goToNextSlide = this.nextSlide.bind(this);
    this.goToPreviousSlide = this.prevSlide.bind(this);
    this.dataLength = images.length;

    this.state = {
      enteredText: '',
      windowWidth: 0,
      index: 5,
      left: 0,
      originalOffset: 0,
      touchStartX: 0,
      prevTouchX: 0
    };
  }

  componentDidMount() {
    this.setState({ windowWidth: window.innerWidth });
    window.addEventListener('resize', this.debounceHandleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceHandleWindowResize);
  }

  debounceHandleWindowResize = debounce(() => {
    this.setState({ windowWidth: window.innerWidth });
  }, 100);

  inputChangeHandler = event => {
    const textValue = event.target.value;
    if (textValue.length <= 3) {
      this.setState({
        enteredText: textValue
      });
    }
  };

  onGoButtonClick = () => {
    let newIndex = +this.state.enteredText;
    if (isNaN(newIndex)) {
      this.setState({
        enteredText: ''
      });
      return;
    }

    if (newIndex < 1 || newIndex > this.dataLength) {
      return;
    }
    this.setState({
      index: newIndex - 1
    });
  };

  nextSlide = () => {
    let newIndex;
    if (this.state.index === this.dataLength - 1) {
      newIndex = 0;
    } else {
      newIndex = this.state.index + 1;
    }
    this.setState({
      index: newIndex
    });
  };

  prevSlide = () => {
    let newIndex;
    if (this.state.index === 0) {
      newIndex = images.length - 1;
    } else {
      newIndex = this.state.index - 1;
    }
    this.setState({
      index: newIndex
    });
  };

  onPhotoClickHandler = photoId => {
    this.setState({
      index: photoId
    });
  };

  handleMotionStart = event => {
    this.setState({
      originalOffset: this.state.left,
      touchStartX: event.targetTouches[0].clientX
    });
  };

  handleMove = event => {
    const moveCoordX = event.targetTouches[0].clientX;
    const touchX = moveCoordX;
    let deltaX = touchX - this.state.touchStartX + this.state.originalOffset;
    this.setState({
      left: deltaX,
      prevTouchX: touchX
    });
  };

  handleEnd = () => {
    let moveSlides = this.state.left / 150;
    moveSlides = Math.round(moveSlides);
    if (moveSlides > 1) {
      moveSlides = 1;
    } else if (moveSlides < -1) {
      moveSlides = -1;
    }

    let newIndex = this.state.index - moveSlides;

    if (newIndex > this.dataLength - 1) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = this.dataLength - 1;
    }

    this.setState({
      touchStartX: 0,
      index: newIndex,
      left: 0
    });
  };

  render() {
    // console.log("RENDER");
    let navigationPanel = null;
    if (this.state.windowWidth > 600) {
      navigationPanel = (
        <Navigation
          onClickPrevious={this.goToPreviousSlide}
          onClickNext={this.goToNextSlide}
          onTextEntered={event => this.inputChangeHandler(event)}
          inputText={this.state.enteredText}
          onGoClick={() => this.onGoButtonClick()}
          disabled={this.state.enteredText.trim() === ''}
          index={this.state.index}
        />
      );
    }

    return (
      <div className="App">
        <Slider
          index={this.state.index}
          imagesLength={this.dataLength}
          onImageClickHandler={this.onPhotoClickHandler}
          onTouchStartHandler={this.handleMotionStart}
          onTouchMoveHandler={this.handleMove}
          onTouchEndHandler={this.handleEnd}
        />
        {navigationPanel}
      </div>
    );
  }
}

export default App;
