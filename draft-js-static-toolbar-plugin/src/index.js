import decorateComponentWithProps from 'decorate-component-with-props';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
} from '@yfmd/draft-js-buttons';
import createStore from './utils/createStore';
import Toolbar from './components/Toolbar';
import Separator from './components/Separator';
import buttonStyles from './buttonStyles.css';
import toolbarStyles from './toolbarStyles.css';

export default (config = {}) => {
  const defaultTheme = { buttonStyles, toolbarStyles };
  const store = createStore({});

  const {
    theme,
    structure = [
      BoldButton,
      ItalicButton,
      UnderlineButton,
      CodeButton,
    ]
  } = config;
  const newTheme = theme ? Object.assign({}, defaultTheme, theme) : defaultTheme;
  const toolbarProps = {
    store,
    structure,
    theme: newTheme,
  };

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },

    // Re-Render the text-toolbar on selection change
    onChange: (editorState) => {
      store.updateItem('selection', editorState.getSelection());
      return editorState;
    },
    Toolbar: decorateComponentWithProps(Toolbar, toolbarProps),
  };
};

export {
  Separator,
};
