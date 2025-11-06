# Premium Car Rentals

## Project Overview
A modern, responsive web application for a car rental company built with React and Vite. The application allows users to browse vehicles, filter by category, search for specific cars, view detailed information, and submit booking requests.

## Technology Stack
- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.1
- **Language**: JavaScript (ES6+)
- **Styling**: CSS3 with custom properties

## Project Structure
```
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Navbar.jsx      # Navigation bar with logo and links
│   │   ├── Hero.jsx        # Hero section with call-to-action
│   │   ├── CarList.jsx     # Car catalog with filtering/search
│   │   ├── CarCard.jsx     # Individual car display card
│   │   ├── Footer.jsx      # Footer with contact info
│   │   └── BookingForm.jsx # Booking request form
│   ├── pages/
│   │   └── CarDetails.jsx  # Detailed car view page
│   ├── data/
│   │   └── cars.js         # Car inventory data
│   ├── App.jsx             # Main application component
│   ├── App.css             # Application styles
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies and scripts
```

## Key Features
1. **Hero Section**: Eye-catching landing with key selling points
2. **Car Catalog**: Grid display of available vehicles
3. **Search & Filter**: Real-time search and category filtering
4. **Car Details**: Comprehensive vehicle information and specifications
5. **Booking System**: Form for rental requests with date selection
6. **Responsive Design**: Mobile-friendly layout
7. **Modern UI**: Clean, professional design with smooth animations

## Car Categories
- Luxury (BMW, Mercedes-Benz, Audi)
- Economy (Toyota, Honda)
- SUV (Jeep, Range Rover, Chevrolet)
- Sports (Porsche, Ford Mustang)
- Electric (Tesla, Nissan Leaf)

## Development Setup
- **Port**: 5000 (configured for Replit environment)
- **Host**: 0.0.0.0 (allows external connections)
- **Hot Reload**: Enabled via Vite

## Deployment
- **Type**: Autoscale (stateless web application)
- **Build**: `npm run build` (compiles for production)
- **Run**: `npm run preview` (serves production build)

## Recent Changes
- November 06, 2025: Initial project setup and complete implementation
- Created React + Vite application from scratch
- Configured for Replit environment with proper port and host settings
- Implemented all core features: browsing, filtering, search, and booking

## Scripts
- `npm run dev`: Start development server on port 5000
- `npm run build`: Build for production
- `npm run preview`: Preview production build
