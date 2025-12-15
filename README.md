# Anton Langbruttig Portfolio

A personal portfolio website built from scratch featuring a retro-futuristic CRT monitor aesthetic with synchronized boot animations and vintage visual effects.

🔗 **Live Site:** [antonlangbruttig.com](https://antonlangbruttig.com)

## Features

- **CRT Boot Animation** — Simulated monitor power-on sequence with static noise, screen flicker, and scanline effects
- **Custom Animation System** — Built with `requestAnimationFrame` for frame-precise timing
- **SVG Line-Draw Animations** — Synchronized border animations during boot sequence
- **Typewriter Text Effect** — Dynamic text reveal with blinking cursor
- **CRT Visual Effects** — CSS-based scanlines, RGB shift, and screen glow
- **Dark/Light Theme Toggle** — Switch between dark mode and background image
- **Fully Responsive** — Separate optimized experiences for mobile, tablet, and desktop
- **Serverless Contact Form** — Integrated with AWS SES for email delivery
- **Auto-Deploy Pipeline** — GitHub to AWS Amplify CI/CD

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, Custom CSS
- **Fonts:** VT323 (Google Fonts) for retro terminal aesthetic
- **Icons:** Iconify
- **Email:** AWS SES (Lambda)
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
│   └── header-mobile.tsx   # Mobile hamburger menu
├── contexts/
│   ├── ThemeContext.tsx    # Dark/light mode state
│   └── MobileMenuContext.tsx
├── utils/
│   └── animation.ts        # Animation sequence controller
├── styles/
│   └── globals.css         # CRT effects, animations, Tailwind
├── constants/              # Navigation items
├── amplify.yml             # AWS Amplify build config
└── lambda.js               # Serverless function for contact form
```

## Key Components

### Animation System (`utils/animation.ts`)
Controls the boot sequence timing:
1. Line draw animation (SVG borders)
2. Static noise effect
3. Screen flicker
4. Content fade-in with typewriter effect

### View Window (`components/view-window.tsx`)
The main CRT monitor frame that wraps all page content with:
- Animated border on load
- Scanline overlay
- Screen glow effect
- Back navigation for nested pages

### Responsive Breakpoints
- **Desktop (lg+):** Side navigation, full CRT frame
- **Tablet (md):** Top navigation bar, adjusted layout
- **Mobile (sm):** Hamburger menu, optimized content flow

## Running Locally

```bash
# Clone the repo
git clone https://github.com/AntonLangbruttig/Portfolio.git
cd Portfolio

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env.local
# Add your AWS SES credentials

# Run development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
SES_SENDER_EMAIL=your_verified_email
SES_RECIPIENT_EMAIL=your_email
```

## Deployment

The site auto-deploys to AWS Amplify on push to `main` branch. Build configuration is in `amplify.yml`.

## License

MIT
