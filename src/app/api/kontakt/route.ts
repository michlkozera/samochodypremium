import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  buildContactEmailHtml,
  buildContactEmailText,
} from '@/lib/emails/contact-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim();
    const phone = (body.phone ?? '').trim();
    const scopes: string[] = Array.isArray(body.scopes) ? body.scopes : [];
    const details = (body.details ?? '').trim();

    if (!name || !email || !details) {
      return NextResponse.json(
        { error: 'Brakuje wymaganych pól: imię i nazwisko, email, szczegóły.' },
        { status: 400 },
      );
    }

    const recipientEmail = process.env.ODKUP_EMAIL_TO || 'kontakt@samochodypremium.pl';
    const subject = `Kontakt: ${name}${scopes.length > 0 ? ` — ${scopes.join(', ')}` : ''}`;

    const emailData = {
      name,
      email,
      phone: phone || undefined,
      scopes,
      details,
    };

    const { error } = await resend.emails.send({
      from: 'Samochody Premium <onboarding@resend.dev>',
      to: [recipientEmail],
      replyTo: email,
      subject,
      html: buildContactEmailHtml(emailData),
      text: buildContactEmailText(emailData),
    });

    if (error) {
      console.error('[Kontakt API] Resend error:', error);
      return NextResponse.json(
        { error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Kontakt API] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Wystąpił nieoczekiwany błąd serwera.' },
      { status: 500 },
    );
  }
}
