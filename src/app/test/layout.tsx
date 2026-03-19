import { TestShell } from '@/components/layout/TestShell';

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TestShell>{children}</TestShell>;
}
