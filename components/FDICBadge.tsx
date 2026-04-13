import { Shield } from 'lucide-react';

interface FDICBadgeProps {
  label?: string;
  size?: 'sm' | 'md';
}

export default function FDICBadge({ label = 'FDIC Insured', size = 'sm' }: FDICBadgeProps) {
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
  const iconSize = size === 'sm' ? 12 : 16;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${textSize}`}
      style={{ background: '#dbeafe', color: '#1d4ed8' }}
    >
      <Shield size={iconSize} />
      {label}
    </span>
  );
}
