import decorateComponentWithProps from 'decorate-component-with-props';
import { EditorState, Modifier, SelectionState } from 'draft-js';

import addVideo from './video/modifiers/addVideo';
import DefaultVideoComponent from './video/components/DefaultVideoComponent';
import * as types from './video/constants';
import videoStyles from './videoStyles.css';

const defaultTheme = videoStyles;


const updateData = (contentBlock, { getEditorState, setEditorState }) => (data) => {
  const editorState = getEditorState();
  const content = editorState.getCurrentContent();
  const selection = new SelectionState({
    anchorKey: contentBlock.key,
    anchorOffset: 0,
    focusKey: contentBlock.key,
    focusOffset: contentBlock.getLength()
  });

  const newContentState = Modifier.mergeBlockData(content, selection, data);
  const newEditorState = EditorState.push(editorState, newContentState);
  setEditorState(newEditorState);
};

const videoPlugin = (config = {}) => {
  const theme = config.theme ? Object.assign({}, defaultTheme, config.theme) : defaultTheme;
  let Video = config.videoComponent || DefaultVideoComponent;
  if (config.decorator) {
    Video = config.decorator(Video);
  }
  const ThemedVideo = decorateComponentWithProps(Video, { theme });
  return {
    blockRendererFn: (block, { getEditorState, setEditorState, setReadOnly, getReadOnly }) => {
      if (block.getType() === types.ATOMIC) {
        // TODO subject to change for draft-js next release
        // const contentState = getEditorState().getCurrentContent();
        // const entity = contentState.getEntity(block.getEntityAt(0));
        // const type = entity.getType();
        const data = block.getData().toJS();
        const { type } = data;
        if (type === types.VIDEOTYPE) {
          return {
            component: ThemedVideo,
            editable: false,
            props: {
              ...data,
              setReadOnly,
              getReadOnly,
              updateData: updateData(block, { getEditorState, setEditorState }),
            },
          };
        }
      }

      return null;
    },
    addVideo,
    types,
  };
};

export default videoPlugin;
