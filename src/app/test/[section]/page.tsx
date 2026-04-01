'use client';

import { useEffect, useCallback, useState } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { useSessionStore } from '@/store/sessionStore';
import { SECTION_ORDER } from '@/constants/sections';
import { getSectionMeta } from '@/constants/sections';
import type { SectionId } from '@/types/questions';
import { InstructionsScreen } from '@/components/test/InstructionsScreen';
import { PracticeScreen } from '@/components/test/PracticeScreen';
import { TimedTestScreen } from '@/components/test/TimedTestScreen';
import { SectionTransition } from '@/components/test/SectionTransition';
import { CancelTestModal } from '@/components/test/CancelTestModal';
import type { AnswerValue } from '@/types/questions';

const VALID_SECTION_IDS = SECTION_ORDER.map((s) => s.id);

export default function SectionPage() {
  const params = useParams();
  const router = useRouter();
  const sectionParam = params.section as string;

  const [showCancelModal, setShowCancelModal] = useState(false);

  const {
    phase,
    currentSectionId,
    currentSectionIndex,
    practiceQuestions,
    timedQuestions,
    currentQuestionIndex,
    completedSections,
    practiceAnswerLogs,
    sessionId,
    isSingleSection,
    beginPractice,
    beginTimedTest,
    recordAnswer,
    forceCompleteSection,
    advanceSection,
    cancelSession,
  } = useSessionStore();

  // Validate section param
  if (!VALID_SECTION_IDS.includes(sectionParam as SectionId)) {
    notFound();
  }

  const sectionId = sectionParam as SectionId;
  const meta = getSectionMeta(sectionId);
  const sectionIndex = SECTION_ORDER.findIndex((s) => s.id === sectionId);

  // Redirect to home if no session is active
  useEffect(() => {
    if (!sessionId && phase === 'idle') {
      router.replace('/');
    }
  }, [sessionId, phase, router]);

  // Block browser back navigation during test
  useEffect(() => {
    function handlePopState() {
      window.history.pushState(null, '', window.location.href);
    }
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleAdvanceSection = useCallback(() => {
    advanceSection();
    // Single section mode: advanceSection sets phase='complete'; the
    // phase==='complete' useEffect below handles navigation to results.
    if (isSingleSection) return;
    const nextIndex = currentSectionIndex + 1;
    if (nextIndex >= SECTION_ORDER.length) {
      router.replace(`/results/${sessionId}`);
    } else {
      const nextSectionId = SECTION_ORDER[nextIndex].id;
      router.replace(`/test/${nextSectionId}`);
    }
  }, [advanceSection, isSingleSection, currentSectionIndex, router, sessionId]);

  const handleRecordAnswer = useCallback(
    (answer: AnswerValue) => {
      recordAnswer(answer);
    },
    [recordAnswer]
  );

  const handleCancelRequest = useCallback(() => {
    setShowCancelModal(true);
  }, []);

  const handleSaveAndExit = useCallback(async () => {
    setShowCancelModal(false);
    await cancelSession(true);
    // phase becomes 'complete' → existing useEffect navigates to /results/{sessionId}
  }, [cancelSession]);

  const handleDiscardAndExit = useCallback(() => {
    setShowCancelModal(false);
    void cancelSession(false);
    // phase becomes 'idle' → existing useEffect navigates to /
  }, [cancelSession]);

  // Handle session complete phase
  useEffect(() => {
    if (phase === 'complete' && sessionId) {
      router.replace(`/results/${sessionId}`);
    }
  }, [phase, sessionId, router]);

  if (phase === 'idle') {
    return null;
  }

  if (phase === 'instructions') {
    return (
      <InstructionsScreen
        sectionName={meta.name}
        description={meta.description}
        instructions={meta.instructions}
        onStart={beginPractice}
        sectionNumber={sectionIndex + 1}
        totalSections={SECTION_ORDER.length}
      />
    );
  }

  if (phase === 'practice') {
    const currentQuestion = practiceQuestions[currentQuestionIndex];
    const isPracticeComplete = currentQuestionIndex >= practiceQuestions.length;

    return (
      <>
        <PracticeScreen
          sectionName={meta.name}
          question={currentQuestion ?? practiceQuestions[practiceQuestions.length - 1]}
          questionNumber={Math.min(currentQuestionIndex + 1, meta.practiceQuestionCount)}
          totalQuestions={meta.practiceQuestionCount}
          onAnswer={handleRecordAnswer}
          onStartTimedTest={beginTimedTest}
          isPracticeComplete={isPracticeComplete}
          onRequestCancel={handleCancelRequest}
          wrongAnswerLogs={practiceAnswerLogs}
        />
        {showCancelModal && (
          <CancelTestModal
            onSaveAndExit={handleSaveAndExit}
            onDiscardAndExit={handleDiscardAndExit}
            onContinue={() => setShowCancelModal(false)}
          />
        )}
      </>
    );
  }

  if (phase === 'timed_test') {
    const currentQuestion = timedQuestions[currentQuestionIndex] ?? null;

    return (
      <>
        <TimedTestScreen
          sectionId={sectionId}
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={meta.testQuestionCount}
          onAnswer={handleRecordAnswer}
          onTimerExpiry={forceCompleteSection}
          onRequestCancel={handleCancelRequest}
        />
        {showCancelModal && (
          <CancelTestModal
            onSaveAndExit={handleSaveAndExit}
            onDiscardAndExit={handleDiscardAndExit}
            onContinue={() => setShowCancelModal(false)}
          />
        )}
      </>
    );
  }

  if (phase === 'section_complete') {
    const result = completedSections[currentSectionId ?? sectionId];
    const isLast = currentSectionIndex >= SECTION_ORDER.length - 1;

    if (!result) {
      return null;
    }

    return (
      <SectionTransition
        sectionName={meta.name}
        result={result}
        isLastSection={isLast}
        onAdvance={handleAdvanceSection}
      />
    );
  }

  return null;
}
