export const quoteFaqItems = [
  {
    question: 'Jak szybko otrzymam wycenę mojego samochodu?',
    answer:
      'Wstępną wycenę przygotowujemy w ciągu 24 godzin od otrzymania zdjęć i danych pojazdu. Wycena finalna następuje po oględzinach na miejscu.',
  },
  {
    question: 'Czy mogę zamienić swój samochód na inny z oferty?',
    answer: 'Tak. Oferujemy pełny trade-in — wyceniamy Twój samochód i rozliczamy go na poczet zakupu nowego egzemplarza z naszej oferty.',
  },
  {
    question: 'Co wpływa na wartość mojego samochodu?',
    answer:
      'Kluczowe czynniki to marka, model, rocznik, przebieg, stan techniczny i wizualny, historia serwisowa oraz kompletność dokumentacji.',
  },
  {
    question: 'Jak przebiega proces odkupu?',
    answer: 'Wysyłasz zdjęcia i dane → otrzymujesz wstępną ofertę → umawiamy oględziny → finalna wycena → podpisanie umowy i płatność w dniu transakcji.',
  },
] as const;

export const quoteFlowSteps = [
  {
    step: '01',
    label: 'Zgłoszenie',
    eyebrow: 'Etap 01 / wejście',
    title: 'Wyślij dane pojazdu',
    summary:
      'Wypełnij formularz lub wyślij zdjęcia i podstawowe dane samochodu. Na tej podstawie przygotujemy wstępną wycenę.',
    deliverable: 'wstępna oferta cenowa w 24h',
    control: 'marka / model / rocznik / przebieg / stan',
    time: '24 godziny',
  },
  {
    step: '02',
    label: 'Oględziny',
    eyebrow: 'Etap 02 / weryfikacja',
    title: 'Inspekcja na miejscu',
    summary:
      'Umawiamy wygodny termin oględzin. Nasz ekspert sprawdza stan techniczny, lakier, wnętrze i dokumentację pojazdu.',
    deliverable: 'raport techniczny + finalna wycena',
    control: 'lakier / mechanika / dokumenty / VIN',
    time: '1 wizyta / 45 min',
  },
  {
    step: '03',
    label: 'Oferta',
    eyebrow: 'Etap 03 / decyzja',
    title: 'Finalna wycena i warunki',
    summary:
      'Przedstawiamy ostateczną ofertę odkupu. Możesz zdecydować o sprzedaży za gotówkę lub zamianie na inny egzemplarz z naszej oferty.',
    deliverable: 'umowa + forma płatności',
    control: 'gotówka / przelew / trade-in',
    time: 'decyzja w Twoim tempie',
  },
  {
    step: '04',
    label: 'Realizacja',
    eyebrow: 'Etap 04 / finał',
    title: 'Płatność i formalności',
    summary:
      'Podpisujemy umowę, realizujemy płatność i załatwiamy wszystkie formalności — przerejestrowanie, wyrejestrowanie i dokumenty.',
    deliverable: 'płatność w dniu podpisania umowy',
    control: 'umowa / płatność / dokumenty / rejestracja',
    time: '1 dzień roboczy',
  },
] as const;
