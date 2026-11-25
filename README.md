# BBA Study Portal

A polished, mobile-friendly Bengali BBA learning and exam-preparation portal. The current study bank contains **36 question-and-answer entries** across five subjects, including expanded Marketing and Management sections.

A responsive Bengali study portal containing question-and-answer notes for the first five subjects.

## Features

- Premium responsive interface with a gradient learning dashboard and refined question cards.
- Search questions and answers, filter by subject, and bookmark important topics.
- Expanded Marketing (13 questions) and Management (9 questions) banks with structured, exam-oriented explanations, examples, comparison tables, and key concepts.
- Track completed questions locally in the browser, with live overall progress.
- Mobile-friendly reading controls, accordion navigation, and print-ready answer layouts.
- Light/dark theme, adjustable text size, copy and print/PDF.
- Bengali text-to-speech with a server-side Google Cloud Chirp 3 HD neural voice when deployed on Netlify.
- Browser Bengali TTS fallback only when a Bengali voice is installed; the app no longer silently selects an English voice.
- BBA terminology pronunciation normalization for common English terms inside Bengali answers.

## Exam preparation tools

- Timed MCQ mock tests with 10, 20 or 30-question settings.
- Subject filters for Marketing, Management, History, ICT and Business Introduction.
- Instant answer feedback in the final report, explanations for incorrect and unanswered questions, and printable results.
- Local exam history, best-score snapshot, completed-topic and bookmark statistics.
- Exam history and learning progress remain in the current browser profile; they are not synced between devices.

## Quality checks

GitHub Actions runs `node scripts/check-inline-js.mjs` before publishing. This parses every inline JavaScript block in `index.html` to catch syntax errors.

## Premium Bengali voice setup (Netlify)

The neural voice endpoint is included at `netlify/functions/speak.js`. It uses Google Cloud Text-to-Speech's Bengali (India) Chirp 3 HD voice `bn-IN-Chirp3-HD-Aoede`.

1. Create or select a Google Cloud project.
2. Enable the **Cloud Text-to-Speech API** and configure billing according to Google's current pricing.
3. Create an API key in Google Cloud Credentials. Restrict it to the Cloud Text-to-Speech API.
4. Deploy this repository to Netlify (the included `netlify.toml` configures the static publish directory and Functions folder).
5. In Netlify: **Site configuration → Environment variables**, add `GOOGLE_TTS_API_KEY` with the API key value, then trigger a new deploy.
6. Open the Netlify-hosted site and tap **শুনুন**. The site calls the Netlify Function; the secret key stays on the server and is never exposed in frontend code.

**Important:** GitHub Pages is static hosting and cannot run Netlify Functions. The browser-only fallback requires a Bengali voice installed on the device. The neural voice works only on the Netlify deployment after the API is enabled and the environment variable is configured.

Google's Chirp 3 HD voice currently lists Bengali (India), not Bengali (Bangladesh). It is a premium neural voice and may sound more natural than local device TTS, but accent and pronunciation should be tested against the actual course content.

## Run locally

Open `index.html` in a modern browser for the browser fallback. To test the cloud function, deploy to Netlify and configure the environment variable above.

## Deploy

- **GitHub Pages:** the included GitHub Actions workflow publishes the static site to Pages on every push to `main`. In **Settings → Pages**, select **GitHub Actions** as the deployment source.
- **Netlify:** import this repository into Netlify; the included `netlify.toml` configures publishing and serverless functions.

## Privacy and security

The Google API key is read only from the Netlify server environment and must never be committed to the repository. Study completion, bookmarks, and theme preferences are stored in the browser's local storage on the current device. Text sent to the neural voice endpoint is processed by Google Cloud Text-to-Speech to generate audio.
