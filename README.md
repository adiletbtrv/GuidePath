<div align="center">

# GuidePath

**A Next-Generation Study Abroad Mentorship & Academic Networking Platform**

Connecting prospective international students with verified university mentors for real-world admissions guidance, custom academic roadmaps, and community insights.

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query_v5-FF4154?style=flat-square&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand_v5-443E38?style=flat-square&logo=zustand&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion_12-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![PostHog](https://img.shields.io/badge/PostHog_Analytics-000000?style=flat-square&logo=posthog&logoColor=white)](https://posthog.com/)
[![Vercel](https://img.shields.io/badge/Vercel_Edge-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

<br />

**[Architecture](#-system-architecture)** • **[Engineering Highlights](#-key-architectural--engineering-highlights)** • **[Tech Stack](#-tech-stack)** • **[Project Structure](#-project-structure)** • **[Getting Started](#-getting-started)** • **[Static Analysis](#-static-analysis--type-verification)** • **[Deployment](#-deployment)**

</div>

---

<div align="center">
  <img width="100%" alt="GuidePath Hero & Discovery" src="https://github.com/user-attachments/assets/55195e13-f741-4ab5-9a05-f5b74abe767a" />
</div>

<details>
<summary><b>📸 Click to expand Application UI & Workflow Showcase (6 Screenshots)</b></summary>
<br>

<div align="center">
  <img width="100%" alt="GuidePath Explore & Filtering" src="https://github.com/user-attachments/assets/5029a63b-c1d5-4436-b7e0-ceee16a05cd1" />
  <p align="center"><i>Explore Guides — Multi-dimensional faceted filtering and responsive card grid</i></p>
  <br>
  <img width="100%" alt="GuidePath Mentor Profile" src="https://github.com/user-attachments/assets/2d55c287-71d1-468a-bd1b-04179b36b4e2" />
  <p align="center"><i>Mentor Profile — Tabbed biography, chronological milestones roadmap, and expertise tags</i></p>
  <br>
  <img width="100%" alt="GuidePath Direct Connect" src="https://github.com/user-attachments/assets/d12cf89f-a8b6-47b4-a7fc-4cb3d5b2e136" />
  <p align="center"><i>Community Connection — Direct mentor engagement and Telegram channel bridge</i></p>
  <br>
  <img width="100%" alt="GuidePath Authenticated Dashboard" src="https://github.com/user-attachments/assets/7d61d464-c029-457a-83b9-a4c761659d3d" />
  <p align="center"><i>Authenticated Dashboard — User status tracking, role identification, and community gateway</i></p>
  <br>
  <img width="100%" alt="GuidePath Mobile Filter Drawer" src="https://github.com/user-attachments/assets/837a6635-8941-45b6-ab8a-83bc650d842c" />
  <p align="center"><i>Mobile Viewport — Spring-animated touch filter drawer with body scroll locking</i></p>
  <br>
  <img width="100%" alt="GuidePath Dark Mode" src="https://github.com/user-attachments/assets/d3f0e79b-a915-4175-95a6-66af845d66b4" />
  <p align="center"><i>Design System — HSL theme engine with zero-FOUC dark/light mode switching</i></p>
</div>

</details>

---

## 🏛 System Architecture

The following diagram illustrates the unidirectional data flow, reactive state containers, server cache management, transport abstraction, and client telemetry pipeline:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             CLIENT BROWSER / USER                                │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                   NEXT.JS 16 APP ROUTER (REACT 19 SERVER/CLIENT)                 │
│  ┌───────────────────────┐ ┌────────────────────────┐ ┌───────────────────────┐  │
│  │ Landing & Discovery   │ │ Search & Exploration   │ │ Dashboard & Profile   │  │
│  │  app/page.tsx         │ │  app/explore/page.tsx  │ │  app/dashboard/       │  │
│  │  Hero, FeaturedGuides │ │  FilterSidebar, Grid   │ │  app/profile/[id]/    │  │
│  └───────────────────────┘ └────────────────────────┘ └───────────────────────┘  │
└────────────┬───────────────────────────┬───────────────────────────┬─────────────┘
             │                           │                           │
             ▼                           ▼                           ▼
┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
│     UI & MOTION         │ │   CLIENT STATE (ZUSTAND)│ │  TELEMETRY (POSTHOG)    │
│  ┌───────────────────┐  │ │  ┌───────────────────┐  │ │  ┌───────────────────┐  │
│  │ Framer Motion 12  │  │ │  │ authStore (Persist│  │ │  │ PostHogProvider    │  │
│  │ Spring Physics    │  │ │  │ Token & User Info)│  │ │  │ Route Pageviews    │  │
│  ├───────────────────┤  │ │  ├───────────────────┤  │ │  ├───────────────────┤  │
│  │ Tailwind CSS 3.4  │  │ │  │ filterStore (URL) │  │ │  │ Analytics Events   │  │
│  │ CSS Custom Props  │  │ │  ├───────────────────┤  │ │  │ (Search, Funnel)   │  │
│  ├───────────────────┤  │ │  │ toastStore (Queue)│  │ │  └───────────────────┘  │
│  │ Radix UI Primitives│ │ └───────────────────┘  │ └─────────────────────────┘
└─────────────────────────┘ └────────────┬────────────┘
                                         │
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                 SERVER STATE & CACHE LAYER (TANSTACK QUERY V5)                   │
│  ┌────────────────────────────────────────────────────────────────────────────┐  │
│  │  useGuides() • useGuide(id) • useConnections() • useRequestConnection()    │  │
│  │  Cache Policies (staleTime: 60s, Single Retry, Automated Invalidation)     │  │
│  └─────────────────────────────────────┬──────────────────────────────────────┘  │
└────────────────────────────────────────┼─────────────────────────────────────────┘
                                         │
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                    API TRANSPORT & DUAL-MODE DISPATCH LAYER                      │
│  ┌────────────────────────────────────────────────────────────────────────────┐  │
│  │  Axios Client (Interceptors: Bearer Auth Injection, 401 Session Handling)  │  │
│  └───────────────────┬─────────────────────────────────────┬──────────────────┘  │
│                      │ [NEXT_PUBLIC_API_URL set]           │ [Fallback / Local]  │
│                      ▼                                     ▼                     │
│  ┌────────────────────────────────────────┐  ┌────────────────────────────────┐  │
│  │  Production Backend REST API           │  │  Deterministic Mock Gateway    │  │
│  │  /api/guides • /api/connections        │  │  Simulated Latency (600-800ms) │  │
│  └────────────────────────────────────────┘  │  Local In-Memory Mutations     │  │
│                                              └────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Key Architectural & Engineering Highlights

- **Decoupled Dual-Mode Transport Layer & Offline Mock Sandbox**:
  API services in `src/lib/api/guides.ts` and `src/lib/api/connections.ts` implement transparent runtime duality. When `NEXT_PUBLIC_API_URL` is omitted, requests are fulfilled by a deterministic mock engine that simulates realistic network latency (600–800ms) and persists connection mutations in memory. This enables zero-backend local execution, rapid UI iteration, and isolated CI testing without mock servers.

- **Bidirectional Deep-Link State Synchronization**:
  The faceted search engine in `src/components/explore/FilterSidebar.tsx` and `src/lib/store/filterStore.ts` bridges Next.js App Router query parameters (`useSearchParams`) with Zustand store state. Filters update the browser URL via shallow navigation (`router.push(..., { scroll: false })`), ensuring shareable search URLs, browser history preservation, and immediate state restoration on page reloads without unnecessary component remounts.

- **Concurrent-Safe Event Deduplication & Telemetry Latching**:
  Telemetry tracking in `src/components/explore/GuideGrid.tsx` utilizes a ref-based execution latch (`trackedRef`) to guarantee idempotent PostHog `search_executed` event dispatches. This prevents redundant analytics calls during React 19 Concurrent Mode renders, filter transitions, and dynamic data re-fetches.

- **Hardened Edge Security Interceptors & Production Obfuscation**:
  The Axios instance in `src/lib/api/client.ts` centralizes Bearer token injection from `zustand/persist` state and executes automated session invalidation on `401 Unauthorized` responses. The edge perimeter is hardened via `vercel.json` with strict HTTP headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection`), while `next.config.ts` strips framework identification headers (`poweredByHeader: false`) and suppresses production source maps to shield proprietary code in developer tools.

---

## 🛠 Tech Stack

| Layer / Domain | Technologies / Version | Description / Purpose |
| :--- | :--- | :--- |
| **Framework & Core** | `Next.js 16.1.6` • `React 19.2.3` | App Router architecture, React Server Components, Suspense boundaries, and zero-bundle layouts. |
| **Language & Typing** | `TypeScript 5.x` | Strict type checking, domain models, generic API wrappers, and type-safe schema resolvers. |
| **Server State & Caching** | `@tanstack/react-query 5.90.21` | Declarative asynchronous queries, optimistic mutations, automatic query cache invalidation. |
| **Client State Management** | `Zustand 5.0.11` | Atomic stores with `persist` middleware for session auth, multi-facet filtering, and toast queues. |
| **Styling & Design System** | `Tailwind CSS 3.4.19` • `next-themes` | Utility-first CSS engine, HSL CSS Custom Properties, and zero-FOUC dark/light theme switching. |
| **Motion & Micro-Interactions** | `Framer Motion 12.34.3` | Layout animations, spring transitions, morphing navigation pills, and interactive tab switches. |
| **Form Management & Schema** | `React Hook Form 7.71.2` • `Zod 4.3.6` | High-performance uncontrolled form inputs paired with type-inferred validation schemas. |
| **Network & Transport** | `Axios 1.13.5` | Centralized HTTP client configured with Bearer token injection, request logging, and 401 error handlers. |
| **Telemetry & Analytics** | `PostHog JS 1.355.0` | Client-side privacy-first telemetry with route-change tracking and customized conversion funnels. |
| **Icons & Design Tokens** | `Lucide React 0.575.0` | Accessible tree-shakeable SVG icon primitives. |
| **Edge Deployment & Hosting** | `Vercel` | Edge network delivery, HTTP response header hardening, and API rewrite routing. |

---

## 📁 Project Structure

```
guidepath/
├── public/                         # Static assets and vector illustrations
│   ├── favicon.ico                 # Application favicon
│   └── placeholder.svg             # Asset fallback graphics
├── src/
│   ├── app/                        # Next.js App Router (Pages, Layouts, Routing boundaries)
│   │   ├── auth/                   # Authentication route group
│   │   │   ├── login/page.tsx      # Sign-in page with credential authentication
│   │   │   └── signup/page.tsx     # Sign-up page with role selection (Seeker / Guide)
│   │   ├── dashboard/page.tsx      # Authenticated user dashboard & community portal
│   │   ├── explore/page.tsx        # Guide discovery page with Suspense loading boundaries
│   │   ├── profile/[id]/page.tsx   # Dynamic mentor profile route with tabbed views
│   │   ├── globals.css             # HSL color variables, typography, and glass utilities
│   │   ├── icon.svg                # Vector brand application icon
│   │   ├── layout.tsx              # Root HTML shell with provider tree & font injection
│   │   └── page.tsx                # Marketing landing page with modular sections
│   ├── components/                 # Reusable component architecture
│   │   ├── explore/                # Discovery & filter components
│   │   │   ├── FilterSidebar.tsx   # Responsive desktop sidebar and mobile filter drawer
│   │   │   └── GuideGrid.tsx       # Animated grid with Skeleton loaders and empty states
│   │   ├── landing/                # Conversion-oriented landing sections
│   │   │   ├── CTASection.tsx      # Call-to-action banner
│   │   │   ├── FeaturedGuides.tsx  # Curated mentor highlight section
│   │   │   ├── Hero.tsx            # Hero value proposition with quick-action links
│   │   │   └── HowItWorks.tsx      # 3-step platform journey visualizer
│   │   ├── layout/                 # Layout structure components
│   │   │   ├── Footer.tsx          # Site footer with social links & copyright
│   │   │   ├── Navbar.tsx          # Glassmorphic header with spring-animated active pills
│   │   │   └── Sidebar.tsx         # Collapsible dashboard navigation
│   │   ├── profile/                # Mentor profile detail components
│   │   │   ├── ProfileCard.tsx     # Mentor overview card with status badges and flags
│   │   │   └── ProfileDetail.tsx   # Tabbed view (Bio, Roadmap Milestones, Expertise)
│   │   └── ui/                     # Primitives & design system elements
│   │       ├── Avatar.tsx          # Resilient avatar with image fallback handling
│   │       ├── Badge.tsx           # Semantic status and tag pills
│   │       ├── Button.tsx          # Polymorphic button primitive with variant styling
│   │       ├── Input.tsx           # Accessible form input with focus ring tokens
│   │       ├── Logo.tsx            # Dynamic SVG brand mark
│   │       ├── Modal.tsx           # Accessible dialog overlay with Framer Motion transitions
│   │       ├── Skeleton.tsx        # Pulse-animated loading placeholder primitive
│   │       ├── ThemeToggle.tsx     # Theme switcher with smooth icon morphing
│   │       └── Toast.tsx           # Global notification toast container and render items
│   ├── lib/                        # Core utilities, API clients, stores, and hooks
│   │   ├── analytics/              # Telemetry tracking modules
│   │   │   └── events.ts           # Type-safe PostHog custom funnel event definitions
│   │   ├── api/                    # HTTP and data transport layer
│   │   │   ├── client.ts           # Configured Axios instance with request/response interceptors
│   │   │   ├── connections.ts      # Connection request endpoints with dual-mode mock fallback
│   │   │   └── guides.ts           # Mentor query endpoints with simulated latency filtering
│   │   ├── hooks/                  # Custom React hooks & React Query wrappers
│   │   │   ├── useConnections.ts   # TanStack Query hook for connection requests and mutations
│   │   │   └── useGuides.ts        # TanStack Query hooks for mentor listing and detail retrieval
│   │   ├── mock/                   # In-memory deterministic mock datasets
│   │   │   └── data.ts             # Comprehensive mentor profiles, roadmaps, and connections
│   │   ├── store/                  # Zustand reactive state stores
│   │   │   ├── authStore.ts        # Persistent authentication store with local storage sync
│   │   │   ├── filterStore.ts      # Multi-facet search and filter state
│   │   │   └── toastStore.ts       # Global notification queue and auto-dismiss dispatcher
│   │   ├── utils/                  # Shared helper functions
│   │   │   ├── cn.ts               # ClassName merge utility (`clsx` + `tailwind-merge`)
│   │   │   └── formatters.ts       # Date, string, and number formatting utilities
│   │   └── constants.ts            # Global application constants and external links
│   ├── providers/                  # Client-side React context providers
│   │   ├── PostHogProvider.tsx     # Analytics provider with route-change tracking
│   │   ├── QueryProvider.tsx       # TanStack Query client provider with caching defaults
│   │   └── ThemeProvider.tsx       # `next-themes` dark/light mode context wrapper
│   └── types/                      # TypeScript type declarations and domain models
│       ├── api.ts                  # Query filter contracts and API response envelopes
│       ├── connection.ts           # Mentorship connection data structures
│       ├── guide.ts                # Guide entity, roadmap milestones, and detail schemas
│       ├── message.ts              # Direct messaging contracts
│       └── user.ts                 # User identity and profile contracts
├── .gitignore                      # Git exclusion rules
├── .prettierrc                     # Prettier formatting specifications
├── eslint.config.mjs               # ESLint configuration with Next.js rules
├── next.config.ts                  # Next.js build configuration and header hardening
├── package.json                    # Project manifests, scripts, and runtime dependencies
├── pnpm-lock.yaml                  # Deterministic dependency lockfile
├── pnpm-workspace.yaml             # Workspace boundary definition
├── postcss.config.mjs              # PostCSS plugins configuration
├── tailwind.config.ts              # Tailwind CSS theme extensions and design tokens
├── tsconfig.json                   # TypeScript compiler options (Strict mode, path aliases)
└── vercel.json                     # Edge deployment rules, security headers, and API rewrites
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.17.0+` (or `v20.x` LTS recommended)
- **Package Manager**: `npm`, `pnpm` (`v9.x`), or `yarn`

### Environment Configuration

Create a `.env.local` file in the project root:

```bash
# Backend REST API URL (leave blank to run in full offline mock sandbox mode)
NEXT_PUBLIC_API_URL=http://localhost:3001

# PostHog Telemetry (Optional)
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Installation & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adiletbtrv/GuidePath.git
   cd GuidePath
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or with pnpm:
   pnpm install
   ```

3. **Launch the development server:**
   ```bash
   npm run dev
   # or with pnpm:
   pnpm dev
   ```

4. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔍 Static Analysis & Type Verification

GuidePath utilizes TypeScript strict typing and ESLint Next.js standards to guarantee code correctness, type safety, and runtime stability.

Run the static analysis checks locally:

```bash
# 1. Type verification without emitting compilation artifacts
npx tsc --noEmit

# 2. Code formatting and linting rules inspection
npm run lint

# 3. Production bundle compilation and asset optimization check
npm run build
```

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. Connect the GitHub repository to [Vercel](https://vercel.com).
2. Configure the build environment:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (or `pnpm build`)
   - **Output Directory**: `.next`
3. Add environment variables (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`).
4. Click **Deploy**.

### Production Hardening

- **Security Headers**: `vercel.json` injects `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `X-XSS-Protection: 1; mode=block` across all routes.
- **Server Identity Masking**: `next.config.ts` explicitly sets `poweredByHeader: false` to strip the `X-Powered-By: Next.js` fingerprint and disables client-accessible production source maps (`productionBrowserSourceMaps: false`).

---

## 📜 License & Author

Distributed under the **MIT License**. See `LICENSE` for more information.

**Author:** [Adilet Batyrov](https://github.com/adiletbtrv) • Connect on [LinkedIn](https://www.linkedin.com/in/adilet-batyrov/)
