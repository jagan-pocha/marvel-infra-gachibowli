# Marvel Infra Gachibowli — Website

Premium real estate landing website for **Marvel Infra Gachibowli** — a single-tower 3 BHK residential development beside the Gachibowli Flyover, Hyderabad.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 + CSS Variables |
| Animations | Framer Motion |
| Routing | React Router v6 |
| Global State | Zustand (localStorage persisted) |
| Icons | Lucide React |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar/         # Fixed white header, theme toggle
│   ├── Footer/         # Footer with SVG logo
│   ├── Logo/           # Inline SVG logo (theme-aware)
│   ├── QABot/          # Floating Q&A chatbot (decision tree)
│   └── ui/             # GlassCard, Card3D, SectionTitle, CounterStat
├── context/
│   └── ThemeContext.jsx # Dark/light theme (localStorage persisted)
├── pages/
│   ├── Home/           # Hero video, stats, highlights, location
│   ├── About/          # Project overview, developer profile
│   ├── Amenities/      # 58 amenities with category filter
│   ├── FloorPlans/     # Units, PDF preview modal, price calculator
│   ├── Gallery/        # Image gallery with lightbox
│   └── Contact/        # EOI form + map embed
├── store/
│   └── appStore.js     # Zustand store — EOI submissions, preferences
├── tokens/
│   └── theme.js        # Single source of truth for all colors & spacing
└── index.css           # CSS variables (:root = light, .dark = dark)
```

### Design Token System

All colors, shadows, and gradients live in **one place** — change once, update everywhere:

- **`src/tokens/theme.js`** — master token object (JS)
- **`src/index.css`** — CSS custom properties (consumed by Tailwind + raw CSS)
- **`tailwind.config.js`** — Tailwind colors reference the CSS variables

**Brand palette** (from logo):

| Token | Light | Dark |
|---|---|---|
| Accent | `#0ab83e` (green) | `#1ded54` (parrot green) |
| Secondary | `#0099d4` (blue) | `#00b7fb` (sky blue) |
| Background | `#FFFFFF` | `#020814` |
| Text | `#000e4b` (navy) | `#e8f0ff` |

---

## Local Development

### Prerequisites

| Tool | Version | Link |
|---|---|---|
| Node.js | 18+ | https://nodejs.org |
| npm | 9+ | bundled with Node |
| Git | any | https://git-scm.com |

### Setup

```bash
# 1. Clone
git clone https://github.com/jagan-pocha/marvel-infra-gachibowli.git
cd marvel-infra-gachibowli

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# Opens at http://localhost:5173
```

### Scripts

```bash
npm run dev      # Dev server with hot-reload
npm run build    # Production build → /dist
npm run preview  # Preview production build locally (http://localhost:4173)
```

---

## Production Build

```bash
npm run build
```

Outputs static files to `/dist`. Serve from any static host.

Test production build locally:

```bash
npm run preview
```

---

## Deployment

### Vercel (recommended — zero config)

```bash
npm i -g vercel
vercel --prod
```

Or connect the GitHub repo in [vercel.com](https://vercel.com) for auto-deploy on push.

**Vercel settings:**

| Field | Value |
|---|---|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

---

### Netlify

```bash
npm i -g netlify-cli
npm run build
netlify deploy --dir=dist --prod
```

Add `netlify.toml` at project root for SPA routing:

```toml
[[redirects]]
  from   = "/*"
  to     = "/index.html"
  status = 200
```

---

### Docker / Pod / Kubernetes

#### Dockerfile

```dockerfile
# Stage 1 — Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --frozen-lockfile
COPY . .
RUN npm run build

# Stage 2 — Serve with nginx
FROM nginx:1.25-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
RUN echo 'server { \
  listen 80; \
  root /usr/share/nginx/html; \
  index index.html; \
  location / { try_files $uri $uri/ /index.html; } \
  gzip on; \
  gzip_types text/plain text/css application/javascript; \
}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Build & run locally

```bash
docker build -t marvel-infra-web:latest .
docker run -p 8080:80 marvel-infra-web:latest
# → http://localhost:8080
```

#### Push to a registry

```bash
docker tag marvel-infra-web:latest your-registry/marvel-infra-web:latest
docker push your-registry/marvel-infra-web:latest
```

#### Kubernetes manifest

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: marvel-infra-web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: marvel-infra-web
  template:
    metadata:
      labels:
        app: marvel-infra-web
    spec:
      containers:
        - name: web
          image: your-registry/marvel-infra-web:latest
          ports:
            - containerPort: 80
          resources:
            requests: { cpu: "100m", memory: "128Mi" }
            limits:   { cpu: "250m", memory: "256Mi" }
---
apiVersion: v1
kind: Service
metadata:
  name: marvel-infra-web-svc
spec:
  selector:
    app: marvel-infra-web
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP
```

```bash
kubectl apply -f k8s/deployment.yaml
# Port-forward for local testing
kubectl port-forward svc/marvel-infra-web-svc 8080:80
```

---

### GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:

```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

```bash
npm run build && npm run deploy
```

---

## Environment Variables

No required env vars for the static build. To externalize config, create `.env` (do not commit):

```env
VITE_CONTACT_PHONE=+919133311586
VITE_CONTACT_EMAIL=info@marvelinfra.com
```

Access in code: `import.meta.env.VITE_CONTACT_PHONE`

---

## Assets

| File | Purpose |
|---|---|
| `public/images/logo.jpg` | Full brand logo (Navbar + Footer) |
| `public/images/poster.jpg` | Project render image |
| `public/favicon.svg` | Tab icon — gradient M mark, transparent bg |
| `public/Marvel Infra Gachibowli Floor Plans.pdf` | Floor plan PDF (preview + download) |

---

## Key Features

- Dark / Light theme with single-click toggle, persisted across sessions
- Single design token file — change a color once, updates everywhere
- YouTube hero background playing 0:45→2:00 on loop (IFrame API, no controls)
- Floating Q&A bot with decision tree, SVG floor plan previews, no AI dependency
- Floor plan PDF fullscreen preview modal
- Interactive price calculator (slider)
- EOI contact form — validated, submissions stored in Zustand localStorage
- Glassmorphism cards, Card3D mouse-tracking tilt, animated gradient orbs

---

## Project Info

| | |
|---|---|
| Developer | Marvel Infra |
| Led by | Sri P. Krishna Reddy |
| Location | Beside Gachibowli Flyover, Hyderabad, Telangana |
| Sales | +91 91333 11586 |
| Email | info@marvelinfra.com |
| Price | ₹10,999 / Sq.Ft |
| Units | 3 BHK · 1,817 – 3,675 Sq.Ft |

---

© 2026 Marvel Infra. All Rights Reserved.
