import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: '#6b7280' }}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span>/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:underline" style={{ color: '#10b981' }}>{item.label}</Link>
          ) : (
            <span style={{ color: '#064e3b' }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
