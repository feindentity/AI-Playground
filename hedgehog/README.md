# Hedgehog the Sonnet Helper 🦔

A lightweight, single-file React application designed to help poets write Shakespearean and Petrarchan sonnets.

## Features

- **Dual Modes**: Switch between Shakespearean (ABAB CDCD EFEF GG) and Petrarchan (ABBAABBA CDECDE) rhyme schemes.
- **Real-time Syllable Counting**: Visual feedback on syllable count per line (aiming for 10).
- **Rhyme Helper**: Integrated rhyme search using the Datamuse API.
- **Export**: Save your work as `.txt` or `.json`.
- **Zero Build Step**: Runs directly in the browser using CDN-hosted libraries (React, Babel, Tailwind).

## Technical Overview

The application is contained entirely within `index.html`.

### Key Components

- **`SonnetHelper`**: The main application component handling state and UI.
- **`countSyllables(text)`**: A heuristic function that approximates syllable counts by analyzing vowel patterns and word endings.
- **`MODES`**: Configuration object defining the rhyme schemes and color guides for different sonnet types.

### Dependencies

- **React & ReactDOM**: UI rendering.
- **Babel**: In-browser JSX compilation.
- **Tailwind CSS**: Utility-first styling.
- **Google Fonts**: Crimson Text (serif) and Inter (sans-serif).

## Usage

Simply open `index.html` in any modern web browser. No server or installation required.
