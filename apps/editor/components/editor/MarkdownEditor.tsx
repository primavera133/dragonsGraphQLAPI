'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import { Button } from 'react-aria-components'

interface Props {
  label: string
  value: string
  onChange: (v: string) => void
}

const HEADING_LEVELS = [1, 2, 3] as const

export function MarkdownEditor({ label, value, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Markdown],
    content: value,
    onUpdate: ({ editor }) => {
      onChange((editor.storage as any).markdown.getMarkdown())
    },
  })

  return (
    <div className="field">
      <div className="label">{label} <span className="label-hint">— rich text</span></div>
      <div className="rich-editor">
        <div className="rich-editor-toolbar" role="toolbar" aria-label={`${label} formatting`}>
          <Button
            className={`toolbar-btn${editor?.isActive('bold') ? ' is-active' : ''}`}
            onPress={() => editor?.chain().focus().toggleBold().run()}
            isDisabled={!editor}
            aria-label="Bold"
          >
            <strong>B</strong>
          </Button>
          <Button
            className={`toolbar-btn${editor?.isActive('italic') ? ' is-active' : ''}`}
            onPress={() => editor?.chain().focus().toggleItalic().run()}
            isDisabled={!editor}
            aria-label="Italic"
          >
            <em>I</em>
          </Button>
          <div className="toolbar-sep" />
          {HEADING_LEVELS.map((level) => (
            <Button
              key={level}
              className={`toolbar-btn${editor?.isActive('heading', { level }) ? ' is-active' : ''}`}
              onPress={() => editor?.chain().focus().toggleHeading({ level }).run()}
              isDisabled={!editor}
              aria-label={`Heading ${level}`}
            >
              H{level}
            </Button>
          ))}
          <div className="toolbar-sep" />
          <Button
            className={`toolbar-btn${editor?.isActive('bulletList') ? ' is-active' : ''}`}
            onPress={() => editor?.chain().focus().toggleBulletList().run()}
            isDisabled={!editor}
            aria-label="Bullet list"
          >
            • List
          </Button>
          <Button
            className={`toolbar-btn${editor?.isActive('orderedList') ? ' is-active' : ''}`}
            onPress={() => editor?.chain().focus().toggleOrderedList().run()}
            isDisabled={!editor}
            aria-label="Ordered list"
          >
            1. List
          </Button>
          <Button
            className={`toolbar-btn${editor?.isActive('blockquote') ? ' is-active' : ''}`}
            onPress={() => editor?.chain().focus().toggleBlockquote().run()}
            isDisabled={!editor}
            aria-label="Blockquote"
          >
            ❝
          </Button>
          <div className="toolbar-sep" />
          <Button
            className="toolbar-btn"
            onPress={() => editor?.chain().focus().undo().run()}
            isDisabled={!editor?.can().undo()}
            aria-label="Undo"
          >
            ↩
          </Button>
          <Button
            className="toolbar-btn"
            onPress={() => editor?.chain().focus().redo().run()}
            isDisabled={!editor?.can().redo()}
            aria-label="Redo"
          >
            ↪
          </Button>
        </div>
        <EditorContent editor={editor} className="rich-editor-content" />
      </div>
    </div>
  )
}
