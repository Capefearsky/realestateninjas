import { isLive } from '@/lib/brands';

export default function robots() {
  if (!isLive()) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api'] }] };
}
