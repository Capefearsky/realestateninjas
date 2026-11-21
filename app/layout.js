import { isLive } from '@/lib/brands';

export const metadata = {
  robots: isLive() ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
