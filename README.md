# Age Calculator App

Frontend Mentor challenge: **Age calculator app**.

## Overview

This is a simple age calculator that takes a birth date (day / month / year), validates the input, and displays the calculated age in **years**, **months**, and **days**.

## Features

- Calculate age from a given birth date
- Input validation:
  - Required fields
  - Valid day (1–31), month (1–12), year (>= 1900 and not in the future)
  - Valid calendar dates (prevents cases like `31/4` or `30/2`)
  - Leap year handling (validates `29/2` correctly)
  - Rejects future dates
- Error UI:
  - Error message appears under the invalid field
  - On any validation error, all fields are highlighted in red
  - Output placeholders (`--`) change color only after a calculation attempt with errors
- Responsive layout (mobile friendly)

## Built With

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Font: **Poppins** (Google Fonts)

## Getting Started

### Run locally

1. Download / clone the project
2. Open `index.html` in your browser

No build tools required.

## Folder Structure

- `index.html`
- `style.css`
- `script.js`
- `assets/`

## Notes

- The year input max is set to the current year (example: 2026). Update the `max` attribute in HTML when needed.

## Author

- Frontend Mentor: https://www.frontendmentor.io/profile/ruqiash12-oss
- GitHub: https://github.com/ruqiash12-oss