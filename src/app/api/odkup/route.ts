import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { buildOdkupEmailHtml, buildOdkupEmailText } from '@/lib/emails/odkup-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    /* ── Extract text fields ── */
    const get = (key: string) => {
      const val = formData.get(key);
      return typeof val === 'string' ? val.trim() : '';
    };

    const firstName = get('firstName');
    const lastName = get('lastName');
    const email = get('email');
    const phone = get('phone');
    const vehicleType = get('vehicleType');
    const brand = get('brand');
    const model = get('model');
    const trim = get('trim');
    const year = get('year');
    const country = get('country');
    const condition = get('condition');
    const mileage = get('mileage');
    const price = get('price');
    const vin = get('vin');
    const vatInvoice = get('vatInvoice') === 'true';
    const bodyRepairs = get('bodyRepairs') === 'true';
    const message = get('message');

    /* ── Basic server-side validation ── */
    if (!firstName || !lastName || !email || !phone || !mileage) {
      return NextResponse.json(
        { error: 'Brakuje wymaganych pól: imię, nazwisko, email, telefon, przebieg.' },
        { status: 400 },
      );
    }

    /* ── Extract photo attachments ── */
    const attachments: { filename: string; content: Buffer }[] = [];

    for (const key of ['photo1', 'photo2', 'photo3', 'photo4']) {
      const file = formData.get(key);
      if (file && file instanceof File && file.size > 0) {
        const bytes = await file.arrayBuffer();
        attachments.push({
          filename: file.name || `${key}.jpg`,
          content: Buffer.from(bytes),
        });
      }
    }

    /* ── Build email ── */
    const emailData = {
      firstName,
      lastName,
      email,
      phone,
      vehicleType: vehicleType || undefined,
      brand: brand || undefined,
      model: model || undefined,
      trim: trim || undefined,
      year: year || undefined,
      country: country || undefined,
      condition: condition || undefined,
      mileage,
      price: price || undefined,
      vin: vin || undefined,
      vatInvoice,
      bodyRepairs,
      message: message || undefined,
      photoCount: attachments.length,
    };

    const recipientEmail = process.env.ODKUP_EMAIL_TO || 'kontakt@samochodypremium.pl';

    const brandModel = [brand, model].filter(Boolean).join(' ') || 'pojazd';
    const subject = `Odkup: ${brandModel} — ${firstName} ${lastName}`;

    /* ── Send with Resend ── */
    const { error } = await resend.emails.send({
      from: 'Samochody Premium <onboarding@resend.dev>',
      to: [recipientEmail],
      replyTo: email,
      subject,
      html: buildOdkupEmailHtml(emailData),
      text: buildOdkupEmailText(emailData),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error('[Odkup API] Resend error:', error);
      return NextResponse.json(
        { error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Odkup API] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Wystąpił nieoczekiwany błąd serwera.' },
      { status: 500 },
    );
  }
}
