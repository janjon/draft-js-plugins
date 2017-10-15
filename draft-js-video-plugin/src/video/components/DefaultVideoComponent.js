import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Player } from 'video-react';

import './video.css';

// import utils from '../utils';

class DefaultVideoCompoent extends Component {
  setReadOnly = (readOnly) => {
    const {
      setReadOnly,
      getReadOnly
    } = this.props.blockProps;
    if (getReadOnly() === readOnly) return;
    setReadOnly(readOnly);
  }
  handleCaptionChange = (event) => {
    event.stopPropagation();
    const {
      blockProps: { updateData },
    } = this.props;
    updateData({ caption: event.target.value });
  }
  render() {
    const {
      blockProps,
      className = '',
      style,
      theme
    } = this.props;
    const { src, poster, caption } = blockProps;
    if (src) {
      return (
        <div style={style} >
          <div className={`${theme.iframeContainer} ${className}`}>
            <Player src={src} poster={poster} />
          </div>
          <div className={theme.inputWrapper}>
            <input value={caption} onChange={this.handleCaptionChange} className={theme.input} type="text" placeholder="请输入标题" onFocus={() => this.setReadOnly(true)} onBlur={() => this.setReadOnly(false)} />
          </div>
        </div>
      );
    }
    return (<div className={theme.invalidVideoSrc}>invalid video source</div>);
  }
}
// <video ref={(node) => this.videoPlayer = node} controls poster={poster} src={src} className="video-js" />
DefaultVideoCompoent.propTypes = {
  blockProps: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.object.isRequired,
};
export default DefaultVideoCompoent;
