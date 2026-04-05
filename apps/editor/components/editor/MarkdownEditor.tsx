'use client'
import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import { MarkdownDiff } from './MarkdownDiff'

interface Props {
  label: string
  value: string
  onChange: (v: string) => void
  original?: string
}

const HEADING_LEVELS = [1, 2, 3] as const

export function MarkdownEditor({ label, value, onChange, original }: Props) {
  const [mounted, setMounted] = useState(false)
  const [showDiff, setShowDiff] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Markdown],
    content: value,
    onUpdate: ({ editor }) => {
      onChange((editor.storage as any).markdown.getMarkdown())
    },
  })

  if (!mounted) {
    return (
      <div className="field">
        <div className="label">{label} <span className="label-hint">— rich text</span></div>
        <div className="rich-editor" style={{ minHeight: 177 }} />
      </div>
    )
  }

  return (
    <div className="field">
      <div className="label">
        {label} <span className="label-hint">— rich text</span>
      </div>
      <div className="rich-editor">
        <div className="rich-editor-toolbar" role="toolbar" aria-label={`${label} formatting`}>
          <button
            className={`toolbar-btn${editor?.isActive('bold') ? ' is-active' : ''}`}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editor || showDiff}
            aria-label="Bold"
            type="button"
          >
            <strong>B</strong>
          </button>
          <button
            className={`toolbar-btn${editor?.isActive('italic') ? ' is-active' : ''}`}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            disabled={!editor || showDiff}
            aria-label="Italic"
            type="button"
          >
            <em>I</em>
          </button>
          <div className="toolbar-sep" />
          {HEADING_LEVELS.map((level) => (
            <button
              key={level}
              className={`toolbar-btn${editor?.isActive('heading', { level }) ? ' is-active' : ''}`}
              onClick={() => editor?.chain().focus().toggleHeading({ level }).run()}
              disabled={!editor || showDiff}
              aria-label={`Heading ${level}`}
              type="button"
            >
              H{level}
            </button>
          ))}
          <div className="toolbar-sep" />
          <button
            className={`toolbar-btn${editor?.isActive('bulletList') ? ' is-active' : ''}`}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            disabled={!editor || showDiff}
            aria-label="Bullet list"
            type="button"
          >
            • List
          </button>
          <button
            className={`toolbar-btn${editor?.isActive('orderedList') ? ' is-active' : ''}`}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            disabled={!editor || showDiff}
            aria-label="Ordered list"
            type="button"
          >
            1. List
          </button>
          <button
            className={`toolbar-btn${editor?.isActive('blockquote') ? ' is-active' : ''}`}
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            disabled={!editor || showDiff}
            aria-label="Blockquote"
            type="button"
          >
            ❝
          </button>
          <div className="toolbar-sep" />
          <button
            className="toolbar-btn"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo() || showDiff}
            aria-label="Undo"
            type="button"
          >
            ↩
          </button>
          <button
            className="toolbar-btn"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo() || showDiff}
            aria-label="Redo"
            type="button"
          >
            ↪
          </button>
          {original !== undefined && (
            <>
              <div className="toolbar-sep" />
              <button
                className={`toolbar-btn${showDiff ? ' is-active' : ''}`}
                onClick={() => setShowDiff((v) => !v)}
                aria-label={showDiff ? 'Close diff' : 'View diff'}
                type="button"
              >
                {showDiff ? 'Edit' : 'Diff'}
              </button>
            </>
          )}
        </div>
        {showDiff && original !== undefined ? (
          <MarkdownDiff original={original} current={value} />
        ) : (
          <EditorContent editor={editor} className="rich-editor-content" />
        )}
      </div>
    </div>
  )
}
