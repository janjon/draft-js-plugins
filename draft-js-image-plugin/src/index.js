import decorateComponentWithProps from 'decorate-component-with-props';
import { EditorState, Modifier, SelectionState } from 'draft-js';

import addImage from './modifiers/addImage';
import ImageComponent from './Image';
import imageStyles from './imageStyles.css';

const defaultTheme = {
  image: imageStyles.image,
  inputWrapper: imageStyles.inputWrapper,
  input: imageStyles.input
};

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

export default (config = {}) => {
  const theme = config.theme ? Object.assign({}, defaultTheme, config.theme) : defaultTheme;
  let Image = config.imageComponent || ImageComponent;
  if (config.decorator) {
    Image = config.decorator(Image);
  }
  const ThemedImage = decorateComponentWithProps(Image, { theme });
  return {
    blockRendererFn: (block, { getEditorState, setEditorState, setReadOnly, getReadOnly }) => {
      if (block.getType() === 'atomic') {
        const data = block.getData().toJS();
        const { type } = data;
        if (type === 'img') {
          return {
            component: ThemedImage,
            editable: false,
            props: {
              ...data,
              setReadOnly,
              getReadOnly,
              updateData: updateData(block, { getEditorState, setEditorState }),
            }
          };
        }
        return null;
      }

      return null;
    },
    addImage,
  };
};

export const Image = ImageComponent;
