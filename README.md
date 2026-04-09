# CVision - Resume Analyzer Dashboard
<img width="1697" height="848" alt="image" src="https://github.com/user-attachments/assets/42930a5b-44f2-4448-bd39-f19a45dfddca" />

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

