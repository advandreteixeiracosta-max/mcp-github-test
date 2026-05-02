# Word Frequency Analyzer

A modern, responsive web application that analyzes the frequency of words in text blocks.

## Features

### Phase 1 (MVP) ✅
- **Text Input**: Paste or enter up to 2048 characters of text
- **Word Analysis**: Count and analyze word frequencies
- **Results Table**: View results in an organized, sorted table
- **Error Handling**: Clear validation messages
- **Responsive Design**: Works on desktop, tablet, and mobile

### Phase 2 (Coming Soon)
- Dark mode toggle
- Enhanced animations and transitions
- Improved visual feedback

### Phase 3 (Coming Soon)
- Graphical representation (charts and visualizations)
- Interactive data visualization

### Phase 4 (Coming Soon)
- Import text from URL
- Web scraping capabilities
- Cache functionality

## Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Development Commands

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## Project Structure

```
src/
├── components/          # React components
│   ├── TextInput.tsx
│   ├── AnalysisButton.tsx
│   └── FrequencyTable.tsx
├── hooks/              # Custom React hooks
│   └── useWordFrequency.ts
├── utils/              # Utility functions
│   ├── textProcessor.ts
│   ├── frequencyCounter.ts
│   └── validation.ts
├── types/              # TypeScript types
│   └── index.ts
├── styles/             # CSS styles
│   └── globals.css
├── App.tsx             # Root component
└── main.tsx            # Entry point

tests/                  # Test files
├── utils/
└── components/
```

## Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Testing**: Vitest + React Testing Library
- **Charts** (Future): Recharts

## Features Explanation

### Text Processing
- Tokenization: Splits text into individual words
- Cleanup: Removes punctuation and normalizes whitespace
- Optional: Remove common stop words (the, a, an, etc.)

### Frequency Analysis
- Count: Calculates occurrence of each word
- Sort: Orders by frequency (descending)
- Percentage: Shows relative frequency

### Validation
- Minimum: 1 character required
- Maximum: 2048 characters allowed
- Clear error messages for validation failures

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Client-side processing (no server required)
- Optimized for large text blocks
- Efficient data structures
- Fast rendering with React

## Contributing

1. Follow the conventions in `CLAUDE.md`
2. Write tests for new features
3. Ensure all tests pass before committing
4. Use meaningful commit messages

## License

MIT

## Roadmap

See `CLAUDE.md` for detailed development phases and timeline.

---

**Version**: 0.1.0  
**Status**: In Development (Phase 1 - MVP)
