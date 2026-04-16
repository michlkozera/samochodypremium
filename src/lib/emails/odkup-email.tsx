type OdkupEmailProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleType?: string;
  brand?: string;
  model?: string;
  trim?: string;
  year?: string;
  country?: string;
  condition?: string;
  mileage: string;
  price?: string;
  vin?: string;
  vatInvoice?: boolean;
  bodyRepairs?: boolean;
  message?: string;
  photoCount: number;
};

function row(label: string, value: string | undefined | null) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:#71717a;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;border-bottom:1px solid #f4f4f5;width:180px">${label}</td>
      <td style="padding:10px 16px;font-size:14px;color:#09090b;border-bottom:1px solid #f4f4f5">${value}</td>
    </tr>`;
}

export function buildOdkupEmailHtml(data: OdkupEmailProps): string {
  const contactRows = [
    row('Imię', data.firstName),
    row('Nazwisko', data.lastName),
    row('E-mail', `<a href="mailto:${data.email}" style="color:#09090b;text-decoration:underline">${data.email}</a>`),
    row('Telefon', `<a href="tel:${data.phone.replace(/\s/g, '')}" style="color:#09090b;text-decoration:underline">${data.phone}</a>`),
  ].join('');

  const vehicleRows = [
    row('Rodzaj pojazdu', data.vehicleType),
    row('Marka', data.brand),
    row('Model', data.model),
    row('Wersja wyposażenia', data.trim),
    row('Rok produkcji', data.year),
    row('Kraj pochodzenia', data.country),
    row('Stan pojazdu', data.condition),
    row('Przebieg', data.mileage ? `${Number(data.mileage).toLocaleString('pl-PL')} km` : undefined),
    row('Proponowana cena', data.price ? `${Number(data.price).toLocaleString('pl-PL')} PLN` : undefined),
    row('Numer VIN', data.vin),
  ].join('');

  const statusRows = [
    row('Faktura VAT', data.vatInvoice ? 'Tak' : 'Nie'),
    row('Po naprawach blacharsko-lakierniczych', data.bodyRepairs ? 'Tak' : 'Nie'),
    row('Załączone zdjęcia', data.photoCount > 0 ? `${data.photoCount} plik(ów)` : 'Brak'),
  ].join('');

  return `
<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:640px;margin:0 auto;padding:32px 16px">

    <!-- Header -->
    <div style="background:#09090b;padding:32px 28px;text-align:center">
      <h1 style="margin:0;color:#fff;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em">
        Samochody Premium
      </h1>
      <p style="margin:8px 0 0;color:#a1a1aa;font-size:12px;letter-spacing:0.1em;text-transform:uppercase">
        Nowe zgłoszenie odkupu
      </p>
    </div>

    <!-- Intro -->
    <div style="background:#fff;padding:28px;border-bottom:1px solid #e4e4e7">
      <p style="margin:0;font-size:15px;color:#09090b;line-height:1.7">
        Otrzymano nowe zgłoszenie odkupu pojazdu od <strong>${data.firstName} ${data.lastName}</strong>.
      </p>
    </div>

    <!-- Dane kontaktowe -->
    <div style="background:#fff;padding:20px 28px 8px">
      <h2 style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#71717a;border-bottom:2px solid #09090b;padding-bottom:8px">
        Dane kontaktowe
      </h2>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
        ${contactRows}
      </table>
    </div>

    <!-- Dane samochodu -->
    <div style="background:#fff;padding:20px 28px 8px">
      <h2 style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#71717a;border-bottom:2px solid #09090b;padding-bottom:8px">
        Dane samochodu
      </h2>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
        ${vehicleRows}
      </table>
    </div>

    <!-- Status -->
    <div style="background:#fff;padding:20px 28px 8px">
      <h2 style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#71717a;border-bottom:2px solid #09090b;padding-bottom:8px">
        Status i pliki
      </h2>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
        ${statusRows}
      </table>
    </div>

    <!-- Wiadomość -->
    ${data.message ? `
    <div style="background:#fff;padding:20px 28px 24px">
      <h2 style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#71717a;border-bottom:2px solid #09090b;padding-bottom:8px">
        Wiadomość
      </h2>
      <p style="margin:0;font-size:14px;color:#09090b;line-height:1.8;white-space:pre-wrap">${data.message}</p>
    </div>
    ` : ''}

    <!-- CTA -->
    <div style="background:#fff;padding:24px 28px;text-align:center;border-top:1px solid #e4e4e7">
      <a href="mailto:${data.email}" style="display:inline-block;padding:14px 32px;background:#09090b;color:#fff;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;text-decoration:none">
        Odpowiedz klientowi
      </a>
    </div>

    <!-- Footer -->
    <div style="padding:24px 28px;text-align:center">
      <p style="margin:0;font-size:11px;color:#a1a1aa;line-height:1.6">
        Wiadomość wysłana automatycznie z formularza odkupu na stronie samochodypremium.pl
      </p>
    </div>

  </div>
</body>
</html>`;
}

export function buildOdkupEmailText(data: OdkupEmailProps): string {
  const lines: string[] = [
    'NOWE ZGŁOSZENIE ODKUPU — SAMOCHODY PREMIUM',
    '============================================',
    '',
    'DANE KONTAKTOWE:',
    `  Imię: ${data.firstName}`,
    `  Nazwisko: ${data.lastName}`,
    `  E-mail: ${data.email}`,
    `  Telefon: ${data.phone}`,
    '',
    'DANE SAMOCHODU:',
  ];

  if (data.vehicleType) lines.push(`  Rodzaj pojazdu: ${data.vehicleType}`);
  if (data.brand) lines.push(`  Marka: ${data.brand}`);
  if (data.model) lines.push(`  Model: ${data.model}`);
  if (data.trim) lines.push(`  Wersja wyposażenia: ${data.trim}`);
  if (data.year) lines.push(`  Rok produkcji: ${data.year}`);
  if (data.country) lines.push(`  Kraj pochodzenia: ${data.country}`);
  if (data.condition) lines.push(`  Stan pojazdu: ${data.condition}`);
  lines.push(`  Przebieg: ${data.mileage ? `${Number(data.mileage).toLocaleString('pl-PL')} km` : 'Nie podano'}`);
  if (data.price) lines.push(`  Proponowana cena: ${Number(data.price).toLocaleString('pl-PL')} PLN`);
  if (data.vin) lines.push(`  VIN: ${data.vin}`);

  lines.push('');
  lines.push('STATUS:');
  lines.push(`  Faktura VAT: ${data.vatInvoice ? 'Tak' : 'Nie'}`);
  lines.push(`  Po naprawach blacharsko-lakierniczych: ${data.bodyRepairs ? 'Tak' : 'Nie'}`);
  lines.push(`  Załączone zdjęcia: ${data.photoCount > 0 ? `${data.photoCount}` : 'Brak'}`);

  if (data.message) {
    lines.push('');
    lines.push('WIADOMOŚĆ:');
    lines.push(data.message);
  }

  return lines.join('\n');
}
