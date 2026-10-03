import { AppShell } from "@/components/app/app-shell";
import { SpillProvider } from "@/providers/spill-provider";

export default function LoggedInLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SpillProvider>
      <AppShell>{children}</AppShell>
    </SpillProvider>
  );
}

