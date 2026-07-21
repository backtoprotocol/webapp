import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Back to Protocol | Health & Wellness Media',
  description: 'Evidence-based health and wellness content from trusted medical experts.',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%234a5ba4'>P</text></svg>" />
      </head>
      <body className="bg-neutral-50 text-neutral-900">
        {children}
      </body>
    </html>
  );
}
