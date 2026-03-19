interface TestShellProps {
  children: React.ReactNode;
}

export function TestShell({ children }: TestShellProps) {
  return (
    <div className="min-h-screen bg-[#c8cce8] flex flex-col">
      {children}
    </div>
  );
}
