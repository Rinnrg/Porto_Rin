// Global styles - can be imported in _app.tsx
export const globalStyles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

// Common CSS utility classes
export const utilityClasses = {
  // Flexbox utilities
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    around: 'flex items-center justify-around',
    column: 'flex flex-col',
    columnCenter: 'flex flex-col items-center justify-center',
  },
  
  // Spacing utilities
  spacing: {
    section: 'py-16 md:py-24',
    container: 'px-4 md:px-8 lg:px-16',
    maxWidth: 'max-w-7xl mx-auto',
  },
  
  // Text utilities
  text: {
    heading1: 'text-4xl md:text-6xl font-bold',
    heading2: 'text-3xl md:text-5xl font-bold',
    heading3: 'text-2xl md:text-4xl font-bold',
    body: 'text-base md:text-lg',
    small: 'text-sm',
  },
  
  // Animation utilities
  animation: {
    fadeIn: 'opacity-0 animate-fadeIn',
    slideUp: 'transform translate-y-8 opacity-0 animate-slideUp',
    hover: 'transition-all duration-300 hover:scale-105',
  },
};
