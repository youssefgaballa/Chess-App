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
import { useGetNotesQuery, usePublishMutation, useUpdateMutation } from './hooks/notesHooks';
import { useParams } from 'react-router';
import type { UseQueryResult } from '@tanstack/react-query';
import { axiosInterceptors } from '../../util/axiosInterceptors';
import { useSelector } from 'react-redux';
import { selectUser } from '../../users/userSlice';


// later we'll replace this with an actual database
//const notes = [];

export default function Editor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme: editorTheme,
    onError,
    nodes: [],
  }
  const user = useSelector(selectUser);
  axiosInterceptors();
  const params = useParams();
  const notesTitle = params.title?.replaceAll('-', ' ') || "";
  // useState to manage title
  //
  const [title, setTitle] = useState(notesTitle);
  const [serializedNodes, setSerializedNodes] = React.useState("");
  const [published, setPublished] = useState(false);


  const { mutateAsync: publishNotes, isPending: isPublishing } = usePublishMutation(title, user.accessToken);
  const { mutateAsync: updateNotes, isPending: isUpdating } = useUpdateMutation(title, user.accessToken);
  //console.log("published = " + published);
  const { data }: UseQueryResult<string> = useGetNotesQuery(published, title, user.accessToken);

  //console.log("serializedNodes = " + serializedNodes);

  const onPublish = () => {
    publishNotes(serializedNodes);
    setPublished(true);
  }

  const onUpdate = () => {
    console.log("onUpdate called");
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
  //TODO: add placeholder while data is fetching for published notes
  return (
    <div className="max-w-[50rem] h-[50%] mx-auto bg-white rounded-lg ">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        {<input type="text" className={published ? 'w-full text-center mb-[4px]' : 'w-full text-center border border-black mb-[4px]'}
           placeholder="Title" disabled={published}
          value={title} onChange={(e) => setTitle(e.target.value)} />}
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
        <button onClick={onUpdate} disabled={isUpdating}
          className={`size-15 rounded-lg hover:bg-gray-100 ${isUpdating ? 'bg-gray-300 font-bold' : ''}`}>
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