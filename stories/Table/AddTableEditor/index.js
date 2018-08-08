import React, { Component } from 'react';

import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';

import createTablePlugin, { AddTable, addTable } from 'draft-js-table-plugin';
// import TableAdd from './TableAdd';

import editorStyles from './editorStyles.css';

const tablePlugin = createTablePlugin();
const plugins = [tablePlugin];

const initialState = {
  entityMap: {},
  blocks: [{
    key: '9gm3s',
    text: 'You can have video in your text field. This is a very rudimentary example, but you can enhance the video plugin with resizing, focus or alignment plugins.',
    type: 'unstyled',
    depth: 0,
    inlineStyleRanges: [],
    entityRanges: [],
    data: {}
  }],
};

export default class CustomTableEditor extends Component {

  state = {
    editorState: EditorState.createWithContent(convertFromRaw(initialState)),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
        </div>
        <AddTable
          editorState={editorState}
          onChange={this.onChange}
          modifier={addTable}
        />
        <textarea
          readOnly
          className={editorStyles['rdw-storybook-textarea']}
          value={JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 4)}
        />
      </div>
    );
  }
}
