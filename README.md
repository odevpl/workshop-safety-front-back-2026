# Web Security Workshop – wersja startowa

Celowo podatna aplikacja do lokalnego warsztatu „Zabezpieczenie aplikacji frontend i backend”. Składa się z panelu React oraz API Express z bazą SQLite.

> **Wyłącznie do nauki i uruchamiania lokalnie.** Nie wdrażaj tej wersji na serwer, nie wystawiaj jej do Internetu i nie używaj prawdziwych danych ani haseł.

## Uruchomienie

Wymagany jest Node.js 20+.

```bash
npm run install:all
npm run dev
```

Otwórz `http://localhost:5173`. API działa na `http://localhost:3001`.

Dane demonstracyjne:

- e-mail: `alice@example.test`
- hasło: `alice123`

## Struktura backendu

```text
server/
├── server.js              # punkt startowy i uruchomienie serwera
└── src/
    ├── app.js             # konfiguracja Express i rejestracja tras
    ├── config/            # baza danych i stałe aplikacji
    ├── routes/            # mapowanie endpointów HTTP
    ├── controllers/       # obsługa żądań i odpowiedzi HTTP
    ├── services/          # reguły aplikacyjne
    ├── models/            # dostęp do danych SQLite
    └── middleware/        # uwierzytelnianie i obsługa błędów
```

Celowe podatności nadal są oznaczone komentarzami `WORKSHOP:` w warstwach, w których występują. Kolejne ćwiczenia będą wprowadzać poprawki w odpowiedzialnej za nie warstwie.

## Struktura frontendu

```text
client/src/
├── app/                   # główny komponent aplikacji
├── config/                # konfiguracja, np. adres API
├── features/              # komponenty domenowe: auth i posts
├── services/              # komunikacja z API
└── styles/                # style globalne
```

## Stan startowy – celowe problemy do naprawy

W kodzie oznaczono je komentarzami `WORKSHOP:`.

1. Hasła są przechowywane i porównywane wprost.
2. Logowanie i wyszukiwanie budują zapytania SQL z danych wejściowych.
3. API dopuszcza każde źródło CORS.
4. Brakuje nagłówków bezpieczeństwa Helmet.
5. Brakuje walidacji danych wejściowych.
6. Błędy API zawierają szczegóły techniczne.
7. Token jest podpisywany stałym sekretem i przechowywany w `localStorage`.
8. Brakuje limitowania prób logowania oraz mechanizmów OAuth/Passport.
