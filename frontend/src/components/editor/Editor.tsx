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
import React, { useEffect, useState } from 'react';
import { SaveStatePlugin } from './plugins/SaveStatePlugin';
import { useGetNotesQuery, usePublishMutation, useUpdateMutation } from './hooks/saveStateHooks';
import { useParams } from 'react-router';
import type { UseQueryResult } from '@tanstack/react-query';
import { useAuth } from '../../state/AuthorizationContext';
import { usePersistLogin } from '../../util/persistLogin';
import { axiosInterceptors } from '../../util/axiosInterceptors';


// later we'll replace this with an actual database
//const notes = [];

export default function Editor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme: editorTheme,
    onError,
    nodes: [],
  }
  const { userAuth } = useAuth();
  axiosInterceptors();
  usePersistLogin();
  const params = useParams();
  const notesTitle = params.title?.replaceAll('-', ' ') || "";
  // useState to manage title
  //
  const [title, setTitle] = useState(notesTitle);
  const [serializedNodes, setSerializedNodes] = React.useState("");

  const { mutateAsync: publishNotes, isPending: isPublishing } = usePublishMutation(title, userAuth);
  const { mutateAsync: updateNotes, isPending: isUpdating } = useUpdateMutation(title, userAuth);

  const { data }: UseQueryResult<string> = useGetNotesQuery(title, userAuth );

  const [published, setPublished] = useState(false);
  console.log("serializedNodes = " + serializedNodes);

  const onPublish = () => {
    publishNotes(serializedNodes);
    setPublished(true);
  }

  const onUpdate = () => {
    updateNotes(serializedNodes);
  }

  useEffect(() => {
    if (title === "") {
      return;
    }

    setPublished(true);
    if (data) {
      console.log("data = " + data.toString());
      setSerializedNodes(data);
    }


    //setPublished(true);
  }, [data]);

  return (
    <div className="max-w-[50rem] h-[50%] mx-auto bg-white rounded-lg ">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        {<input type="text" className="border border-black w-full" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>}
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="h-full focus:outline-none border border-black"
              aria-placeholder={'Enter some text...'}
              placeholder={<></>}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <HistoryPlugin />
        <AutoFocusPlugin />
        <SaveStatePlugin state={serializedNodes} onChange={(newState) => setSerializedNodes(newState)} />
        {!published && <button onClick={onPublish} className={`size-15 rounded-lg hover:bg-gray-100 ${isPublishing ? 'bg-gray-300 font-bold' : ''}`}>
          {isPublishing ? "Publishing..." : "Publish"}
        </button>}
        <button onClick={onUpdate} className={`size-15 rounded-lg hover:bg-gray-100 ${isUpdating ? 'bg-gray-300 font-bold' : ''}`}>
          {isUpdating ? "Updating..." : "Update"}
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