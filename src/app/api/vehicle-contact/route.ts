import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  buildVehicleEmailHtml,
  buildVehicleEmailText,
} from '@/lib/emails/vehicle-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim();
    const phone = (body.phone ?? '').trim();
    const scopes: string[] = Array.isArray(body.scopes) ? body.scopes : [];
    const message = (body.message ?? '').trim();
    const vehicleName = (body.vehicleName ?? '').trim();
    const vehicleSlug = (body.vehicleSlug ?? '').trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Brakuje wymaganych pól: imię i nazwisko, email.' },
        { status: 400 },
      );
    }

    const recipientEmail = process.env.ODKUP_EMAIL_TO || 'kontakt@samochodypremium.pl';
    const subject = `Zapytanie: ${vehicleName || 'pojazd'} — ${name}`;

    const emailData = {
      name,
      email,
      phone: phone || undefined,
      scopes,
      message: message || undefined,
      vehicleName: vehicleName || 'Nieznany pojazd',
      vehicleSlug: vehicleSlug || '',
    };

    console.log('[VehicleContact API] Sending email:', { to: recipientEmail, subject, replyTo: email });

    const { data: resendData, error } = await resend.emails.send({
      from: 'Samochody Premium <onboarding@resend.dev>',
      to: [recipientEmail],
      replyTo: email,
      subject,
      html: buildVehicleEmailHtml(emailData),
      text: buildVehicleEmailText(emailData),
    });

    if (error) {
      console.error('[VehicleContact API] Resend error:', JSON.stringify(error));
      return NextResponse.json(
        { error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.' },
        { status: 500 },
      );
    }

    console.log('[VehicleContact API] Email sent successfully, id:', resendData?.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[VehicleContact API] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Wystąpił nieoczekiwany błąd serwera.' },
      { status: 500 },
    );
  }
}
