//import * as React from 'react'

//import { $getRoot, $getSelection } from 'lexical';
import './styles.css'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { mathEditorTheme } from './MathEditorTheme';
import Toolbar from './Toolbar';


// later we'll replace this with an actual database
//const notes = [];

export default function Editor() {
    const initialConfig = {
        namespace: 'MyEditor',
        theme: mathEditorTheme,
        onError,
    };

    return (
        <div className="max-w-[50rem] h-full mx-auto bg-white rounded-lg ">
        <LexicalComposer initialConfig={initialConfig}>
            <Toolbar/>
            <RichTextPlugin
                contentEditable={
                    <ContentEditable 
                        aria-placeholder={'Enter some text...'}
                        placeholder={<div>Enter some text...</div>}
                            className='h-[50%]'
                    />
                }
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
        </LexicalComposer>
        </div>
    );
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
    console.error(error);
}