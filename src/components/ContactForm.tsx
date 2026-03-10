'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactForm() {
  const { t } = useLanguage()
  const f = t.contact.form
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setServerError(f.errorGeneric)
      }
    } catch {
      setServerError(f.errorNetwork)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4">
        <p className="font-mono text-[12px] tracking-[.2em] uppercase text-sage-dim">
          {f.successLabel}
        </p>
        <p className="font-syne text-[24px] text-brand-white font-semibold">
          {f.successTitle}
        </p>
        <p className="text-[15px] text-[var(--text-dim)]">
          {f.successBody}
        </p>
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-[22px]" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Name */}
      <div className="flex flex-col gap-[7px]">
        <label className="font-mono text-[12px] tracking-[.22em] uppercase text-sage-muted">
          {f.nameLbl}
        </label>
        <input
          {...register('name')}
          type="text"
          placeholder={f.namePlaceholder}
          className="form-input"
        />
        {errors.name && (
          <span className="font-mono text-[12px] tracking-[.12em] text-red-400">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-[7px]">
        <label className="font-mono text-[12px] tracking-[.22em] uppercase text-sage-muted">
          {f.emailLbl}
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder={f.emailPlaceholder}
          className="form-input"
        />
        {errors.email && (
          <span className="font-mono text-[12px] tracking-[.12em] text-red-400">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-[7px]">
        <label className="font-mono text-[12px] tracking-[.22em] uppercase text-sage-muted">
          {f.messageLbl}
        </label>
        <textarea
          {...register('message')}
          placeholder={f.messagePlaceholder}
          className="form-textarea"
        />
        {errors.message && (
          <span className="font-mono text-[12px] tracking-[.12em] text-red-400">
            {errors.message.message}
          </span>
        )}
      </div>

      {serverError && (
        <p className="font-mono text-[12px] tracking-[.12em] text-red-400">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-[14px] self-start bg-transparent border border-sage text-sage font-mono text-[12px] tracking-[.18em] uppercase px-[34px] py-[15px] cursor-pointer transition-all duration-300 hover:bg-sage hover:text-brand-black clip-chamfer-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? f.submitting : f.submit}
      </button>
    </form>
  )
}
