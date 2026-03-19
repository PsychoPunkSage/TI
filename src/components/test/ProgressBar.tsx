interface ProgressBarProps {
  sectionName: string;
  current: number;
  total: number;
}

export function ProgressBar({ sectionName, current, total }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">
        {sectionName}
      </span>
      <span className="text-sm text-gray-400">
        Question {current} of {total}
      </span>
    </div>
  );
}
