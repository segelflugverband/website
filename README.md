# SFVS Website 🚀

This repository contains the complete codebase for the SFVS website, featuring a modern **Next.js** frontend and a **Strapi v5** headless CMS backend.

## 🏗 Architecture

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS, `next-intl` for i18n routing.
- **Backend**: Strapi CMS v5.
- **Database**: PostgreSQL (running via Docker).

---

## 🛠 Getting Started (Local Development)

To run this project locally, you will need to run three things simultaneously: the PostgreSQL database, the Strapi backend, and the Next.js frontend.

### Prerequisites

- Node.js (v20+ recommended)
- Docker & Docker Compose
- NPM

### 1. Start the Database

The project uses Docker to quickly spin up a PostgreSQL instance.

```bash
# In the root directory (sfvs/)
docker-compose up -d
```

_(This starts the database on port 5432 in the background)._

### 2. Setup & Start the Strapi Backend

The backend serves the API and the Admin panel.

```bash
cd backend

# Install dependencies
npm install

# Create your local .env file
cp .env.example .env

# Start the Strapi server
npm run dev
```

Strapi is now running at **http://localhost:1337**.

- Go to [http://localhost:1337/admin](http://localhost:1337/admin) to create your first admin user.
- **Crucial Step**: Once logged in, go to **Settings → API Tokens**. Create a new token, set its type to **Read-only**, and copy the token string. You will need this for the frontend!

### 3. Setup & Start the Next.js Frontend

Open a **new** terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Create your local environment file
cp .env.example .env.local
```

Now, open `.env.local` and paste the API token you generated in Strapi:

```env
STRAPI_API_TOKEN=your_copied_token_here
```

Finally, start the frontend development server:

```bash
npm run dev
```

The website is now running at **http://localhost:3000**!

---

## ✍️ Content Editing Workflow

1. All pages, navigation links, and translations are managed inside Strapi.
2. The homepage expects an **empty slug** (or `home`).
3. Internal links (like header navigation items) should NOT include the locale prefix.
   - Good: `/ausbildung`
   - Bad: `/de/ausbildung`
4. The Next.js frontend fetches the content statically during build, but in `dev` mode it fetches dynamically.
