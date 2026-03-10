'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact'

export default function ContactForm() {
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
        setServerError('Something went wrong. Please try again.')
      }
    } catch {
      setServerError('Network error. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4">
        <p className="font-mono text-[10px] tracking-[.2em] uppercase text-sage-dim">
          Message received
        </p>
        <p className="font-syne text-[24px] text-brand-white font-semibold">
          We&apos;ll be in touch soon.
        </p>
        <p className="text-[13px] text-[var(--text-dim)]">
          Thanks for reaching out. Expect to hear from us within 24–48 hours.
        </p>
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-[22px]" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Name */}
      <div className="flex flex-col gap-[7px]">
        <label className="font-mono text-[9px] tracking-[.22em] uppercase text-sage-muted">
          Your name
        </label>
        <input
          {...register('name')}
          type="text"
          placeholder="Jane Smith"
          className="form-input"
        />
        {errors.name && (
          <span className="font-mono text-[9px] tracking-[.12em] text-red-400">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-[7px]">
        <label className="font-mono text-[9px] tracking-[.22em] uppercase text-sage-muted">
          Email address
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="hello@company.com"
          className="form-input"
        />
        {errors.email && (
          <span className="font-mono text-[9px] tracking-[.12em] text-red-400">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-[7px]">
        <label className="font-mono text-[9px] tracking-[.22em] uppercase text-sage-muted">
          What are you building?
        </label>
        <textarea
          {...register('message')}
          placeholder="Tell us about your idea..."
          className="form-textarea"
        />
        {errors.message && (
          <span className="font-mono text-[9px] tracking-[.12em] text-red-400">
            {errors.message.message}
          </span>
        )}
      </div>

      {serverError && (
        <p className="font-mono text-[9px] tracking-[.12em] text-red-400">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-[14px] self-start bg-transparent border border-sage text-sage font-mono text-[11px] tracking-[.18em] uppercase px-[34px] py-[15px] cursor-pointer transition-all duration-300 hover:bg-sage hover:text-brand-black clip-chamfer-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  )
}
