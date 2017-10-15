import decorateComponentWithProps from 'decorate-component-with-props';
import { EditorState, Modifier, SelectionState } from 'draft-js';

import addAudio from './audio/modifiers/addAudio';
import DefaultaudioComponent from './audio/components/DefaultAudioComponent';
import * as types from './audio/constants';
import audioStyles from './audioStyles.css';

const defaultTheme = audioStyles;


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

const audioPlugin = (config = {}) => {
  const theme = config.theme ? Object.assign({}, defaultTheme, config.theme) : defaultTheme;
  let audio = config.audioComponent || DefaultaudioComponent;
  if (config.decorator) {
    audio = config.decorator(audio);
  }
  const Themedaudio = decorateComponentWithProps(audio, { theme });
  return {
    blockRendererFn: (block, { getEditorState, setEditorState, setReadOnly, getReadOnly }) => {
      if (block.getType() === types.ATOMIC) {
        // TODO subject to change for draft-js next release
        // const contentState = getEditorState().getCurrentContent();
        // const entity = contentState.getEntity(block.getEntityAt(0));
        // const type = entity.getType();
        const data = block.getData().toJS();
        const { type } = data;
        if (type === types.AUDIOTYPE) {
          return {
            component: Themedaudio,
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
    addAudio,
    types,
  };
};

export default audioPlugin;
