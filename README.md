# ShambaSync

ShambaSync is a responsive farm onboarding and profile management web application built with React, Vite, and Tailwind CSS. It guides farmers through account registration, a 4-step shamba setup wizard, and a dynamic farm profile view backed by a REST API (`json-server`).

## Features

- **Landing Page (`/`):** Overview of the ShambaSync farm management workflow.
- **Authentication (`/login`, `/register`):** Controlled login and registration forms with global session state managed via `AuthContext` (`useContext`) and `localStorage`.
- **4-Step Farm Onboarding (`/onboarding/:step`):**
  1. **Farm Basics:** Captures farm name, owner details, cascading country/county dropdowns, acreage, and water source.
  2. **Crop Check:** Conditionally captures crop acreage with validation against total farm size.
  3. **Receipt Letterhead:** Customizes business header and contact details with one-click auto-fill.
  4. **Review & Confirm:** Summarizes all inputs, fetches farm coordinates via the Open-Meteo Geocoding API, and saves the profile via `PATCH`.
- **Dynamic Farm Profile (`/farm/:id`):** Fetches and displays the saved shamba profile, sample livestock/crop tag preview, active letterhead, and actions to edit setup (`PATCH`) or delete the account (`DELETE`).

## Tech Stack

- **Frontend:** React, React Router DOM, Tailwind CSS, Lucide React
- **Backend / Mock API:** `json-server` (`database/db.json`)
- **External APIs:** CountriesNow API (locations), Open-Meteo Geocoding API (coordinates)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install