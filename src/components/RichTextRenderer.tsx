import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export default function RichTextRenderer({
  data,
  className = 'prose max-w-none',
}: {
  data?: SerializedEditorState | null
  className?: string
}) {
  if (!data) return null
  return (
    <div className={className}>
      <RichText data={data} />
    </div>
  )
}
