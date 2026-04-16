type VehicleEmailProps = {
  name: string;
  email: string;
  phone?: string;
  scopes: string[];
  message?: string;
  vehicleName: string;
  vehicleSlug: string;
};

function row(label: string, value: string | undefined | null) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:#71717a;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;border-bottom:1px solid #f4f4f5;width:180px">${label}</td>
      <td style="padding:10px 16px;font-size:14px;color:#09090b;border-bottom:1px solid #f4f4f5">${value}</td>
    </tr>`;
}

export function buildVehicleEmailHtml(data: VehicleEmailProps): string {
  const siteUrl = process.env.NEXTAUTH_URL || 'https://samochodypremium.pl';
  const vehicleUrl = `${siteUrl}/oferta/${data.vehicleSlug}`;

  const contactRows = [
    row('Imię i nazwisko', data.name),
    row('E-mail', `<a href="mailto:${data.email}" style="color:#09090b;text-decoration:underline">${data.email}</a>`),
    row('Telefon', data.phone ? `<a href="tel:${data.phone.replace(/\s/g, '')}" style="color:#09090b;text-decoration:underline">${data.phone}</a>` : undefined),
    row('Zakres rozmowy', data.scopes.length > 0 ? data.scopes.join(', ') : undefined),
  ].join('');

  const vehicleRows = [
    row('Samochód', `<strong>${data.vehicleName}</strong>`),
    row('Link do oferty', `<a href="${vehicleUrl}" style="color:#09090b;text-decoration:underline">${vehicleUrl}</a>`),
  ].join('');

  return `
<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:640px;margin:0 auto;padding:32px 16px">

    <div style="background:#09090b;padding:32px 28px;text-align:center">
      <h1 style="margin:0;color:#fff;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em">
        Samochody Premium
      </h1>
      <p style="margin:8px 0 0;color:#a1a1aa;font-size:12px;letter-spacing:0.1em;text-transform:uppercase">
        Zapytanie o pojazd
      </p>
    </div>

    <div style="background:#fff;padding:28px;border-bottom:1px solid #e4e4e7">
      <p style="margin:0;font-size:15px;color:#09090b;line-height:1.7">
        <strong>${data.name}</strong> jest zainteresowany pojazdem
        <strong>${data.vehicleName}</strong>.
      </p>
    </div>

    <div style="background:#fff;padding:20px 28px 8px">
      <h2 style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#71717a;border-bottom:2px solid #09090b;padding-bottom:8px">
        Pojazd
      </h2>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
        ${vehicleRows}
      </table>
    </div>

    <div style="background:#fff;padding:20px 28px 8px">
      <h2 style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#71717a;border-bottom:2px solid #09090b;padding-bottom:8px">
        Dane kontaktowe
      </h2>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
        ${contactRows}
      </table>
    </div>

    ${data.message ? `
    <div style="background:#fff;padding:20px 28px 24px">
      <h2 style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#71717a;border-bottom:2px solid #09090b;padding-bottom:8px">
        Wiadomość
      </h2>
      <p style="margin:0;font-size:14px;color:#09090b;line-height:1.8;white-space:pre-wrap">${data.message}</p>
    </div>
    ` : ''}

    <div style="background:#fff;padding:24px 28px;text-align:center;border-top:1px solid #e4e4e7">
      <a href="mailto:${data.email}" style="display:inline-block;padding:14px 32px;background:#09090b;color:#fff;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;text-decoration:none">
        Odpowiedz klientowi
      </a>
    </div>

    <div style="padding:24px 28px;text-align:center">
      <p style="margin:0;font-size:11px;color:#a1a1aa;line-height:1.6">
        Wiadomość wysłana automatycznie z formularza oferty na stronie samochodypremium.pl
      </p>
    </div>

  </div>
</body>
</html>`;
}

export function buildVehicleEmailText(data: VehicleEmailProps): string {
  const siteUrl = process.env.NEXTAUTH_URL || 'https://samochodypremium.pl';
  const lines = [
    `ZAPYTANIE O POJAZD — SAMOCHODY PREMIUM`,
    '=======================================',
    '',
    `Samochód: ${data.vehicleName}`,
    `Link: ${siteUrl}/oferta/${data.vehicleSlug}`,
    '',
    'DANE KONTAKTOWE:',
    `  Imię i nazwisko: ${data.name}`,
    `  E-mail: ${data.email}`,
  ];
  if (data.phone) lines.push(`  Telefon: ${data.phone}`);
  if (data.scopes.length > 0) lines.push(`  Zakres rozmowy: ${data.scopes.join(', ')}`);
  if (data.message) {
    lines.push('', 'WIADOMOŚĆ:', data.message);
  }
  return lines.join('\n');
}
