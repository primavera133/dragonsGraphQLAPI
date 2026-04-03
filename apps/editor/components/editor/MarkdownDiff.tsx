'use client'
import { diffWords } from 'diff'

interface Props {
  original: string
  current: string
}

export function MarkdownDiff({ original, current }: Props) {
  const parts = diffWords(original, current)

  return (
    <div className="markdown-diff">
      {parts.map((part, i) => {
        if (part.added) {
          return <mark key={i} className="diff-added">{part.value}</mark>
        }
        if (part.removed) {
          return <mark key={i} className="diff-removed">{part.value}</mark>
        }
        return <span key={i}>{part.value}</span>
      })}
    </div>
  )
}
