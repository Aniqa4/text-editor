'use client'
import React, { useState } from 'react';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = () => {
  const [editorContent, setEditorContent] = useState('');
  const editorRef = useRef<any>(null);

  const log = () => {
    if (editorRef?.current) {
      const editorContent = editorRef.current.getContent();
      setEditorContent(editorContent);
      console.log(editorContent);
    }
  };


  return (
    <div style={{ padding: '20px' }}>
      <h1>TinyMCE</h1>
      <div>
        <Editor
          apiKey='78pfkd3oinol40nnx6lywxdtn0xv1z98t0kewl330sj4dcy4'
          onInit={(_evt, editor) => editorRef.current = editor}
          initialValue=''
          init={{
            height: 500,
            menubar: false,
            placeholder:'Write Something....',
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
        <button onClick={log} className=' bg-black text-white flex mx-auto my-10 px-5 py-3'>Log editor content</button>
      </div>
      {/* Display Edited Content */}
      <div style={{ marginTop: '20px' }}>
        <h2>Output:</h2>
        <div
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
          }}
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
