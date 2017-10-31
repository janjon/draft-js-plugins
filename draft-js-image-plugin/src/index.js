import decorateComponentWithProps from 'decorate-component-with-props';
import { EditorState, Modifier, SelectionState, ContentBlock } from 'draft-js';
import { getSelectedBlock } from 'draftjs-utils';
import htmlToDraft from 'html-to-draftjs';
import { OrderedMap, List, Map } from 'immutable';

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
    handlePastedText: (text, html, editorState, { setEditorState }) => {
      const selectedBlock = getSelectedBlock(editorState);
      if (selectedBlock && selectedBlock.type === 'code') {
        const contentState = Modifier.replaceText(
          editorState.getCurrentContent(),
          editorState.getSelection(),
          text,
          editorState.getCurrentInlineStyle(),
        );
        setEditorState(EditorState.push(editorState, contentState, 'insert-characters'));
        return 'handled';
      } else if (html) {
        const contentBlock = htmlToDraft(html);
        let blockMap = new OrderedMap({});
        let contentState = editorState.getCurrentContent();
        contentBlock.contentBlocks.forEach((block) => {
          let newBlock = block;
          if (block.getType() === 'atomic') {
            const entity = contentState.getEntity(block.getEntityAt(0));
            const entityData = entity.getData();
            if (entity.type === 'IMAGE') {
              const newData = Object.assign({}, entityData, {
                type: 'img',
                caption: '',
                placeholder: '请输入标题',
              }, entityData);
              // block.merge({ data: newData });
              newBlock = new ContentBlock({
                key: block.get('key'),
                type: 'atomic',
                text: ' ',
                characterList: List(),
                data: new Map(newData)
              });
            }
          }
          blockMap = blockMap.set(block.get('key'), newBlock);
        });
        // contentBlock.entityMap.forEach((value, key) => {
        //   contentState = contentState.mergeEntityData(key, value);
        // });
        contentState = Modifier.replaceWithFragment(
          contentState,
          editorState.getSelection(),
          blockMap,
        );
        setEditorState(EditorState.push(editorState, contentState, 'insert-characters'));
        return 'handled';
      }
      return 'not-handled';
    },
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
