import unionClassNames from 'union-class-names';
import React, { Component } from 'react';

export default class Image extends Component {
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
      block,
      className,
      theme = {},
      ...otherProps
    } = this.props;
    // leveraging destructuring to omit certain properties from props
    const {
      blockProps, // eslint-disable-line no-unused-vars
      customStyleMap, // eslint-disable-line no-unused-vars
      customStyleFn, // eslint-disable-line no-unused-vars
      decorator, // eslint-disable-line no-unused-vars
      forceSelection, // eslint-disable-line no-unused-vars
      offsetKey, // eslint-disable-line no-unused-vars
      selection, // eslint-disable-line no-unused-vars
      tree, // eslint-disable-line no-unused-vars
      contentState,
      ...elementProps
    } = otherProps;
    const combinedClassName = unionClassNames(theme.image, className);
    const { caption, src } = blockProps;
    return (
      <div>
        <img
          {...elementProps}
          src={src}
          role="presentation"
          className={combinedClassName}
        />
        <div className={theme.inputWrapper}>
          <input value={caption} onChange={this.handleCaptionChange} className={theme.input} type="text" placeholder="请输入标题" onFocus={() => this.setReadOnly(true)} onBlur={() => this.setReadOnly(false)} />
        </div>
      </div>
    );
  }
}
