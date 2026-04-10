import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '../components/Providers';

export const metadata: Metadata = {
  title: 'ApplyGenie — AI Job Application Assistant',
  description: 'Manage resumes, save job briefs, and generate smart application content with ApplyGenie.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
