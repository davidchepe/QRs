# QR Sliding Puzzle - Technical Documentation

## Overview
Interactive sliding puzzle game designed for mobile-first experience. Players click empty spaces to move adjacent letter pieces and spell out a hidden message.

## Core Features
- **4x3 Grid**: 12 total positions (10 letters + 2 empty spaces)
- **Dual Empty Spaces**: Two movable empty positions for better puzzle mobility
- **Click-to-Move**: Intuitive UX where users click empty spaces to move pieces
- **Numbered Hints**: Each letter shows its correct position number
- **Mobile Responsive**: Optimized for iPhone 14 Pro Max and other mobile devices
- **Victory Animation**: Animated reveal message when puzzle is solved

## HTML Structure

### Basic Template
```html
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>[Page Title]</title>
<style>
  /* CSS styles here */
</style>
</head>
<body>
  <div class="instructions">[Instructions Text]</div>
  <div class="puzzle-container" id="puzzleContainer"></div>
  <button class="shuffle-btn" onclick="shufflePuzzle()">Mezclar de nuevo</button>
  <div class="victory-message" id="victoryMessage">[Victory Message]</div>
  <script>
    /* JavaScript logic here */
  </script>
</body>
</html>
```

### Key Elements
- `puzzle-container`: CSS Grid container for puzzle pieces
- `instructions`: User guidance text
- `shuffle-btn`: Button to randomize puzzle
- `victory-message`: Hidden success message (shown when solved)

## CSS Styling

### Responsive Grid System
```css
.puzzle-container {
  display: grid;
  grid-template-columns: repeat(4, min(20vw, 80px));
  grid-template-rows: repeat(3, min(20vw, 80px));
  gap: 3px;
  max-width: 90vw;
}
```

### Mobile Optimization
- Uses `min()` functions for responsive sizing
- `100vh` height for full screen usage
- Font sizes scale with viewport: `min(5vw, 1.8rem)`
- Padding and margins optimized for touch interaction

### Visual States
- **Normal pieces**: White background with pink borders
- **Empty spaces**: Transparent with dashed pink borders
- **Hover effects**: Scale transform and color changes
- **Selection mode**: Yellow background with orange borders

## JavaScript Architecture

### Data Structure
```javascript
// Letter arrangement (4x3 = 12 positions)
const solution = [
  'L', 'e', 't', 't',  // Row 1: positions 1-4
  'e', 'r', 's', ' ',  // Row 2: positions 5-8  
  'h', 'e', '', ''     // Row 3: positions 9-10 + 2 empty
];

// Hint numbers for each position
const hintNumbers = [
  1, 2, 3, 4,
  5, 6, 7, 8,
  9, 10, 0, 0
];

// Current game state
let currentState = [...solution];
let currentHints = [...hintNumbers];
let emptyIndexes = [10, 11]; // Positions of empty spaces
```

### Core Functions

#### 1. `createPuzzle()`
- Generates DOM elements for each puzzle piece
- Adds numbered hints to letter pieces
- Assigns click handlers
- Applies CSS classes for styling

#### 2. `movePiece(clickedIndex)`
- Entry point for user interactions
- Determines if clicked position is an empty space
- Delegates to `moveToEmptySpace()` for processing

#### 3. `moveToEmptySpace(emptySpaceIndex)`
- Finds adjacent pieces that can move to clicked empty space
- **Single adjacent piece**: Moves automatically
- **Multiple adjacent pieces**: Triggers selection mode

#### 4. `swapPieces(pieceIndex, emptyIndex)`
- Swaps letter and hint data between positions
- Updates `emptyIndexes` array
- Triggers puzzle redraw and victory check

#### 5. `checkVictory()`
- Compares current state to solution
- Ignores positions in `emptyIndexes`
- Shows victory message if puzzle is solved

#### 6. `shufflePuzzle()`
- Resets puzzle to solved state
- Performs valid random moves to scramble
- Ensures puzzle remains solvable

### Selection Mode System
When multiple pieces can move to an empty space:

```javascript
function highlightSelectablePieces(pieces, targetEmpty) {
  // Visual highlighting
  pieces.forEach(pieceIndex => {
    const element = puzzleContainer.children[pieceIndex];
    element.style.backgroundColor = '#ffeb3b';
    element.style.border = '3px solid #ff9800';
  });
  
  // Add selection click handlers
  pieces.forEach(pieceIndex => {
    element.onclick = () => {
      swapPieces(pieceIndex, targetEmpty);
      clearHighlights();
    };
  });
}
```

## Customization Guide

### Creating New QR Pages

#### Step 1: Define Your Message
```javascript
// Example: "LOVE" (4 letters + 8 empty spaces)
const solution = [
  'L', 'O', 'V', 'E',
  '', '', '', '',
  '', '', '', ''
];

const hintNumbers = [
  1, 2, 3, 4,
  0, 0, 0, 0,
  0, 0, 0, 0
];
```

#### Step 2: Update Text Content
- **Title**: `<title>Your Title</title>`
- **Instructions**: `<div class="instructions">Your instructions</div>`
- **Victory Message**: `<div class="victory-message">Your success message</div>`

#### Step 3: Adjust Empty Spaces
```javascript
// For 4 letters, use 8 empty spaces (positions 4-11)
let emptyIndexes = [4, 5, 6, 7, 8, 9, 10, 11];

// For 6 letters, use 6 empty spaces (positions 6-11)
let emptyIndexes = [6, 7, 8, 9, 10, 11];
```

#### Step 4: Color Customization
```css
/* Change theme colors */
:root {
  --primary-color: #ff3366;    /* Pink theme */
  --background-color: #ffe6eb; /* Light pink */
  --text-color: #ff3366;       /* Matching text */
}

/* Alternative themes */
/* Blue theme */
--primary-color: #2196f3;
--background-color: #e3f2fd;

/* Green theme */
--primary-color: #4caf50;
--background-color: #e8f5e8;
```

## Technical Considerations

### Grid Mathematics
- **4x3 Grid**: 12 total positions (indices 0-11)
- **Row calculation**: `Math.floor(index / 4)`
- **Column calculation**: `index % 4`
- **Adjacent check**: Same row ±1 column OR same column ±1 row

### Solvability
- Shuffle algorithm only performs valid moves
- Guarantees puzzle remains solvable
- Uses 500 random valid moves for good scrambling

### Performance
- Minimal DOM manipulation (full recreate on each move)
- Efficient array operations for state management
- CSS transitions for smooth animations

### Browser Compatibility
- Modern JavaScript (ES6+ features)
- CSS Grid and Flexbox
- Mobile touch events
- Viewport units for responsive design

## File Structure for Multiple QRs
```
QRs/
├── qr1.html    # "Buhardilla" puzzle
├── qr2.html    # Next puzzle
├── qr3.html    # Third puzzle
├── qr4.html    # Fourth puzzle
├── css/
│   └── style.css    # Shared styles (optional)
├── js/
│   └── qr-generator.js    # QR generation utility
└── qr-codes/
    ├── QR1.png
    ├── QR2.png
    ├── QR3.png
    └── QR4.png
```

## Deployment Notes
- **GitHub Pages**: Automatic deployment from main branch
- **Caching**: Mobile browsers may cache aggressively
- **Cache busting**: Add `?v=1` to URLs for immediate updates
- **Testing**: Always test on actual mobile devices

## Example Messages by Length
- **4 letters**: "AMOR", "CASA", "VIDA"
- **6 letters**: "CARINO", "BESOS"
- **8 letters**: "CORAZON", "SIEMPRE"
- **10 letters**: "BUHARDILLA", "MARAVILLOSO"

## QR Code Generation
```bash
# Generate QR for each page
https://api.qrserver.com/v1/create-qr-code/?size=500x500&format=png&data=https://davidchepe.github.io/QRs/qr1.html
```

This documentation provides the complete technical foundation for creating additional QR puzzle pages with different messages, themes, and difficulty levels.
