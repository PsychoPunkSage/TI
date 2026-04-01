'use client';

import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { useSessionStore } from '@/store/sessionStore';
import { SECTION_ORDER } from '@/constants/sections';
import type { SectionId } from '@/types/questions';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const { initSession, initSingleSectionSession } = useSessionStore();

  function handleStartTest() {
    initSession();
    router.replace(`/test/${SECTION_ORDER[0].id}`);
  }

  function handleStartSection(sectionId: SectionId) {
    initSingleSectionSession(sectionId);
    router.replace(`/test/${sectionId}`);
  }

  function handleStartSectionWithLevel(sectionId: SectionId, level: 1 | 2) {
    initSingleSectionSession(sectionId, level);
    router.replace(`/test/${sectionId}`);
  }

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto py-16">
        {/* Hero */}
        <div className="mb-12">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-3">
            Thomas International
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            General Intelligence Assessment
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Practice the full GIA across all five cognitive ability sections.
            Behavioral realism, instant feedback after each session, and
            performance tracking over time.
          </p>
        </div>

        {/* Sections overview */}
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-10">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Five Sections — 4 Minutes Each
            </p>
          </div>
          <div className="divide-y divide-gray-100">
            {SECTION_ORDER.map((section, i) => (
              <div
                key={section.id}
                className="px-6 py-4 flex items-center gap-4"
              >
                <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {section.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {section.description}
                  </p>
                </div>
                <span className="ml-auto text-xs text-gray-400 font-mono">
                  {section.testQuestionCount}Q
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA — Full Test */}
        <div className="space-y-3 mb-12">
          <button
            onClick={handleStartTest}
            className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Start Full Test
          </button>
          <Link
            href="/analysis"
            className="block w-full py-4 border border-gray-200 text-gray-700 text-lg font-semibold rounded-lg hover:border-gray-400 text-center"
          >
            View Analysis
          </Link>
        </div>

        {/* Individual Section Training */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            Practice Individual Sections
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Target a specific section to sharpen your skills before the full test.
          </p>
          <div className="space-y-3">
            {SECTION_ORDER.map((section, i) => (
              <div
                key={section.id}
                className="flex items-center gap-4 border border-gray-200 rounded-xl px-5 py-4 bg-white"
              >
                <span className="w-8 h-8 rounded-full bg-[#2d4a7a] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">
                    {section.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {section.description}
                  </p>
                </div>
                {section.id === 'number_speed' ? (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleStartSectionWithLevel('number_speed', 1)}
                      className="px-4 py-2 bg-[#2d4a7a] text-white text-sm font-semibold rounded-lg hover:bg-[#3a5d99] cursor-pointer"
                    >
                      Lv 1
                    </button>
                    <button
                      onClick={() => handleStartSectionWithLevel('number_speed', 2)}
                      className="px-4 py-2 bg-[#2d4a7a] text-white text-sm font-semibold rounded-lg hover:bg-[#3a5d99] cursor-pointer"
                    >
                      Lv 2
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStartSection(section.id)}
                    className="shrink-0 px-4 py-2 bg-[#2d4a7a] text-white text-sm font-semibold rounded-lg hover:bg-[#3a5d99] cursor-pointer"
                  >
                    Start Section
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-8 text-center">
          All data is stored locally in your browser. Nothing is sent to any server.
        </p>
      </div>
    </AppShell>
  );
}
