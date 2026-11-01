import 'react';

declare module 'react' {
  // allow CSS custom properties in style={{ '--d': 1 }}
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
