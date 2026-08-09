# PM / Business Analyst Portfolio — Fully Dynamic MERN Site

A creative-but-clean, animated portfolio site for a Product Manager / Business
Analyst, built on MongoDB, Express, React and Node. Home, About, Work and
Contact pages are **not hard-coded** — every page is just an ordered list of
"sections" stored in the database, and an admin panel lets you add, edit,
reorder, hide, or delete any section, case study, testimonial, or nav/footer
detail without touching code.

## How the "fully dynamic" system works

- A `Section` document has a `page` (home/about/work/contact), a `type`
  (hero, textImage, stats, cards, timeline, testimonials, workGrid, cta,
  contactForm, richText), an `order`, a `visible` flag, and a free-form
  `content` object.
- The React app fetches the visible sections for a page and renders each one
  through `SectionRenderer.jsx`, which maps `type` → the matching React
  component.
- The admin panel's Page Editor builds its edit form for a section purely
  from a config file (`client/src/config/sectionFields.js`) — so every field
  you see in the admin form is genuinely wired to what's rendered publicly.
- Case studies (`WorkItem`), testimonials, contact messages and global site
  settings (nav links, logo, footer, socials) are separate collections with
  their own admin screens, all protected by JWT admin login.

**To add a brand-new kind of section** (e.g. a "FAQ" block): add its shape to
`SECTION_CONFIG` in `client/src/config/sectionFields.js`, add a matching
value to `Section`'s `type` enum in `server/models/Section.js`, build a
`FaqSection.jsx` component, and register it in `SectionRenderer.jsx`. No
other code changes needed — the admin form appears automatically.

## Tech stack

- **Frontend:** React 18 (Vite), React Router, Tailwind CSS, Framer Motion, lucide-react icons
- **Backend:** Node.js, Express, MongoDB with Mongoose, JWT auth, Multer for image uploads

## Project structure

```
pm-portfolio/
├── server/            Express API
│   ├── models/        Mongoose schemas (Section, WorkItem, Testimonial, SiteSettings, ContactMessage, Admin)
│   ├── controllers/    Route handlers
│   ├── routes/         Express routers
│   ├── middleware/     JWT auth + image upload (multer)
│   ├── seed/seed.js     Populates starter content
│   └── server.js        Entry point
└── client/            React app
    └── src/
        ├── components/sections/   The 10 public section components
        ├── components/admin/      Reusable admin form pieces (config-driven)
        ├── pages/                 Home, About, Work, WorkDetail, Contact
        ├── pages/admin/           Admin panel screens
        └── config/sectionFields.js  Defines every section type's edit form
```

## 1. Prerequisites

- Node.js 18+ and npm
- A MongoDB database — either:
  - **Local MongoDB:** install it from mongodb.com/try/download/community, then run `mongod`
  - **MongoDB Atlas (free, no local install):** create a free cluster at mongodb.com/atlas, add a database user, allow your IP, and copy the connection string

## 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env`:

```
MONGO_URI=mongodb://127.0.0.1:27017/pm-portfolio        # or your Atlas connection string
JWT_SECRET=some_long_random_string
PORT=5000
CLIENT_URL=http://localhost:5173
ADMIN_NAME=Your Name
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe123!
```

Seed the database with starter content and your admin login:

```bash
npm run seed
```

Start the API:

```bash
npm run dev
```

The API runs at `http://localhost:5000`. Check `http://localhost:5000/api/health`.

## 3. Frontend setup

In a second terminal:

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

The site runs at `http://localhost:5173`.

## 4. Log in to the admin panel

Go to `http://localhost:5173/admin/login` and sign in with the
`ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `server/.env` (or whatever you
ran `npm run seed` with). From there you can:

- **Home / About / Work / Contact pages** — add, reorder, hide, edit, or
  delete any section
- **Case studies** — full CRUD, with cover image, metrics, tags, and a
  "feature on homepage" toggle
- **Testimonials** — CRUD + show/hide
- **Messages** — everything submitted through the public Contact form
- **Site settings** — logo, nav links, footer, social links, contact info

## 5. Customizing the starter content

Everything the seed script creates (bio, case studies, testimonials, nav
links) is just placeholder copy for a fictional "Alex Rivera" — edit it
directly from the admin panel, or edit `server/seed/seed.js` and re-run
`npm run seed` (this wipes and recreates content, but leaves nothing else on
your machine touched).

## 6. Deployment notes

- **Backend:** deploy `server/` to any Node host (Render, Railway, Fly.io,
  a VPS, etc.) with your production `MONGO_URI`, `JWT_SECRET`, and
  `CLIENT_URL` set as environment variables. Uploaded images are stored on
  local disk under `server/uploads` — for production, point this at a
  persistent volume or swap the upload middleware for S3/Cloudinary.
- **Frontend:** run `npm run build` in `client/` and deploy the `dist/`
  folder to any static host (Vercel, Netlify, etc.), with `VITE_API_URL`
  pointing at your deployed backend.
- Change `JWT_SECRET` and the seeded admin password before deploying
  anywhere public.
