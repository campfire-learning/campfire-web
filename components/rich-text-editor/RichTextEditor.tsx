"use client";

import "./editor/styles.css";

import ExampleTheme from "./editor/themes/ExampleTheme";
import AutoLinkPlugin from "./editor/plugins/AutoLinkPlugin";
import ListMaxIndentLevelPlugin from "./editor/plugins/ListMaxIndentLevelPlugin";
import ToolbarPlugin from "components/rich-text-editor/editor/plugins/ToolbarPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useEffect, useRef, useState } from "react";

function Placeholder() {
  return (
    <div className="editor-placeholder">
      Enter rich text here. You can link PDF files anywhere in this document.
    </div>
  );
}

export const RichTextEditor = ({
  saveContent,
  richText,
}: {
  saveContent: (content: string) => void;
  richText?: string;
}) => {
  const [editable, setEditable] = useState(false);
  const [helpInfo, setHelpInfo] = useState(
    richText ? '' :
      <h3 className="text-white pt-10 pb-10">
        You can enter rich text or just link a PDF file or use both to
        present your syllabus.
      </h3>
  )
  const editorStateRef = useRef();

  function handleChange(currentState, editor) {
    editor.update(() => {
      editorStateRef.current = currentState;
    });
  }

  const EnableEditButton = () => {
    const [editor] = useLexicalComposerContext();
    const enableEdit = () => {
      editor.setEditable(true);
      setEditable(true);
    };

    return (
      <button
        className="mt-2 text-lg font-large text-gray-300 group-hover:text-white"
        onClick={enableEdit}
      >
        Edit
      </button>
    );
  };

  const DisableEditButtons = () => {
    const [editor] = useLexicalComposerContext();

    const handleCancel = () => {
      editor.setEditable(false);
      setEditable(false);
    };

    const handleSave = () => {
      editor.setEditable(false);
      setEditable(false);
      setHelpInfo('');

      const jsonContent = JSON.stringify(editorStateRef.current.toJSON());
      saveContent(jsonContent);
    };

    return (
      <div className="flex justify-end">
        <button
          className="mt-2 text-lg font-bold text-gray-300 group-hover:text-blue right-10"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="mt-2 text-lg font-bold text-gray-300 group-hover:text-blue left-10"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    );
  };
  console.log("--- richText ===")
  console.log(richText)

  const editorConfig = {
    // The editor theme
    theme: ExampleTheme,
    // Handling of errors during update
    onError(error) {
      throw error;
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
    editorState: richText,
    // always start the rich text editor with read-only mode
    editable: false,
  };

  return (
    <div>
      {helpInfo}

      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
            />
            <OnChangePlugin onChange={handleChange} />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>
        </div>
        <div className="flex justify-end">
          {editable ? <DisableEditButtons /> : <EnableEditButton />}
        </div>
      </LexicalComposer>
    </div>
  );
};
