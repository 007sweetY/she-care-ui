# SheCare UI

SheCare UI is a React + Vite frontend for a women's wellness application. The project includes authentication and onboarding screens along with wellness-focused pages such as cycle tracking, symptoms, yoga, diet planning, and a dashboard experience.

## Features

- Sign up and login flows
- OTP verification and password creation
- Profile setup onboarding
- Dashboard with mood, progress, and quick actions
- Dedicated pages for cycle tracking, symptoms, yoga, and diet planning
- API integration for signup, login, and profile completion

## Tech Stack

- React 19
- Vite 7
- React Router DOM
- Axios
- Framer Motion
- Tailwind/PostCSS
- CSS Modules

## Project Structure

```text
SheCare/
|-- public/
|-- src/
|   |-- api/
|   |-- assets/
|   |-- fonts/
|   |-- pages/
|   |-- services/
|   |-- styles/
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- package.json
`-- vite.config.js
```

## Routes

The app currently exposes these main routes:

- `/signup`
- `/login`
- `/verify-otp`
- `/createPassword`
- `/profile-setup`
- `/dashboard`
- `/cycle`
- `/symptoms`
- `/diet-plan`
- `/yoga`

The root route `/` redirects to `/signup`.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## API Configuration

The frontend is configured to call a backend API from:

```text
https://localhost:5001/api
```

This base URL is defined in `src/services/api.js`. Make sure the backend server is running and CORS is configured correctly before testing auth-related flows.

## Available Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint

## Notes

- Authentication data is partially persisted with `localStorage` when a JWT token is returned by the backend.
- The UI uses CSS Modules for page-level styling.
- Some API logic also references `src/api/axois.jsx`, so backend integration should be kept in sync across service files.

## Future Improvements

- Add environment-based API configuration
- Add form validation and better error handling across all screens
- Add tests for routing and service logic
- Improve accessibility and responsive polish
