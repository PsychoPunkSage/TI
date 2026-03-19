'use client';

interface CancelTestModalProps {
  onSaveAndExit: () => void;
  onDiscardAndExit: () => void;
  onContinue: () => void;
}

export function CancelTestModal({
  onSaveAndExit,
  onDiscardAndExit,
  onContinue,
}: CancelTestModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full mx-4 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Cancel Test?</h2>
        <p className="text-gray-600 text-sm mb-6">
          You are about to exit the test. Would you like to save your progress so far?
        </p>

        <div className="flex gap-3 mb-4">
          <button
            onClick={onSaveAndExit}
            className="flex-1 py-3 bg-[#2d4a7a] text-white text-sm font-semibold rounded-lg hover:bg-[#3a5d99] cursor-pointer"
          >
            Save &amp; Exit
          </button>
          <button
            onClick={onDiscardAndExit}
            className="flex-1 py-3 bg-white text-red-600 text-sm font-semibold rounded-lg border border-red-300 hover:bg-red-50 cursor-pointer"
          >
            Discard &amp; Exit
          </button>
        </div>

        <button
          onClick={onContinue}
          className="w-full py-3 text-gray-500 text-sm font-medium hover:text-gray-700 cursor-pointer"
        >
          Continue Test
        </button>
      </div>
    </div>
  );
}
