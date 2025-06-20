# Weerasiri Hotel and Bakery - Restaurant Management System

A modern web-based restaurant management system built with Next.js, featuring real-time order tracking, kitchen management, and daily code validation.

## Features

- 🍽️ **Menu Management**
  - Categorized menu items
  - Support for different portion sizes (Full/Half)
  - Real-time price calculation
  - Image support for menu items

- 🛒 **Order System**
  - Real-time cart management
  - Daily kitchen code validation
  - Order tracking with KOT numbers
  - Invoice generation

- 👨‍🍳 **Kitchen Dashboard**
  - Real-time order updates
  - Order status management (Received → Cooking → Finished)
  - Daily kitchen code display
  - Mobile-friendly interface

- 📊 **Order History**
  - Sales analytics
  - Daily/weekly/monthly reports
  - Item-wise sales tracking
  - Revenue analysis

## Tech Stack

- **Frontend Framework**: Next.js 14.1.0
- **Styling**: Tailwind CSS 3.4.1
- **State Management**: React Hooks
- **Data Storage**: LocalStorage
- **Authentication**: Supabase
- **UI Components**: 
  - Custom components with Tailwind
  - Radix UI primitives
  - Class Variance Authority for component variants
- **Charts**: Chart.js 4.4.9 with react-chartjs-2
- **Utilities**:
  - html2canvas for invoice generation
  - clsx and tailwind-merge for class name management
  - tailwindcss-animate for animations

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weerasiri-hotel.git
   cd weerasiri-hotel
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Supabase Setup

1. Create a project at [Supabase](https://supabase.com/) and obtain your API
   URL and `anon` key.
2. Copy `.env.example` to `.env.local` and fill in the values for
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Install the Supabase client:
   ```bash
   npm install @supabase/supabase-js
   ```
4. When deploying with GitHub Actions, add `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` as repository secrets.
5. (Optional) Set up the staff profile table by running the SQL file in
   `supabase/schema.sql` using the Supabase SQL editor.

## Project Structure

```
weerasiri-hotel/
├── components/         # Reusable UI components
├── pages/             # Next.js pages
├── src/               # Source code
├── styles/            # Global styles
├── utils/             # Utility functions
├── scripts/           # Build and utility scripts
├── lib/               # Library code
├── .next/             # Next.js build output
├── next.config.js     # Next.js configuration
├── postcss.config.js  # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
└── package.json       # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run download-images` - Download menu item images

## GitHub Actions

A CI workflow in `.github/workflows/ci.yml` installs dependencies, lints the
code and builds the project. It requires `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY` to be defined as GitHub secrets.

## Key Features Implementation

### Daily Kitchen Code System
- Generates a new 5-digit code daily
- Validates orders against the current day's code
- Displays code prominently in the kitchen dashboard
- Automatically refreshes at midnight

### Order Management
- Real-time order status updates
- KOT number generation
- Order history tracking
- Invoice generation and download

### Analytics
- Sales tracking by item
- Revenue analysis
- Time-based analytics
- Export capabilities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
