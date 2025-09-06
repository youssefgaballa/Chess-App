import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { useEffect, useState, useCallback } from "react";
import { FORMAT_TEXT_COMMAND, type EditorState, type TextFormatType } from "lexical";
import { $getSelection, $isRangeSelection } from 'lexical';

export default function Toolbar() {
    const [editor] = useLexicalComposerContext();
    const [isBold, setIsBold] = useState<boolean>(false);
    const [isItalic, setIsItalic] = useState<boolean>(false);


    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            // Update text format
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));

        }
    }, []);

    const onClick = (type: TextFormatType) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, type)
    }

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({editorState} : {editorState: EditorState}) => {
                //console.log("editor.registerUpdateListener(): ");
                editorState.read(
                    () => {
                        $updateToolbar();
                    },
                    { editor },
                );
            }),
            //editor.registerCommand(),
        );

    }, [editor, $updateToolbar]);

    return (
        <div className='space-x-2'>
            <button className={`size-8 rounded-lg ${isBold ? 'bg-gray-300 font-bold' : ''}`} onClick={() => onClick('bold')}>
                B
            </button>
            <button className={`size-8 rounded-lg ${isItalic ? 'bg-gray-300 italic' : ''}`} onClick={() => onClick('italic')}>
                i
            </button>
        </div>
    )
    
}