import React, { Component } from 'react';
import PropTypes from 'prop-types';
import APlayer from '@yfmd/aplayer';

import audioStyles from './audio.css';

// import { formatTime } from '../utils';

// const YOUTUBE_PREFIX = 'https://www.youtube.com/embed/';
// const VIMEO_PREFIX = 'https://player.vimeo.com/video/';

// const getSrc = ({ src }) => {
//   const {
//     isYoutube,
//     getYoutubeSrc,
//     isVimeo,
//     getVimeoSrc,
//   } = utils;
//   if (isYoutube(src)) {
//     const { srcID } = getYoutubeSrc(src);
//     return `${YOUTUBE_PREFIX}${srcID}`;
//   }
//   if (isVimeo(src)) {
//     const { srcID } = getVimeoSrc(src);
//     return `${VIMEO_PREFIX}${srcID}`;
//   }
//   return undefined;
// };

class DefaultAudioCompoent extends Component {
  componentDidMount() {
    const {
      blockProps,
      className = '', // eslint-disable-line no-unused-vars
      style, // eslint-disable-line no-unused-vars
      theme // eslint-disable-line no-unused-vars
    } = this.props;
    const { src, caption } = blockProps;
    this.ap = new APlayer({
      element: this.container,
      narrow: false,
      autoplay: false,
      showlrc: 0,
      mutex: true,
      theme: '#e6d0b2',
      mode: 'random',
      preload: 'metadata',
      listmaxheight: '513px',
      music: {
        title: caption,
        author: '无',
        url: src,
      },
    });
    const titleEle = document.getElementsByClassName('aplayer-music')[0];
    const inputContainer = document.createElement('div');
    // inputContainer.className = theme.inputWrapper;
    const inputEle = document.createElement('input');
    inputEle.className = theme.input;
    inputEle.placeholder = '请输入标题';
    inputEle.type = 'text';
    inputEle.onfocus = () => {
      this.setReadOnly(true);
    };
    inputEle.onblur = () => {
      this.setReadOnly(false);
    };
    inputEle.onchange = this.handleCaptionChange;
    inputEle.value = caption;
    inputContainer.appendChild(inputEle);
    titleEle.innerHTML = '';
    titleEle.appendChild(inputContainer);
  }
  setReadOnly = (readOnly) => {
    const {
      setReadOnly,
      getReadOnly
    } = this.props.blockProps;
    if (getReadOnly() === readOnly) return;
    setReadOnly(readOnly);
  }
  handleCaptionChange = (event) => {
    debugger;
    event.stopPropagation();
    const {
      blockProps: { updateData },
    } = this.props;
    updateData({ caption: event.target.value });
  }
  render() {
    const {
      blockProps, // eslint-disable-line no-unused-vars
      className = '', // eslint-disable-line no-unused-vars
      style, // eslint-disable-line no-unused-vars
      theme // eslint-disable-line no-unused-vars
    } = this.props;
    return (
      <div className={`${theme.container} ${className}`} >
        <div
          className="aplayer"
          style={{ whiteSpace: 'normal' }}
          ref={(node) => {
            this.container = node;
          }}
        />
      </div>
    );
  }
}
DefaultAudioCompoent.propTypes = {
  blockProps: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.object.isRequired,
};
export default DefaultAudioCompoent;
