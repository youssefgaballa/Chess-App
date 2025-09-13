import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
//import { updateData, getData } from "../saveStateHooks";
import { useEffect, useState } from "react";
import { $insertNodes } from "lexical";

export const SaveStatePlugin = ({ state, onChange }: { state: string, onChange: (value: string) => void }) => {
  const [editor] = useLexicalComposerContext();

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // If there's no state or it's not the first load, do nothing
    if (!state || !isFirstLoad) {
      return;
    }
    setIsFirstLoad(false);
    editor.update(() => {
      const currentHtml = $generateHtmlFromNodes(editor);
      if (currentHtml !== state) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(state, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        $insertNodes(nodes);
        
      }
    });
  }, [state, editor, isFirstLoad]);

  useEffect(() => {
    setIsFirstLoad(true);
  }, [state]);

      return (
        <>
          <OnChangePlugin onChange={editorState => {
            editorState.read(() => {
              //const html = editor.getEditorState().toJSON();
              //console.log(html);
              onChange($generateHtmlFromNodes(editor));
            });
          }} />
          
        </>

      );
    }

