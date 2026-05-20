'use client'
import { useField, useFormFields } from '@payloadcms/ui'
import { useEffect, useRef } from 'react'

function toSlug(text: string): string {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 4)
    .map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(Boolean)
    .join('-')
}

type Props = {
  path: string
  field: {
    label?: string
    required?: boolean
    admin?: { description?: string }
  }
}

export function SlugField({ path, field }: Props) {
  const { value, setValue, showError, errorMessage } = useField<string>({ path })
  const titleField = useFormFields(([fields]) => fields['title'])
  const nameField = useFormFields(([fields]) => fields['name'])
  const title = titleField ?? nameField
  const userEdited = useRef(false)
  const lastAutoGen = useRef('')

  useEffect(() => {
    const titleVal = title?.value as string | undefined
    if (!titleVal || userEdited.current) return
    const auto = toSlug(titleVal)
    if (auto && auto !== lastAutoGen.current) {
      lastAutoGen.current = auto
      setValue(auto)
    }
  }, [title?.value, setValue])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    userEdited.current = true
    const cleaned = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
    setValue(cleaned)
  }

  const label = typeof field.label === 'string' ? field.label : 'Slug'

  return (
    <div className="field-type text">
      <label className="field-label">
        {label}
        {field.required && <span className="required">*</span>}
      </label>
      <input
        type="text"
        value={value ?? ''}
        onChange={handleChange}
        className={`field-input${showError ? ' field-input--has-error' : ''}`}
        spellCheck={false}
      />
      {showError && errorMessage && (
        <p className="field-error">{errorMessage}</p>
      )}
      {field.admin?.description && (
        <p className="field-description">{field.admin.description}</p>
      )}
    </div>
  )
}
