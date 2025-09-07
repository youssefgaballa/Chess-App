import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes } from "@lexical/html";

export const SaveStatePlugin = ({ state, onChange }: { state: string, onChange: (value:string) => void }) => {
  const [editor] = useLexicalComposerContext();

  // function $generateHtmlFromNodes(editorState: EditorState): string {
  //   throw new Error("Function not implemented.");
  // }

  return ( 
    <OnChangePlugin onChange={editorState => {
      editorState.read(() => {
        //const html = editor.getEditorState().toJSON();
        //console.log(html);
        onChange($generateHtmlFromNodes(editor));
      });
    }} />
  );
}

