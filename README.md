# BBA Study Portal

A responsive Bengali study portal containing question-and-answer notes for the first five subjects.

## Features

- Search questions and answers, filter by subject, and bookmark important topics.
- Track completed questions locally in the browser.
- Light/dark theme, adjustable text size, copy and print/PDF.
- **Bengali text-to-speech:** each answer includes a Listen button. Speech uses the browser's built-in Web Speech API; no API key or paid server is required.
- Responsive layout for mobile and desktop.

## Voice support

Tap **শুনুন** under an answer to hear its question and answer. The voice language is set to Bengali (Bangladesh), and the browser selects an installed Bengali voice when available. Actual voice quality and availability depend on the device/browser and its installed text-to-speech engine. On Android, install or update a Bengali voice in the system Text-to-speech settings if speech is unavailable. Use **বন্ধ** to stop playback.

This is browser/device text-to-speech, not a cloud AI voice-cloning service. The site does not send study content to a speech API.

## Run locally

Open `index.html` in a modern browser, or serve this folder with any static web server.

## Deploy

The included GitHub Actions workflow publishes the repository root to GitHub Pages on every push to `main`. In the repository, open **Settings → Pages** and select **GitHub Actions** as the build and deployment source if it is not already selected.

## Privacy

Study completion, bookmarks, and theme preferences are stored in the browser's local storage on the current device.
