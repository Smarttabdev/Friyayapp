import React, {
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react';
import { useLocalStorage } from 'react-use';
import { CHAT_TOOLBAR_SHOWN_PREF_KEY } from 'Src/appConstants';
import TextEditor from 'Components/shared/text_editor';

const ControllableTextEditor = forwardRef(
  (
    {
      itemBody,
      handleItemBodyChange,
      editorConfig,
      cardFontColor,
      card,
      setEditorRef = () => {}
    },
    ref
  ) => {
    const [toolbar, setToolbar] = useState(null);
    const [editorVariable, setEditorVariable] = useState(null);

    const [showToolbar, setShowToolbar] = useLocalStorage(
      CHAT_TOOLBAR_SHOWN_PREF_KEY,
      true
    );

    useImperativeHandle(ref, () => ({
      toggleToolbar() {
        setShowToolbar(!showToolbar);
      }
    }));

    const editorRef = useCallback(node => {
      if (node !== null && node.editor !== null) {
        if (!node.editor.toolbar) {
          // Sometime toolbar is not attached to editor by froala editor right away
          // This workaround  and hopes that toolbar will be attached
          // fallback is setting the editor variable which will work in non=first case
          setTimeout(() => {
            if (node && node.editor) {
              setToolbar(node.editor.toolbar);
            }
          }, 0);
        } else {
          if (toolbar) {
            setToolbar(node.editor.toolbar);
          }
        }
      } else {
        setToolbar(null);
      }
      // in case we were not able to set toolbar
      // set this as fallback
      if (node !== null && node.editor) {
        setEditorVariable(node.editor);
      }
    }, []);

    useEffect(() => {
      // check if toolbar can be referenced from editor do it.
      // This is not possible on first render because the library attached the toolbar after some delay without the callback
      // So we have timeout in useCallback, and have else for the case for the first time.
      if (editorVariable && editorVariable.toolbar) {
        if (showToolbar) {
          editorVariable.toolbar.show();
        } else {
          editorVariable.toolbar.hide();
        }
      } else {
        if (toolbar) {
          if (showToolbar) {
            toolbar.show();
          } else {
            toolbar.hide();
          }
        }
      }
    }, [showToolbar, toolbar, editorVariable]);
    return (
      <>
        <TextEditor
          editorRef={editorRef}
          tabIndex={1}
          placeholder="Write your Card content here"
          body={itemBody}
          onChange={handleItemBodyChange}
          required
          // ref={ref => (this.editor = ref)}
          ref={ref => setEditorRef(ref)}
          settings={editorConfig}
          contentUniqID={get(card, 'id')}
          cardFontColor={cardFontColor}
        />
      </>
    );
  }
);

export default ControllableTextEditor;
