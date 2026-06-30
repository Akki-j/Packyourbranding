# Pack Your Branding

A production-ready web application for a custom bag and packaging manufacturing company. Built with React + TypeScript (frontend) and Express + TypeScript (backend).

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, React Router
- **Backend:** Express.js, TypeScript
- **Lead Storage:** Google Sheets API (Service Account)
- **Email:** Resend
- **Deployment:** Render

## Architecture

```
Frontend (React) --> Express API --> Google Sheets
                        |
                        v
                   Email Notification (Resend)
```

---

## Project Structure

```
pack-your-branding2/
├── client/                     # React + Vite frontend
│   ├── public/assets/          # Static images (copied from original)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StatsCounter.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── TestimonialSlider.tsx
│   │   │   ├── GalleryGrid.tsx
│   │   │   ├── QuoteForm.tsx
│   │   │   ├── ContactInfo.tsx
│   │   │   ├── WhatsAppButton.tsx
│   │   │   └── ScrollReveal.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Gallery.tsx
│   │   │   └── Contact.tsx
│   │   ├── layouts/
│   │   │   └── MainLayout.tsx
│   │   ├── hooks/
│   │   │   ├── useCounterAnimation.ts
│   │   │   └── useQuoteForm.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── styles/
│   │   │   ├── style.css          # Exact copy of original
│   │   │   └── animations.css     # Exact copy of original
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── server/                     # Express + TypeScript backend
│   ├── src/
│   │   ├── controllers/
│   │   │   └── leadController.ts
│   │   ├── routes/
│   │   │   └── leadRoutes.ts
│   │   ├── services/
│   │   │   ├── googleSheetsService.ts
│   │   │   └── emailService.ts
│   │   ├── middleware/
│   │   │   ├── validate.ts
│   │   │   └── errorHandler.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── sanitize.ts
│   │   ├── app.ts
│   │   └── index.ts
│   ├── tsconfig.json
│   └── package.json
│
├── .gitignore
├── render.yaml                 # Render deployment config
└── README.md
```

---

## Local Development

### Prerequisites

- Node.js 18+
- npm

### 1. Clone and Install

```bash
cd pack-your-branding2

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 2. Environment Variables

**Server** — copy and fill `server/.env.example`:

```env
PORT=3001
NODE_ENV=development

GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id

RESEND_API_KEY=re_xxxxxxxxxxxx
NOTIFICATION_EMAIL=you@example.com
```

**Client** — copy and fill `client/.env.example`:

```env
VITE_API_URL=http://localhost:3001
```

### 3. Run in Development

Open two terminals:

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

Frontend: http://localhost:5173
Backend API: http://localhost:3001

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/leads` | Submit lead form data |

### POST /api/leads

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "company": "Acme Corp",
  "service": "Luxury Shopping Bags",
  "quantity": "500",
  "message": "Need custom bags",
  "source": "website"
}
```

**Success response (201):**
```json
{
  "success": true,
  "message": "Thank you! We'll get back to you shortly."
}
```

**Validation error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "name", "message": "Name is required" }
  ]
}
```

---

## Google Sheets Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the **Google Sheets API**
4. Go to **IAM & Admin → Service Accounts**
5. Click **Create Service Account**
6. Give it a name (e.g. "pyb-sheets-service")
7. Click **Done**
8. Click on the service account → **Keys** → **Add Key** → **Create New Key** → **JSON**
9. Download the JSON key file
10. Extract these values:
    - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
    - `private_key` → `GOOGLE_PRIVATE_KEY` (keep the newlines as `\n`)
11. Create a Google Sheet with these columns in Row 1:
    - `name`, `email`, `phone`, `company`, `service`, `quantity`, `message`, `source`, `createdAt`
12. Share the sheet with your service account email (Editor role)
13. Copy the Sheet ID from the URL:
    - URL: `https://docs.google.com/spreadsheets/d/1ABCxyz.../edit`
    - Sheet ID: `1ABCxyz...`

---

## Resend Setup

1. Go to [Resend](https://resend.com/) and sign up
2. Create an API key
3. Verify a domain (e.g. `packyourbranding.com`) or use the default `resend.dev` domain for testing
4. Set `RESEND_API_KEY` to your API key
5. Set `NOTIFICATION_EMAIL` to where you want lead notifications sent

---

## Render Deployment

### One-click with render.yaml

The project includes `render.yaml` for infrastructure-as-code deployment.

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click **New → Blueprint**
4. Connect your repository
5. Render will read `render.yaml` and create two services:
   - **pyb-api** — Express backend (Node web service)
   - **pyb-client** — React frontend (Static site)

### Manual Deployment

#### Backend (pyb-api)

1. **New Web Service** → Connect your repo
2. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
3. Add environment variables:
   - `NODE_ENV=production`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
   - `RESEND_API_KEY`
   - `NOTIFICATION_EMAIL`

#### Frontend (pyb-client)

1. **New Static Site** → Connect your repo
2. Settings:
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
3. Add environment variable:
   - `VITE_API_URL=https://pyb-api.onrender.com`

---

## Original Files Preserved

The original static HTML/CSS/JS files remain in the project root for reference. The migration did not modify or delete them.

- `style.css` and `animations.css` are copied exactly into `client/src/styles/`
- All original assets are copied into `client/public/assets/`
- All original `.html` files remain untouched

## Features Preserved

- Animated statistics counters (requestAnimationFrame-based)
- Testimonial auto-slider (5-second interval)
- Scroll reveal animations (IntersectionObserver-based)
- Sticky navbar with scroll effect
- Gallery image hover zoom
- Hero image float animation
- Card glow and button pulse animations
- WhatsApp floating button
- Google Fonts (Inter + Playfair Display)
- Original color scheme, spacing, typography, layout

## Improvements Over Original

- Web3Forms removed — leads stored in your own Google Sheets
- Email notifications via Resend
- TypeScript throughout (type safety)
- Form validation with proper error messages
- Loading/success/error states on form submission
- No duplicate submissions
- Input sanitization (XSS prevention)
- Proper HTTP status codes
- Centralized error handling
- Environment variables for all secrets
- Component-based architecture (no duplicated HTML)
- React Router (fast client-side navigation)
#   P a c k y o u r b r a n d i n g  
 #   P a c k y o u r b r a n d i n g  
 