'use client';
import { useEffect } from 'react';

// Fires the GA4 "generate_lead" event once, only after a real submission.
export default function LeadTracked() {
  useEffect(() => {
    let lead = null;
    try {
      lead = JSON.parse(sessionStorage.getItem('ren_lead'));
      sessionStorage.removeItem('ren_lead');
    } catch {}
    if (lead && window.gtag) window.gtag('event', 'generate_lead', { lead_brand: lead.brand, lead_goal: lead.goal });
  }, []);
  return null;
}
