function RingProgress({
  progress, // 0 to 1 (0.2 for 1/5)
  size = 80,
  strokeWidth = 8,
  trackColor = "#e2e8f0",
  progressColor = "#ffd230",
  value,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
  value: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;
  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        {/* Background track */}
        <circle
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress indicator */}
        <circle
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {/* Optional center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium">
          <div className="flex flex-col justify-center items-center">
            <p className="text-6xl">{value}</p>
            <div className="">Warning</div>
          </div>
        </span>
      </div>
    </div>
  );
}

export default RingProgress;
