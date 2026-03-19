interface InstructionsScreenProps {
  sectionName: string;
  description: string;
  instructions: string[];
  onStart: () => void;
  sectionNumber: number;
  totalSections: number;
}

export function InstructionsScreen({
  sectionName,
  description,
  instructions,
  onStart,
  sectionNumber,
  totalSections,
}: InstructionsScreenProps) {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="mb-2">
        <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">
          Section {sectionNumber} of {totalSections}
        </span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{sectionName}</h1>
      <p className="text-gray-500 mb-8 text-base">{description}</p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
          Instructions
        </h2>
        <ol className="space-y-3">
          {instructions.map((instruction, i) => (
            <li key={i} className="flex gap-3 text-gray-700 text-base">
              <span className="text-gray-400 font-mono text-sm mt-0.5 shrink-0">
                {i + 1}.
              </span>
              <span>{instruction}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-sm text-blue-800">
        You will first complete 8 practice questions before the timed test begins.
        Practice answers are shown after each question.
      </div>

      <button
        onClick={onStart}
        className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 cursor-pointer"
      >
        Start Practice
      </button>
    </div>
  );
}
