interface ProgressBarProps {
  percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-text">{percent}% completado</span>
    </div>
  );
}
