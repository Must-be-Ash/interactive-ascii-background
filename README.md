# ASCII Landing Page

A Next.js landing page with an interactive ASCII background effect. Move your mouse to see the animated ASCII characters follow your cursor.

## Features

- ASCII character background pattern
- Mouse interaction with animated text
- Smooth character scramble animation
- Responsive design
- Built with Next.js 15 and TypeScript

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Build for Production

```bash
npm run build
npm start
```

## Customization

**Change animated text:** Edit the `texts` array in `components/AsciiBackground.tsx` (line 17). Each array element represents a line of text.

**Change background ASCII characters:** Edit the `baseChars` array in `components/AsciiBackground.tsx` (line 23) to modify the background pattern characters.

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
# interactive-ascii-background
