import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/schemas/contact'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = contactSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { success: false, errors: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  // Log submission — swap in Resend or other mailer here later
  console.log('[contact] New submission:', {
    name: result.data.name,
    email: result.data.email,
    message: result.data.message,
    timestamp: new Date().toISOString(),
  })

  return NextResponse.json({ success: true })
}
