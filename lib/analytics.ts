'use client';

interface EventData {
  event_type: string;
  page: string;
  locale: string;
  detail?: string;
  referrer?: string;
}

export async function trackEvent(data: EventData): Promise<void> {
  const webhookUrl = process.env.NEXT_PUBLIC_GS_WEBHOOK_URL;
  if (!webhookUrl) return;
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
    });
  } catch {
    // silent fail
  }
}
