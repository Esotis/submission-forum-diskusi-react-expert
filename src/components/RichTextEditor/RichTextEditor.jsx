/* eslint-disable object-curly-newline */
import { useRef, useCallback } from 'react';
import {
  EditorWrapper,
  Toolbar,
  ToolbarButton,
  EditableContent,
} from './RichTextEditor.styles';

const TOOLBAR_ACTIONS = [
  {
    command: 'bold',
    value: undefined,
    label: 'B',
    title: 'Tebal',
  },
  {
    command: 'italic',
    value: undefined,
    label: 'I',
    title: 'Miring',
  },
  {
    command: 'formatBlock',
    value: '<h2>',
    label: 'H2',
    title: 'Judul bagian',
  },
  {
    command: 'formatBlock',
    value: '<p>',
    label: 'P',
    title: 'Paragraf biasa',
  },
  {
    command: 'insertUnorderedList',
    value: undefined,
    label: '\u2022',
    title: 'Daftar berpoin',
  },
  {
    command: 'insertOrderedList',
    value: undefined,
    label: '1.',
    title: 'Daftar bernomor',
  },
  {
    command: 'formatBlock',
    value: '<blockquote>',
    label: '\u201C',
    title: 'Kutipan',
  },
  {
    command: 'removeFormat',
    value: undefined,
    label: 'Tx',
    title: 'Hapus format',
  },
];

function RichTextEditor({
  initialValue = '',
  onChange,
  placeholder = '',
  ariaLabelledBy = undefined,
}) {
  const editorRef = useRef(null);
  const initialHtmlRef = useRef(initialValue);

  const handleInput = useCallback(() => {
    onChange(editorRef.current.innerHTML);
  }, [onChange]);

  const runCommand = (command, value) => {
    editorRef.current.focus();
    document.execCommand(command, false, value);
    handleInput();
  };

  return (
    <EditorWrapper>
      <Toolbar role="toolbar" aria-label="Format teks thread">
        {TOOLBAR_ACTIONS.map(({ command, value, label, title }) => (
          <ToolbarButton
            key={`${command}-${value || 'default'}`}
            type="button"
            title={title}
            aria-label={title}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => runCommand(command, value)}
          >
            {label}
          </ToolbarButton>
        ))}
      </Toolbar>
      <EditableContent
        ref={editorRef}
        contentEditable
        role="textbox"
        tabIndex={0}
        aria-multiline="true"
        aria-label={ariaLabelledBy ? undefined : 'Isi thread'}
        aria-labelledby={ariaLabelledBy}
        data-placeholder={placeholder}
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: initialHtmlRef.current }}
      />
    </EditorWrapper>
  );
}

export default RichTextEditor;
