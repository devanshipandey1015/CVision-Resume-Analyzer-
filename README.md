# CVision - Resume Analyzer Dashboard

Modern, frontend-only resume analysis dashboard built with React, Vite, and TypeScript.  
It helps users evaluate resumes against target roles and job descriptions using realistic rule-based ATS heuristics.

## Project Overview

CVision provides:
- local authentication with persistent sessions
- resume paste/upload and role-based analysis
- ATS-style scoring, keyword gap detection, and suggestion generation
- history tracking and data-driven insights with charts
- profile analytics and dark mode preference persistence

No backend or APIs are required. All data is stored in `localStorage`.

## Features

- Authentication (signup/login/logout) with `localStorage`
- Sidebar + topbar dashboard layout (responsive + dark mode)
- Resume input:
  - paste text
  - upload `.txt` file
  - optional target job description
  - target role selection + custom role support
- Rule-based analysis:
  - section detection
  - keyword match scoring
  - missing keyword extraction
  - action verb + weak wording detection
  - skills grouping (technical/tools/soft)
  - project/experience/contact heuristics
  - weighted ATS score out of 100
- Dashboard outputs:
  - ATS score, recommendation, strength indicators
  - section completeness, suggestions, keyword chips
  - stats and skills breakdown
- Insights page with Recharts:
  - score trend over time
  - most common missing keywords
  - section completion trend
  - role-wise history distribution
- Searchable history table with detail view + delete support
- Profile page with name editing, joined date, total analyses, and average ATS score

## Tech Stack

- React (functional components + hooks)
- TypeScript
- Vite
- React Router
- Recharts
- LocalStorage persistence

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview production build:
   ```bash
   npm run preview
   ```

## Folder Structure

```text
src/
  components/
    common/
    layout/
  data/
  hooks/
  pages/
  types/
  utils/
```

## Screenshots (Placeholders)

- `docs/screenshots/auth.png`
- `docs/screenshots/dashboard.png`
- `docs/screenshots/analyze.png`
- `docs/screenshots/history.png`
- `docs/screenshots/insights.png`
- `docs/screenshots/profile.png`

## Future Improvements

- PDF and DOCX parsing support
- export analysis reports as PDF
- multi-resume comparison mode
- richer NLP-based rewriting assistant
- interview prep suggestions based on detected skill gaps
