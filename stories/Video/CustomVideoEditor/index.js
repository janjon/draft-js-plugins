import React, { Component } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';

// import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import {
  BoldButton,
} from 'draft-js-buttons';

import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';

// import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createVideoPlugin from 'draft-js-video-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createAudioPlugin from 'draft-js-audio-plugin';
import editorStyles from './editorStyles.css';

const blockDndPlugin = createBlockDndPlugin();
const focusPlugin = createFocusPlugin();
// const resizeablePlugin = createResizeablePlugin();
const inlineToolbarPlugin = createToolbarPlugin({
  structure: [
    BoldButton,
  ]
});

const { Toolbar } = inlineToolbarPlugin;
// const alignmentPlugin = createAlignmentPlugin();
// const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  // resizeablePlugin.decorator,
  // alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);

const videoPlugin = createVideoPlugin({ decorator,
  theme: {
    iframe: editorStyles.customIfram,
    iframeContainer: editorStyles.customVideoContainer,
    inputWrapper: editorStyles.inputWrapper,
    input: editorStyles.input
  }
});
const imagePlugin = createImagePlugin({ decorator,
  theme: {
    image: editorStyles.customImage
  }
});
const audioPlugin = createAudioPlugin({ decorator });

const plugins = [
  focusPlugin,
  inlineToolbarPlugin,
  blockDndPlugin,
  // alignmentPlugin,
  // resizeablePlugin,
  videoPlugin,
  imagePlugin,
  audioPlugin
];
/* eslint-disable */
const initialState = {
  "entityMap": {},
  "blocks": [{
    "key": "9gm3s",
    "text": "You can have video in your text field. This is a very rudimentary example, but you can enhance the video plugin with resizing, focus or alignment plugins.",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {}
  }, {
    "key": "ov7r",
    "text": " ",
    "type": "atomic",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {
      "type": "img",
      "src": "/images/canada-landscape-small.jpg",
      caption: '山山水水',
      "placeholder": '请输入标题'
    }
  }, {
    "key": "e23a8",
    "text": "See advanced examples further down …",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {}
  }, {
    "key": "ov7m",
    "text": " ",
    "type": "atomic",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [{
      "offset": 0,
      "length": 1,
      "key": 1
    }],
    "data": {
      "type": "img",
      "src": "http://upload-images.jianshu.io/upload_images/2437583-dca79261c23d9ba7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
      caption: '走廊',
      "placeholder": '请输入标题'
    }
  }, {
    "key": "97vas",
    "text": "",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {}
  }, {
    "key": "ov7d",
    "text": " ",
    "type": "atomic",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {
      "type": 'video',
      "src": "https://audio.muzhifm.com/muzhiyunzhizuo/material/video/91e5d312-4c6f-4d8b-81cd-b60ca5692fac.mp4",
      "poster": "http://images.muzhifm.com/muzhiyunzhizuo/material/video/91e5d312-4c6f-4d8b-81cd-b60ca5692fac.mp4_1491033371.jpg?v=1.1",
      "caption": '摄影艺术',
      "placeholder": '请输入标题'
    }
  }, {
    "key": "7bvko",
    "text": "",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {}
  }, {
    "key": "ef02d",
    "text": "",
    "type": "atomic",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {
      "src": "https://audio.muzhifm.com/muzhiyunzhizuo/material/audios/168abf79-0590-48b3-b8cb-2b5fc12361fe.acc",
      "type": "audio",
      "caption": "这是一个很寂寞的天",
      "placeholder": '请输入标题',
    }
  }, {
    "key": "7bvk2",
    "text": "",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {}
  }]
};
/* eslint-enable */
export default class CustomVideoEditor extends Component {

  state = {
    editorState: EditorState.createWithContent(convertFromRaw(initialState)),
  };

  onChange = (editorState) => {
    console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    this.setState({
      editorState,
    });
  };

  getSelection = () => {
    console.log(this.state.editorState.getSelection());
  }
  insertImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const newState = imagePlugin.addImage(this.state.editorState, {
      type: 'img',
      src: 'http://upload-images.jianshu.io/upload_images/2437583-dca79261c23d9ba7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      caption: '寂寞的天',
      placeholder: '请输入标题'
    });
    this.onChange(newState);
  }
  insertAudio = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const newState = audioPlugin.addAudio(this.state.editorState, {
      type: 'audio',
      src: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
      poster: 'http://devtest.qiniudn.com/回レ！雪月花.jpg',
      caption: '寂寞的天',
      placeholder: '请输入标题'
    });
    this.onChange(newState);
  }
  insertVideo = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const newState = videoPlugin.addVideo(this.state.editorState, {
      type: 'video',
      src: 'https://audio.muzhifm.com/muzhiyunzhizuo/material/video/91e5d312-4c6f-4d8b-81cd-b60ca5692fac.mp4',
      poster: 'http://images.muzhifm.com/muzhiyunzhizuo/material/video/91e5d312-4c6f-4d8b-81cd-b60ca5692fac.mp4_1491033371.jpg?v=1.1',
      caption: '摄影艺术',
      placeholder: '请输入标题'
    });
    this.onChange(newState);
  }
  focus = () => {
    this.editor.focus();
  };
  render() {
    const { editorState } = this.state;
    return (
      <div className={editorStyles.editor} onClick={this.focus} >
        <Toolbar />
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => {
            this.editor = element;
          }}
        />
        <button onClick={this.getSelection}>返回选中</button>
        <button onClick={this.insertImage}>插入图片</button>
        <button onClick={this.insertAudio}>插入音频</button>
        <button onClick={this.insertVideo}>插入视频</button>
        <textarea
          readOnly
          className={editorStyles['rdw-storybook-textarea']}
          value={JSON.stringify(editorState.getCurrentContent(), null, 4)}
        />
      </div>
    );
  }
}
