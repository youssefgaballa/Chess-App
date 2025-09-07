//import * as React from 'react'

//import { $getRoot, $getSelection } from 'lexical';
import './styles.css'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { editorTheme } from './editorTheme';
import Toolbar from './Toolbar';
import { $createMathNode, MathNode } from './MathNode';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodes } from 'lexical';
import React from 'react';
import { SaveStatePlugin } from './Plugins/SaveStatePlugin';


// later we'll replace this with an actual database
//const notes = [];

export default function Editor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme: editorTheme,
    onError,
    nodes: [MathNode],
  }

  const [html, setHtml] = React.useState("");
  console.log(html);

  return (
    <div className="max-w-[50rem] h-[50%] mx-auto bg-white rounded-lg ">
      <LexicalComposer initialConfig={initialConfig}>
        <Toolbar />
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              aria-placeholder={'Enter some text...'}
              placeholder={<div>Enter some text...</div>}
              className='h-full'
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <HistoryPlugin />
        <AutoFocusPlugin />
        <SaveStatePlugin state={html} onChange={(newState) => setHtml(newState)}/>
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