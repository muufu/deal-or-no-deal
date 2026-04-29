import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Deal or No Deal — Edmund's Birthday",
  description: 'A personalised birthday edition of Deal or No Deal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="luxe">
      <body>{children}</body>
    </html>
  );
}
