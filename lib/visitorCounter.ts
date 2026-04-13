'use client';

export async function getAndIncrementVisitor(): Promise<{ today: number; total: number }> {
  const today = new Date().toISOString().slice(0, 10);
  let todayCount = 1;
  try {
    const stored = JSON.parse(localStorage.getItem('syh_visitor') || '{}');
    todayCount = stored.date === today ? stored.today + 1 : 1;
    localStorage.setItem('syh_visitor', JSON.stringify({ date: today, today: todayCount }));
  } catch {
    // localStorage unavailable
  }
  let total = 0;
  try {
    const res = await fetch('/api/visitor', { method: 'POST' });
    if (res.ok) {
      const json = await res.json();
      total = json.total || 0;
    }
  } catch {
    total = todayCount;
  }
  return { today: todayCount, total };
}
