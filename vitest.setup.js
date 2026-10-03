import '@testing-library/jest-dom/vitest';

if (typeof document.execCommand !== 'function') {
  document.execCommand = () => false;
}
