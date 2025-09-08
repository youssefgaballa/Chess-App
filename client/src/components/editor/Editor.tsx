//import * as React from 'react'

//import { $getRoot, $getSelection } from 'lexical';
import './theme/styles.css'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { editorTheme } from './theme/editorTheme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
//import { $insertNodes } from 'lexical';
import React, { useEffect } from 'react';
import { SaveStatePlugin } from './plugins/SaveStatePlugin';
import { useDataQuery, useDataMutation } from './hooks/saveStateHooks';


// later we'll replace this with an actual database
//const notes = [];

export default function Editor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme: editorTheme,
    onError,
    nodes: [],
  }

  const [serializedNodes, setSerializedNodes] = React.useState("");
  const { mutateAsync: saveText, isPending } = useDataMutation();
  const { data } = useDataQuery();
  console.log("serializedNodes = " + serializedNodes);

  const onSave = () => {
    saveText(serializedNodes);
  }

  useEffect(() => {
    setSerializedNodes(data);
  }, [data]);

  return (
    <div className="max-w-[50rem] h-[50%] mx-auto bg-white rounded-lg ">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="h-full focus:outline-none border border-black"
              aria-placeholder={'Enter some text...'}
              placeholder={<>Enter some text...</>}
              
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <HistoryPlugin />
        <AutoFocusPlugin />
        <SaveStatePlugin state={serializedNodes} onChange={(newState) => setSerializedNodes(newState)} />
        <button onClick={onSave}>
          {isPending ? "Saving..." : "Save"}
        </button>
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