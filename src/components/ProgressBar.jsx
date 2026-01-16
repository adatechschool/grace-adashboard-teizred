export default function ProgressBar({ value }) {
  return (
    <div className="progress" aria-label={`Progression ${value}%`}>
      <div className="fill" style={{ width: `${value}%` }} />
    </div>
  );
}