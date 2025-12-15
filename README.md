# Anton Langbruttig Portfolio

A personal portfolio website built from scratch featuring a retro-futuristic CRT monitor aesthetic with synchronized boot animations and vintage visual effects.

🔗 **Live Site:** [antonlangbruttig.com](https://antonlangbruttig.com)

## Features

- **CRT Boot Animation** — Simulated monitor power-on sequence with static noise, screen flicker, and scanline effects
- **Custom Animation System** — Built with `requestAnimationFrame` for frame-precise timing, with session caching so animation only plays once
- **SVG Line-Draw Animations** — Synchronized border animations during boot sequence
- **Typewriter Text Effect** — Dynamic text reveal with blinking cursor
- **CRT Visual Effects** — CSS-based scanlines, RGB shift, and screen glow
- **Dark/Light Theme Toggle** — Switch between dark mode and background image
- **Fully Responsive** — Separate optimized experiences for mobile, tablet, and desktop
- **Serverless Contact Form** — AWS SES integration with Redis rate limiting (3 requests/minute)
- **Auto-Deploy Pipeline** — GitHub to AWS Amplify CI/CD

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, Custom CSS
- **Fonts:** VT323 (Google Fonts) for retro terminal aesthetic
- **Icons:** Iconify
- **Email:** AWS SES (Lambda)
- **Rate Limiting:** Redis (ioredis)
- **Hosting:** AWS Amplify
- **CI/CD:** GitHub Actions → AWS Amplify

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata, providers
│   ├── page.tsx            # Home page with intro animation
│   ├── bio/                # Bio page
│   ├── projects/           # Projects listing and detail pages
│   ├── skills/             # Skills page
│   └── contact/            # Contact form page
├── components/
│   ├── background.tsx      # Theme-aware background wrapper
│   ├── view-window.tsx     # Main CRT monitor frame component
│   ├── side-nav.tsx        # Desktop sidebar navigation
│   ├── top-nav.tsx         # Tablet/mobile top navigation
│   └── header-mobile.tsx   # Mobile hamburger menu (Framer Motion)
├── contexts/
│   ├── ThemeContext.tsx    # Dark/light mode state
│   └── MobileMenuContext.tsx
├── utils/
│   ├── animation.js        # Animation sequence controller
│   ├── menu-item.js        # Navigation menu item component
│   └── rateLimiter.ts      # Redis rate limiting for contact form
├── styles/
│   └── globals.css         # CRT effects, animations, Tailwind
├── constants/              # Navigation items
├── types.tsx               # TypeScript type definitions
├── amplify.yml             # AWS Amplify build config
└── lambda.js               # Serverless function for contact form
```

## Key Technical Features

### Animation System (`utils/animation.js`)
Controls the boot sequence timing with session caching:
1. Line draw animation (SVG borders)
2. Static noise effect
3. Screen flicker
4. Content fade-in with typewriter effect
5. **Caches animation state** — only plays on first visit, instant load on navigation

### Rate Limiting (`utils/rateLimiter.ts`)
Redis-based protection for the contact form:
- 3 requests per minute per IP
- Automatic expiration window
- Prevents spam submissions

### CRT Effects (`styles/globals.css`)
Pure CSS visual effects:
- Scanline overlay with gradient
- RGB color shift
- Screen glow and flicker animations
- Static noise animation

### View Window (`components/view-window.tsx`)
The main CRT monitor frame that wraps all page content with:
- Animated border on load
- Scanline overlay
- Screen glow effect
- Back navigation for nested pages

### Responsive Breakpoints
Custom Tailwind breakpoints optimized for the CRT aesthetic:
- `sm`: 0px+ (mobile)
- `md`: 980px+ (tablet)
- `lg`: 1267px+ (desktop)
- `xl`: 1354px+ (large desktop)

## Running Locally

```bash
# Clone the repo
git clone https://github.com/AntonLangbruttig/Portfolio.git
cd Portfolio

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env.local
# Add your AWS and Redis credentials

# Run development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

The site auto-deploys to AWS Amplify on push to `main` branch. Build configuration is in `amplify.yml`.

## License

This project is public for portfolio/demonstration purposes only. The code is not licensed for reuse, modification, or distribution.
