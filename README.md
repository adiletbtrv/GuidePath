# GuidePath Frontend

GuidePath is a comprehensive study abroad mentorship platform connecting prospective international students with university mentors for guidance, advice, and networking.

This repository contains the production-ready frontend web application.

<img width="1903" height="907" alt="image" src="https://github.com/user-attachments/assets/55195e13-f741-4ab5-9a05-f5b74abe767a" />
<img width="1907" height="795" alt="image" src="https://github.com/user-attachments/assets/5029a63b-c1d5-4436-b7e0-ceee16a05cd1" />
<img width="1905" height="817" alt="image" src="https://github.com/user-attachments/assets/2d55c287-71d1-468a-bd1b-04179b36b4e2" />
<img width="1919" height="693" alt="image" src="https://github.com/user-attachments/assets/d12cf89f-a8b6-47b4-a7fc-4cb3d5b2e136" />

<img width="1909" height="896" alt="image" src="https://github.com/user-attachments/assets/7d61d464-c029-457a-83b9-a4c761659d3d" />
<img width="1905" height="901" alt="image" src="https://github.com/user-attachments/assets/837a6635-8941-45b6-ab8a-83bc650d842c" />

<img width="1909" height="903" alt="image" src="https://github.com/user-attachments/assets/d3f0e79b-a915-4175-95a6-66af845d66b4" />

## System Architecture & Tech Stack

This project is built using modern frontend architecture optimized for performance, type safety, and maintainability:

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v3 + CSS Custom Properties for Theming
- **UI Components**: Headless primitives wrapped with Radix UI patterns + Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query v5)
- **Forms & Validation**: React Hook Form + Zod
- **API Client**: Axios (Typed)
- **Package Manager**: npm

## Project Structure

```
guidepath/
├── public/                 # Static assets (images, fonts, etc)
├── src/
│   ├── app/                # Next.js App Router (pages and layouts)
│   ├── components/
│   │   ├── ui/             # Reusable design system components
│   │   ├── layout/         # Structural components (Navbar, Footer)
│   │   ├── landing/        # Home page sections
│   │   ├── explore/        # Sidebar filters and data grids
│   │   ├── profile/        # Detail and overview views
│   │   └── dashboard/      # Authenticated user dashboard
│   ├── lib/
│   │   ├── api/            # Axios client and SDK wrappers
│   │   ├── hooks/          # React Query hook wrappers
│   │   ├── store/          # Zustand global stores
│   │   └── utils/          # Formatting and UI utility functions
│   ├── types/              # Global TypeScript definitions
│   └── providers/          # Context providers for the application shell
├── tailwind.config.ts      # Tailwind and theme configuration
└── vercel.json             # Vercel deployment configuration
```

## Getting Started

### Prerequisites

Ensure you have Node.js 18+ and `npm` installed.

### Environment Setup

1. Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```
2. Configure the required environment variables:
- `NEXT_PUBLIC_API_URL`: The base URL pointing to the GuidePath backend services.

### Development

Install the project dependencies and start the development server:

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## Deployment

The application is configured for seamless deployment on Vercel.

1. Connect the GitHub repository to your Vercel account.
2. Vercel will automatically detect the Next.js framework.
3. Add the required environment variables (`NEXT_PUBLIC_API_URL`) in the Vercel project settings.
4. Deploy.

The `vercel.json` file is included in the repository to enforce best-practice security headers (X-Frame-Options, X-Content-Type-Options) and optimize API request rewriting. Next.js configurations in `next.config.ts` are set to hide React DevTools and Next.js identification headers in production for enhanced security.
