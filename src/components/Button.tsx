import { Loader2 } from 'lucide-react';

/** Simple classnames helper — avoids adding a dependency. */
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({ variant = 'secondary', loading, icon, children, className = '', ...rest }: ButtonProps) {
  return (
    <button
      className={cn('btn', `btn-${variant}`, className, loading && 'loading')}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading && <Loader2 size={16} className="spin" />}
      {!loading && icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}
